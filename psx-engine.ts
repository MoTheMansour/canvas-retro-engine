import * as THREE from 'three';
import * as fs from 'fs';
import * as path from 'path';
import { Nostalgist } from 'nostalgist';

function createEl<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    o?: any,
    callback?: (el: HTMLElementTagNameMap[K]) => void
): HTMLElementTagNameMap[K] {
    const doc = typeof document !== 'undefined' ? document : (typeof window !== 'undefined' ? window.document : null);
    const win = (doc as any)?.win || (typeof window !== 'undefined' ? window : null);
    const createFn = win && typeof win.createEl === 'function' ? win.createEl.bind(win) : (doc ? (doc as any)['createElement'].bind(doc) : null);
    const el = createFn ? createFn(tag) : ({} as any);
    if (typeof o === 'string') {
        el.className = o;
    } else if (o) {
        if (o.cls) el.className = Array.isArray(o.cls) ? o.cls.join(' ') : o.cls;
        if (o.text) el.textContent = o.text;
    }
    if (callback) callback(el);
    return el;
}

function setCssStyles(el: HTMLElement | any, styles: Record<string, string | number | undefined | null>): void {
    if (!el || !styles) return;
    if (typeof el.setCssStyles === 'function') {
        try {
            el.setCssStyles(styles);
            return;
        } catch { /* ignore */ }
    }
    if (el.style) {
        for (const [key, value] of Object.entries(styles)) {
            if (value !== undefined && value !== null) {
                try {
                    el.style[key] = String(value);
                } catch { /* ignore */ }
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
    private textureSmoothing: boolean = true;
    private enhancedGraphics: boolean = true;
    private speedMultiplier: number = 1.0;
    private activeCheats: string[] = [];

    constructor(
        container: HTMLElement, 
        romPath: string, 
        biosPath: string | null,
        onCanvasReady: (tex: THREE.Texture) => void,
        options?: {
            textureSmoothing?: boolean;
            enhancedGraphics?: boolean;
            speed?: number;
            cheats?: string[];
        }
    ) {
        this.container = container;
        this.onCanvasReady = onCanvasReady;
        if (options) {
            if (options.textureSmoothing !== undefined) this.textureSmoothing = options.textureSmoothing;
            if (options.enhancedGraphics !== undefined) this.enhancedGraphics = options.enhancedGraphics;
            if (options.speed !== undefined) this.speedMultiplier = options.speed;
            if (options.cheats) this.activeCheats = options.cheats;
        }

        // 1. Offscreen WebGL Canvas for RetroArch core rendering (always active) for RetroArch core rendering (always active)
        this.canvas = createEl('canvas');
        this.canvas.width = this.enhancedGraphics ? 1024 : 640;
        this.canvas.height = this.enhancedGraphics ? 768 : 480;
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
        this.canvasTexture.minFilter = this.textureSmoothing ? THREE.LinearFilter : THREE.NearestFilter;
        this.canvasTexture.magFilter = this.textureSmoothing ? THREE.LinearFilter : THREE.NearestFilter;
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
                    'audio_rate_control': 'true',
                    'audio_rate_control_delta': '0.005',
                    'audio_max_timing_skew': '0.05',
                    'audio_latency': '128',
                    'audio_out_rate': '44100',
                    'audio_resampler': 'sinc',
                    'audio_resampler_quality': '1',
                    'video_vsync': 'true',
                    'video_crop_overscan': 'true',
                    'video_scale_integer': 'false',
                    'video_aspect_ratio_auto': 'false',
                    'aspect_ratio_index': '0',
                    'video_smooth': this.textureSmoothing ? 'true' : 'false'
                },
                retroarchCoreConfig: {
                    'pcsx_rearmed_show_bios_bootlogo': 'enabled',
                    'pcsx_rearmed_dithering': 'disabled',
                    'pcsx_rearmed_neon_enhancement_enable': 'disabled',
                    'pcsx_rearmed_neon_enhancement_no_main': 'disabled',
                    'pcsx_rearmed_spu_interpolation': 'simple',
                    'pcsx_rearmed_spu_reverb': 'enabled',
                    'pcsx_rearmed_frameskip': '0',
                    'pcsx_rearmed_frameskip_threshold': '0',
                    'pcsx_rearmed_async_cd': 'sync',
                    'pcsx_rearmed_cd_access_time': 'fast',
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

    public async loadState(customBuffer?: ArrayBuffer | Uint8Array | Buffer | null): Promise<boolean> {
        if (!this.nostalgistInstance) return false;
        const targetBuffer = customBuffer || this.savedStateBuffer;
        if (!targetBuffer) return false;
        try {
            const raw = (targetBuffer instanceof Uint8Array)
                ? targetBuffer
                : ((targetBuffer instanceof ArrayBuffer) ? new Uint8Array(targetBuffer) : new Uint8Array((targetBuffer as any).buffer || targetBuffer));
            const blob = new Blob([raw]);
            await this.nostalgistInstance.loadState(blob);
            return true;
        } catch (e) {
            console.error("PSX loadState failed:", e);
            return false;
        }
    }

        public setTextureSmoothing(enabled: boolean): void {
        this.textureSmoothing = enabled;
        if (this.canvasTexture) {
            this.canvasTexture.minFilter = enabled ? THREE.LinearFilter : THREE.NearestFilter;
            this.canvasTexture.magFilter = enabled ? THREE.LinearFilter : THREE.NearestFilter;
            this.canvasTexture.needsUpdate = true;
        }
    }

    public setSpeed(multiplier: number): void {
        this.speedMultiplier = multiplier;
        if (this.nostalgistInstance) {
            try {
                if (typeof this.nostalgistInstance.setSpeed === 'function') {
                    this.nostalgistInstance.setSpeed(multiplier);
                } else if (typeof this.nostalgistInstance.sendCommand === 'function') {
                    if (multiplier < 1.0) {
                        this.nostalgistInstance.sendCommand('SLOWMOTION');
                    } else if (multiplier > 1.0) {
                        this.nostalgistInstance.sendCommand('FAST_FORWARD');
                    }
                }
            } catch { /* ignore */ }
        }
    }

    public setCheats(cheats: string[]): void {
        this.activeCheats = cheats;
        this.applyCheats();
    }

        public applyCheats(): void {
        if (!this.nostalgistInstance || !this.activeCheats || this.activeCheats.length === 0) return;
        try {
            const module = this.nostalgistInstance.Module;
            if (!module || !module.HEAPU8) return;
            const heapU8: Uint8Array = module.HEAPU8;

            // Resolve Libretro PS1 Main System RAM buffer pointer (RETRO_MEMORY_SYSTEM_RAM = 2)
            let ramPtr = 0;
            if (typeof module._retro_get_memory_data === 'function') {
                ramPtr = module._retro_get_memory_data(2);
                if (!ramPtr) ramPtr = module._retro_get_memory_data(0);
            }
            if (!ramPtr && typeof module.ccall === 'function') {
                try { ramPtr = module.ccall('retro_get_memory_data', 'number', ['number'], [2]); } catch {}
            }

            for (const rawCode of this.activeCheats) {
                const clean = rawCode.trim().replace(/\s+/g, ' ').toUpperCase();
                const parts = clean.split(' ');
                if (parts.length === 2) {
                    const rawAddr = parseInt(parts[0], 16);
                    const val = parseInt(parts[1], 16);
                    if (isNaN(rawAddr) || isNaN(val)) continue;

                    const ramOffset = rawAddr & 0x001FFFFF;
                    const codeType = (rawAddr >>> 24) & 0xFF;
                    const targetAddr = ramPtr > 0 ? (ramPtr + ramOffset) : ramOffset;

                    if (codeType === 0x80) {
                        if (targetAddr + 1 < heapU8.length) {
                            heapU8[targetAddr] = val & 0xFF;
                            heapU8[targetAddr + 1] = (val >>> 8) & 0xFF;
                        }
                    } else if (codeType === 0x30) {
                        if (targetAddr < heapU8.length) {
                            heapU8[targetAddr] = val & 0xFF;
                        }
                    }
                }
            }
        } catch { /* ignore */ }
    }

    public update() {
        if (!this.isDestroyed && this.canvasTexture) {
            if (this.activeCheats.length > 0) {
                this.applyCheats();
            }
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
        
        // Accurate Libretro RetroPad mapping:
        // 0: Cross (✕) -> Libretro B (KeyZ)
        // 1: Square (□) -> Libretro Y (KeyA)
        // 8: Circle (○) -> Libretro A (KeyX)
        // 9: Triangle (△) -> Libretro X (KeyS)
        // 10: L1 -> Libretro L1 (KeyQ)
        // 11: L2 -> Libretro L2 (Digit1)
        // 12: R1 -> Libretro R1 (KeyW)
        // 13: R2 -> Libretro R2 (Digit2)
        // 2: Select -> Libretro Select (ShiftRight)
        // 3: Start -> Libretro Start (Enter)
        // 4, 5, 6, 7: D-Pad Up, Down, Left, Right
        const keyMap: Record<number, { code: string; key: string; keyCode: number }> = {
            0: { code: 'KeyZ', key: 'z', keyCode: 90 },
            1: { code: 'KeyA', key: 'a', keyCode: 65 },
            8: { code: 'KeyX', key: 'x', keyCode: 88 },
            9: { code: 'KeyS', key: 's', keyCode: 83 },
            10: { code: 'KeyQ', key: 'q', keyCode: 81 },
            11: { code: 'Digit1', key: '1', keyCode: 49 },
            12: { code: 'KeyW', key: 'w', keyCode: 87 },
            13: { code: 'Digit2', key: '2', keyCode: 50 },
            2: { code: 'ShiftRight', key: 'Shift', keyCode: 16 },
            3: { code: 'Enter', key: 'Enter', keyCode: 13 },
            4: { code: 'ArrowUp', key: 'ArrowUp', keyCode: 38 },
            5: { code: 'ArrowDown', key: 'ArrowDown', keyCode: 40 },
            6: { code: 'ArrowLeft', key: 'ArrowLeft', keyCode: 37 },
            7: { code: 'ArrowRight', key: 'ArrowRight', keyCode: 39 },
        };
        const mapping = keyMap[buttonNum];
        if (!mapping) return;

        // Dispatch synthetic KeyboardEvent to document so Emscripten natively catches it
        const event = new KeyboardEvent(isDown ? 'keydown' : 'keyup', {
            code: mapping.code,
            key: mapping.key,
            which: mapping.keyCode,
            keyCode: mapping.keyCode,
            bubbles: true,
            cancelable: true
        } as any);
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
            } catch { /* ignore */ }
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
