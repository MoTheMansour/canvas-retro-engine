import * as THREE from 'three';
import * as fs from 'fs';
import * as path from 'path';
import { Nostalgist } from 'nostalgist';
import {  } from 'obsidian';

function createEl<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    o?: any,
    callback?: (el: HTMLElementTagNameMap[K]) => void
): HTMLElementTagNameMap[K] {
    const doc = typeof document !== 'undefined' ? document : (typeof window !== 'undefined' ? window.document : null);
    const el = doc ? doc.createElement(tag) : ({} as any);
    if (typeof o === 'string') {
        el.className = o;
    } else if (o) {
        if (o.cls) el.className = Array.isArray(o.cls) ? o.cls.join(' ') : o.cls;
        if (o.text) el.textContent = o.text;
        if (o.attr) {
            for (const [k, v] of Object.entries(o.attr)) {
                if (v !== undefined && v !== null) el.setAttribute(k, String(v));
            }
        }
        if (o.title) el.title = o.title;
        if (o.value) (el as any).value = o.value;
        if (o.type) (el as any).type = o.type;
        if (o.placeholder) (el as any).placeholder = o.placeholder;
        if (o.href) (el as any).href = o.href;
    }
    if (callback) callback(el);
    return el;
}



export function setCssStyles(el: HTMLElement | SVGElement | any, styles: Record<string, string | number | undefined | null>): void {
    if (!el || !styles) return;
    if (typeof (el as any).setCssStyles === 'function') {
        try {
            (el as any).setCssStyles(styles);
            return;
        } catch {}
    }
    if (el.style) {
        for (const [key, value] of Object.entries(styles)) {
            if (value !== undefined && value !== null) {
                try {
                    (el.style as any)[key] = String(value);
                } catch {}
            }
        }
    }
}

export class PsxEngine {
    private container: HTMLElement;
    private canvas: HTMLCanvasElement;
    private canvasTexture: THREE.CanvasTexture | null = null;
    private onCanvasReady: (tex: THREE.Texture) => void;
    private nostalgistInstance: any = null;
    private isDestroyed: boolean = false;

    constructor(
        container: HTMLElement, 
        romPath: string, 
        biosPath: string | null,
        onCanvasReady: (tex: THREE.Texture) => void
    ) {
        this.container = container;
        this.onCanvasReady = onCanvasReady;

        // 1. Offscreen WebGL Canvas for RetroArch core rendering (always active)
        this.canvas = createEl('canvas');
        this.canvas.width = 640;
        this.canvas.height = 480;
        setCssStyles(this.canvas, {
            position: 'fixed',
            left: '-9999px',
            top: '-9999px',
            width: '640px',
            height: '480px',
            pointerEvents: 'none',
            opacity: '0',
            zIndex: '-9999'
        });
        const docBody = this.container.ownerDocument?.body || document.body;
        docBody.appendChild(this.canvas);

        // 2. Texture binding
        this.canvasTexture = new THREE.CanvasTexture(this.canvas);
        // Use Linear filter for PS1 to smooth out jagged polygons (bilinear filtering)
        this.canvasTexture.minFilter = THREE.LinearFilter;
        this.canvasTexture.magFilter = THREE.LinearFilter;
        this.canvasTexture.generateMipmaps = false;
        
        // Critical for correct color rendering! Prevents gamma curve distortion which exposes PS1 15-bit color banding
        this.canvasTexture.colorSpace = THREE.SRGBColorSpace;
        
        this.onCanvasReady(this.canvasTexture);

        // 3. Launch
        this.launchEmulator(romPath, biosPath);
    }

    private async launchEmulator(romPath: string, biosPath: string | null) {
        try {
            const logFile = path.join(this.container.ownerDocument.defaultView?.process.cwd() || '', 'psx_error.log');
            fs.appendFileSync(logFile, "[PsxEngine] Starting fast native boot...\n");

            // 1. Resolve CUE and BIN files for PSX multi-track support
            const romFiles: any[] = [];
            const romDir = path.dirname(romPath);
            const ext = path.extname(romPath).toLowerCase();

            if (ext === '.cue') {
                // Read master CUE file
                const cueBuffer = await fs.promises.readFile(romPath);
                const cueContentStr = cueBuffer.toString('utf8');
                const cueFileName = path.basename(romPath);
                
                romFiles.push({
                    fileName: cueFileName,
                    fileContent: new Uint8Array(cueBuffer.buffer, cueBuffer.byteOffset, cueBuffer.length)
                });

                // Parse all referenced BIN track files from CUE content: FILE "filename" BINARY
                const fileMatches = Array.from(cueContentStr.matchAll(/FILE\s+["']?([^"'\r\n]+)["']?\s+BINARY/gi));
                const binFilesToLoad = new Set<string>();
                for (const match of fileMatches) {
                    if (match[1]) binFilesToLoad.add(match[1].trim());
                }

                // If regex match didn't find any, load all .bin files in the same directory
                if (binFilesToLoad.size === 0) {
                    const dirFiles = await fs.promises.readdir(romDir);
                    for (const f of dirFiles) {
                        if (f.toLowerCase().endsWith('.bin')) {
                            binFilesToLoad.add(f);
                        }
                    }
                }

                for (const binName of binFilesToLoad) {
                    const fullBinPath = path.join(romDir, binName);
                    if (fs.existsSync(fullBinPath)) {
                        const rawBin = await fs.promises.readFile(fullBinPath);
                        romFiles.push({
                            fileName: binName,
                            fileContent: new Uint8Array(rawBin.buffer, rawBin.byteOffset, rawBin.length)
                        });
                    } else {
                        // Fallback: search case-insensitively in same dir
                        const dirFiles = await fs.promises.readdir(romDir);
                        const matchedFile = dirFiles.find(f => f.toLowerCase() === binName.toLowerCase());
                        if (matchedFile) {
                            const rawBin = await fs.promises.readFile(path.join(romDir, matchedFile));
                            romFiles.push({
                                fileName: binName,
                                fileContent: new Uint8Array(rawBin.buffer, rawBin.byteOffset, rawBin.length)
                            });
                        }
                    }
                }
            } else if (ext === '.bin') {
                // Single .bin file: load the .bin file AND generate a matching virtual .cue file so PCSX-ReARMed boots it seamlessly!
                const binFileName = path.basename(romPath);
                const rawBin = await fs.promises.readFile(romPath);
                const binUint8 = new Uint8Array(rawBin.buffer, rawBin.byteOffset, rawBin.length);

                const cueFileName = binFileName.replace(/\.bin$/i, '.cue');
                const cueText = `FILE "${binFileName}" BINARY\n  TRACK 01 MODE2/2352\n    INDEX 01 00:00:00\n`;
                const cueUint8 = new TextEncoder().encode(cueText);

                romFiles.push({
                    fileName: cueFileName,
                    fileContent: cueUint8
                });
                romFiles.push({
                    fileName: binFileName,
                    fileContent: binUint8
                });
            } else {
                // Direct ISO or other image format
                const fileName = path.basename(romPath);
                const rawData = await fs.promises.readFile(romPath);
                romFiles.push({
                    fileName: fileName,
                    fileContent: new Uint8Array(rawData.buffer, rawData.byteOffset, rawData.length)
                });
            }

            const biosFiles: any[] = [];
            if (biosPath && fs.existsSync(biosPath)) {
                // Use async readFile for BIOS too
                const biosData = await fs.promises.readFile(biosPath);
                const rawBios = new Uint8Array(biosData.buffer, biosData.byteOffset, biosData.length);
                biosFiles.push({ fileName: 'scph1001.bin', fileContent: rawBios });
                biosFiles.push({ fileName: 'SCPH1001.BIN', fileContent: rawBios });
                biosFiles.push({ fileName: 'scph5501.bin', fileContent: rawBios });
                biosFiles.push({ fileName: 'scph7001.bin', fileContent: rawBios });
            }

            const options: any = {
                core: 'pcsx_rearmed',
                element: this.canvas,
                rom: romFiles,
                bios: biosFiles,
                retroarchConfig: {
                    'audio_sync': 'true',
                    'audio_latency': '64',
                    'audio_max_timing_skew': '0.05',
                    'audio_out_rate': '48000',
                    'audio_resampler': 'linear',
                    'video_vsync': 'true',
                    'video_max_swapchain_images': '2',
                    'video_crop_overscan': 'true',
                    'video_scale_integer': 'false',
                    'video_aspect_ratio_auto': 'false',
                    'aspect_ratio_index': '0'
                },
                retroarchCoreConfig: {
                    'pcsx_rearmed_show_bios_bootlogo': 'enabled',
                    'pcsx_rearmed_dithering': 'enabled',
                    'pcsx_rearmed_spu_interpolation': 'simple',
                    'pcsx_rearmed_spu_reverb': 'enabled',
                    'pcsx_rearmed_frameskip': '0',
                    'pcsx_rearmed_async_cd': 'async',
                    'pcsx_rearmed_region': 'auto',
                    'pcsx_rearmed_pad_black_borders': 'disabled'
                }
            };

            fs.appendFileSync(logFile, "[PsxEngine] Launching Nostalgist with zero-latency audio and 60 FPS fast rendering pipeline...\n");
            this.nostalgistInstance = await Nostalgist.launch(options);
            fs.appendFileSync(logFile, "[PsxEngine] Nostalgist successfully launched!\n");

        } catch (e) {
            const logFile = path.join(this.container.ownerDocument.defaultView?.process.cwd() || '', 'psx_error.log');
            fs.appendFileSync(logFile, `[PsxEngine] Nostalgist failed to launch: ${e}\n${(e as any).stack || ''}\n`);
            console.error("[PsxEngine] Nostalgist failed to launch:", e);
        }
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    private savedStateBuffer: ArrayBuffer | null = null;

    public async saveState(): Promise<ArrayBuffer | null> {
        if (!this.nostalgistInstance) return null;
        try {
            const res = await this.nostalgistInstance.saveState();
            if (res && res.state) {
                const blob: Blob = res.state;
                const buffer = await blob.arrayBuffer();
                this.savedStateBuffer = buffer;
                return buffer;
            }
            return null;
        } catch (e) {
            console.error("PSX saveState failed:", e);
            return null;
        }
    }

    public async loadState(customBuffer?: ArrayBuffer | null): Promise<boolean> {
        if (!this.nostalgistInstance) return false;
        const targetBuffer = customBuffer || this.savedStateBuffer;
        if (!targetBuffer) return false;
        try {
            const blob = new Blob([targetBuffer]);
            await this.nostalgistInstance.loadState(blob);
            return true;
        } catch (e) {
            console.error("PSX loadState failed:", e);
            return false;
        }
    }

    public update() {
        if (!this.isDestroyed && this.canvasTexture) {
            this.canvasTexture.needsUpdate = true;
        }
    }

    public pause() {
        if (this.nostalgistInstance) this.nostalgistInstance.pause();
    }

    public resume() {
        if (this.nostalgistInstance) this.nostalgistInstance.resume();
    }

    public sendInput(buttonNum: number, isDown: boolean) {
        if (!this.nostalgistInstance) return;
        
        // Map our button numbers to the default RetroArch Libretro keyboard keys
        const keyMap: Record<number, string> = {
            0: 'KeyZ', // 0 = Cross (mapped to K in main.ts) -> Libretro B (Z)
            1: 'KeyA', // 1 = Square (mapped to J in main.ts) -> Libretro Y (A)
            8: 'KeyX', // 8 = Circle (mapped to L in main.ts) -> Libretro A (X)
            9: 'KeyS', // 9 = Triangle (mapped to I in main.ts) -> Libretro X (S)
            10: 'KeyQ', // 10 = L1 (mapped to U in main.ts) -> Libretro L
            11: 'Digit1', // 11 = L2 (mapped to E in main.ts) -> Libretro L2
            12: 'KeyW', // 12 = R1 (mapped to Y/R/U in main.ts) -> Libretro R
            13: 'Digit2', // 13 = R2 (mapped to O in main.ts) -> Libretro R2
            2: 'ShiftRight', 3: 'Enter', // Select and Start
            4: 'ArrowUp', 5: 'ArrowDown', 6: 'ArrowLeft', 7: 'ArrowRight',
        };
        const code = keyMap[buttonNum];
        if (!code) return;

        // Dispatch synthetic KeyboardEvent to document so Emscripten natively catches it
        const event = new KeyboardEvent(isDown ? 'keydown' : 'keyup', {
            code: code,
            key: code.replace('Key', '').replace('Arrow', ''),
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
    }

    public destroy() {
        this.isDestroyed = true;
        
        // Explicitly terminate WebGL context to prevent GPU context memory leaks!
        try {
            const gl = this.canvas.getContext('webgl2') || this.canvas.getContext('webgl');
            if (gl) {
                const loseContextExt = gl.getExtension('WEBGL_lose_context');
                if (loseContextExt) loseContextExt.loseContext();
            }
        } catch (e) {
            console.warn("[PsxEngine] WebGL loseContext warning:", e);
        }

        if (this.nostalgistInstance) {
            try {
                this.nostalgistInstance.exit();
            } catch {}
            this.nostalgistInstance = null;
        }
        if (this.canvasTexture) {
            this.canvasTexture.dispose();
            this.canvasTexture = null;
        }
        if (this.canvas.parentElement) {
            this.canvas.parentElement.removeChild(this.canvas);
        }
    }
}
