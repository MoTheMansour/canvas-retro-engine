import { Plugin, ItemView, Notice, setIcon, requestUrl } from 'obsidian';
// @ts-ignore
import { NES } from 'jsnes';
import { PsxEngine } from './psx-engine';
import * as fs from 'fs';
import * as path from 'path';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import lottie from 'lottie-web';

const logoAnimationData = {"v":"5.8.1","fr":60,"ip":0,"op":240,"w":1500,"h":1500,"nm":"logo flap LOOPED CLOCK WIDGET","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"dot 3","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[750,750,0],"ix":2,"l":2},"a":{"a":0,"k":[600.5,355,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,26.51],[26.51,0],[0,-26.51],[-26.51,0]],"o":[[0,-26.51],[-26.51,0],[0,26.51],[26.51,0]],"v":[[48,0],[0,-48],[-48,0],[0,48]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.933333333333,0.933333333333,0.933333333333,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[1152,752],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":120,"op":180,"st":-52,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"dot","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[750,750,0],"ix":2,"l":2},"a":{"a":0,"k":[600.5,355,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,26.51],[26.51,0],[0,-26.51],[-26.51,0]],"o":[[0,-26.51],[-26.51,0],[0,26.51],[26.51,0]],"v":[[48,0],[0,-48],[-48,0],[0,48]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.933333333333,0.933333333333,0.933333333333,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[1152,752],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":60,"st":-52,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"logo docked","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[750,750,0],"ix":2,"l":2},"a":{"a":0,"k":[600.5,355,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,-92.001]],"o":[[0,0],[0,0],[0,0],[0,0],[-100.231,57.304],[0,0]],"v":[[552,228],[552,-228],[0.001,76],[0.001,-228],[-407.999,-3.304],[-552,228.001]],"c":false}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":6,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,-92.001]],"o":[[0,0],[0,0],[0,0],[0,0],[-100.231,57.304],[0,0]],"v":[[522.5,136.5],[370,-127],[0.001,76],[0.001,-228],[-407.999,-3.304],[-552,228.001]],"c":false}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":9,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,-92.001]],"o":[[0,0],[0,0],[0,0],[0,0],[-100.231,57.304],[0,0]],"v":[[545.25,180.25],[461,-177.5],[0.001,76],[-58.499,-194.75],[-407.999,-3.304],[-552,228.001]],"c":false}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":12,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,-92.001]],"o":[[0,0],[0,0],[0,0],[0,0],[-100.231,57.304],[0,0]],"v":[[552,228],[552,-228],[0.001,76],[-116.999,-161.5],[-407.999,-3.304],[-552,228.001]],"c":false}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":15,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,-92.001]],"o":[[0,0],[0,0],[0,0],[0,0],[-100.231,57.304],[0,0]],"v":[[545.25,180.25],[461,-177.5],[0.001,76],[-58.499,-194.75],[-407.999,-3.304],[-552,228.001]],"c":false}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":18,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,-92.001]],"o":[[0,0],[0,0],[0,0],[0,0],[-100.231,57.304],[0,0]],"v":[[522.5,136.5],[370,-127],[0.001,76],[0.001,-228],[-407.999,-3.304],[-552,228.001]],"c":false}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":21,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,-92.001]],"o":[[0,0],[0,0],[0,0],[0,0],[-100.231,57.304],[0,0]],"v":[[545.25,180.25],[461,-177.5],[0.001,76],[-58.499,-194.75],[-407.999,-3.304],[-552,228.001]],"c":false}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":24,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,-92.001]],"o":[[0,0],[0,0],[0,0],[0,0],[-100.231,57.304],[0,0]],"v":[[552,228],[552,-228],[0.001,76],[-116.999,-161.5],[-407.999,-3.304],[-552,228.001]],"c":false}]},{"t":30,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,-92.001]],"o":[[0,0],[0,0],[0,0],[0,0],[-100.231,57.304],[0,0]],"v":[[552,228],[552,-228],[0.001,76],[0.001,-228],[-407.999,-3.304],[-552,228.001]],"c":false}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.933333333333,0.933333333333,0.933333333333,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":96,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[600.23,276],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-68.053,0],[0,0],[0,-83.947],[68.053,0],[0,0],[0,68.053]],"o":[[0,0],[83.947,0],[0,83.947],[0,0],[-83.947,0],[0,-83.947]],"v":[[-400,-152],[400,-152],[552,0],[400,152],[-400,152],[-552,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.933333333333,0.933333333333,0.933333333333,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":96,"ix":5},"lc":1,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[600.23,504],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":240,"st":-61,"bm":0}],"markers":[]};

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

function createSvg<K extends keyof SVGElementTagNameMap>(
    tag: K,
    o?: any
): SVGElementTagNameMap[K] {
    const doc = typeof document !== 'undefined' ? document : (typeof window !== 'undefined' ? window.document : null);
    const createNsFn = doc ? (doc as any)['createElementNS'].bind(doc) : null;
    const el = createNsFn ? createNsFn('http://www.w3.org/2000/svg', tag) : ({} as any);
    if (typeof o === 'string') {
        el.setAttribute('class', o);
    } else if (o) {
        if (o.cls) el.setAttribute('class', Array.isArray(o.cls) ? o.cls.join(' ') : o.cls);
        if (o.attr) {
            for (const [k, v] of Object.entries(o.attr)) {
                if (v !== undefined && v !== null) el.setAttribute(k, String(v));
            }
        }
    }
    return el;
}

export function setCssStyles(el: HTMLElement | SVGElement | any, styles: Record<string, string | number | undefined | null>): void {
    if (!el || !styles) return;
    if (typeof (el as any).setCssStyles === 'function') {
        try {
            (el as any).setCssStyles(styles);
            return;
        } catch { /* ignore */ }
    }
    if (el.style) {
        for (const [key, value] of Object.entries(styles)) {
            if (value !== undefined && value !== null) {
                try {
                    (el.style as any)[key] = String(value);
                } catch { /* ignore */ }
            }
        }
    }
}

export function getPluginDir(plugin: { app: any; manifest: any }): string {
    try {
        const adapter = plugin.app?.vault?.adapter as any;
        const basePath = (adapter && typeof adapter.getBasePath === 'function')
            ? adapter.getBasePath()
            : (adapter && adapter.basePath ? adapter.basePath : '');

        if (plugin.manifest && plugin.manifest.dir) {
            return path.isAbsolute(plugin.manifest.dir)
                ? plugin.manifest.dir
                : path.join(basePath, plugin.manifest.dir);
        }

        const configDir = plugin.app?.vault?.configDir;
        const pluginId = plugin.manifest?.id || 'canvas-retro-engine';
        return basePath ? path.join(basePath, configDir, 'plugins', pluginId) : path.join(configDir, 'plugins', pluginId);
    } catch (e) {
        return '';
    }
}


// --- THREE.JS WEBGL 3D NES CARTRIDGE PROCEDURAL ENGINE ---
function createNesCartridgeSpineTexture(romName: string): THREE.CanvasTexture {
    const W = 512, H = 80;
    const canvas = createEl('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    // 1. Deep Matte Black End-Label Casing
    ctx.fillStyle = '#0a0a0d';
    ctx.fillRect(0, 0, W, H);

    // Subtle edge framing
    ctx.strokeStyle = '#22232a';
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, W - 8, H - 8);

    // 2. Red Tag / Tack on the left with Crisp White Outline
    const tagX = 22;
    const tagY = 18;
    const tagW = 64;
    const tagH = 44;
    const tagR = 5; // Rounded corners

    ctx.save();
    // Shadow for the tack
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;

    // Red tack background
    const tagGrad = ctx.createLinearGradient(tagX, tagY, tagX, tagY + tagH);
    tagGrad.addColorStop(0, '#e60012');
    tagGrad.addColorStop(1, '#b0000d');
    ctx.fillStyle = tagGrad;

    ctx.beginPath();
    ctx.roundRect(tagX, tagY, tagW, tagH, tagR);
    ctx.fill();

    // White outline for the tack
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // "NES" badge text inside tack
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 16px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('NES', tagX + tagW / 2, tagY + tagH / 2);
    ctx.restore();

    // 3. Dynamic Crisp White Game Title
    const titleText = romName.toUpperCase();
    const textStartX = tagX + tagW + 16;
    const availableWidth = W - textStartX - 24;
    
    let fontSize = 28;
    ctx.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`;
    while (ctx.measureText(titleText).width > availableWidth && fontSize > 11) {
        fontSize -= 1;
        ctx.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`;
    }

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillText(titleText, textStartX, H / 2);
    ctx.shadowColor = 'transparent';

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    return texture;
}

function createNesCartridgeTexture(romName: string, coverPath: string | null): THREE.CanvasTexture {
    const W = 512, H = 768;
    const canvas = createEl('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    // 1. Cover Art (Fills 100% of the front label area edge-to-edge with no bottom strip)
    if (coverPath) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = coverPath;
        img.onload = () => {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, W, H);
            texture.needsUpdate = true;
        };
    } else {
        ctx.fillStyle = '#14151a';
        ctx.fillRect(0, 0, W, H);

        // Retro diagonal accent stripes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        for (let r = 0; r < 24; r++) {
            ctx.fillRect(0, r * 32, W, 14);
        }

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.font = '900 48px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🎮', W / 2, H / 2 - 16);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(romName.toUpperCase(), W / 2, H / 2 + 36);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    return texture;
}

interface NesCartridgeGeometries {
    body: THREE.BufferGeometry;
    label: THREE.BufferGeometry;
    spine: THREE.BufferGeometry;
}

let cachedNesCartridgeGeometries: NesCartridgeGeometries | null = null;

function loadNesCartridgeGeometriesSync(plugin?: TetrisCanvasPlugin): NesCartridgeGeometries | null {
    if (cachedNesCartridgeGeometries) return cachedNesCartridgeGeometries;
    try {
        const candidates: string[] = [];
        if (plugin) {
            const pluginDir = getPluginDir(plugin);
            if (pluginDir) candidates.push(path.join(pluginDir, 'assets', 'nes', 'nes_cartridge.glb'));
            const configDir = plugin.app?.vault?.configDir;
            const adapter = plugin.app?.vault?.adapter as any;
            const basePath = adapter?.getBasePath?.() || adapter?.basePath || '';
            if (basePath && configDir) {
                candidates.push(path.join(basePath, configDir, 'plugins', 'canvas-retro-engine', 'assets', 'nes', 'nes_cartridge.glb'));
                candidates.push(path.join(basePath, configDir, 'plugins', 'canvas-nes-emulator', 'assets', 'nes', 'nes_cartridge.glb'));
            }
        }

        let gltfPath = '';
        for (const c of candidates) {
            if (fs.existsSync(c)) {
                gltfPath = c;
                break;
            }
        }

        if (gltfPath && fs.existsSync(gltfPath)) {
            const buf = fs.readFileSync(gltfPath);
            const dataView = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
            const chunk0Len = dataView.getUint32(12, true);
            const jsonText = new TextDecoder().decode(new Uint8Array(buf.buffer, buf.byteOffset + 20, chunk0Len));
            const gltf = JSON.parse(jsonText);
            
            const binOffset = 20 + chunk0Len + 8;
            const binBuf = buf.buffer.slice(buf.byteOffset + binOffset);

            const parsePrimitive = (posIdx: number, normIdx: number, uvIdx: number, idxAccIdx: number) => {
                const posAcc = gltf.accessors[posIdx];
                const normAcc = gltf.accessors[normIdx];
                const uvAcc = gltf.accessors[uvIdx];
                const idxAcc = gltf.accessors[idxAccIdx];

                const posBv = gltf.bufferViews[posAcc.bufferView];
                const normBv = gltf.bufferViews[normAcc.bufferView];
                const uvBv = gltf.bufferViews[uvAcc.bufferView];
                const idxBv = gltf.bufferViews[idxAcc.bufferView];

                const positions = new Float32Array(binBuf, posBv.byteOffset + (posAcc.byteOffset || 0), posAcc.count * 3);
                const normals = new Float32Array(binBuf, normBv.byteOffset + (normAcc.byteOffset || 0), normAcc.count * 3);
                const uvs = new Float32Array(binBuf, uvBv.byteOffset + (uvAcc.byteOffset || 0), uvAcc.count * 2);
                
                const isUint16 = idxAcc.componentType === 5123;
                const indices = isUint16 
                    ? new Uint16Array(binBuf, idxBv.byteOffset + (idxAcc.byteOffset || 0), idxAcc.count)
                    : new Uint32Array(binBuf, idxBv.byteOffset + (idxAcc.byteOffset || 0), idxAcc.count);

                const geo = new THREE.BufferGeometry();
                geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
                geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
                geo.setIndex(new THREE.BufferAttribute(indices, 1));
                geo.computeBoundingBox();
                geo.computeBoundingSphere();
                return geo;
            };

            cachedNesCartridgeGeometries = {
                body: parsePrimitive(0, 1, 2, 3),
                label: parsePrimitive(4, 5, 6, 7),
                spine: parsePrimitive(8, 9, 10, 11)
            };
            return cachedNesCartridgeGeometries;
        }
    } catch (e) {
        console.warn("Could not synchronously parse nes_cartridge.glb:", e);
    }
    return cachedNesCartridgeGeometries;
}

function createNesCartridge3DMesh(romName: string, coverPath: string | null, plugin?: TetrisCanvasPlugin): THREE.Group {
    const group = new THREE.Group();

    const spineMat = new THREE.MeshPhysicalMaterial({
        map: createNesCartridgeSpineTexture(romName),
        roughness: 0.15,
        metalness: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 0.9,
        side: THREE.DoubleSide
    });

    // Authentic High-Gloss Coated Printed Decal Material
    const frontLabelMat = new THREE.MeshPhysicalMaterial({
        map: createNesCartridgeTexture(romName, coverPath),
        roughness: 0.15,
        metalness: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 0.9,
        side: THREE.DoubleSide
    });

    const grayMat = new THREE.MeshStandardMaterial({
        color: 0x6e7078,
        roughness: 0.40,
        metalness: 0.03
    });

    const geos = loadNesCartridgeGeometriesSync(plugin);
    if (geos) {
        // 1. Authentic CAD Cartridge Body
        const bodyMesh = new THREE.Mesh(geos.body, grayMat);
        bodyMesh.castShadow = true;
        bodyMesh.receiveShadow = true;
        group.add(bodyMesh);

        // 2. Front Label Face with customizable 4-way dimensions (X0, X1, Y0, Y1, Z)
        const x0 = plugin?.settings?.masterState?.nesLabelX0 ?? -0.10;
        const x1 = plugin?.settings?.masterState?.nesLabelX1 ?? 0.92;
        const y0 = plugin?.settings?.masterState?.nesLabelY0 ?? -0.28;
        const y1 = plugin?.settings?.masterState?.nesLabelY1 ?? 1.24;
        const z = plugin?.settings?.masterState?.nesLabelZ ?? 0.1625;

        const labelGeo = geos.label.clone();
        const posAttr = labelGeo.getAttribute('position') as THREE.BufferAttribute;
        const posArray = (posAttr.array as Float32Array).slice();

        // Vert 0: bottom-left
        posArray[0] = x0; posArray[1] = y0; posArray[2] = z;
        // Vert 1: bottom-right
        posArray[3] = x1; posArray[4] = y0; posArray[5] = z;
        // Vert 2: top-right
        posArray[6] = x1; posArray[7] = y1; posArray[8] = z;
        // Vert 3: top-left
        posArray[9] = x0; posArray[10] = y1; posArray[11] = z;

        labelGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        labelGeo.computeVertexNormals();
        labelGeo.computeBoundingBox();

        const labelMesh = new THREE.Mesh(labelGeo, frontLabelMat);
        labelMesh.name = "nesFrontLabelMesh";
        labelMesh.castShadow = true;
        labelMesh.receiveShadow = true;
        group.add(labelMesh);

        // 3. Top Spine End Label Face with customizable 4-way dimensions (SX0, SX1, SZ0, SZ1, SY)
        const sx0 = plugin?.settings?.masterState?.nesSpineX0 ?? -0.10;
        const sx1 = plugin?.settings?.masterState?.nesSpineX1 ?? 0.92;
        const sz0 = plugin?.settings?.masterState?.nesSpineZ0 ?? -0.15;
        const sz1 = plugin?.settings?.masterState?.nesSpineZ1 ?? 0.15;
        const sy = plugin?.settings?.masterState?.nesSpineY ?? 1.2405;

        const spineGeo = geos.spine.clone();
        const spinePosAttr = spineGeo.getAttribute('position') as THREE.BufferAttribute;
        const spinePosArr = (spinePosAttr.array as Float32Array).slice();

        // Vert 0: front-left
        spinePosArr[0] = sx0; spinePosArr[1] = sy; spinePosArr[2] = sz1;
        // Vert 1: front-right
        spinePosArr[3] = sx1; spinePosArr[4] = sy; spinePosArr[5] = sz1;
        // Vert 2: back-right
        spinePosArr[6] = sx1; spinePosArr[7] = sy; spinePosArr[8] = sz0;
        // Vert 3: back-left
        spinePosArr[9] = sx0; spinePosArr[10] = sy; spinePosArr[11] = sz0;

        spineGeo.setAttribute('position', new THREE.BufferAttribute(spinePosArr, 3));
        spineGeo.computeVertexNormals();
        spineGeo.computeBoundingBox();

        const spineMesh = new THREE.Mesh(spineGeo, spineMat);
        spineMesh.name = "nesTopSpineMesh";
        spineMesh.castShadow = true;
        spineMesh.receiveShadow = true;
        group.add(spineMesh);
    }

    group.scale.set(0.85, 0.85, 0.85);
    return group;
}

function createPsxJewelCaseSpineTexture(romName: string): THREE.CanvasTexture {
    const W = 512, H = 60;
    const canvas = createEl('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    // Polystyrene acrylic edge shine
    ctx.fillStyle = '#08080c';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(romName.toUpperCase(), W / 2, H / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    return texture;
}

function createPsxJewelCaseTexture(romName: string, coverPath: string | null): THREE.CanvasTexture {
    const W = 500, H = 500;
    const canvas = createEl('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;

    if (coverPath) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = coverPath;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, W, H);
            texture.needsUpdate = true;
        };
    } else {
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(romName, W / 2, H / 2);
    }

    return texture;
}

function createNesConsoleDoorTexture(): THREE.CanvasTexture {
    const W = 1024, H = 256;
    const canvas = createEl('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    // Official NES Light Gray Casing Color (#d0d2d6)
    ctx.fillStyle = '#d0d2d6';
    ctx.fillRect(0, 0, W, H);

    // Bottom lip subtle bevel shadow line
    ctx.fillStyle = '#b8bac0';
    ctx.fillRect(0, H - 12, W, 12);
    ctx.fillStyle = '#a2a4aa';
    ctx.fillRect(0, H - 4, W, 4);

    // Nintendo Logo (Red #e60012)
    ctx.fillStyle = '#e60012';
    ctx.font = 'bold 58px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Nintendo', 72, 44);

    // ENTERTAINMENT SYSTEM (Red #e60012)
    ctx.font = 'bold 28px Arial, sans-serif';
    ctx.fillText('ENTERTAINMENT SYSTEM™', 72, 118);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    return texture;
}

function createNesConsoleButtonTexture(label: string): THREE.CanvasTexture {
    const W = 256, H = 128;
    const canvas = createEl('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    // NES Button Gray (#9ca0a6)
    ctx.fillStyle = '#9ca0a6';
    ctx.fillRect(0, 0, W, H);

    // Border bevel highlight/shadow
    ctx.fillStyle = '#b8bac0';
    ctx.fillRect(0, 0, W, 6);
    ctx.fillStyle = '#72747a';
    ctx.fillRect(0, H - 6, W, 6);

    // Label Text (Dark Gray #323438)
    ctx.fillStyle = '#323438';
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, W / 2, H / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

function createPsxCdLabelTexture(romName: string, coverPath: string | null): THREE.CanvasTexture {
    const S = 512;
    const canvas = createEl('canvas');
    canvas.width = S;
    canvas.height = S;
    const ctx = canvas.getContext('2d')!;

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;

    if (coverPath) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = coverPath;
        img.onload = () => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(S/2, S/2, S/2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(img, 0, 0, S, S);
            ctx.restore();

            // Clear Center Hole Cutout
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(S/2, S/2, S * 0.14, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';

            // Inner Silver Ring
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(S/2, S/2, S * 0.16, 0, Math.PI * 2);
            ctx.stroke();

            texture.needsUpdate = true;
        };
    } else {
        const bgGrad = ctx.createRadialGradient(S/2, S/2, S*0.1, S/2, S/2, S*0.5);
        bgGrad.addColorStop(0, '#e6e8eb');
        bgGrad.addColorStop(0.5, '#c5cbcf');
        bgGrad.addColorStop(1, '#9da3a8');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, S, S);

        ctx.fillStyle = '#111';
        ctx.font = 'bold 28px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(romName.toUpperCase(), S/2, S/2 - 40);

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(S/2, S/2, S * 0.14, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
    }

    return texture;
}

function createPsxCdDiscMesh(romName: string, coverPath: string | null): THREE.Group {
    const cdGroup = new THREE.Group();

    // 3D Disc geometry (Cylinder disc)
    const cdGeo = new THREE.CylinderGeometry(0.76, 0.76, 0.015, 32);
    
    // Bottom surface: Authentic PS1 signature Dark Black/Purple disc bottom
    const bottomMat = new THREE.MeshStandardMaterial({
        color: 0x12081c,
        metalness: 0.85,
        roughness: 0.15
    });

    // Top surface: Game cover art printed on metallic CD label
    const topMat = new THREE.MeshStandardMaterial({
        map: createPsxCdLabelTexture(romName, coverPath),
        metalness: 0.4,
        roughness: 0.3
    });

    const cdMesh = new THREE.Mesh(cdGeo, [bottomMat, topMat, bottomMat]);
    cdMesh.rotation.x = Math.PI / 2;
    cdGroup.add(cdMesh);

    // Center spindle ring hole cutout visual
    const holeGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.005, 16);
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x050508 });
    const holeMesh = new THREE.Mesh(holeGeo, holeMat);
    holeMesh.rotation.x = Math.PI / 2;
    cdGroup.add(holeMesh);

    return cdGroup;
}

function createPsxJewelCase3DMesh(romName: string, coverPath: string | null): THREE.Group {
    const group = new THREE.Group();
    
    // Official CD jewel case dimensions (1.95 wide x 2.15 tall x 0.15 deep)
    const W = 1.95, H = 2.15, D = 0.15;

    // Pristine crystal acrylic glass plastic material (original specular sheen & light response)
    const plasticMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.05,
        roughness: 0.05,
        transmission: 0.98,
        thickness: 0.05,
        transparent: true,
        opacity: 0.15,
        depthWrite: false
    });

    const spineMat = new THREE.MeshStandardMaterial({
        map: createPsxJewelCaseSpineTexture(romName),
        roughness: 0.5, metalness: 0.1
    });

    const coverMat = new THREE.MeshStandardMaterial({
        map: createPsxJewelCaseTexture(romName, coverPath),
        roughness: 0.35, metalness: 0.1
    });
    
    const trayMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });

    // Front clear lid + cover art hinged group (opens at left spine)
    const lidHinge = new THREE.Group();
    lidHinge.position.set(-W/2, 0, D/2); // Left edge pivot

    const lidGeo = new THREE.BoxGeometry(W, H, 0.018);
    const lidMesh = new THREE.Mesh(lidGeo, plasticMat);
    lidMesh.position.set(W/2, 0, -0.009);
    lidMesh.castShadow = true;
    lidHinge.add(lidMesh);

    // Cover art paper (recessed inside lid)
    const artGeo = new THREE.BoxGeometry(W - 0.08, H - 0.08, 0.008);
    const artMesh = new THREE.Mesh(artGeo, coverMat);
    artMesh.position.set(W/2 + 0.02, 0, -0.005);
    lidHinge.add(artMesh);

    group.add(lidHinge);
    group.userData.jewelLidHinge = lidHinge;

    // Inner black tray liner (recessed back cavity)
    const trayGeo = new THREE.BoxGeometry(W - 0.04, H - 0.04, 0.04);
    const trayMesh = new THREE.Mesh(trayGeo, trayMat);
    trayMesh.position.set(0.005, 0, -0.025);
    trayMesh.castShadow = true;
    trayMesh.receiveShadow = true;
    group.add(trayMesh);

    // Center rosette hub ring
    const hubGeo = new THREE.CylinderGeometry(0.20, 0.20, 0.012, 24);
    const hubMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1f, roughness: 0.7 });
    const hubMesh = new THREE.Mesh(hubGeo, hubMat);
    hubMesh.rotation.x = Math.PI / 2;
    hubMesh.position.set(0, 0, -0.002);
    group.add(hubMesh);

    // 3D PlayStation CD Disc inside tray (sits proud on rosette spindle hub, fully visible when lid opens!)
    const cdDisc = createPsxCdDiscMesh(romName, coverPath);
    cdDisc.position.set(0, 0, 0.012);
    group.add(cdDisc);
    group.userData.cdDiscMesh = cdDisc;

    // Back clear casing
    const backGeo = new THREE.BoxGeometry(W, H, 0.022);
    const backMesh = new THREE.Mesh(backGeo, plasticMat);
    backMesh.position.set(0, 0, -D/2 + 0.011);
    backMesh.castShadow = true;
    group.add(backMesh);

    // Spine (left edge offset by 0.003 to eliminate face collision)
    const spineGeo = new THREE.BoxGeometry(0.012, H - 0.02, D - 0.004);
    const spineMesh = new THREE.Mesh(spineGeo, spineMat);
    spineMesh.position.set(-W/2 - 0.003, 0, 0);
    spineMesh.renderOrder = 1;
    group.add(spineMesh);

    // Rotate to match NES cartridge orientation for Rolodex
    group.rotation.x = Math.PI / 2;
    group.scale.set(1.1, 1.1, 1.1);

    return group;
}

function createSynthwaveRoomTexture(): THREE.CanvasTexture {
    const W = 1024, H = 512;
    const canvas = createEl('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#100b24');
    grad.addColorStop(0.5, '#1e0c38');
    grad.addColorStop(1, '#080412');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H * 0.7); ctx.stroke();
    }
    for (let y = 0; y < H * 0.7; y += 24) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    const spot = ctx.createRadialGradient(W / 2, H * 0.35, 10, W / 2, H * 0.35, W * 0.45);
    spot.addColorStop(0, 'rgba(255, 0, 128, 0.25)');
    spot.addColorStop(0.6, 'rgba(0, 240, 255, 0.1)');
    spot.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = spot;
    ctx.fillRect(0, 0, W, H);

    return new THREE.CanvasTexture(canvas);
}

function createMidnightRoomTexture(): THREE.CanvasTexture {
    const W = 1024, H = 512;
    const canvas = createEl('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#1a1d28');
    grad.addColorStop(0.4, '#131520');
    grad.addColorStop(0.75, '#1a1d2b');
    grad.addColorStop(1, '#0a0b12');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    for (let x = 0; x < W; x += 28) {
        ctx.fillRect(x, 0, 14, H * 0.68);
    }

    const spot = ctx.createRadialGradient(W / 2, H * 0.35, 10, W / 2, H * 0.35, W * 0.4);
    spot.addColorStop(0, 'rgba(220, 235, 255, 0.16)');
    spot.addColorStop(0.6, 'rgba(100, 140, 220, 0.05)');
    spot.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = spot;
    ctx.fillRect(0, 0, W, H);

    return new THREE.CanvasTexture(canvas);
}

function create3D80sRoomTexture(): THREE.CanvasTexture {
    const W = 1024, H = 512;
    const canvas = createEl('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    const roomGrad = ctx.createLinearGradient(0, 0, 0, H);
    roomGrad.addColorStop(0, '#3d2518');
    roomGrad.addColorStop(0.35, '#28170e');
    roomGrad.addColorStop(0.70, '#361e12');
    roomGrad.addColorStop(1, '#160a05');
    ctx.fillStyle = roomGrad;
    ctx.fillRect(0, 0, W, H);

    for (let x = 0; x < W; x += 28) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fillRect(x, 0, 3, H * 0.72);
        ctx.fillStyle = 'rgba(255, 180, 100, 0.04)';
        ctx.fillRect(x + 3, 0, 2, H * 0.72);
    }

    const lampGrad = ctx.createRadialGradient(W * 0.35, H * 0.30, 20, W * 0.35, H * 0.30, W * 0.45);
    lampGrad.addColorStop(0, 'rgba(255, 170, 70, 0.28)');
    lampGrad.addColorStop(0.4, 'rgba(220, 110, 40, 0.12)');
    lampGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = lampGrad;
    ctx.fillRect(0, 0, W, H);

    return new THREE.CanvasTexture(canvas);
}

function createMinimalRoomTexture(): THREE.CanvasTexture {
    const W = 1024, H = 512;
    const canvas = createEl('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, W * 0.55);
    grad.addColorStop(0, '#1c1e26');
    grad.addColorStop(1, '#090a0f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    return new THREE.CanvasTexture(canvas);
}

export interface SfxSampleConfig {
    enabled?: boolean;
    sampleFile?: string;
    volume?: number;      // 0.0 - 2.0
    startTime?: number;   // In seconds
    endTime?: number;     // In seconds (0 = full buffer duration)
    pitchShift?: number;
}

interface CanvasNesPluginSettings {
    hudPosition: { left: number; top: number } | null;
    selectedRoomEnvironment: string;
    masterState: Record<string, any>;
    activeSystem: 'nes' | 'psx';
    sfxConfigs?: Record<string, SfxSampleConfig>;
}

const DEFAULT_SETTINGS: CanvasNesPluginSettings = {
    hudPosition: {
        left: 48,
        top: -8
    },
    selectedRoomEnvironment: 'midnight',
    activeSystem: 'psx',
    masterState: {
        ps1PosX: 0,
        ps1PosY: 1.45,
        ps1PosZ: -0.3,
        ps1RotX: 1.66,
        ps1RotY: -3.14,
        ps1RotZ: -3.14,
        ps1Scale: 0.2,
        camX: 0,
        camY: 4.4,
        camZ: 7.15,
        camFov: 43,
        lookAtY: 0.95,
        lookAtZ: 0.2,
        keyLightEnabled: true,
        key2LightEnabled: true,
        fillLightEnabled: true,
        rimLightEnabled: true,
        hemiLightEnabled: true,
        keyPower: 2.6,
        keyX: -1.7,
        keyY: 2.9,
        keyZ: 1.7,
        keyTargetX: 0,
        keyTargetY: 0.3,
        keyTargetZ: 1.2,
        key2Power: 0.7,
        key2X: 10,
        key2Y: 0,
        key2Z: 8.6,
        key2TargetX: 8,
        key2TargetY: -2,
        key2TargetZ: 4.2,
        key2Color: "warmWhite",
        fillPower: 2.65,
        fillX: 3.8,
        fillY: 7.1,
        fillZ: 8.3,
        fillTargetX: -0.6,
        fillTargetY: 4.1,
        fillTargetZ: -3.6,
        rimPower: 1.05,
        rimX: -1.8,
        rimY: 2.8,
        rimZ: 1.4,
        rimTargetX: -0.8,
        rimTargetY: 2.4,
        rimTargetZ: 5.3,
        rimColor: "warmGold",
        bloomEnabled: true,
        bloomIntensity: 0.15,
        bloomRadius: 1.1,
        bloomThreshold: 0.7,
        halationGlow: 0.95,
        hemiPower: 1.5,
        exposure: 0.75,
        showLightGizmos: false,
        customLights: [
            {
                "id": "custom_1786649105705",
                "name": "Custom DIRECTIONAL #1",
                "type": "directional",
                "enabled": true,
                "color": "#eed07c",
                "power": 1.1,
                "x": 3.2,
                "y": -3.1,
                "z": 2.5,
                "targetX": 0,
                "targetY": 1.4,
                "targetZ": 2.5,
                "distance": 25,
                "decay": 2
            },
            {
                "id": "custom_1786649255707",
                "name": "Custom POINT #2",
                "type": "point",
                "enabled": true,
                "color": "#fd91e5",
                "power": 10,
                "x": -1.1,
                "y": 0.5,
                "z": 1.1,
                "targetX": 0,
                "targetY": 0.3,
                "targetZ": 0,
                "distance": 25,
                "decay": 2
            },
            {
                "id": "custom_1786649831113",
                "name": "Custom DIRECTIONAL #3",
                "type": "directional",
                "enabled": true,
                "color": "#e78cee",
                "power": 0.1,
                "x": 1.8,
                "y": 5.5,
                "z": -9.6,
                "targetX": -2.9,
                "targetY": 1.3,
                "targetZ": 5,
                "distance": 25,
                "decay": 2
            },
            {
                "id": "custom_1786650105151",
                "name": "Custom SPOT #4",
                "type": "spot",
                "enabled": true,
                "color": "#ffffff",
                "power": 10,
                "x": -1.1,
                "y": -0.5,
                "z": 2.9,
                "targetX": 5,
                "targetY": 1,
                "targetZ": 1.2,
                "distance": 25,
                "decay": 2
            },
            {
                "id": "custom_1786650618355",
                "name": "Custom DIRECTIONAL #5",
                "type": "directional",
                "enabled": true,
                "color": "#bfe7eb",
                "power": 3.7,
                "x": -0.3,
                "y": 1.3,
                "z": -1.9,
                "targetX": 0.2,
                "targetY": 1.3,
                "targetZ": 2.5,
                "distance": 25,
                "decay": 2
            }
        ],
        slotX: 0,
        slotY: 0.445,
        slotZ: 0.16,
        slotRotX: 0.2,
        slotRotZ: 0,
        dofEnabled: true,
        dofFocus: 7.25,
        dofAperture: 0.008,
        dofMaxBlur: 0.015,
        ambientPower: 1,
        ambientColor: "#ffffff",
        keyColor: "daylight",
        fillColor: "coolBlue",
        hemiSkyColor: "daylight",
        hemiGroundColor: "warmGold",
        cartScale: 1.1,
        rolodexR: 1.7,
        rolodexCY: -3.2,
        rolodexCZ: 2.5,
        rolodexAngle: 0.38,
        sideRollZ: 0,
        ejectPopZ: 0.86,
        peakY: 2.1,
        peakZ: 0.6,
        snapT: 0.8,
        bioTremorAmp: 0.003,
        bioTremorFreq: 11,
        bioSwayAmp: 0.018,
        bioSwayFreq: 1.8,
        bioGripPitch: 0.05,
        bioGripYaw: 0.04,
        bioGripRoll: 0.06,
        bioWristSnap: 0.12,
        bioLiftArcHeight: 1.15,
        bioInsertResist: 0.06,
        bioPopVelocity: 1.3,
        bioMicroBounces: 3,
        scrubMode: false,
        scrubProgress: 0.5,
        animSpeed: 1,
        nesBayElevation: 1.45,
        nesBayDepth: -0.3,
        nesBayRotX: 1.66,
        nesLabelX0: -0.10,
        nesLabelX1: 0.92,
        nesLabelY0: -0.28,
        nesLabelY1: 1.24,
        nesLabelZ: 0.1625,
        nesSpineX0: -0.10,
        nesSpineX1: 0.92,
        nesSpineZ0: -0.15,
        nesSpineZ1: 0.15,
        nesSpineY: 1.2405,
        curtainPearlIntensity: 0.85,
        curtainPearlSpread: 2.2,
        curtainPearlPhase: 0.40,
        curtainPearlBrightness: 0.68,
        curtainPearlSaturation: 0.42,
        curtainPearlFresnelPower: 2.5,
        curtainPearlSpecular: 0.90,
        curtainPearlColor: "#ffffff",

        // ── 3D Console Celestial Ether & Particle Waterfall ──
        etherEnabled: true,
        etherMode: "waterfall", // 'waterfall' | 'aurora' | 'nebula' | 'vortex'
        etherParticleCount: 1200,
        etherParticleSize: 0.22,
        etherFlowSpeed: 1.20,
        etherTurbulence: 0.65,
        etherTrailSpread: 2.4,
        etherSpreadX: 2.6,
        etherSpreadZ: 1.8,
        etherDropHeight: 4.5,
        etherCurlSwayX: 0.65,
        etherCurlSwayZ: 0.55,
        etherCurlFreq: 1.6,
        etherCurlSpeed: 1.3,
        etherGravity: 1.0,
        etherHueShiftSpeed: 0.80,
        etherHueCycleFreq: 2.0,
        etherAuroraPosZ: -2.5,
        etherAuroraPosY: 0.4,
        etherAuroraScaleX: 7.5,
        etherOpacity: 0.75,
        etherColor1: "#d8b4fe", // Pastel Lilac
        etherColor2: "#7dd3fc", // Celestial Cyan
        etherColor3: "#f472b6", // Rose Opal
        etherColor4: "#fef08a", // Champagne Gold
        etherHoverEnabled: true,
        etherHoverAmplitude: 0.06,
        etherHoverSpeed: 1.5,
        etherSpinVortexMult: 2.2,
        etherMouseInteraction: true,
        etherMouseForce: 1.2,
        etherTwinkleIntensity: 1.0,
        etherParallaxTilt: true,
        etherParallaxStrength: 0.08,
        etherFloorLightEnabled: true,
        etherFloorLightIntensity: 0.85,
        etherSplashEmbers: true,
        etherSplashRatio: 0.30,
        crtScreenShape: "vintage_bubble" // 'modern' | 'vintage_bubble'
    },
    sfxConfigs: {}
};

export default class CanvasNESEmulatorPlugin extends Plugin {
    private panel: TetrisPanel | null = null;
    settings: CanvasNesPluginSettings = DEFAULT_SETTINGS;

    async onload() {
        
        await this.loadSettings();

        this.app.workspace.onLayoutReady(() => {
            this.initTetrisPanel();
        });

        this.registerEvent(
            this.app.workspace.on("active-leaf-change", () => {
                this.initTetrisPanel();
            })
        );

        this.addCommand({
            id: 'open',
            name: 'Open Canvas NES Emulator',
            callback: () => {
                this.initTetrisPanel(true);
            }
        });
    }

    async loadSettings() {
        const loaded = await this.loadData();
        this.settings = Object.assign({}, DEFAULT_SETTINGS, loaded);
        if (loaded && loaded.masterState) {
            this.settings.masterState = Object.assign({}, DEFAULT_SETTINGS.masterState, loaded.masterState);
        } else {
            this.settings.masterState = Object.assign({}, DEFAULT_SETTINGS.masterState);
        }
        if (loaded && loaded.sfxConfigs) {
            this.settings.sfxConfigs = Object.assign({}, DEFAULT_SETTINGS.sfxConfigs, loaded.sfxConfigs);
        }
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    onunload(): void {
        
        if (this.panel) {
            this.panel.destroy();
        }
    }

    private getActiveCanvasView(): any | null {
        const leaf = this.app.workspace.getActiveViewOfType(ItemView as any);
        if (leaf && leaf.getViewType() === "canvas") {
            return leaf;
        }
        return null;
    }

    public initTetrisPanel(manual = false) {
        const canvasView = this.getActiveCanvasView();
        if (!canvasView) {
            if (manual) new Notice("Please open a Canvas first!");
            if (this.panel) {
                this.panel.destroy();
                this.panel = null;
            }
            return;
        }

        if (this.panel) {
            if (!manual && (this.panel as any).canvasView === canvasView) return;
            this.panel.destroy();
        }

        this.panel = new TetrisPanel(this, canvasView);
    }
}

export const SFX_METADATA: Record<string, { code: string; name: string; system: 'nes' | 'psx'; category: string; description: string; defaultVol: number }> = {
    // NES Sounds
    'nes_scroll_notch_up': { code: 'N01', name: 'Scroll Notch UP', system: 'nes', category: 'Carousel Wheel', description: 'Single notch tick when scrolling forward', defaultVol: 0.85 },
    'nes_scroll_notch_down': { code: 'N02', name: 'Scroll Notch DOWN', system: 'nes', category: 'Carousel Wheel', description: 'Lower-pitch notch clack when scrolling backward', defaultVol: 0.85 },
    'nes_card_hover_enter': { code: 'N03', name: 'Cartridge Hover Enter', system: 'nes', category: 'Carousel Hover', description: 'Subtle slide & lift friction on focus', defaultVol: 0.75 },
    'nes_card_hover_leave': { code: 'N04', name: 'Cartridge Hover Leave', system: 'nes', category: 'Carousel Hover', description: 'Soft settling tap when mouse leaves', defaultVol: 0.70 },
    'nes_scroll_hover_riffle': { code: 'N05', name: 'Card Riffle While Hovered', system: 'nes', category: 'Carousel Wheel', description: 'Rapid index flap when scrolling over cards', defaultVol: 0.45 },
    'nes_card_click_press': { code: 'N06', name: 'Cartridge Click Down', system: 'nes', category: 'Selection', description: 'Tactile press down on cartridge body', defaultVol: 0.85 },
    'nes_card_lift_emerge': { code: 'N07', name: 'Cartridge Lift & Emerge', system: 'nes', category: 'Selection', description: 'Pop release & slide up into 3D space', defaultVol: 0.80 },
    'nes_flight_glide_whoosh': { code: 'N08', name: '3D Flight Glide Whoosh', system: 'nes', category: '3D Loading', description: 'Air swoosh during flight toward console', defaultVol: 0.75 },
    'nes_front_flap_push': { code: 'N09', name: 'Front Door Flap Push', system: 'nes', category: '3D Loading', description: 'Cartridge tip pushing front door open', defaultVol: 0.85 },
    'nes_chamber_rail_slide': { code: 'N10', name: 'Internal Rail Slide', system: 'nes', category: '3D Loading', description: 'Cartridge sliding on aluminum guide rails', defaultVol: 0.80 },
    'nes_connector_72pin_seat': { code: 'N11', name: '72-Pin Connector Seat', system: 'nes', category: '3D Loading', description: 'Edge contacts bottoming into 72-pin leaf socket', defaultVol: 0.90 },
    'nes_zif_chamber_lock_chunk': { code: 'N12', name: 'ZIF Tray Lock Down ("Chunk")', system: 'nes', category: '3D Loading', description: 'Iconic NES tray latching down into play position', defaultVol: 0.95 },
    'nes_power_switch_on': { code: 'N13', name: 'Power Switch Toggle ON', system: 'nes', category: 'Power / Boot', description: 'Heavy mechanical power button press', defaultVol: 0.85 },
    'nes_zif_spring_pop_up': { code: 'N14', name: 'Eject Tray Spring Pop-Up', system: 'nes', category: '3D Eject', description: 'Chamber tray popping up on eject', defaultVol: 0.90 },
    'nes_connector_unseat_pull': { code: 'N15', name: 'Connector Pin Unseat Pull', system: 'nes', category: '3D Eject', description: 'Cartridge pulled out of tight connector pins', defaultVol: 0.85 },
    'nes_flap_snap_shut': { code: 'N16', name: 'Front Flap Snap Shut', system: 'nes', category: '3D Eject', description: 'Door flap snapping closed as cartridge clears', defaultVol: 0.80 },
    'nes_return_slot_reseat': { code: 'N17', name: 'Drawer Return Reseat', system: 'nes', category: '3D Eject', description: 'Cartridge landing back in storage tray', defaultVol: 0.85 },

    // PS1 Sounds
    'psx_scroll_notch_up': { code: 'P01', name: 'Jewel Case Notch UP', system: 'psx', category: 'Carousel Wheel', description: 'Crisp polystyrene acrylic edge click', defaultVol: 0.85 },
    'psx_scroll_notch_down': { code: 'P02', name: 'Jewel Case Notch DOWN', system: 'psx', category: 'Carousel Wheel', description: 'Deeper acrylic case spine clink', defaultVol: 0.85 },
    'psx_case_hover_enter': { code: 'P03', name: 'Jewel Case Hover Enter', system: 'psx', category: 'Carousel Hover', description: 'Glassy acrylic tilt & shimmer friction', defaultVol: 0.75 },
    'psx_case_hover_leave': { code: 'P04', name: 'Jewel Case Hover Leave', system: 'psx', category: 'Carousel Hover', description: 'Soft acrylic settle tap against adjacent cases', defaultVol: 0.70 },
    'psx_scroll_hover_riffle': { code: 'P05', name: 'Case Spine Riffle While Hovered', system: 'psx', category: 'Carousel Wheel', description: 'Rapid acrylic spine flicking under cursor', defaultVol: 0.45 },
    'psx_case_click_press': { code: 'P06', name: 'Jewel Case Click Down', system: 'psx', category: 'Selection', description: 'Fingertip tap on polystyrene cover', defaultVol: 0.85 },
    'psx_case_lift_emerge': { code: 'P07', name: 'Jewel Case Emerge', system: 'psx', category: 'Selection', description: 'Jewel case lifting out of CD rack', defaultVol: 0.80 },
    'psx_case_hinge_creak_open': { code: 'P08', name: 'Jewel Case Hinge Swing Open', system: 'psx', category: '3D Loading', description: 'Case hinge creaking open 180° flat', defaultVol: 0.85 },
    'psx_disc_hub_pop_out': { code: 'P09', name: 'Center Rosette Hub Pop', system: 'psx', category: '3D Loading', description: '3-tooth hub releasing CD center hole', defaultVol: 0.90 },
    'psx_disc_flight_whoosh': { code: 'P10', name: 'Disc 3D Arc Flight', system: 'psx', category: '3D Loading', description: 'Polycarbonate disc flying through air', defaultVol: 0.75 },
    'psx_open_button_plunge': { code: 'P11', name: 'Console OPEN Button Plunge', system: 'psx', category: '3D Loading', description: 'Mechanical push button on PS1 chassis', defaultVol: 0.85 },
    'psx_lid_spring_damper_pop': { code: 'P12', name: 'Round Lid Damper Pop & Whirr', system: 'psx', category: '3D Loading', description: 'Iconic lid springing open with rotary damper', defaultVol: 0.90 },
    'psx_spindle_3ball_snap': { code: 'P13', name: 'Spindle 3-Ball Bearing Snap', system: 'psx', category: '3D Loading', description: '3 steel balls snapping into disc center', defaultVol: 0.95 },
    'psx_lid_push_down_latch': { code: 'P14', name: 'Round Lid Push & Latch', system: 'psx', category: '3D Loading', description: 'Lid pushed closed with solid spring catch', defaultVol: 0.90 },
    'psx_laser_seek_spinup': { code: 'P15', name: 'Optical Seek & Spindle Spin-Up', system: 'psx', category: 'Power / Boot', description: 'High-pitch motor spin-up with laser chirps', defaultVol: 0.85 },
    'psx_eject_button_click': { code: 'P16', name: 'Eject OPEN Button Click', system: 'psx', category: '3D Eject', description: 'OPEN button release click on eject', defaultVol: 0.85 },
    'psx_lid_open_again': { code: 'P17', name: 'Lid Re-Open on Eject', system: 'psx', category: '3D Eject', description: 'Lid springing open for disc retrieval', defaultVol: 0.85 },
    'psx_spindle_ball_unsnap': { code: 'P18', name: 'Spindle Ball Bearing Unsnap', system: 'psx', category: '3D Eject', description: 'Disc lifted off turntable spindle', defaultVol: 0.85 },
    'psx_disc_return_flight': { code: 'P19', name: 'Disc Return Flight', system: 'psx', category: '3D Eject', description: 'Disc flying back to open jewel case', defaultVol: 0.75 },
    'psx_disc_reseat_rosette_snap': { code: 'P20', name: 'Disc Rosette Reseat Snap', system: 'psx', category: '3D Eject', description: 'Disc pressed firmly back into tray rosette', defaultVol: 0.90 },
    'psx_case_clasp_snap_shut': { code: 'P21', name: 'Case Clasp Snap Shut', system: 'psx', category: '3D Eject', description: 'Jewel case front cover slamming shut', defaultVol: 0.90 }
};

class RetroAudioEngine {
    private audioCtx: AudioContext | null = null;
    private soundBuffers: Map<string, AudioBuffer> = new Map();
    public rawWavBuffers: Map<string, AudioBuffer> = new Map();
    public availableFiles: string[] = [];
    private isMuted: boolean = false;
    private playedAnimCues: Set<string> = new Set();
    public onBuffersLoaded: (() => void) | null = null;

    constructor(private plugin: TetrisCanvasPlugin) {
        this.initAudio();
    }

    private async initAudio() {
        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                this.audioCtx = new AudioContextClass();
            }
            await this.preloadAllSfx();
        } catch (e) {
            console.error("Failed to init RetroAudioEngine:", e);
        }
    }

        public async preloadAllSfx() {
        if (!this.audioCtx) return;
        const adapter = this.plugin.app.vault.adapter as any;
        const basePath = adapter?.getBasePath?.() || adapter?.basePath || '';
        const configDir = this.plugin.app.vault.configDir;
        const pluginDir = getPluginDir(this.plugin);

        const possibleDirs: string[] = [
            path.join(pluginDir, 'assets', 'sfx'),
            `${configDir}/plugins/${this.plugin.manifest?.id || 'canvas-retro-engine'}/assets/sfx`,
            `${configDir}/plugins/canvas-retro-engine/assets/sfx`,
            `${configDir}/plugins/canvas-nes-emulator/assets/sfx`
        ];
        if (basePath) {
            possibleDirs.push(path.join(basePath, configDir, 'plugins', 'canvas-retro-engine', 'assets', 'sfx'));
            possibleDirs.push(path.join(basePath, configDir, 'plugins', 'canvas-nes-emulator', 'assets', 'sfx'));
        }
        
        const fileTimestamps = new Map<string, number>();

        for (const sfxDir of possibleDirs) {
            try {
                if (fs.existsSync(sfxDir)) {
                    const files = fs.readdirSync(sfxDir);
                    const wavFiles = files.filter(f => f.toLowerCase().endsWith('.wav'));
                    for (const cf of wavFiles) {
                        const filename = path.basename(cf);
                        if (!filename || this.rawWavBuffers.has(filename)) continue;
                        try {
                            const buf = fs.readFileSync(path.join(sfxDir, cf));
                            const arrayBuf = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
                            const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuf);
                            this.rawWavBuffers.set(filename, audioBuffer);

                            let ts = 0;
                            const match = filename.match(/-(\d{10,14})\.wav$/i);
                            if (match) {
                                ts = parseInt(match[1]);
                            } else {
                                const st = fs.statSync(path.join(sfxDir, cf));
                                ts = st?.ctimeMs || st?.mtimeMs || Date.now();
                            }
                            fileTimestamps.set(filename, ts);
                        } catch (err) {
                            console.warn(`Could not decode audio file: ${filename}`, err);
                        }
                    }
                } else if (await adapter.exists(sfxDir)) {
                    const list = await adapter.list(sfxDir);
                    const wavFiles = list.files.filter((f: string) => f.toLowerCase().endsWith('.wav'));
                    for (const filePath of wavFiles) {
                        const filename = filePath.split(/[\/\\]/).pop() || '';
                        if (!filename || this.rawWavBuffers.has(filename)) continue;
                        try {
                            const bin = await adapter.readBinary(filePath);
                            const audioBuffer = await this.audioCtx.decodeAudioData(bin.slice(0));
                            this.rawWavBuffers.set(filename, audioBuffer);

                            let ts = 0;
                            const match = filename.match(/-(\d{10,14})\.wav$/i);
                            if (match) {
                                ts = parseInt(match[1]);
                            } else {
                                const st = await adapter.stat(filePath);
                                ts = st?.ctime || st?.mtime || Date.now();
                            }
                            fileTimestamps.set(filename, ts);
                        } catch (err) {
                            console.warn(`Could not decode audio file: ${filename}`, err);
                        }
                    }
                }
            } catch (err) {
                console.warn("Could not list SFX directory:", sfxDir, err);
            }
        }

        // Sort chronologically by creation date/timestamp
        this.availableFiles = Array.from(this.rawWavBuffers.keys()).sort((a, b) => {
            const tA = fileTimestamps.get(a) || 0;
            const tB = fileTimestamps.get(b) || 0;
            return tA - tB;
        });

        // Bind each sound ID in SFX_METADATA
        const soundList = Object.keys(SFX_METADATA);
        for (const key of soundList) {
            const config = this.getConfig(key);
            if (config.sampleFile && this.rawWavBuffers.has(config.sampleFile)) {
                this.soundBuffers.set(key, this.rawWavBuffers.get(config.sampleFile)!);
            } else if (this.rawWavBuffers.has(`${key}.wav`)) {
                this.soundBuffers.set(key, this.rawWavBuffers.get(`${key}.wav`)!);
            } else {
                // Auto-match best candidate from available files
                const candidate = this.availableFiles.find(f => f.startsWith(key) || f.includes(key));
                if (candidate) {
                    this.soundBuffers.set(key, this.rawWavBuffers.get(candidate)!);
                }
            }
        }

        if (this.onBuffersLoaded) {
            this.onBuffersLoaded();
        }
    }

    public assignSample(id: string, filename: string) {
        if (filename && this.rawWavBuffers.has(filename)) {
            this.soundBuffers.set(id, this.rawWavBuffers.get(filename)!);
            this.setConfig(id, { sampleFile: filename });
        } else {
            this.soundBuffers.delete(id);
            this.setConfig(id, { sampleFile: '' });
        }
    }

    public getBuffer(id: string): AudioBuffer | undefined {
        return this.soundBuffers.get(id);
    }

    public getDuration(id: string): number {
        const buf = this.soundBuffers.get(id);
        return buf ? buf.duration : 0.0;
    }

    public getConfig(id: string): SfxSampleConfig {
        const saved = this.plugin.settings.sfxConfigs?.[id];
        const defaultVol = SFX_METADATA[id]?.defaultVol ?? 1.0;
        const dur = this.getDuration(id);
        return {
            enabled: saved?.enabled !== undefined ? saved.enabled : true,
            sampleFile: saved?.sampleFile !== undefined ? saved.sampleFile : '',
            volume: saved?.volume !== undefined ? saved.volume : defaultVol,
            startTime: saved?.startTime !== undefined ? saved.startTime : 0.0,
            endTime: (saved?.endTime !== undefined && saved.endTime > 0) ? saved.endTime : dur,
            pitchShift: saved?.pitchShift !== undefined ? saved.pitchShift : 1.0
        };
    }

    public setConfig(id: string, config: SfxSampleConfig) {
        if (!this.plugin.settings.sfxConfigs) {
            this.plugin.settings.sfxConfigs = {};
        }
        this.plugin.settings.sfxConfigs[id] = Object.assign({}, this.getConfig(id), config);
        this.plugin.saveSettings();
    }

    public play(id: string, baseVolume = 0.85, pitchVariance = 0.04) {
        if (this.isMuted) return;
        const config = this.getConfig(id);
        if (config.enabled === false) return;

        if (!this.audioCtx) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) this.audioCtx = new AudioContextClass();
            if (!this.audioCtx) return;
        }

        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }

        const buf = this.soundBuffers.get(id);
        if (!buf) return;

        try {
            const src = this.audioCtx.createBufferSource();
            src.buffer = buf;
            
            // Pitch / detune
            let rate = (config.pitchShift ?? 1.0);
            if (pitchVariance > 0) {
                const detuneAmount = (Math.random() * 2 - 1) * pitchVariance;
                rate += detuneAmount;
            }
            src.playbackRate.value = Math.max(0.2, rate);

            // Volume
            const finalVol = baseVolume * (config.volume ?? 1.0);
            const gain = this.audioCtx.createGain();
            gain.gain.value = Math.max(0, finalVol);
            src.connect(gain);
            gain.connect(this.audioCtx.destination);

            // Precise sample trimming
            const startOffset = Math.max(0, config.startTime ?? 0);
            const rawEnd = (config.endTime && config.endTime > startOffset) ? config.endTime : buf.duration;
            const playDuration = Math.max(0.01, rawEnd - startOffset);

            src.start(0, startOffset, playDuration);
        } catch (e) {
            console.error(`Error playing SFX ${id}:`, e);
        }
    }

    public playReverse(id: string, baseVolume = 0.85, pitchVariance = 0.04) {
        if (this.isMuted) return;
        const config = this.getConfig(id);
        if (config.enabled === false) return;

        if (!this.audioCtx) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) this.audioCtx = new AudioContextClass();
            if (!this.audioCtx) return;
        }

        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }

        const buf = this.soundBuffers.get(id);
        if (!buf) return;

        try {
            const reversedBuf = this.audioCtx.createBuffer(buf.numberOfChannels, buf.length, buf.sampleRate);
            for (let c = 0; c < buf.numberOfChannels; c++) {
                const srcData = buf.getChannelData(c);
                const destData = reversedBuf.getChannelData(c);
                const len = buf.length;
                for (let i = 0; i < len; i++) {
                    destData[i] = srcData[len - 1 - i];
                }
            }

            const src = this.audioCtx.createBufferSource();
            src.buffer = reversedBuf;

            let rate = (config.pitchShift ?? 1.0);
            if (pitchVariance > 0) {
                const detuneAmount = (Math.random() * 2 - 1) * pitchVariance;
                rate += detuneAmount;
            }
            src.playbackRate.value = Math.max(0.2, rate);

            const finalVol = baseVolume * (config.volume ?? 1.0);
            const gain = this.audioCtx.createGain();
            gain.gain.value = Math.max(0, finalVol);
            src.connect(gain);
            gain.connect(this.audioCtx.destination);

            src.start(0);
        } catch (e) {
            console.error(`Error playing reverse SFX ${id}:`, e);
        }
    }

    public preview(id: string): number {
        const config = this.getConfig(id);
        if (!this.audioCtx) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) this.audioCtx = new AudioContextClass();
            if (!this.audioCtx) return 0;
        }
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        const buf = this.soundBuffers.get(id);
        if (!buf) return 0;

        try {
            const src = this.audioCtx.createBufferSource();
            src.buffer = buf;
            src.playbackRate.value = config.pitchShift ?? 1.0;

            const gain = this.audioCtx.createGain();
            gain.gain.value = Math.max(0, config.volume ?? 1.0);
            src.connect(gain);
            gain.connect(this.audioCtx.destination);

            const startOffset = Math.max(0, config.startTime ?? 0);
            const rawEnd = (config.endTime && config.endTime > startOffset) ? config.endTime : buf.duration;
            const playDuration = Math.max(0.01, rawEnd - startOffset);

            src.start(0, startOffset, playDuration);
            return playDuration;
        } catch (e) {
            console.error(`Error previewing SFX ${id}:`, e);
            return 0;
        }
    }

    public previewFile(filename: string, volume = 1.0, pitchShift = 1.0): number {
        if (!this.audioCtx) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) this.audioCtx = new AudioContextClass();
            if (!this.audioCtx) return 0;
        }
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        const buf = this.rawWavBuffers.get(filename);
        if (!buf) return 0;

        try {
            const src = this.audioCtx.createBufferSource();
            src.buffer = buf;
            src.playbackRate.value = pitchShift ?? 1.0;

            const gain = this.audioCtx.createGain();
            gain.gain.value = Math.max(0, volume ?? 1.0);
            src.connect(gain);
            gain.connect(this.audioCtx.destination);

            src.start(0);
            return buf.duration;
        } catch (e) {
            console.error(`Error previewing file ${filename}:`, e);
            return 0;
        }
    }

    private currentAuditionSource: AudioBufferSourceNode | null = null;

    public startAudition(filenameOrId: string, volume = 1.0, pitchShift = 1.0) {
        this.stopAudition();
        if (this.isMuted) return;
        if (!this.audioCtx) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) this.audioCtx = new AudioContextClass();
            if (!this.audioCtx) return;
        }
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        const buf = this.rawWavBuffers.get(filenameOrId) || this.soundBuffers.get(filenameOrId);
        if (!buf) return;

        try {
            const src = this.audioCtx.createBufferSource();
            src.buffer = buf;
            src.playbackRate.value = Math.max(0.2, pitchShift ?? 1.0);

            const gain = this.audioCtx.createGain();
            gain.gain.value = Math.max(0, volume ?? 1.0);
            src.connect(gain);
            gain.connect(this.audioCtx.destination);

            src.start(0);
            this.currentAuditionSource = src;
            src.onended = () => {
                if (this.currentAuditionSource === src) {
                    this.currentAuditionSource = null;
                }
            };
        } catch (e) {
            console.error(`Error auditioning ${filenameOrId}:`, e);
        }
    }

    public stopAudition() {
        if (this.currentAuditionSource) {
            try {
                this.currentAuditionSource.stop();
                this.currentAuditionSource.disconnect();
            } catch { /* ignore */ }
            this.currentAuditionSource = null;
        }
    }

    public triggerCueOnce(cueKey: string, soundId: string, volume = 0.85) {
        if (!this.playedAnimCues.has(cueKey)) {
            this.playedAnimCues.add(cueKey);
            this.play(soundId, volume);
        }
    }

    public resetCues(prefix = '') {
        if (prefix) {
            for (const k of Array.from(this.playedAnimCues)) {
                if (k.startsWith(prefix)) this.playedAnimCues.delete(k);
            }
        } else {
            this.playedAnimCues.clear();
        }
    }

    public setMuted(muted: boolean) {
        this.isMuted = muted;
    }
}

class TetrisPanel {
    private canvasView: any;
    private plugin: TetrisCanvasPlugin;
    private containerEl!: HTMLElement;
    private sfxEngine: RetroAudioEngine;
    
    private nes: any;
    private psxEngine: PsxEngine | null = null;
    private savedNesState: any = null;
    private persistentSaveStates = new Map<string, any>();
    private isWindowFocused = true;
    private onWindowBlur: any = null;
    private onWindowFocus: any = null;
    private audioCtx: AudioContext | null = null;
    private scriptNode: any = null;
    
    private isRunning = false;
    private rafId = 0;
    
    // Grid Management
    private NES_WIDTH = 256;
    private NES_HEIGHT = 240;
    private SCREEN_WIDTH = 256;
    private SCREEN_HEIGHT = 240;
    private PIXEL_SCALE = 8;
    private nodesCreated = false;
    private deltaThreshold = 0;
    
    private fakePixels: any[] = [];
    private pixelColors: string[] = [];
    
    // Dummy Node & Selection
    private dummyNode: any = null;
    private isUpdatingDummy = false;
    private dummyNodeLastX = 0;
    private dummyNodeLastY = 0;
    private isSelecting = false;
    private selStart = { x: 0, y: 0 };
    private selCurr = { x: 0, y: 0 };
    private lastGroupCoords = new Map<string, {x: number, y: number}>();
    
    // Overlay Canvas & CRT
    private overlayCanvas: HTMLCanvasElement | null = null;
    private overlayCtx: CanvasRenderingContext2D | null = null;
    private crtOverlayEl: HTMLElement | null = null;
    private controllerPadEl: HTMLElement | null = null;
    private currentControllerSystem: 'nes' | 'psx' | null = null;
    private loadingBayEl: HTMLElement | null = null;
    private cordSvgEl: SVGSVGElement | null = null;
    private cordShadowPath: SVGPathElement | null = null;
    private cordOuterPath: SVGPathElement | null = null;
    private cordInnerPath: SVGPathElement | null = null;
    private cordSwayX = 0;
    private cordSwayY = 0;
    private lastPadWorldX = 0;
    private lastPadWorldY = 0;
    private cordPhysicsRaf = 0;
    private lidHingeGroup: any = null;
    private persistentBg = new Uint32Array(0);
    private isCrtActive = true;
    private isControllerVisible = false;
    private isControllerAnimatingIn = false;
    private hasIntroRun = false;
    private isIntroPlaying = false;
    private introStartTime = 0;
    private pendingStartGridCreation = false;
    private introFromCamX = 0;
    private introFromCamY = 7.5;
    private introFromCamZ = 11;
    private introFromCamFov = 65;
    private introFromLookAtY = -1;
    private introFromLookAtZ = 0;
    private lastIdleCamX = 0;
    private lastIdleCamY = 7.5;
    private lastIdleCamZ = 11;
    private lastIdleFov = 65;
    private lastIdleLookY = -1;
    private lastIdleLookZ = 0;
    public masterState = {
        ps1PosX: 0,
        ps1PosY: 1.45,
        ps1PosZ: -0.3,
        ps1RotX: 1.66,
        ps1RotY: -3.14,
        ps1RotZ: -3.14,
        ps1Scale: 0.2,
        camX: 0,
        camY: 4.4,
        camZ: 7.15,
        camFov: 43,
        lookAtY: 0.95,
        lookAtZ: 0.2,
        keyLightEnabled: true,
        key2LightEnabled: true,
        fillLightEnabled: true,
        rimLightEnabled: true,
        hemiLightEnabled: true,
        keyPower: 2.6,
        keyX: -1.7,
        keyY: 2.9,
        keyZ: 1.7,
        keyTargetX: 0,
        keyTargetY: 0.3,
        keyTargetZ: 1.2,
        key2Power: 0.7,
        key2X: 10,
        key2Y: 0,
        key2Z: 8.6,
        key2TargetX: 8,
        key2TargetY: -2,
        key2TargetZ: 4.2,
        key2Color: "warmWhite",
        fillPower: 2.65,
        fillX: 3.8,
        fillY: 7.1,
        fillZ: 8.3,
        fillTargetX: -0.6,
        fillTargetY: 4.1,
        fillTargetZ: -3.6,
        rimPower: 1.05,
        rimX: -1.8,
        rimY: 2.8,
        rimZ: 1.4,
        rimTargetX: -0.8,
        rimTargetY: 2.4,
        rimTargetZ: 5.3,
        rimColor: "warmGold",
        bloomEnabled: true,
        bloomIntensity: 0.15,
        bloomRadius: 1.1,
        bloomThreshold: 0.7,
        halationGlow: 0.95,
        hemiPower: 1.5,
        exposure: 0.75,
        showLightGizmos: false,
        customLights: [
            {
                "id": "custom_1786649105705",
                "name": "Custom DIRECTIONAL #1",
                "type": "directional",
                "enabled": true,
                "color": "#eed07c",
                "power": 1.1,
                "x": 3.2,
                "y": -3.1,
                "z": 2.5,
                "targetX": 0,
                "targetY": 1.4,
                "targetZ": 2.5,
                "distance": 25,
                "decay": 2
            },
            {
                "id": "custom_1786649255707",
                "name": "Custom POINT #2",
                "type": "point",
                "enabled": true,
                "color": "#fd91e5",
                "power": 10,
                "x": -1.1,
                "y": 0.5,
                "z": 1.1,
                "targetX": 0,
                "targetY": 0.3,
                "targetZ": 0,
                "distance": 25,
                "decay": 2
            },
            {
                "id": "custom_1786649831113",
                "name": "Custom DIRECTIONAL #3",
                "type": "directional",
                "enabled": true,
                "color": "#e78cee",
                "power": 0.1,
                "x": 1.8,
                "y": 5.5,
                "z": -9.6,
                "targetX": -2.9,
                "targetY": 1.3,
                "targetZ": 5,
                "distance": 25,
                "decay": 2
            },
            {
                "id": "custom_1786650105151",
                "name": "Custom SPOT #4",
                "type": "spot",
                "enabled": true,
                "color": "#ffffff",
                "power": 10,
                "x": -1.1,
                "y": -0.5,
                "z": 2.9,
                "targetX": 5,
                "targetY": 1,
                "targetZ": 1.2,
                "distance": 25,
                "decay": 2
            },
            {
                "id": "custom_1786650618355",
                "name": "Custom DIRECTIONAL #5",
                "type": "directional",
                "enabled": true,
                "color": "#ffffff",
                "power": 2.6,
                "x": 2.1,
                "y": 2.9,
                "z": 2.1,
                "targetX": 1.8,
                "targetY": 0.3,
                "targetZ": 0,
                "distance": 25,
                "decay": 2,
                "systemScope": "nes"
            }
        ] as any[],
        shadowsEnabled: true,
        shadowBias: 0,
        ejectPopZ: 0.86,
        deskX: 0,
        deskY: -3.2,
        deskZ: -2.1,
        deskW: 16.6,
        deskH: 0.25,
        deskD: 9.6,
        nesX: 0,
        nesY: 0.3,
        nesZ: -0.1,
        nesRotX: 0,
        nesRotY: 0,
        nesRotZ: 0,
        ps1LedX: -1.43,
        ps1LedY: 1.905,
        ps1LedZ: 1.145,
        stackStepY: 0.28,
        stackStepZ: -0.45,
        hoverLiftY: 1.02,
        hoverForwardZ: 0.35,
        hoverTiltRotX: 0.35,
        hoverRollRotZ: 0.15,
        hoverSpeed: 0.15,
        nesCartScale: 0.85,
        nesSlotX: -0.575,
        nesSlotY: 1.95,
        nesSlotZ: 0.20,
        nesSlotRotX: 1.45,
        nesSlotRotY: 0.00,
        nesSlotRotZ: 0.00,
        nesEjectPopZ: 0.86,
        slotX: -0.575,
        slotY: 2.2,
        slotZ: 0.28,
        slotRotX: 1.58,
        slotRotY: 0,
        slotRotZ: 0,
        peakY: 2.25,
        peakZ: 1.6,
        sideRollZ: 0.4,
        animSpeed: 0.004,
        introEnabled: true,
        introDurationSec: 2.5,
        introEasing: "cubicOut",
        introCamX: -4.3,
        introCamY: 5.5,
        introCamZ: 4.95,
        introCamFov: 57,
        introLookAtY: 0.95,
        introLookAtZ: 0.2,
        introEndCamX: 0,
        introEndCamY: 4.4,
        introEndCamZ: 7.15,
        introEndCamFov: 43,
        introEndLookAtY: 0.95,
        introEndLookAtZ: 0.2,
        rolodexCX: 0,
        rolodexCY: -2.55,
        rolodexCZ: 1.26,
        rolodexR: 2.42,
        rolodexAngle: 0.4,
        wheelRotX: -0.0016,
        wheelRotY: 0.3784,
        wheelRotZ: -0.081592653589793,
        rolodexRotX: -0.301592653589793,
        rolodexRotY: -0.126,
        rolodexRotZ: -0.141592653589793,
        rolodexHoverPop: 0.4,
        scrubMode: false,
        scrubProgress: 0,
        curtainPrimaryColor: "#181c26",
        curtainSecondaryColor: "#080a0f",
        curtainCheckSize: 40,
        curtainWaveSpeed: 1.1,
        curtainWaveContrast: 0.65,
        curtainLeadingEdgeEnabled: false,
        curtainLeadingEdgeColor: "#00f0ff",
        curtainDurationMs: 420,
        curtainPearlIntensity: 0.85,
        curtainPearlSpread: 2.2,
        curtainPearlPhase: 0.40,
        curtainPearlBrightness: 0.68,
        curtainPearlSaturation: 0.42,
        curtainPearlFresnelPower: 2.5,
        curtainPearlSpecular: 0.90,
        curtainPearlColor: "#ffffff",

        // ── 3D Console Celestial Ether & Particle Waterfall ──
        etherEnabled: true,
        etherMode: "waterfall",
        etherParticleCount: 1200,
        etherParticleSize: 0.22,
        etherFlowSpeed: 1.20,
        etherTurbulence: 0.65,
        etherTrailSpread: 2.4,
        etherSpreadX: 2.6,
        etherSpreadZ: 1.8,
        etherDropHeight: 4.5,
        etherCurlSwayX: 0.65,
        etherCurlSwayZ: 0.55,
        etherCurlFreq: 1.6,
        etherCurlSpeed: 1.3,
        etherGravity: 1.0,
        etherHueShiftSpeed: 0.80,
        etherHueCycleFreq: 2.0,
        etherAuroraPosZ: -2.5,
        etherAuroraPosY: 0.4,
        etherAuroraScaleX: 7.5,
        etherOpacity: 0.75,
        etherColor1: "#d8b4fe", // Pastel Lilac
        etherColor2: "#7dd3fc", // Celestial Cyan
        etherColor3: "#f472b6", // Rose Opal
        etherColor4: "#fef08a", // Champagne Gold
        etherHoverEnabled: true,
        etherHoverAmplitude: 0.06,
        etherHoverSpeed: 1.5,
        etherSpinVortexMult: 2.2,
        etherMouseInteraction: true,
        etherMouseForce: 1.2,
        etherTwinkleIntensity: 1.0,
        etherParallaxTilt: true,
        etherParallaxStrength: 0.08,
        etherFloorLightEnabled: true,
        etherFloorLightIntensity: 0.85,
        etherSplashEmbers: true,
        etherSplashRatio: 0.30,
        crtScreenShape: "vintage_bubble",

        // ── Atmospheric Carousel Fog Settings ──
        fogEnabled: true,
        fogMode: "linear",
        fogColor: "#0b0e17",
        fogNear: 3.2,
        fogFar: 14.0,
        fogDensity: 0.08,
        fogOpacity: 1.0,

        // ── Camera Depth of Field (DOF) Settings ──
        dofEnabled: true,
        dofAutofocus: "manual",
        dofFocusDistance: 6.2,
        dofLensFocalLength: 50,
        dofAperture: 0.035,
        dofMaxBlur: 0.02,
        dofNearBlurMult: 1.0,
        dofFarBlurMult: 1.0,
        dofAspectRings: 1.0,

        // ── NES Cartridge Decal Dimensions & Elevation Tuning ──
        nesLabelX0: -0.10,
        nesLabelX1: 0.92,
        nesLabelY0: -0.28,
        nesLabelY1: 1.24,
        nesLabelZ: 0.1625,
        nesSpineX0: -0.10,
        nesSpineX1: 0.92,
        nesSpineZ0: -0.15,
        nesSpineZ1: 0.15,
        nesSpineY: 1.2405
    };

    private evaluateEasing(t: number, mode: string): number {
        if (t <= 0) return 0;
        if (t >= 1) return 1;

        switch (mode) {
            case 'elasticOut': {
                const p = 0.3;
                return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
            }
            case 'quadInOut': {
                return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            }
            case 'exponentialOut': {
                return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            }
            case 'linear': {
                return t;
            }
            case 'cubicOut':
            default: {
                return 1 - Math.pow(1 - t, 3);
            }
        }
    }

    private customRomString: string | null = null;
    private selectedVaultRomPath: string | null = null;
    private targetScrollOffset = 0.0;
    private currentScrollOffset = 0.0;
    private activeRomName = "Tetris (Built-in)";
    private defaultRomString: string | null = null;
    private boxArtEl!: HTMLElement;
    private isConsolePowerOn = false;
    private powerBtnEl: HTMLButtonElement | null = null;
    private current3DCamera: THREE.PerspectiveCamera | null = null;
    private animationFrameId: number | null = null;
    private ps1ModelGroup: THREE.Group | null = null;
    private glbBufferCache = new Map<string, ArrayBuffer>();
    private parsedModelCache = new Map<string, THREE.Group>();
    // True 3D Spin Transition State
    private isSpinSwitching = false;
    private spinSwitchProgress = 0.0;
    private spinSwitchPhase: 'idle' | 'spinup' | 'spindown' = 'idle';
    private targetSpinSystem: 'nes' | 'psx' | null = null;
    private consoleSpinY = 0.0;
    // 🎯 Interactive Light Picking Mode & Selection
    private lightPickingMode: 'none' | 'aim_target' | 'place_light' = 'none';
    private activeSelectedLightId = 'key';
    private activeConsoleGroupRef: THREE.Group | null = null;
    private activeSceneRef: THREE.Scene | null = null;
    private activeEntriesRef: any[] = [];
    private nesBtnRef: HTMLButtonElement | null = null;
    private psxBtnRef: HTMLButtonElement | null = null;
    private ps1LedMeshRef: THREE.Mesh | null = null;
    private activeRenderer: THREE.WebGLRenderer | null = null;
    private activeScene: THREE.Scene | null = null;
    private activeComposer: EffectComposer | null = null;
    // ✨ Celestial Console Ether & Particle Waterfall References
    private etherParticles: THREE.Points | null = null;
    private etherRibbonMesh: THREE.Mesh | null = null;
    private etherParticleMaterial: THREE.ShaderMaterial | null = null;
    private etherRibbonMaterial: THREE.ShaderMaterial | null = null;
    private etherPosBuffer: Float32Array | null = null;
    private etherVelBuffer: Float32Array | null = null;
    private etherPhaseBuffer: Float32Array | null = null;
    private etherColorIndexBuffer: Float32Array | null = null;
    private etherAngles: Float32Array | null = null;
    private etherRadii: Float32Array | null = null;
    private etherJitterX: Float32Array | null = null;
    private etherJitterZ: Float32Array | null = null;
    private etherHeights: Float32Array | null = null;
    private etherGeometry: THREE.BufferGeometry | null = null;
    private etherFloorMesh: THREE.Mesh | null = null;
    private etherFloorMaterial: THREE.ShaderMaterial | null = null;
    private etherFloorLight: THREE.PointLight | null = null;
    private etherMouseNDC = { x: 0, y: 0, active: false };
    private consoleTiltX = 0;
    private consoleTiltY = 0;
    private consoleTiltZ = 0;
    // 🎭 Retro Viewport Transition Curtain References
    private curtainOverlayEl: HTMLElement | null = null;
    private curtainBladeEl: HTMLElement | null = null;
    private curtainLogoWrapperEl: HTMLElement | null = null;
    private curtainSystemIconEl: HTMLImageElement | null = null;
    private curtainSystemTitleEl: HTMLElement | null = null;
    private isCurtainTransitioning = false;
    private threeFrameTick = 0;
    private isOutroPlaying = false;
    private outroStartTime = 0;
    private outroFromCamX = 0;
    private outroFromCamY = 0;
    private outroFromCamZ = 0;
    private outroFromCamFov = 0;
    private outroFromLookAtY = 0;
    private outroFromLookAtZ = 0;
    private idleBlendStartTime = 0;
    private flagCanvasCachedWidth = 0;
    private flagCanvasCachedHeight = 0;
    private retroStartBtnEl: HTMLElement | null = null;
    private controllerScale = 2.0;
    private controllerOffset = { x: 0, y: 0 };
    private romSelectEl!: HTMLSelectElement;
    private previewImageData: ImageData | null = null;
    private previewBuf32: Uint32Array | null = null;
    private cachedMinX = 0;
    private cachedMinY = 0;
    private scaledCanvas: HTMLCanvasElement | null = null;
    private scaledCtx: CanvasRenderingContext2D | null = null;
    private pixelColors24 = new Uint32Array(0);
    
    // UI elements
    private startBtn!: HTMLButtonElement;
    private statusDisplay!: HTMLElement;
    private previewCanvas!: HTMLCanvasElement;
    private previewCtx!: CanvasRenderingContext2D;
    private fpsDisplay!: HTMLElement;
    private frameCount = 0;
    private lastFpsTime = 0;
    private isMinimized = false;
    private isMuted = false;
    private lastTransform = "";

    public toggleMute(): boolean {
        this.isMuted = !this.isMuted;
        if (this.sfxEngine) {
            this.sfxEngine.setMuted(this.isMuted);
        }
        if (this.nes && (this.nes as any).opts) {
            (this.nes as any).opts.isMuted = this.isMuted;
        }
        if (this.audioCtx) {
            if (this.isMuted && this.audioCtx.state === 'running') {
                try { this.audioCtx.suspend(); } catch { /* ignore */ }
            } else if (!this.isMuted && this.audioCtx.state === 'suspended') {
                try { this.audioCtx.resume(); } catch { /* ignore */ }
            }
        }
        if (this.psxEngine && typeof (this.psxEngine as any).setMuted === 'function') {
            (this.psxEngine as any).setMuted(this.isMuted);
        }
        new Notice(this.isMuted ? "🔇 Audio Muted" : "🔊 Audio Unmuted");
        return this.isMuted;
    }

    // NES Constants

    constructor(plugin: TetrisCanvasPlugin, canvasView: any) {
        this.plugin = plugin;
        this.canvasView = canvasView;
        this.sfxEngine = new RetroAudioEngine(this.plugin);
        if (this.plugin.settings.activeSystem === 'psx') {
            this.NES_WIDTH = 320;
            this.NES_HEIGHT = 240;
            this.SCREEN_WIDTH = 320;
            this.SCREEN_HEIGHT = 240;
        }
        this.buildUI();
    }

    private buildUI() {
        this.containerEl = createDiv();
        this.containerEl.className = 'tetris-canvas-panel';

        if (this.plugin.settings && this.plugin.settings.hudPosition) {
            setCssStyles(this.containerEl, { bottom: 'auto' });
            setCssStyles(this.containerEl, { right: 'auto' });
            setCssStyles(this.containerEl, { left: this.plugin.settings.hudPosition.left + 'px' });
            setCssStyles(this.containerEl, { top: this.plugin.settings.hudPosition.top + 'px' });
        }

        if (this.plugin.settings && this.plugin.settings.selectedRoomEnvironment) {
            this.selectedRoomEnvironment = this.plugin.settings.selectedRoomEnvironment;
        }

        if (this.plugin.settings && this.plugin.settings.masterState) {
            Object.assign(this.masterState, this.plugin.settings.masterState);
        }
        this.masterState.animSpeed = 0.0040;

        this.canvasView.containerEl.appendChild(this.containerEl);

        this.containerEl.addEventListener('wheel', (e: WheelEvent) => {
            if ((e.target as HTMLElement).closest('.tetris-studio-suite-scrollable, .tetris-advanced-content')) return;
            if (this.containerEl.scrollHeight > this.containerEl.clientHeight) {
                e.preventDefault();
                e.stopPropagation();
                this.containerEl.scrollTop += e.deltaY;
            }
        }, { passive: false });

        const miniIcon = createDiv();
        miniIcon.className = 'tetris-mini-icon';
        miniIcon.innerText = '👾';
        miniIcon.onclick = () => this.toggleMinimize();
        this.containerEl.appendChild(miniIcon);

        const header = createDiv();
        header.className = 'tetris-header';

        const titleContainer = createDiv();
        titleContainer.className = 'tetris-title-container';

        const titleEl = createDiv();
        titleEl.className = 'tetris-title';
        titleEl.innerText = 'CANVAS RETRO ENGINE';
        titleContainer.appendChild(titleEl);

        const authorCredit = createDiv();
        authorCredit.className = 'tetris-author-credit';

        const byText = createSpan();
        byText.innerText = 'by';
        authorCredit.appendChild(byText);

        const logoContainer = createDiv();
        logoContainer.className = 'tetris-author-logo-container';
        authorCredit.appendChild(logoContainer);

        titleContainer.appendChild(authorCredit);
        header.appendChild(titleContainer);

        // Load Lottie animation for Mo's signature logo
        try {
            lottie.loadAnimation({
                container: logoContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: logoAnimationData,
                rendererSettings: { preserveAspectRatio: 'xMidYMid meet' }
            });
            const svg = logoContainer.querySelector('svg');
            if (svg) {
                setCssStyles(svg, { backgroundColor: 'transparent' });
                setCssStyles(svg, { display: 'block' });
                setCssStyles(svg, { width: '100%' });
                setCssStyles(svg, { height: '100%' });
            }
        } catch (e) {
            console.error("Failed to load title pill lottie animation:", e);
        }

        const nesLogoDataUrl = this.getAssetDataUrl('nintendo-entertainment-system-seeklogo.png');
        const ps1LogoDataUrl = this.getAssetDataUrl('sony-playstation-seeklogo.png');

        // Dedicated System Switcher Row with White-Background Logo Buttons (Underneath Title Pill)
        const systemLogoSwitcher = createDiv();
        systemLogoSwitcher.className = 'retro-system-logo-switcher';

        const nesBtn = createEl('button');
        nesBtn.className = 'system-logo-btn nes-logo-btn' + (this.plugin.settings.activeSystem === 'nes' ? ' active' : '');
        if (nesLogoDataUrl) {
            const nesImg = createEl('img');
            nesImg.src = nesLogoDataUrl;
            nesImg.alt = 'NES';
            nesBtn.appendChild(nesImg);
        } else {
            nesBtn.innerText = 'NES';
        }
        this.nesBtnRef = nesBtn;
        nesBtn.onclick = () => { this.triggerSystemSwitch('nes'); };

        const psxBtn = createEl('button');
        psxBtn.className = 'system-logo-btn psx-logo-btn' + (this.plugin.settings.activeSystem === 'psx' ? ' active' : '');
        if (ps1LogoDataUrl) {
            const psxImg = createEl('img');
            psxImg.src = ps1LogoDataUrl;
            psxImg.alt = 'PS1';
            psxBtn.appendChild(psxImg);
        } else {
            psxBtn.innerText = 'PS1';
        }
        this.psxBtnRef = psxBtn;
        psxBtn.onclick = () => { this.triggerSystemSwitch('psx'); };

        systemLogoSwitcher.appendChild(nesBtn);
        systemLogoSwitcher.appendChild(psxBtn);

        ['mousedown', 'mousemove', 'mouseup', 'pointerdown', 'pointermove', 'pointerup', 'touchstart', 'touchmove', 'touchend', 'click'].forEach(evt => {
            this.containerEl.addEventListener(evt, (e: Event) => {
                if ((e.target as HTMLElement).closest('.tetris-header')) return; // Allow header drag
                e.stopPropagation();
            });
        });

        let dragStartX = 0, dragStartY = 0, panelStartX = 0, panelStartY = 0, dragging = false;
        header.addEventListener('mousedown', (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('button')) return;
            dragging = true;
            const rect = this.containerEl.getBoundingClientRect();
            const parentRect = this.canvasView.containerEl.getBoundingClientRect();
            
            const relLeft = rect.left - parentRect.left;
            const relTop = rect.top - parentRect.top;

            setCssStyles(this.containerEl, { bottom: 'auto' });
            setCssStyles(this.containerEl, { right: 'auto' });
            setCssStyles(this.containerEl, { left: relLeft + 'px' });
            setCssStyles(this.containerEl, { top: relTop + 'px' });

            panelStartX = relLeft;
            panelStartY = relTop;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            e.preventDefault();
        });
        document.addEventListener('mousemove', (e: MouseEvent) => {
            if (!dragging) return;
            const dx = e.clientX - dragStartX;
            const dy = e.clientY - dragStartY;
            setCssStyles(this.containerEl, { left: (panelStartX + dx) + 'px' });
            setCssStyles(this.containerEl, { top: (panelStartY + dy) + 'px' });
        });
        document.addEventListener('mouseup', () => {
            if (dragging) {
                dragging = false;
                if (this.plugin.settings) {
                    const curLeft = parseFloat(this.containerEl.style.left);
                    const curTop = parseFloat(this.containerEl.style.top);
                    if (!isNaN(curLeft) && !isNaN(curTop)) {
                        this.plugin.settings.hudPosition = { left: curLeft, top: curTop };
                        this.plugin.saveSettings();
                    }
                }
            }
        });

        this.previewCanvas = createEl('canvas');
        this.previewCanvas.width = this.SCREEN_WIDTH;
        this.previewCanvas.height = this.SCREEN_HEIGHT;
        setCssStyles(this.previewCanvas, { width: '100%' });
        setCssStyles(this.previewCanvas, { height: '100%' });
        setCssStyles(this.previewCanvas, { display: 'none' });
        setCssStyles(this.previewCanvas, { imageRendering: 'pixelated' });
        this.previewCtx = this.previewCanvas.getContext('2d')!;
        this.previewCtx.imageSmoothingEnabled = false;



        const makeSection = (label: string, el: HTMLElement) => {
            const sec = createDiv();
            sec.className = 'tetris-section';
            const lbl = createDiv();
            lbl.className = 'tetris-label';
            lbl.innerText = label;
            sec.appendChild(lbl);
            sec.appendChild(el);
            return sec;
        };

        // 1. Grid Resolution Slider (1x to 6x)
        const resSliderContainer = createDiv();
        setCssStyles(resSliderContainer, { display: 'flex' });
        setCssStyles(resSliderContainer, { flexDirection: 'column' });
        setCssStyles(resSliderContainer, { gap: '4px' });

        const resHeaderRow = createDiv();
        setCssStyles(resHeaderRow, { display: 'flex' });
        setCssStyles(resHeaderRow, { justifyContent: 'space-between' });
        setCssStyles(resHeaderRow, { alignItems: 'center' });
        setCssStyles(resHeaderRow, { fontSize: '9px' });
        setCssStyles(resHeaderRow, { color: '#a0a0a8' });

        const resLabel = createSpan();
        resLabel.innerText = 'Canvas Matrix Grid Resolution';

        const resBadge = createSpan();
        setCssStyles(resBadge, { color: '#00ff88', fontWeight: 'bold', fontFamily: 'monospace' });

        resHeaderRow.appendChild(resLabel);
        resHeaderRow.appendChild(resBadge);

        const resMap: [number, number, string][] = [
            [16, 15, '1x (16×15 — 240 nodes)'],
            [32, 30, '2x (32×30 — 960 nodes)'],
            [64, 60, '3x (64×60 — 3.8K nodes)'],
            [128, 120, '4x (128×120 — 15.3K nodes)'],
            [256, 240, '5x (256×240 — Native 1:1)'],
            [512, 480, '6x (512×480 — Super-Res)']
        ];

        const resSlider = createEl('input');
        resSlider.type = 'range';
        resSlider.className = 'tetris-slider';
        resSlider.min = '1';
        resSlider.max = '6';
        resSlider.step = '1';
        resSlider.value = '5';
        resBadge.innerText = resMap[4][2];

        resSlider.oninput = (e: any) => {
            const idx = parseInt(e.target.value) - 1;
            const [w, h, desc] = resMap[idx];
            this.NES_WIDTH = w;
            this.NES_HEIGHT = h;
            resBadge.innerText = desc;
            this.nodesCreated = false;
            this.updateStatus();
        };

        resSliderContainer.appendChild(resHeaderRow);
        resSliderContainer.appendChild(resSlider);

        // 2. Pixel Scale Slider (1x to 6x)
        const pixelScaleSliderContainer = createDiv();
        setCssStyles(pixelScaleSliderContainer, { display: 'flex' });
        setCssStyles(pixelScaleSliderContainer, { flexDirection: 'column' });
        setCssStyles(pixelScaleSliderContainer, { gap: '4px' });

        const scaleHeaderRow = createDiv();
        setCssStyles(scaleHeaderRow, { display: 'flex' });
        setCssStyles(scaleHeaderRow, { justifyContent: 'space-between' });
        setCssStyles(scaleHeaderRow, { alignItems: 'center' });
        setCssStyles(scaleHeaderRow, { fontSize: '9px' });
        setCssStyles(scaleHeaderRow, { color: '#a0a0a8' });

        const scaleLabel = createSpan();
        scaleLabel.innerText = 'Node Pixel Footprint Scale';

        const scaleBadge = createSpan();
        setCssStyles(scaleBadge, { color: '#00ff88', fontWeight: 'bold', fontFamily: 'monospace' });

        scaleHeaderRow.appendChild(scaleLabel);
        scaleHeaderRow.appendChild(scaleBadge);

        const scaleMap: [number, string][] = [
            [1, '1x (1px / node)'],
            [2, '2x (2px / node)'],
            [4, '3x (4px / node)'],
            [8, '4x (8px / node)'],
            [12, '5x (12px / node)'],
            [16, '6x (16px / node)']
        ];

        const pixelSlider = createEl('input');
        pixelSlider.type = 'range';
        pixelSlider.className = 'tetris-slider';
        pixelSlider.min = '1';
        pixelSlider.max = '6';
        pixelSlider.step = '1';
        pixelSlider.value = '1';
        scaleBadge.innerText = scaleMap[0][1];

        pixelSlider.oninput = (e: any) => {
            const idx = parseInt(e.target.value) - 1;
            const [scaleVal, desc] = scaleMap[idx];
            this.PIXEL_SCALE = scaleVal;
            scaleBadge.innerText = desc;
            this.nodesCreated = false;
            this.updateStatus();
        };

        pixelScaleSliderContainer.appendChild(scaleHeaderRow);
        pixelScaleSliderContainer.appendChild(pixelSlider);

        const deltaSelect = createEl('select');
        deltaSelect.className = 'tetris-select';
        [
            { v: '0', t: '0% Change (Perfect)' },
            { v: '15', t: '15% Change' },
            { v: '35', t: '35% Change' }
        ].forEach(({ v, t }) => {
            const el = createEl('option');
            el.value = v; el.text = t;
            deltaSelect.appendChild(el);
        });
        deltaSelect.onchange = (e) => {
            this.deltaThreshold = (parseInt((e.target as HTMLSelectElement).value) / 100) * 765;
        };

        // Unified 3D Physical Cartridge Bay & Deck Container
        this.boxArtEl = createDiv();
        this.boxArtEl.className = 'tetris-box-art-carousel-container';
        this.containerEl.appendChild(this.boxArtEl);
        this.containerEl.appendChild(header);
        this.containerEl.appendChild(systemLogoSwitcher);

        const romSelectContainer = createDiv();
        setCssStyles(romSelectContainer, { display: 'flex' });
        setCssStyles(romSelectContainer, { flexDirection: 'column' });
        setCssStyles(romSelectContainer, { gap: '6px' });

        this.romSelectEl = createEl('select');
        this.romSelectEl.className = 'tetris-select';
        this.refreshRomSelectOptions();

        const fileInput = createEl('input');
        fileInput.type = 'file';
        fileInput.accept = '.nes';
        setCssStyles(fileInput, { display: 'none' });

        fileInput.onchange = (e: any) => {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    const buffer = evt.target?.result as ArrayBuffer;
                    if (buffer) {
                        const bytes = new Uint8Array(buffer);
                        let binary = '';
                        for (let i = 0; i < bytes.length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        this.customRomString = binary;
                        this.selectedVaultRomPath = null;
                        const gameName = file.name.replace(/\.nes$/i, '');
                        this.activeRomName = gameName;
                        this.updateBoxArtCover(gameName, null);
                        if (this.isRunning && this.nes) {
                            this.nes.loadROM(binary);
                            this.applyNesPalette(this.nes);
                        }
                    }
                };
                reader.readAsArrayBuffer(file);
            }
        };

        this.romSelectEl.onchange = async (e) => {
            const val = (e.target as HTMLSelectElement).value;
            if (val === 'upload') {
                fileInput.click();
            } else {
                this.customRomString = null;
                this.selectedVaultRomPath = val;
                const gameName = val.split(/[/\\]/).pop()?.replace(/\.(nes|bin|cue|iso)$/i, '') || 'Game';
                this.activeRomName = gameName;
                const coverFile = this.findCoverImageForRom(val, this.plugin.settings.activeSystem);
                this.updateBoxArtCover(gameName, coverFile);
                if (this.isRunning) {
                    this.stopEmulator();
                    await this.startEmulator();
                }
            }
        };

        romSelectContainer.appendChild(this.romSelectEl);
        romSelectContainer.appendChild(fileInput);

        // Controller Scale Slider
        const scaleSliderContainer = createDiv();
        setCssStyles(scaleSliderContainer, { display: 'flex' });
        setCssStyles(scaleSliderContainer, { flexDirection: 'column' });
        setCssStyles(scaleSliderContainer, { gap: '4px' });

        const scaleSlider = createEl('input');
        scaleSlider.type = 'range';
        scaleSlider.min = '0.5';
        scaleSlider.max = '2.0';
        scaleSlider.step = '0.05';
        scaleSlider.value = '2.0';
        scaleSlider.className = 'tetris-slider';
        scaleSlider.oninput = (e: any) => {
            this.controllerScale = parseFloat(e.target.value);
            this.updateControllerTransform();
        };

        scaleSliderContainer.appendChild(scaleSlider);

        const displayControlsRow = createDiv();
        setCssStyles(displayControlsRow, { display: 'flex' });
        setCssStyles(displayControlsRow, { gap: '6px' });
        setCssStyles(displayControlsRow, { marginTop: '4px' });

        const ctrlToggleBtn = createEl('button');
        ctrlToggleBtn.className = 'tetris-btn secondary';
        setCssStyles(ctrlToggleBtn, { flex: '1' });
        ctrlToggleBtn.innerText = this.isControllerVisible ? '🎮 GAMEPAD ON' : '🎮 GAMEPAD OFF';
        ctrlToggleBtn.onclick = () => {
            this.toggleControllerVisibility();
            ctrlToggleBtn.innerText = this.isControllerVisible ? '🎮 GAMEPAD ON' : '🎮 GAMEPAD OFF';
        };

        const crtToggleBtn = createEl('button');
        crtToggleBtn.className = 'tetris-btn secondary';
        setCssStyles(crtToggleBtn, { flex: '1' });
        crtToggleBtn.innerText = this.isCrtActive ? '📺 CRT ON' : '📺 CRT OFF';
        crtToggleBtn.onclick = () => {
            this.isCrtActive = !this.isCrtActive;
            if (this.crtOverlayEl) {
                this.crtOverlayEl.classList.toggle('active', this.isCrtActive);
            }
            if (this.overlayCanvas) {
                this.overlayCanvas.classList.toggle('crt-curved', this.isCrtActive);
            }
            crtToggleBtn.innerText = this.isCrtActive ? '📺 CRT ON' : '📺 CRT OFF';
            new Notice(this.isCrtActive ? "3D CRT Filter Enabled 📺" : "CRT Filter Disabled");
        };

        const shapeToggleBtn = createEl('button');
        shapeToggleBtn.className = 'tetris-btn secondary';
        setCssStyles(shapeToggleBtn, { flex: '1' });
        const updateShapeToggleText = () => {
            const isBubble = (this.masterState as any).crtScreenShape === 'vintage_bubble';
            shapeToggleBtn.innerText = isBubble ? '🕹️ BUBBLE CRT' : '📺 FLAT CRT';
        };
        updateShapeToggleText();
        shapeToggleBtn.onclick = () => {
            const current = (this.masterState as any).crtScreenShape === 'vintage_bubble';
            (this.masterState as any).crtScreenShape = current ? 'modern' : 'vintage_bubble';
            this.applyCrtScreenShape();
            updateShapeToggleText();
            if (this.plugin && this.plugin.settings) {
                this.plugin.settings.masterState = Object.assign({}, this.masterState);
                this.plugin.saveSettings();
            }
            const isBubble = (this.masterState as any).crtScreenShape === 'vintage_bubble';
            new Notice(isBubble ? '🕹️ Vintage 1980s Bubble CRT Shape Enabled (SMB3 Style)' : '📺 Modern Flat CRT Shape Enabled');
        };

        displayControlsRow.appendChild(ctrlToggleBtn);
        displayControlsRow.appendChild(crtToggleBtn);
        displayControlsRow.appendChild(shapeToggleBtn);

        const controllerSectionContent = createDiv();
        setCssStyles(controllerSectionContent, { display: 'flex' });
        setCssStyles(controllerSectionContent, { flexDirection: 'column' });
        setCssStyles(controllerSectionContent, { gap: '6px' });
        controllerSectionContent.appendChild(scaleSliderContainer);
        controllerSectionContent.appendChild(displayControlsRow);

        // ── Advanced Settings Drawer Container ─────────────────────────────

        // 3D Room Environment Selector
        const roomSelect = createEl('select');
        roomSelect.className = 'tetris-select';
        [
            { v: 'midnight',  t: '🌌 Modern Midnight Studio' },
            { v: 'synthwave', t: '🌆 Neon Synthwave Arcade' },
            { v: 'warm80s',   t: '📻 Warm 80s Retro Room' },
            { v: 'minimal',   t: '⬛ Minimal Dark Canvas' }
        ].forEach(({ v, t }) => {
            const el = createEl('option');
            el.value = v; el.text = t;
            if (v === this.selectedRoomEnvironment) el.selected = true;
            roomSelect.appendChild(el);
        });
        roomSelect.onchange = (e) => {
            const val = (e.target as HTMLSelectElement).value;
            this.selectedRoomEnvironment = val;
            this.renderUnifiedCartridgeSystem();
        };

        const makeStudioSlider = (label: string, min: number, max: number, step: number, getVal: () => number, setVal: (v: number) => void) => {
            const container = createDiv();
            setCssStyles(container, { display: 'flex' });
            setCssStyles(container, { flexDirection: 'column' });
            setCssStyles(container, { gap: '2px' });

            const headerRow = createDiv();
            setCssStyles(headerRow, { display: 'flex' });
            setCssStyles(headerRow, { justifyContent: 'space-between' });
            setCssStyles(headerRow, { alignItems: 'center' });
            setCssStyles(headerRow, { fontSize: '9px' });
            setCssStyles(headerRow, { color: '#a0a0a8' });

            const nameEl = createSpan();
            nameEl.innerText = label;

            const numInput = createEl('input');
            numInput.type = 'number';
            numInput.step = String(step);
            numInput.value = Number(getVal().toFixed(4)).toString();
            setCssStyles(numInput, { width: '68px' });
            setCssStyles(numInput, { background: 'rgba(0, 0, 0, 0.5)' });
            setCssStyles(numInput, { border: '1px solid rgba(0, 255, 136, 0.35)' });
            setCssStyles(numInput, { borderRadius: '3px' });
            setCssStyles(numInput, { color: '#00ff88' });
            setCssStyles(numInput, { fontSize: '10px' });
            setCssStyles(numInput, { fontFamily: 'monospace' });
            setCssStyles(numInput, { textAlign: 'right' });
            setCssStyles(numInput, { padding: '1px 4px' });
            setCssStyles(numInput, { outline: 'none' });

            headerRow.appendChild(nameEl);
            headerRow.appendChild(numInput);

            const input = createEl('input');
            input.type = 'range';
            input.className = 'tetris-slider';
            input.min = String(min);
            input.max = String(max);
            input.step = String(step);
            input.value = String(getVal());

            input.oninput = (e) => {
                const v = parseFloat((e.target as HTMLInputElement).value);
                setVal(v);
                numInput.value = Number(v.toFixed(4)).toString();
                if (this.plugin && this.plugin.settings) {
                    this.plugin.settings.masterState = Object.assign({}, this.masterState);
                    this.plugin.saveSettings();
                }
            };

            numInput.oninput = (e) => {
                const valStr = (e.target as HTMLInputElement).value;
                const v = parseFloat(valStr);
                if (!isNaN(v)) {
                    setVal(v);
                    input.value = String(v);
                    if (this.plugin && this.plugin.settings) {
                        this.plugin.settings.masterState = Object.assign({}, this.masterState);
                        this.plugin.saveSettings();
                    }
                }
            };

            numInput.addEventListener('keydown', (e) => e.stopPropagation());
            numInput.addEventListener('keyup', (e) => e.stopPropagation());
            numInput.addEventListener('mousedown', (e) => e.stopPropagation());

            container.addEventListener('mousedown', (e) => e.stopPropagation());
            container.addEventListener('pointerdown', (e) => e.stopPropagation());
            container.addEventListener('wheel', (e: WheelEvent) => {
                e.stopPropagation();
                e.preventDefault();
                const scrollParent = container.closest('.tetris-studio-suite-scrollable, .tetris-advanced-content, .tetris-canvas-panel') as HTMLElement;
                if (scrollParent) {
                    scrollParent.scrollTop += e.deltaY;
                }
            }, { passive: false });

            container.appendChild(headerRow);
            container.appendChild(input);
            return container;
        };

        const makeCollapsible = (title: string, contentEl: HTMLElement, startOpen = false) => {
            const wrapper = createDiv();
            setCssStyles(wrapper, { border: '1px solid rgba(255, 255, 255, 0.08)' });
            setCssStyles(wrapper, { borderRadius: '6px' });
            setCssStyles(wrapper, { marginBottom: '6px' });
            setCssStyles(wrapper, { overflow: 'visible' });
            setCssStyles(wrapper, { background: 'rgba(0,0,0,0.18)' });

            const headerBtn = createEl('button');
        setCssStyles(headerBtn, { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '7px 8px', fontSize: '9px', fontWeight: 'bold', color: '#00ff88', letterSpacing: '0.07em', textTransform: 'uppercase', textAlign: 'left' });

            const titleSpan = createSpan();
            titleSpan.innerText = title;

            const chevron = createSpan();
        setCssStyles(chevron, { fontSize: '8px', transition: 'transform 0.18s', display: 'inline-block' });
            chevron.innerText = '▼';

            headerBtn.appendChild(titleSpan);
            headerBtn.appendChild(chevron);

            setCssStyles(contentEl, { padding: '0 8px 8px' });
            setCssStyles(contentEl, { display: startOpen ? 'flex' : 'none' });
            setCssStyles(contentEl, { flexDirection: 'column' });
            setCssStyles(contentEl, { gap: '4px' });

            if (!startOpen) setCssStyles(chevron, { transform: 'rotate(-90deg)' });

            headerBtn.addEventListener('click', () => {
                const open = contentEl.style.display !== 'none';
                setCssStyles(contentEl, { display: open ? 'none' : 'flex' });
                setCssStyles(chevron, { transform: open ? 'rotate(-90deg)' : 'rotate(0deg)' });
            });
            headerBtn.addEventListener('mousedown', e => e.stopPropagation());

            wrapper.addEventListener('wheel', (e: WheelEvent) => {
                e.stopPropagation();
                e.preventDefault();
                const scrollParent = wrapper.closest('.tetris-studio-suite-scrollable, .tetris-advanced-content, .tetris-canvas-panel') as HTMLElement;
                if (scrollParent) {
                    scrollParent.scrollTop += e.deltaY;
                }
            }, { passive: false });

            wrapper.appendChild(headerBtn);
            wrapper.appendChild(contentEl);
            return wrapper;
        };

        // Display & CRT Overlay Toggles inside Advanced Settings
        const overlayControlsGroup = createDiv();
        setCssStyles(overlayControlsGroup, { display: 'flex' });
        setCssStyles(overlayControlsGroup, { flexDirection: 'column' });
        setCssStyles(overlayControlsGroup, { gap: '6px' });

        const ctrlBtn = createEl('button');
        ctrlBtn.className = 'tetris-btn secondary';
        ctrlBtn.innerText = this.isControllerVisible ? '🎮 GAMEPAD CONTROLLER: ON' : '🎮 GAMEPAD CONTROLLER: OFF';
        ctrlBtn.onclick = () => {
            this.toggleControllerVisibility();
            ctrlBtn.innerText = this.isControllerVisible ? '🎮 GAMEPAD CONTROLLER: ON' : '🎮 GAMEPAD CONTROLLER: OFF';
        };

        const crtBtn = createEl('button');
        crtBtn.className = 'tetris-btn secondary';
        crtBtn.innerText = this.isCrtActive ? '📺 CRT SCANLINE SHADER: ON' : '📺 CRT SCANLINE SHADER: OFF';
        crtBtn.onclick = () => {
            this.isCrtActive = !this.isCrtActive;
            if (this.crtOverlayEl) this.crtOverlayEl.classList.toggle('active', this.isCrtActive);
            if (this.overlayCanvas) this.overlayCanvas.classList.toggle('crt-curved', this.isCrtActive);
            crtBtn.innerText = this.isCrtActive ? '📺 CRT SCANLINE SHADER: ON' : '📺 CRT SCANLINE SHADER: OFF';
        };

        const screenShapeBtn = createEl('button');
        screenShapeBtn.className = 'tetris-btn secondary';
        const updateShapeBtnText = () => {
            const isBubble = (this.masterState as any).crtScreenShape === 'vintage_bubble';
            screenShapeBtn.innerText = isBubble ? '🕹️ SCREEN SHAPE: VINTAGE 1980s BUBBLE' : '📺 SCREEN SHAPE: MODERN FLAT CRT';
        };
        updateShapeBtnText();
        screenShapeBtn.onclick = () => {
            const current = (this.masterState as any).crtScreenShape === 'vintage_bubble';
            (this.masterState as any).crtScreenShape = current ? 'modern' : 'vintage_bubble';
            this.applyCrtScreenShape();
            updateShapeBtnText();
            if (this.plugin && this.plugin.settings) {
                this.plugin.settings.masterState = Object.assign({}, this.masterState);
                this.plugin.saveSettings();
            }
            const isBubble = (this.masterState as any).crtScreenShape === 'vintage_bubble';
            new Notice(isBubble ? '🕹️ Vintage 1980s Bubble CRT Shape Enabled (SMB3 Style)' : '📺 Modern Flat CRT Shape Enabled');
        };

        overlayControlsGroup.appendChild(ctrlBtn);
        overlayControlsGroup.appendChild(crtBtn);
        overlayControlsGroup.appendChild(screenShapeBtn);

        const advContent = createDiv();
        advContent.className = 'tetris-advanced-content';
        setCssStyles(advContent, { maxHeight: '420px' });
        setCssStyles(advContent, { overflowY: 'auto' });
        setCssStyles(advContent, { display: 'none' }); // Closed by default as requested

        advContent.addEventListener('wheel', (e: WheelEvent) => {
            if ((e.target as HTMLElement).closest('.tetris-studio-suite-scrollable, .sfx-cards-scroll-list, .tetris-sfx-studio-container')) return;
            e.preventDefault();
            e.stopPropagation();
            advContent.scrollTop += e.deltaY;
        }, { passive: false });
        advContent.addEventListener('mousedown', (e) => e.stopPropagation());
        advContent.addEventListener('pointerdown', (e) => e.stopPropagation());
        advContent.addEventListener('touchstart', (e) => e.stopPropagation());

        advContent.appendChild(makeSection('ROM / GAME SELECTOR', romSelectContainer));
        advContent.appendChild(makeSection('DISPLAY & CONTROLLER OVERLAYS', overlayControlsGroup));
        advContent.appendChild(makeSection('GRID RESOLUTION', resSliderContainer));
        advContent.appendChild(makeSection('PIXEL SCALE', pixelScaleSliderContainer));

        this.containerEl.appendChild(advContent);

        // ── SLEEK ICON ACTION BAR ───────────────────────────────────────────
        const actionBar = createDiv();
        actionBar.className = 'tetris-icon-action-bar';

        const createIconButton = (iconName: string, title: string, onClick: () => void) => {
            const btn = createEl('button');
            btn.className = 'tetris-icon-btn';
            btn.type = 'button';
            setIcon(btn, iconName);
            btn.title = title;
            btn.onclick = (e) => {
                e.stopPropagation();
                onClick();
            };
            return btn;
        };

        // 0. Power On / Off Toggle Button (All the way to the left)
        const powerBtn = createIconButton('power', 'Power On / Off Console Display & Controller', () => {
            this.triggerPowerToggle();
        });
        this.powerBtnEl = powerBtn;

        // 1. Reset Console Game
        const resetBtn = createIconButton('rotate-ccw', 'Reset / Restart Console Game', async () => {
            if (this.isRunning) {
                this.stopEmulator();
                await this.startEmulator();
            } else if (this.selectedVaultRomPath || this.customRomString || this.activeRomName) {
                await this.startEmulator();
            } else {
                new Notice("No ROM selected or inserted.");
            }
        });

        // 2. Save State Button (Persisted to Disk)
        const saveStateBtn = createIconButton('save', 'Save Game Memory State to Disk', async () => {
            const romKey = (this.selectedVaultRomPath || this.activeRomName || 'default_rom') + '_' + this.plugin.settings.activeSystem;
            if (this.plugin.settings.activeSystem === 'psx') {
                if (this.psxEngine) {
                    const buf = await this.psxEngine.saveState();
                    if (buf) {
                        this.persistentSaveStates.set(romKey, buf);
                        const savedDisk = await this.saveRomStateToDisk(romKey, buf, true);
                        if (savedDisk) new Notice("💾 PS1 Game State Saved to Disk!");
                        else new Notice("⚠️ Failed to Save PS1 State to Disk");
                    } else {
                        new Notice("⚠️ Failed to Capture PS1 State");
                    }
                } else {
                    new Notice("⚠️ PS1 Engine not running");
                }
            } else {
                if (this.nes) {
                    const nesState = this.nes.toJSON();
                    if (nesState) {
                        this.persistentSaveStates.set(romKey, nesState);
                        const savedDisk = await this.saveRomStateToDisk(romKey, nesState, false);
                        if (savedDisk) new Notice("💾 NES Game State Saved to Disk!");
                        else new Notice("⚠️ Failed to Save NES State to Disk");
                    } else {
                        new Notice("⚠️ Failed to Capture NES State");
                    }
                } else {
                    new Notice("⚠️ NES Engine not running");
                }
            }
        });

        // 3. Load State Button (Restored from Disk / Memory)
        const loadStateBtn = createIconButton('folder-down', 'Load Game Memory State from Disk', async () => {
            const romKey = (this.selectedVaultRomPath || this.activeRomName || 'default_rom') + '_' + this.plugin.settings.activeSystem;
            if (this.plugin.settings.activeSystem === 'psx') {
                let savedData = this.persistentSaveStates.get(romKey);
                if (!savedData) {
                    savedData = await this.loadRomStateFromDisk(romKey, true);
                    if (savedData) this.persistentSaveStates.set(romKey, savedData);
                }
                if (this.psxEngine && savedData) {
                    const ok = await this.psxEngine.loadState(savedData);
                    if (ok) new Notice("📂 PS1 Game State Restored from Disk!");
                    else new Notice("⚠️ Failed to Restore PS1 State");
                } else {
                    new Notice("⚠️ No Save State Found on Disk for this ROM");
                }
            } else {
                let savedData = this.persistentSaveStates.get(romKey);
                if (!savedData) {
                    savedData = await this.loadRomStateFromDisk(romKey, false);
                    if (savedData) this.persistentSaveStates.set(romKey, savedData);
                }
                if (this.nes && savedData) {
                    this.nes.fromJSON(savedData);
                    new Notice("📂 NES Game State Restored from Disk!");
                } else {
                    new Notice("⚠️ No Save State Found on Disk for this ROM");
                }
            }
        });

        // 4. Mute Audio Toggle Button
        const muteBtn = createIconButton('volume-2', 'Mute / Unmute Console Audio', () => {
            this.toggleMute();
            if (this.isMuted) {
                setIcon(muteBtn, 'volume-x');
                muteBtn.classList.add('active');
            } else {
                setIcon(muteBtn, 'volume-2');
                muteBtn.classList.remove('active');
            }
        });

        // 5. Hide / Minimize Controls
        const minimizeBtn = createIconButton('eye-off', 'Minimize Controller & HUD Overlay', () => {
            this.minimizeHud();
        });

        // 6. Settings Toggle Drawer Button
        const settingsBtn = createIconButton('settings', 'Toggle Advanced Console & Emulator Settings', () => {
            const isOpen = advContent.style.display !== 'none';
            setCssStyles(advContent, { display: isOpen ? 'none' : 'flex' });
            setCssStyles(advContent, { flexDirection: 'column' });
            setCssStyles(advContent, { gap: '6px' });
            if (!isOpen) settingsBtn.classList.add('active');
            else settingsBtn.classList.remove('active');
        });

        actionBar.appendChild(powerBtn);
        actionBar.appendChild(resetBtn);
        actionBar.appendChild(saveStateBtn);
        actionBar.appendChild(loadStateBtn);
        actionBar.appendChild(muteBtn);
        actionBar.appendChild(minimizeBtn);
        actionBar.appendChild(settingsBtn);

        this.containerEl.appendChild(actionBar);

        // Start app 100% minimized on launch without flashing maximized HUD
        this.isMinimized = true;
        setCssStyles(this.containerEl, { display: 'none' });
        
        // Restore floating button position from settings if available
        if (this.plugin && this.plugin.settings && this.plugin.settings.floatingGamepadPos) {
            this.floatingGamepadPos = this.plugin.settings.floatingGamepadPos;
        }
        this.showFloatingGamepadTrigger();
    }

    private updateLiveNesLabelGeometries() {
        const x0 = this.masterState.nesLabelX0 ?? -0.10;
        const x1 = this.masterState.nesLabelX1 ?? 0.92;
        const y0 = this.masterState.nesLabelY0 ?? -0.28;
        const y1 = this.masterState.nesLabelY1 ?? 1.24;
        const z = this.masterState.nesLabelZ ?? 0.1625;

        const sx0 = this.masterState.nesSpineX0 ?? -0.10;
        const sx1 = this.masterState.nesSpineX1 ?? 0.92;
        const sz0 = this.masterState.nesSpineZ0 ?? -0.15;
        const sz1 = this.masterState.nesSpineZ1 ?? 0.15;
        const sy = this.masterState.nesSpineY ?? 1.2405;

        if (this.activeEntriesRef) {
            for (const entry of this.activeEntriesRef) {
                if (!entry.mesh) continue;

                // 1. Update Front Decal Mesh
                const labelMesh = entry.mesh.getObjectByName("nesFrontLabelMesh") as THREE.Mesh;
                if (labelMesh && labelMesh.geometry) {
                    const posAttr = labelMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
                    if (posAttr && posAttr.array) {
                        const arr = posAttr.array as Float32Array;
                        // Vert 0: bottom-left
                        arr[0] = x0; arr[1] = y0; arr[2] = z;
                        // Vert 1: bottom-right
                        arr[3] = x1; arr[4] = y0; arr[5] = z;
                        // Vert 2: top-right
                        arr[6] = x1; arr[7] = y1; arr[8] = z;
                        // Vert 3: top-left
                        arr[9] = x0; arr[10] = y1; arr[11] = z;
                        posAttr.needsUpdate = true;
                        labelMesh.geometry.computeVertexNormals();
                        labelMesh.geometry.computeBoundingBox();
                    }
                }

                // 2. Update Top Spine Decal Mesh
                const spineMesh = entry.mesh.getObjectByName("nesTopSpineMesh") as THREE.Mesh;
                if (spineMesh && spineMesh.geometry) {
                    const spinePosAttr = spineMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
                    if (spinePosAttr && spinePosAttr.array) {
                        const sArr = spinePosAttr.array as Float32Array;
                        // Vert 0: front-left
                        sArr[0] = sx0; sArr[1] = sy; sArr[2] = sz1;
                        // Vert 1: front-right
                        sArr[3] = sx1; sArr[4] = sy; sArr[5] = sz1;
                        // Vert 2: back-right
                        sArr[6] = sx1; sArr[7] = sy; sArr[8] = sz0;
                        // Vert 3: back-left
                        sArr[9] = sx0; sArr[10] = sy; sArr[11] = sz0;
                        spinePosAttr.needsUpdate = true;
                        spineMesh.geometry.computeVertexNormals();
                        spineMesh.geometry.computeBoundingBox();
                    }
                }
            }
        }
    }

    private buildSfxStudio(): HTMLElement {
        const studioContainer = createDiv();
        studioContainer.className = 'tetris-sfx-studio-container';
        setCssStyles(studioContainer, { display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' });

        // 1. System Tab Switcher (NES vs PS1)
        const tabHeader = createDiv();
        setCssStyles(tabHeader, { display: 'flex', gap: '6px', marginBottom: '4px' });

        let activeTab: 'nes' | 'psx' = this.plugin.settings.activeSystem || 'nes';

        const nesTabBtn = createEl('button');
        nesTabBtn.className = 'tetris-btn ' + (activeTab === 'nes' ? 'primary' : 'secondary');
        nesTabBtn.innerText = '🎮 NES SAMPLES (17)';
        setCssStyles(nesTabBtn, { flex: '1' });
        setCssStyles(nesTabBtn, { fontSize: '10px' });
        setCssStyles(nesTabBtn, { padding: '4px 6px' });

        const psxTabBtn = createEl('button');
        psxTabBtn.className = 'tetris-btn ' + (activeTab === 'psx' ? 'primary' : 'secondary');
        psxTabBtn.innerText = '🕹️ PS1 SAMPLES (21)';
        setCssStyles(psxTabBtn, { flex: '1' });
        setCssStyles(psxTabBtn, { fontSize: '10px' });
        setCssStyles(psxTabBtn, { padding: '4px 6px' });

        tabHeader.appendChild(nesTabBtn);
        tabHeader.appendChild(psxTabBtn);
        studioContainer.appendChild(tabHeader);

        // 2. Cards Scroll List Container
        const cardsList = createDiv();
        cardsList.className = 'sfx-cards-scroll-list';
        setCssStyles(cardsList, { display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' });

        cardsList.addEventListener('wheel', (e) => {
            e.stopPropagation();
        }, { passive: true });

        const renderCards = () => {
            cardsList.textContent = '';
            const allFiles = this.sfxEngine.availableFiles;
            const entries = Object.entries(SFX_METADATA).filter(([_, meta]) => meta.system === activeTab);

            entries.forEach(([id, meta]) => {
                const card = createDiv();
                card.className = 'sfx-card-item';
        setCssStyles(card, { display: 'flex', flexDirection: 'column', gap: '5px', padding: '7px 8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '6px' });

                // Header Row
                const headerRow = createDiv();
        setCssStyles(headerRow, { display: 'flex', justifyContent: 'space-between', alignItems: 'center' });

                const titleEl = createDiv();
        setCssStyles(titleEl, { fontSize: '11px', fontWeight: 'bold', color: '#00ffaa', fontFamily: 'monospace' });
                titleEl.innerText = `[${meta.code}] ${meta.name}`;

                const catBadge = createSpan();
        setCssStyles(catBadge, { fontSize: '9px', color: '#888', background: 'rgba(255,255,255,0.06)', padding: '2px 5px', borderRadius: '3px' });
                catBadge.innerText = meta.category;

                headerRow.appendChild(titleEl);
                headerRow.appendChild(catBadge);
                card.appendChild(headerRow);

                // Description
                const descEl = createDiv();
        setCssStyles(descEl, { fontSize: '9px', color: '#999', lineHeight: '1.2' });
                descEl.innerText = meta.description;
                card.appendChild(descEl);

                // Sample File Custom Dropdown & Test Row
                const assignRow = createDiv();
        setCssStyles(assignRow, { display: 'flex', gap: '6px', alignItems: 'center', marginTop: '2px' });

                const selectWrap = createDiv();
        setCssStyles(selectWrap, { position: 'relative', flex: '1', minWidth: '0' });

                const currentConfig = this.sfxEngine.getConfig(id);
                let currentAssigned = currentConfig.sampleFile || '';
                if (!currentAssigned) {
                    const fallback = allFiles.find(f => f === `${id}.wav` || f.startsWith(id));
                    if (fallback) currentAssigned = fallback;
                }

                const triggerBtn = createEl('button');
                triggerBtn.className = 'tetris-btn';
        setCssStyles(triggerBtn, { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', padding: '3px 6px', fontFamily: 'monospace', background: 'rgba(0,0,0,0.5)', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: '#eee', cursor: 'pointer' });

                const triggerLabel = createSpan();
        setCssStyles(triggerLabel, { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: '1' });
                triggerLabel.innerText = currentAssigned || '— None / Muted —';

                const arrowIcon = createSpan();
        setCssStyles(arrowIcon, { marginLeft: '4px', color: '#888', fontSize: '8px' });
                arrowIcon.innerText = '▼';

                triggerBtn.appendChild(triggerLabel);
                triggerBtn.appendChild(arrowIcon);
                selectWrap.appendChild(triggerBtn);

                // Floating Options Menu
                const menuList = createDiv();
                menuList.className = 'sfx-custom-dropdown-menu';
        setCssStyles(menuList, { display: 'none', position: 'absolute', top: '100%', left: '0', width: 'max-content', minWidth: '320px', maxWidth: '440px', maxHeight: '220px', overflowY: 'auto', overflowX: 'hidden', background: '#14151e', border: '1.5px solid #00ffaa', borderRadius: '6px', boxShadow: '0 12px 36px rgba(0,0,0,0.95)', zIndex: '999999', marginTop: '4px', padding: '4px', boxSizing: 'border-box', flexDirection: 'column', gap: '2px' });

                menuList.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });

                const closeMenu = () => {
                    setCssStyles(menuList, { display: 'none' });
                    this.sfxEngine.stopAudition();
                };

                // Option: None / Muted
                const noneItem = createDiv();
        setCssStyles(noneItem, { display: 'flex', alignItems: 'center', flexShrink: '0', height: '28px', minHeight: '28px', padding: '0 8px', fontSize: '11px', fontFamily: 'monospace', color: '#888', borderRadius: '4px', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', boxSizing: 'border-box', marginBottom: '2px' });
                noneItem.innerText = '— None / Muted —';
                noneItem.onmouseenter = () => {
                    setCssStyles(noneItem, { background: 'rgba(255,255,255,0.1)' });
                    this.sfxEngine.stopAudition();
                };
                noneItem.onmouseleave = () => {
                    setCssStyles(noneItem, { background: 'transparent' });
                };
                noneItem.onclick = (e) => {
                    e.stopPropagation();
                    this.sfxEngine.assignSample(id, '');
                    currentAssigned = '';
                    triggerLabel.innerText = '— None / Muted —';
                    closeMenu();
                };
                menuList.appendChild(noneItem);

                // Options: All Audio Files
                allFiles.forEach(f => {
                    const item = createDiv();
        setCssStyles(item, { display: 'flex', alignItems: 'center', flexShrink: '0', height: '28px', minHeight: '28px', padding: '0 8px', fontSize: '11px', fontFamily: 'monospace', color: '#d0d4e0', borderRadius: '4px', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', boxSizing: 'border-box', marginBottom: '2px' });
                    item.innerText = f;

                    if (f === currentAssigned) {
                        setCssStyles(item, { color: '#00ffaa' });
                        setCssStyles(item, { fontWeight: 'bold' });
                        setCssStyles(item, { background: 'rgba(0, 255, 170, 0.12)' });
                    }

                    item.onmouseenter = () => {
                        setCssStyles(item, { background: 'rgba(0, 255, 170, 0.25)' });
                        this.sfxEngine.startAudition(f, currentConfig.volume, currentConfig.pitchShift);
                    };
                    item.onmouseleave = () => {
                        setCssStyles(item, { background: (f === currentAssigned ? 'rgba(0, 255, 170, 0.12)' : 'transparent') });
                        this.sfxEngine.stopAudition();
                    };
                    item.onclick = (e) => {
                        e.stopPropagation();
                        this.sfxEngine.stopAudition();
                        this.sfxEngine.assignSample(id, f);
                        currentAssigned = f;
                        triggerLabel.innerText = f;
                        closeMenu();
                    };
                    menuList.appendChild(item);
                });

                triggerBtn.onclick = (e) => {
                    e.stopPropagation();
                    const isVisible = menuList.style.display === 'flex';
                    document.querySelectorAll('.sfx-custom-dropdown-menu').forEach((m: any) => { setCssStyles(m, { display: 'none' }); });
                    if (!isVisible) {
                        setCssStyles(menuList, { display: 'flex' });
                    } else {
                        closeMenu();
                    }
                };

                selectWrap.appendChild(menuList);

                // Play / Test Button
                const playBtn = createEl('button');
                playBtn.className = 'tetris-btn';
        setCssStyles(playBtn, { padding: '2px 8px', fontSize: '10px', whiteSpace: 'nowrap', background: '#00ffaa', color: '#000', fontWeight: 'bold', cursor: 'pointer' });
                playBtn.innerText = '▶ Test';
                playBtn.onclick = () => {
                    const selectedFile = currentAssigned;
                    if (selectedFile) {
                        this.sfxEngine.previewFile(selectedFile, currentConfig.volume, currentConfig.pitchShift);
                    } else {
                        this.sfxEngine.preview(id);
                    }
                    setCssStyles(playBtn, { background: '#ffffff' });
                    window.setTimeout(() => { setCssStyles(playBtn, { background: '#00ffaa' }); }, 180);
                };

                assignRow.appendChild(selectWrap);
                assignRow.appendChild(playBtn);
                card.appendChild(assignRow);

                // Volume & Pitch Controls Row
                const controlsRow = createDiv();
        setCssStyles(controlsRow, { display: 'flex', gap: '8px', alignItems: 'center', marginTop: '2px' });

                // Volume Slider
                const volWrap = createDiv();
        setCssStyles(volWrap, { flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' });
                const volHeader = createDiv();
        setCssStyles(volHeader, { display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#777' });
                const volTitle = createSpan(); volTitle.innerText = 'Volume';
                const volBadge = createSpan(); volBadge.innerText = `${Math.round((currentConfig.volume ?? meta.defaultVol) * 100)}%`;
                volHeader.appendChild(volTitle); volHeader.appendChild(volBadge);

                const volSlider = createEl('input');
                volSlider.type = 'range';
                volSlider.className = 'tetris-slider';
                volSlider.min = '0';
                volSlider.max = '1.5';
                volSlider.step = '0.05';
                volSlider.value = String(currentConfig.volume ?? meta.defaultVol);
                volSlider.oninput = (e: any) => {
                    const v = parseFloat(e.target.value);
                    volBadge.innerText = `${Math.round(v * 100)}%`;
                    this.sfxEngine.setConfig(id, { volume: v });
                };
                volWrap.appendChild(volHeader);
                volWrap.appendChild(volSlider);

                // Pitch Slider
                const pitchWrap = createDiv();
        setCssStyles(pitchWrap, { flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' });
                const pitchHeader = createDiv();
        setCssStyles(pitchHeader, { display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#777' });
                const pitchTitle = createSpan(); pitchTitle.innerText = 'Pitch';
                const pitchBadge = createSpan(); pitchBadge.innerText = `${(currentConfig.pitchShift ?? 1.0).toFixed(2)}x`;
                pitchHeader.appendChild(pitchTitle); pitchHeader.appendChild(pitchBadge);

                const pitchSlider = createEl('input');
                pitchSlider.type = 'range';
                pitchSlider.className = 'tetris-slider';
                pitchSlider.min = '0.5';
                pitchSlider.max = '2.0';
                pitchSlider.step = '0.05';
                pitchSlider.value = String(currentConfig.pitchShift ?? 1.0);
                pitchSlider.oninput = (e: any) => {
                    const p = parseFloat(e.target.value);
                    pitchBadge.innerText = `${p.toFixed(2)}x`;
                    this.sfxEngine.setConfig(id, { pitchShift: p });
                };
                pitchWrap.appendChild(pitchHeader);
                pitchWrap.appendChild(pitchSlider);

                controlsRow.appendChild(volWrap);
                controlsRow.appendChild(pitchWrap);
                card.appendChild(controlsRow);

                cardsList.appendChild(card);
            });
        };

        nesTabBtn.onclick = () => {
            activeTab = 'nes';
            nesTabBtn.className = 'tetris-btn primary';
            psxTabBtn.className = 'tetris-btn secondary';
            renderCards();
        };

        psxTabBtn.onclick = () => {
            activeTab = 'psx';
            nesTabBtn.className = 'tetris-btn secondary';
            psxTabBtn.className = 'tetris-btn primary';
            renderCards();
        };

        this.sfxEngine.onBuffersLoaded = () => {
            renderCards();
        };

        renderCards();
        studioContainer.appendChild(cardsList);
        return studioContainer;
    }

    // ── POWER TOGGLE (single source of truth) ──
    public triggerPowerToggle() {
        const isOn = this.isConsolePowerOn || this.isControllerVisible ||
                     (!!this.overlayCanvas && this.overlayCanvas.style.display !== 'none') ||
                     this.isRunning;
        if (isOn) {
            this.triggerPowerOffSequence();
        } else {
            if (this.retroStartBtnEl) setCssStyles(this.retroStartBtnEl, { display: 'none' });
            this.pendingStartGridCreation = true;
            if (this.masterState.introEnabled) {
                this.triggerIntroAnimation(true);
            } else {
                this.finishStartGridCreation();
                this.startEmulator();
            }
        }
    }

    public ensureRetroStartButton() {
        if (!this.boxArtEl) return;

        // Always show START when console is OFF, hide it when ON/playing
        const isOff = !this.isConsolePowerOn && !this.isIntroPlaying && !this.hasIntroRun;

        if (this.retroStartBtnEl && this.retroStartBtnEl.parentElement === this.boxArtEl) {
            setCssStyles(this.retroStartBtnEl, { display: isOff ? 'flex' : 'none' });
            return;
        }

        if (this.retroStartBtnEl && this.retroStartBtnEl.parentElement) {
            this.retroStartBtnEl.parentElement.removeChild(this.retroStartBtnEl);
        }

        const startBtn = createEl('button');
        startBtn.className = 'tetris-retro-start-btn';
        startBtn.textContent = 'START';
        startBtn.title = 'Power On Console & Launch Game';

        startBtn.onclick = (e) => {
            e.stopPropagation();
            this.triggerPowerToggle();
        };

        this.boxArtEl.appendChild(startBtn);
        this.retroStartBtnEl = startBtn;
        setCssStyles(startBtn, { display: isOff ? 'flex' : 'none' });
    }

    private async saveRomStateToDisk(romKey: string, data: any, isBinary: boolean): Promise<boolean> {
        try {
            const adapter = this.plugin.app.vault.adapter;
            const dir = path.join(getPluginDir(this.plugin), 'save-states');
            if (!(await adapter.exists(dir))) {
                await adapter.mkdir(dir);
            }
            const safeKey = romKey.replace(/[^a-zA-Z0-9_.-]/g, '_');
            const filePath = `${dir}/${safeKey}.state`;

            if (isBinary) {
                const buffer = data instanceof ArrayBuffer ? data : (data.buffer || data);
                await adapter.writeBinary(filePath, buffer);
            } else {
                const jsonStr = typeof data === 'string' ? data : JSON.stringify(data);
                await adapter.write(filePath, jsonStr);
            }
            return true;
        } catch (e) {
            console.error("Failed to save state to disk:", e);
            return false;
        }
    }

    private async loadRomStateFromDisk(romKey: string, isBinary: boolean): Promise<any> {
        try {
            const adapter = this.plugin.app.vault.adapter;
            const dir = path.join(getPluginDir(this.plugin), 'save-states');
            const safeKey = romKey.replace(/[^a-zA-Z0-9_.-]/g, '_');
            const filePath = `${dir}/${safeKey}.state`;

            if (!(await adapter.exists(filePath))) {
                return null;
            }

            if (isBinary) {
                const buf = await adapter.readBinary(filePath);
                return buf;
            } else {
                const str = await adapter.read(filePath);
                return JSON.parse(str);
            }
        } catch (e) {
            console.error("Failed to load state from disk:", e);
            return null;
        }
    }



    private floatingGamepadBtn: HTMLElement | null = null;
    private floatingGamepadPos: { x: number; y: number } | null = null;

    // ── 🏁 TRUE 3D CTR WAVY SILK MESH TRANSITION ENGINE ──────────────
    private flagCanvasEl: HTMLCanvasElement | null = null;
    private flagRenderer: THREE.WebGLRenderer | null = null;
    private flagScene: THREE.Scene | null = null;
    private flagCamera: THREE.PerspectiveCamera | null = null;
    private flagMesh: THREE.Mesh | null = null;
    private flagMaterial: THREE.ShaderMaterial | null = null;
    private flagAnimFrameId: number | null = null;
    private flagSweepProgress = 1.0;
    private flagSweepMode = 0.0;
    private flagStartTime = 0;
    private flagIsAnimating = false;
    private flagCurrentSpeed = 1.30;
    private flagWaveGrowth = 1.0;
    private coverCache: Map<string, string | null> = new Map();
    private floatingGamepadWrapper: HTMLElement | null = null;

    private minimizeHud(): void {
        if (!this.containerEl) return;
        this.isMinimized = true;

        const hudRect = this.containerEl.getBoundingClientRect();
        const host = this.canvasView.containerEl || document.body;
        const parentRect = host.getBoundingClientRect();

        const triggerW = 54;
        const triggerH = 48;
        const targetLeft = this.floatingGamepadPos ? this.floatingGamepadPos.x : (parentRect.width > 200 ? 30 : 20);
        const targetTop = this.floatingGamepadPos ? this.floatingGamepadPos.y : (parentRect.height > 200 ? 30 : 20);

        const startLeft = hudRect.left - parentRect.left;
        const startTop = hudRect.top - parentRect.top;

        // Fluid morph animation from Full HUD to Floating Button
        try {
            const anim = this.containerEl.animate([
                {
                    transformOrigin: 'top left',
                    transform: 'translate(0px, 0px) scale(1)',
                    borderRadius: '28px',
                    opacity: 1
                },
                {
                    transformOrigin: 'top left',
                    transform: `translate(${targetLeft - startLeft}px, ${targetTop - startTop}px) scale(${triggerW / Math.max(1, hudRect.width)}, ${triggerH / Math.max(1, hudRect.height)})`,
                    borderRadius: '16px',
                    opacity: 0.05,
                    offset: 0.90
                },
                {
                    transformOrigin: 'top left',
                    transform: `translate(${targetLeft - startLeft}px, ${targetTop - startTop}px) scale(${triggerW / Math.max(1, hudRect.width)}, ${triggerH / Math.max(1, hudRect.height)})`,
                    borderRadius: '16px',
                    opacity: 0
                }
            ], {
                duration: 320,
                easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
                fill: 'forwards'
            });

            anim.onfinish = () => {
                if (this.containerEl) {
                    setCssStyles(this.containerEl, { display: 'none' });
                    setCssStyles(this.containerEl, { transform: '' });
                    setCssStyles(this.containerEl, { opacity: '' });
                }
                this.showFloatingGamepadTrigger();
            };
        } catch (e) {
            setCssStyles(this.containerEl, { display: 'none' });
            this.showFloatingGamepadTrigger();
        }

        // 🛑 PAUSE 3D RENDER LOOP: 100% compute freed for testing zero-overhead emulation
        if (this.animationFrameId !== null) {
            window.cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    private restoreHud(): void {
        if (!this.containerEl) return;
        this.isMinimized = false;

        const host = this.canvasView.containerEl || document.body;
        const parentRect = host.getBoundingClientRect();
        const triggerW = 54;
        const triggerH = 48;
        const targetLeft = this.floatingGamepadPos ? this.floatingGamepadPos.x : (parentRect.width > 200 ? 30 : 20);
        const targetTop = this.floatingGamepadPos ? this.floatingGamepadPos.y : (parentRect.height > 200 ? 30 : 20);

        if (this.floatingGamepadWrapper && this.floatingGamepadWrapper.parentElement) {
            this.floatingGamepadWrapper.parentElement.removeChild(this.floatingGamepadWrapper);
            this.floatingGamepadWrapper = null;
            this.floatingGamepadBtn = null;
        }

        setCssStyles(this.containerEl, { display: '' });
        const hudRect = this.containerEl.getBoundingClientRect();
        const startLeft = hudRect.left - parentRect.left;
        const startTop = hudRect.top - parentRect.top;

        // Fluid morph expansion animation from Floating Button position into Full HUD
        try {
            this.containerEl.animate([
                {
                    transformOrigin: 'top left',
                    transform: `translate(${targetLeft - startLeft}px, ${targetTop - startTop}px) scale(${triggerW / Math.max(1, hudRect.width)}, ${triggerH / Math.max(1, hudRect.height)})`,
                    borderRadius: '16px',
                    opacity: 0.15
                },
                {
                    transformOrigin: 'top left',
                    transform: 'translate(0px, 0px) scale(1)',
                    borderRadius: '28px',
                    opacity: 1
                }
            ], {
                duration: 360,
                easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
                fill: 'forwards'
            });
        } catch { /* ignore */ }

        // ▶️ RESUME 3D RENDER LOOP & ENSURE START BUTTON
        if (this.animationFrameId === null) {
            this.build3DScene();
        }
        this.ensureRetroStartButton();
    }

    private showFloatingGamepadTrigger(): void {
        if (this.floatingGamepadWrapper && this.floatingGamepadWrapper.parentElement) {
            return;
        }

        const wrapper = createDiv();
        wrapper.className = 'floating-hud-wrapper';

        const btn = createDiv();
        btn.className = 'floating-hud-trigger';
        btn.title = 'Click to Restore HUD (Drag to Move)';
        setIcon(btn, 'gamepad-2');

        // 🌟 Sub-Buttons Mini Action Dock (Appears smoothly on hover underneath floating button)
        const dock = createDiv();
        dock.className = 'floating-hud-dock';

        const createDockBtn = (iconName: string, title: string, onClick: (e: MouseEvent) => void) => {
            const dockBtn = createEl('button');
            dockBtn.className = 'floating-dock-btn';
            setIcon(dockBtn, iconName);
            dockBtn.title = title;
            dockBtn.onclick = (e) => {
                e.stopPropagation();
                onClick(e);
            };
            return dockBtn;
        };

        // 1. Power Button
        const dockPowerBtn = createDockBtn('power', 'Power On / Off Console Display & Controller', () => {
            this.triggerPowerToggle();
        });

        // 2. Reset Button
        const dockResetBtn = createDockBtn('rotate-ccw', 'Reset / Restart Game', async () => {
            if (this.isRunning) {
                this.stopEmulator();
                await this.startEmulator();
            } else if (this.selectedVaultRomPath) {
                await this.startEmulator();
            }
        });

        // 3. Save State Button
        const dockSaveBtn = createDockBtn('save', 'Quick Save Game State', async () => {
            const romKey = (this.selectedVaultRomPath || 'default_rom') + '_' + this.plugin.settings.activeSystem;
            if (this.plugin.settings.activeSystem === 'psx' && this.psxEngine) {
                const buf = await this.psxEngine.saveState();
                if (buf) {
                    this.persistentSaveStates.set(romKey, buf);
                    await this.saveRomStateToDisk(romKey, buf, true);
                    new Notice("💾 PS1 Game State Saved!");
                }
            } else if (this.nes) {
                const nesState = this.nes.toJSON();
                if (nesState) {
                    this.persistentSaveStates.set(romKey, nesState);
                    await this.saveRomStateToDisk(romKey, nesState, false);
                    new Notice("💾 NES Game State Saved!");
                }
            }
        });

        // 4. Load State Button
        const dockLoadBtn = createDockBtn('folder-down', 'Quick Load Game State', async () => {
            const romKey = (this.selectedVaultRomPath || 'default_rom') + '_' + this.plugin.settings.activeSystem;
            if (this.plugin.settings.activeSystem === 'psx') {
                let savedData = this.persistentSaveStates.get(romKey) || await this.loadRomStateFromDisk(romKey, true);
                if (this.psxEngine && savedData) {
                    await this.psxEngine.loadState(savedData);
                    new Notice("📂 PS1 Game State Restored!");
                }
            } else {
                let savedData = this.persistentSaveStates.get(romKey) || await this.loadRomStateFromDisk(romKey, false);
                if (this.nes && savedData) {
                    this.nes.fromJSON(savedData);
                    new Notice("📂 NES Game State Restored!");
                }
            }
        });

        // 5. Mute Toggle Button
        const dockMuteBtn = createDockBtn('volume-2', 'Toggle Audio Mute', () => {
            const isAudioMuted = !(this.nes ? (this.nes.opts as any).isMuted : false);
            if (this.nes) (this.nes.opts as any).isMuted = isAudioMuted;
            if (this.audioCtx) {
                if (isAudioMuted) this.audioCtx.suspend();
                else this.audioCtx.resume();
            }
            setIcon(dockMuteBtn, isAudioMuted ? 'volume-x' : 'volume-2');
        });

        // 6. Settings Button
        const dockSettingsBtn = createDockBtn('settings', 'Open HUD & Settings', () => {
            this.restoreHud();
            const adv = this.containerEl.querySelector('.tetris-advanced-content') as HTMLElement;
            if (adv) setCssStyles(adv, { display: 'flex' });
        });

        dock.appendChild(dockPowerBtn);
        dock.appendChild(dockResetBtn);
        dock.appendChild(dockSaveBtn);
        dock.appendChild(dockLoadBtn);
        dock.appendChild(dockMuteBtn);
        dock.appendChild(dockSettingsBtn);

        wrapper.appendChild(btn);
        wrapper.appendChild(dock);

        const host = this.canvasView.containerEl || document.body;
        const hostRect = host.getBoundingClientRect();
        
        let startX = this.floatingGamepadPos ? this.floatingGamepadPos.x : (hostRect.width > 200 ? 30 : 20);
        let startY = this.floatingGamepadPos ? this.floatingGamepadPos.y : (hostRect.height > 200 ? 30 : 20);

        setCssStyles(wrapper, { left: `${startX}px` });
        setCssStyles(wrapper, { top: `${startY}px` });

        let isDragging = false;
        let startPointerX = 0;
        let startPointerY = 0;
        let initialLeft = 0;
        let initialTop = 0;
        let movedDistance = 0;

        const onPointerDown = (e: PointerEvent) => {
            e.preventDefault();
            e.stopPropagation();
            isDragging = true;
            movedDistance = 0;
            startPointerX = e.clientX;
            startPointerY = e.clientY;
            initialLeft = wrapper.offsetLeft;
            initialTop = wrapper.offsetTop;
            try { btn.setPointerCapture(e.pointerId); } catch { /* ignore */ }
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            e.stopPropagation();
            const dx = e.clientX - startPointerX;
            const dy = e.clientY - startPointerY;
            movedDistance += Math.abs(dx) + Math.abs(dy);

            let newX = initialLeft + dx;
            let newY = initialTop + dy;

            const maxW = host.clientWidth - 56;
            const maxH = host.clientHeight - 56;
            newX = Math.max(8, Math.min(newX, maxW));
            newY = Math.max(8, Math.min(newY, maxH));

            setCssStyles(wrapper, { left: `${newX}px` });
            setCssStyles(wrapper, { top: `${newY}px` });
            this.floatingGamepadPos = { x: newX, y: newY };
        };

        const onPointerUp = (e: PointerEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            e.stopPropagation();
            isDragging = false;
            try { btn.releasePointerCapture(e.pointerId); } catch { /* ignore */ }

            if (this.plugin && this.plugin.settings) {
                this.plugin.settings.floatingGamepadPos = this.floatingGamepadPos;
                this.plugin.saveSettings();
            }

            if (movedDistance < 6) {
                this.restoreHud();
            }
        };

        btn.addEventListener('pointerdown', onPointerDown);
        btn.addEventListener('pointermove', onPointerMove);
        btn.addEventListener('pointerup', onPointerUp);

        host.appendChild(wrapper);
        this.floatingGamepadBtn = btn;
        this.floatingGamepadWrapper = wrapper;
    }

    // ── ✨ CELESTIAL ETHER WATERFALL & CONSOLE TRAILS ENGINE ──────────────
    private initConsoleEtherSystem(scene: THREE.Scene) {
        if (this.etherParticles && this.etherParticles.parent) {
            this.etherParticles.parent.remove(this.etherParticles);
        }
        if (this.etherRibbonMesh && this.etherRibbonMesh.parent) {
            this.etherRibbonMesh.parent.remove(this.etherRibbonMesh);
        }
        if (this.etherFloorMesh && this.etherFloorMesh.parent) {
            this.etherFloorMesh.parent.remove(this.etherFloorMesh);
        }
        if (this.etherFloorLight && this.etherFloorLight.parent) {
            this.etherFloorLight.parent.remove(this.etherFloorLight);
        }

        const s = this.masterState as any;
        const count = typeof s.etherParticleCount === 'number' ? Math.min(4000, Math.max(100, Math.round(s.etherParticleCount))) : 1200;

        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const phases = new Float32Array(count);
        const colorIndices = new Float32Array(count);
        const sizes = new Float32Array(count);
        const lifes = new Float32Array(count);

        const angles = new Float32Array(count);
        const radii = new Float32Array(count);
        const jitterX = new Float32Array(count);
        const jitterZ = new Float32Array(count);
        const heights = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            angles[i] = Math.random() * Math.PI * 2;
            radii[i] = 0.5 + Math.random() * 0.9;
            jitterX[i] = (Math.random() - 0.5) * 0.35;
            jitterZ[i] = (Math.random() - 0.5) * 0.35;
            heights[i] = Math.random();

            phases[i] = Math.random() * Math.PI * 2;
            colorIndices[i] = Math.random() * 4.0;
            sizes[i] = 0.5 + Math.random() * 0.9;
            lifes[i] = heights[i];

            positions[i * 3 + 0] = 0;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = 0;
            velocities[i * 3 + 0] = 0;
            velocities[i * 3 + 1] = 0;
            velocities[i * 3 + 2] = 0;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
        geo.setAttribute('aColorIndex', new THREE.BufferAttribute(colorIndices, 1));
        geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
        geo.setAttribute('aLife', new THREE.BufferAttribute(lifes, 1));

        this.etherGeometry = geo;
        this.etherPosBuffer = positions;
        this.etherVelBuffer = velocities;
        this.etherPhaseBuffer = phases;
        this.etherColorIndexBuffer = colorIndices;
        this.etherAngles = angles;
        this.etherRadii = radii;
        this.etherJitterX = jitterX;
        this.etherJitterZ = jitterZ;
        this.etherHeights = heights;

        const particleVertexShader = `
            uniform float uTime;
            uniform float uSize;
            uniform float uOpacity;
            
            attribute float aColorIndex;
            attribute float aSize;
            attribute float aLife;
            attribute float aPhase;
            
            varying float vColorIndex;
            varying float vAlpha;
            varying float vPosY;
            varying float vPhase;
            
            void main() {
                vColorIndex = aColorIndex;
                vAlpha = sin(clamp(aLife, 0.0, 1.0) * 3.14159265) * uOpacity;
                vPosY = position.y;
                vPhase = aPhase;
                
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = (uSize * aSize * 160.0) / max(0.1, -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `;

        const particleFragmentShader = `
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform vec3 uColor3;
            uniform vec3 uColor4;
            uniform float uTime;
            uniform float uHueShiftSpeed;
            uniform float uHueCycleFreq;
            uniform float uHueSat;
            uniform float uTwinkleIntensity;
            
            varying float vColorIndex;
            varying float vAlpha;
            varying float vPosY;
            varying float vPhase;
            
            void main() {
                vec2 coord = gl_PointCoord - vec2(0.5);
                float dist = length(coord);
                if (dist > 0.5) discard;
                
                float core = smoothstep(0.5, 0.0, dist);
                float halo = exp(-dist * 4.5);
                float intensity = core * 0.35 + halo * 0.75;
                
                // Continuous animated color hue shift & spatial vertical wave dispersion
                float huePhase = uTime * uHueShiftSpeed + vPhase * 0.4 - vPosY * (uHueCycleFreq * 0.25);
                float cIdx = mod(vColorIndex + huePhase, 4.0);
                if (cIdx < 0.0) cIdx += 4.0;
                
                vec3 col;
                if (cIdx < 1.0) {
                    col = mix(uColor1, uColor2, cIdx);
                } else if (cIdx < 2.0) {
                    col = mix(uColor2, uColor3, cIdx - 1.0);
                } else if (cIdx < 3.0) {
                    col = mix(uColor3, uColor4, cIdx - 2.0);
                } else {
                    col = mix(uColor4, uColor1, cIdx - 3.0);
                }
                
                if (uHueSat != 1.0) {
                    float lum = dot(col, vec3(0.299, 0.587, 0.114));
                    col = mix(vec3(lum), col, uHueSat);
                }
                
                // ✨ Multi-harmonic starburst scintillation & diamond sparkle glints
                float twTime = uTime * 4.2 + vPhase * 9.0;
                float tw = sin(twTime) * cos(twTime * 1.618);
                float sparkle = pow(max(0.0, tw), 4.5) * (uTwinkleIntensity * 2.2);
                
                vec2 st = abs(coord);
                float starGlint = max(smoothstep(0.04, 0.0, st.x) * smoothstep(0.45, 0.0, st.y),
                                      smoothstep(0.04, 0.0, st.y) * smoothstep(0.45, 0.0, st.x)) * sparkle * 1.5;
                
                float finalAlpha = vAlpha * (intensity * (0.8 + sparkle * 0.5) + starGlint);
                gl_FragColor = vec4(col * (1.0 + halo * 0.7 + sparkle * 1.2), finalAlpha);
            }
        `;

        const particleUniforms = {
            uTime: { value: 0.0 },
            uSize: { value: typeof s.etherParticleSize === 'number' ? s.etherParticleSize : 0.22 },
            uOpacity: { value: typeof s.etherOpacity === 'number' ? s.etherOpacity : 0.75 },
            uHueShiftSpeed: { value: typeof s.etherHueShiftSpeed === 'number' ? s.etherHueShiftSpeed : 0.80 },
            uHueCycleFreq: { value: typeof s.etherHueCycleFreq === 'number' ? s.etherHueCycleFreq : 2.0 },
            uHueSat: { value: typeof s.etherHueSat === 'number' ? s.etherHueSat : 1.0 },
            uTwinkleIntensity: { value: typeof s.etherTwinkleIntensity === 'number' ? s.etherTwinkleIntensity : 1.0 },
            uColor1: { value: new THREE.Color(s.etherColor1 || '#d8b4fe') },
            uColor2: { value: new THREE.Color(s.etherColor2 || '#7dd3fc') },
            uColor3: { value: new THREE.Color(s.etherColor3 || '#f472b6') },
            uColor4: { value: new THREE.Color(s.etherColor4 || '#fef08a') }
        };

        const particleMat = new THREE.ShaderMaterial({
            vertexShader: particleVertexShader,
            fragmentShader: particleFragmentShader,
            uniforms: particleUniforms,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthTest: true,
            depthWrite: false
        });
        this.etherParticleMaterial = particleMat;

        const particles = new THREE.Points(geo, particleMat);
        particles.frustumCulled = false;
        scene.add(particles);
        this.etherParticles = particles;

        // 🌌 Ethereal Aurora Ribbons Mesh behind console (with amphitheater curve to prevent clipping)
        const ribbonGeo = new THREE.PlaneGeometry(10.0, 6.0, 48, 32);
        const ribbonVertexShader = `
            uniform float uTime;
            uniform float uTurbulence;
            uniform float uSpeed;
            
            varying vec2 vUv;
            varying vec3 vNormal;
            
            void main() {
                vUv = uv;
                vec3 pos = position;
                
                float t = uTime * uSpeed;
                float wave1 = sin(pos.x * 0.8 + pos.y * 0.6 + t * 1.0) * (0.28 * uTurbulence);
                float wave2 = cos(pos.x * 1.2 - pos.y * 0.9 - t * 0.7) * (0.16 * uTurbulence);
                // Curve ribbon gently backwards like a grand stage backdrop
                float archZ = -pow(pos.x / 5.0, 2.0) * 1.2;
                pos.z += wave1 + wave2 + archZ;
                
                vNormal = normal;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `;

        const ribbonFragmentShader = `
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform vec3 uColor3;
            uniform vec3 uColor4;
            uniform float uOpacity;
            uniform float uTime;
            uniform float uHueShiftSpeed;
            uniform float uHueCycleFreq;
            uniform float uHueSat;
            
            varying vec2 vUv;
            varying vec3 vNormal;
            
            void main() {
                float waveShift = sin(vUv.y * 4.0 + uTime * 0.8) * 0.15;
                float huePhase = uTime * uHueShiftSpeed + vUv.y * uHueCycleFreq;
                float cIdx = mod(vUv.x * 3.0 + waveShift + huePhase, 4.0);
                if (cIdx < 0.0) cIdx += 4.0;
                
                vec3 col;
                if (cIdx < 1.0) {
                    col = mix(uColor1, uColor2, cIdx);
                } else if (cIdx < 2.0) {
                    col = mix(uColor2, uColor3, cIdx - 1.0);
                } else if (cIdx < 3.0) {
                    col = mix(uColor3, uColor4, cIdx - 2.0);
                } else {
                    col = mix(uColor4, uColor1, cIdx - 3.0);
                }
                
                if (uHueSat != 1.0) {
                    float lum = dot(col, vec3(0.299, 0.587, 0.114));
                    col = mix(vec3(lum), col, uHueSat);
                }
                
                float edgeFadeY = sin(vUv.y * 3.14159265);
                float edgeFadeX = sin(vUv.x * 3.14159265);
                float alpha = edgeFadeY * edgeFadeX * (uOpacity * 0.55);
                
                gl_FragColor = vec4(col, alpha);
            }
        `;

        const ribbonUniforms = {
            uTime: { value: 0.0 },
            uTurbulence: { value: typeof s.etherCurlSwayX === 'number' ? s.etherCurlSwayX : (s.etherTurbulence ?? 0.65) },
            uSpeed: { value: typeof s.etherFlowSpeed === 'number' ? s.etherFlowSpeed : 1.20 },
            uOpacity: { value: typeof s.etherOpacity === 'number' ? s.etherOpacity : 0.75 },
            uHueShiftSpeed: { value: typeof s.etherHueShiftSpeed === 'number' ? s.etherHueShiftSpeed : 0.80 },
            uHueCycleFreq: { value: typeof s.etherHueCycleFreq === 'number' ? s.etherHueCycleFreq : 2.0 },
            uHueSat: { value: typeof s.etherHueSat === 'number' ? s.etherHueSat : 1.0 },
            uColor1: { value: new THREE.Color(s.etherColor1 || '#d8b4fe') },
            uColor2: { value: new THREE.Color(s.etherColor2 || '#7dd3fc') },
            uColor3: { value: new THREE.Color(s.etherColor3 || '#f472b6') },
            uColor4: { value: new THREE.Color(s.etherColor4 || '#fef08a') }
        };

        const ribbonMat = new THREE.ShaderMaterial({
            vertexShader: ribbonVertexShader,
            fragmentShader: ribbonFragmentShader,
            uniforms: ribbonUniforms,
            transparent: true,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthTest: true,
            depthWrite: false
        });
        this.etherRibbonMaterial = ribbonMat;

        const auroraPosZ = typeof s.etherAuroraPosZ === 'number' ? s.etherAuroraPosZ : -2.5;
        const auroraPosY = typeof s.etherAuroraPosY === 'number' ? s.etherAuroraPosY : 0.4;
        const auroraScaleX = typeof s.etherAuroraScaleX === 'number' ? s.etherAuroraScaleX : 7.5;

        const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
        ribbonMesh.position.set(0, auroraPosY, auroraPosZ);
        ribbonMesh.scale.set(auroraScaleX / 7.5, 1.0, 1.0);
        scene.add(ribbonMesh);
        this.etherRibbonMesh = ribbonMesh;

        // 💡 Floor Caustics Light Pool Mesh
        const floorGeo = new THREE.PlaneGeometry(8.0, 6.0, 32, 32);
        const floorVertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;
        const floorFragmentShader = `
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform float uOpacity;
            uniform float uTime;
            varying vec2 vUv;
            void main() {
                vec2 center = vUv - vec2(0.5);
                float dist = length(center);
                if (dist > 0.5) discard;
                float pool = exp(-dist * 4.5);
                float caustic = sin(vUv.x * 12.0 + uTime * 2.0) * cos(vUv.y * 12.0 - uTime * 1.8) * 0.18;
                float intensity = clamp(pool + caustic * pool, 0.0, 1.0);
                vec3 col = mix(uColor1, uColor2, vUv.x);
                gl_FragColor = vec4(col, intensity * (uOpacity * 0.45));
            }
        `;
        const floorUniforms = {
            uTime: { value: 0.0 },
            uOpacity: { value: typeof s.etherFloorLightIntensity === 'number' ? s.etherFloorLightIntensity : 0.85 },
            uColor1: { value: new THREE.Color(s.etherColor1 || '#d8b4fe') },
            uColor2: { value: new THREE.Color(s.etherColor2 || '#7dd3fc') }
        };
        const floorMat = new THREE.ShaderMaterial({
            vertexShader: floorVertexShader,
            fragmentShader: floorFragmentShader,
            uniforms: floorUniforms,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        this.etherFloorMaterial = floorMat;

        const floorMesh = new THREE.Mesh(floorGeo, floorMat);
        floorMesh.rotation.x = -Math.PI / 2;
        floorMesh.position.set(0, -1.35, -0.3);
        scene.add(floorMesh);
        this.etherFloorMesh = floorMesh;

        // Dynamic Underside Point Light
        const floorLight = new THREE.PointLight(new THREE.Color(s.etherColor2 || '#7dd3fc'), s.etherFloorLightIntensity ?? 0.85, 5.0);
        floorLight.position.set(0, -0.5, -0.3);
        scene.add(floorLight);
        this.etherFloorLight = floorLight;
    }

    private updateConsoleEtherSystem(delta: number, elapsed: number) {
        const s = this.masterState as any;
        if (s.etherEnabled === false) {
            if (this.etherParticles) this.etherParticles.visible = false;
            if (this.etherRibbonMesh) this.etherRibbonMesh.visible = false;
            if (this.etherFloorMesh) this.etherFloorMesh.visible = false;
            if (this.etherFloorLight) this.etherFloorLight.visible = false;
            return;
        }

        if (this.etherParticles) this.etherParticles.visible = true;
        if (this.etherRibbonMesh) {
            this.etherRibbonMesh.visible = (s.etherMode === 'aurora' || s.etherMode === 'waterfall');
            const auroraZ = typeof s.etherAuroraPosZ === 'number' ? s.etherAuroraPosZ : -2.5;
            const auroraY = typeof s.etherAuroraPosY === 'number' ? s.etherAuroraPosY : 0.4;
            const auroraWidth = typeof s.etherAuroraScaleX === 'number' ? s.etherAuroraScaleX : 7.5;
            this.etherRibbonMesh.position.set(0, auroraY, auroraZ);
            this.etherRibbonMesh.scale.set(auroraWidth / 7.5, 1.0, 1.0);
        }

        if (this.etherFloorMesh) {
            this.etherFloorMesh.visible = (s.etherFloorLightEnabled !== false);
        }
        if (this.etherFloorLight) {
            this.etherFloorLight.visible = (s.etherFloorLightEnabled !== false);
        }

        const mode = s.etherMode || 'waterfall';
        const flowSpeed = (typeof s.etherFlowSpeed === 'number' ? s.etherFlowSpeed : 1.20) * (this.isSpinSwitching ? (s.etherSpinVortexMult ?? 2.2) : 1.0);
        const spreadX = typeof s.etherSpreadX === 'number' ? s.etherSpreadX : (s.etherTrailSpread ?? 2.6);
        const spreadZ = typeof s.etherSpreadZ === 'number' ? s.etherSpreadZ : 1.8;
        const dropHeight = typeof s.etherDropHeight === 'number' ? s.etherDropHeight : 4.5;
        const swayX = typeof s.etherCurlSwayX === 'number' ? s.etherCurlSwayX : (s.etherTurbulence ?? 0.65);
        const swayZ = typeof s.etherCurlSwayZ === 'number' ? s.etherCurlSwayZ : 0.55;
        const curlFreq = typeof s.etherCurlFreq === 'number' ? s.etherCurlFreq : 1.6;
        const curlSpeed = typeof s.etherCurlSpeed === 'number' ? s.etherCurlSpeed : 1.3;
        const gravity = typeof s.etherGravity === 'number' ? s.etherGravity : 1.0;
        const hueShiftSpeed = typeof s.etherHueShiftSpeed === 'number' ? s.etherHueShiftSpeed : 0.80;
        const hueCycleFreq = typeof s.etherHueCycleFreq === 'number' ? s.etherHueCycleFreq : 2.0;
        const hueSat = typeof s.etherHueSat === 'number' ? s.etherHueSat : 1.0;
        const opacity = typeof s.etherOpacity === 'number' ? s.etherOpacity : 0.75;
        const size = typeof s.etherParticleSize === 'number' ? s.etherParticleSize : 0.22;
        const twinkleIntensity = typeof s.etherTwinkleIntensity === 'number' ? s.etherTwinkleIntensity : 1.0;
        const floorIntensity = typeof s.etherFloorLightIntensity === 'number' ? s.etherFloorLightIntensity : 0.85;

        if (this.etherParticleMaterial) {
            const u = this.etherParticleMaterial.uniforms;
            u.uTime.value = elapsed;
            u.uSize.value = size;
            u.uOpacity.value = opacity;
            u.uHueShiftSpeed.value = hueShiftSpeed;
            u.uHueCycleFreq.value = hueCycleFreq;
            u.uHueSat.value = hueSat;
            u.uTwinkleIntensity.value = twinkleIntensity;
            u.uColor1.value.set(s.etherColor1 || '#d8b4fe');
            u.uColor2.value.set(s.etherColor2 || '#7dd3fc');
            u.uColor3.value.set(s.etherColor3 || '#f472b6');
            u.uColor4.value.set(s.etherColor4 || '#fef08a');
        }

        if (this.etherRibbonMaterial) {
            const u = this.etherRibbonMaterial.uniforms;
            u.uTime.value = elapsed;
            u.uTurbulence.value = swayX;
            u.uSpeed.value = flowSpeed;
            u.uOpacity.value = opacity;
            u.uHueShiftSpeed.value = hueShiftSpeed;
            u.uHueCycleFreq.value = hueCycleFreq;
            u.uHueSat.value = hueSat;
            u.uColor1.value.set(s.etherColor1 || '#d8b4fe');
            u.uColor2.value.set(s.etherColor2 || '#7dd3fc');
            u.uColor3.value.set(s.etherColor3 || '#f472b6');
            u.uColor4.value.set(s.etherColor4 || '#fef08a');
        }

        if (this.etherFloorMaterial) {
            const u = this.etherFloorMaterial.uniforms;
            u.uTime.value = elapsed;
            u.uOpacity.value = floorIntensity;
            u.uColor1.value.set(s.etherColor1 || '#d8b4fe');
            u.uColor2.value.set(s.etherColor2 || '#7dd3fc');
        }

        if (this.etherFloorLight) {
            this.etherFloorLight.intensity = floorIntensity * (0.85 + Math.sin(elapsed * 2.0) * 0.15);
            this.etherFloorLight.color.set(s.etherColor2 || '#7dd3fc');
        }

        const isNes = (this.plugin.settings.activeSystem === 'nes');

        // Console Idle Hover Floating & 3D Parallax Tilt Breathing
        if (this.activeConsoleGroupRef) {
            const hoverAmp = (s.etherHoverEnabled !== false) ? (typeof s.etherHoverAmplitude === 'number' ? s.etherHoverAmplitude : 0.06) : 0.0;
            const hoverSpeed = typeof s.etherHoverSpeed === 'number' ? s.etherHoverSpeed : 1.5;
            const hoverOffset = Math.sin(elapsed * hoverSpeed) * hoverAmp;
            const basePosY = isNes ? 0.0 : (Number.isFinite(s.ps1PosY) ? s.ps1PosY - 1.45 : 0.0);
            this.activeConsoleGroupRef.position.y = basePosY + hoverOffset;

            if (s.etherParallaxTilt !== false) {
                const pStrength = typeof s.etherParallaxStrength === 'number' ? s.etherParallaxStrength : 0.08;
                const targetTiltX = this.etherMouseNDC.active ? -this.etherMouseNDC.y * (pStrength * 0.8) : 0.0;
                const targetTiltY = this.etherMouseNDC.active ? this.etherMouseNDC.x * (pStrength * 1.2) : 0.0;
                const targetTiltZ = this.etherMouseNDC.active ? -this.etherMouseNDC.x * (pStrength * 0.4) : 0.0;

                this.consoleTiltX += (targetTiltX - this.consoleTiltX) * 0.08;
                this.consoleTiltY += (targetTiltY - this.consoleTiltY) * 0.08;
                this.consoleTiltZ += (targetTiltZ - this.consoleTiltZ) * 0.08;

                this.activeConsoleGroupRef.rotation.x = this.consoleTiltX;
                this.activeConsoleGroupRef.rotation.y = this.consoleTiltY + this.consoleSpinY;
                this.activeConsoleGroupRef.rotation.z = this.consoleTiltZ;
            }
        }

        if (!this.etherGeometry || !this.etherPosBuffer || !this.etherHeights || !this.etherAngles || !this.etherRadii || !this.etherJitterX || !this.etherJitterZ) return;
        const positions = this.etherPosBuffer;
        const phases = this.etherPhaseBuffer!;
        const lifes = this.etherGeometry.attributes.aLife.array as Float32Array;
        const heights = this.etherHeights;
        const angles = this.etherAngles;
        const radii = this.etherRadii;
        const jitterX = this.etherJitterX;
        const jitterZ = this.etherJitterZ;
        const count = positions.length / 3;

        const baseCenterX = 0.0;
        const baseCenterY = isNes ? 1.05 : (s.ps1PosY ?? 1.45);
        const baseCenterZ = isNes ? -0.3 : (s.ps1PosZ ?? -0.3);

        const mouseActive = (s.etherMouseInteraction !== false) && this.etherMouseNDC.active;
        const mouseWorldX = this.etherMouseNDC.x * 3.6;
        const mouseWorldY = this.etherMouseNDC.y * 2.2 + baseCenterY;
        const mouseForce = typeof s.etherMouseForce === 'number' ? s.etherMouseForce : 1.2;
        const mouseRadius = 1.45;

        const dt = Math.min(delta, 0.05);

        for (let i = 0; i < count; i++) {
            const idx = i * 3;
            const phase = phases[i];

            // Advance vertical progress
            let h = heights[i] + dt * (flowSpeed * 0.30);
            if (h >= 1.0) {
                h = 0.0;
                angles[i] = Math.random() * Math.PI * 2;
                radii[i] = 0.5 + Math.random() * 0.9;
                jitterX[i] = (Math.random() - 0.5) * 0.35;
                jitterZ[i] = (Math.random() - 0.5) * 0.35;
            }
            heights[i] = h;
            lifes[i] = h;

            // Direct real-time responsive width & depth expansion
            const rX = radii[i] * (spreadX * 0.5);
            const rZ = radii[i] * (spreadZ * 0.5);
            const baseAngle = angles[i];

            // 3D Harmonic Curl & Drift
            const curlX = Math.sin(elapsed * curlSpeed + phase + h * (curlFreq * 3.14159)) * swayX;
            const curlZ = Math.cos(elapsed * (curlSpeed * 0.9) + phase + h * (curlFreq * 2.8)) * swayZ;

            let posX = 0.0;
            let posY = 0.0;
            let posZ = 0.0;

            // Ascending Spirit Splash Embers
            const isSplashEmber = (s.etherSplashEmbers !== false) && (i % 4 === 0);
            if (mode === 'waterfall' && isSplashEmber && h > 0.65) {
                const emberProgress = (h - 0.65) / 0.35;
                const emberRise = Math.sin(emberProgress * 3.14159) * (dropHeight * 0.6);
                const splashAngle = baseAngle + emberProgress * 4.0;
                const splashRadius = rX * (1.0 + emberProgress * 1.2);
                posX = baseCenterX + Math.cos(splashAngle) * splashRadius + curlX * 1.5;
                posY = (baseCenterY + 0.1) - (dropHeight * 0.65) + emberRise;
                posZ = baseCenterZ + Math.sin(splashAngle) * (rZ * (1.0 + emberProgress * 1.2)) + curlZ;
            } else if (mode === 'waterfall') {
                posY = (baseCenterY + 0.1) - h * dropHeight * gravity;
                posX = baseCenterX + Math.cos(baseAngle) * rX + jitterX[i] + curlX;
                posZ = baseCenterZ + Math.sin(baseAngle) * rZ + jitterZ[i] + curlZ;
            } else if (mode === 'nebula') {
                posY = (baseCenterY - 0.4) + h * dropHeight * gravity;
                posX = baseCenterX + Math.cos(baseAngle) * rX + jitterX[i] + curlX;
                posZ = baseCenterZ + Math.sin(baseAngle) * rZ + jitterZ[i] + curlZ;
            } else if (mode === 'aurora') {
                posY = (baseCenterY + 0.5) - h * (dropHeight * 0.8);
                posX = baseCenterX + (Math.cos(baseAngle) * rX * 1.5) + curlX * 1.5;
                posZ = (baseCenterZ - 1.5) + Math.sin(baseAngle) * (rZ * 0.5) + curlZ;
            } else if (mode === 'vortex') {
                const curAngle = baseAngle + elapsed * (1.8 * flowSpeed);
                posX = baseCenterX + Math.cos(curAngle) * rX + curlX * 0.3;
                posY = baseCenterY + Math.sin(elapsed * 2.0 + phase) * 0.35 + (h - 0.5) * (dropHeight * 0.4);
                posZ = baseCenterZ + Math.sin(curAngle) * rZ + curlZ * 0.3;
            }

            // Interactive Cursor Fluid Wake & Magnetic Swirl
            if (mouseActive) {
                const dx = posX - mouseWorldX;
                const dy = posY - mouseWorldY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouseRadius && dist > 0.01) {
                    const normD = (1.0 - dist / mouseRadius);
                    const push = normD * normD * mouseForce;
                    posX += (dx / dist) * (push * 0.55) - (dy / dist) * (push * 0.40);
                    posY += (dy / dist) * (push * 0.55) + (dx / dist) * (push * 0.40);
                    posZ += Math.sin(dist * 6.0 - elapsed * 6.0) * (push * 0.30);
                }
            }

            positions[idx + 0] = posX;
            positions[idx + 1] = posY;
            positions[idx + 2] = posZ;
        }

        this.etherGeometry.attributes.position.needsUpdate = true;
        this.etherGeometry.attributes.aLife.needsUpdate = true;
    }

    private buildEtherStudio(): HTMLElement {
        const container = createDiv();
        container.className = 'ether-studio-container';

        let saveTimer: any = null;
        const debouncedSave = () => {
            if (saveTimer) window.clearTimeout(saveTimer);
            saveTimer = window.setTimeout(() => {
                if (this.plugin && this.plugin.settings) {
                    this.plugin.settings.masterState = Object.assign({}, this.masterState);
                    this.plugin.saveSettings();
                }
            }, 250);
        };

        const makeSectionTitle = (titleText: string) => {
            const title = createDiv();
            title.className = 'card-title';
        setCssStyles(title, { fontSize: '11px', fontWeight: '700', color: '#ffffff', marginTop: '8px', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.4px' });
            title.innerText = titleText;
            return title;
        };

        const makeSlider = (label: string, min: number, max: number, step: number, getValue: () => number, setValue: (val: number) => void, description?: string) => {
            const card = createDiv();
            card.className = 'tetris-slider-card';

            const header = createDiv();
            header.className = 'card-header';

            const title = createSpan();
            title.className = 'card-title';
            title.innerText = label;

            const numInput = createEl('input');
            numInput.type = 'number';
            numInput.step = String(step);
            numInput.className = 'card-badge';
            numInput.value = Number(getValue().toFixed(step < 0.01 ? 3 : (step < 0.1 ? 2 : 1))).toString();

            header.appendChild(title);
            header.appendChild(numInput);
            card.appendChild(header);

            if (description) {
                const desc = createDiv();
                desc.className = 'card-desc';
                desc.innerText = description;
                card.appendChild(desc);
            }

            const range = createEl('input');
            range.type = 'range';
            range.min = min.toString();
            range.max = max.toString();
            range.step = step.toString();
            range.value = getValue().toString();
            range.className = 'tetris-slider';

            range.oninput = (e) => {
                const num = parseFloat((e.target as HTMLInputElement).value);
                setValue(num);
                numInput.value = Number(num.toFixed(step < 0.01 ? 3 : (step < 0.1 ? 2 : 1))).toString();
                debouncedSave();
            };

            numInput.oninput = (e) => {
                const valStr = (e.target as HTMLInputElement).value;
                const v = parseFloat(valStr);
                if (!isNaN(v)) {
                    setValue(v);
                    range.value = String(v);
                    debouncedSave();
                }
            };

            numInput.addEventListener('keydown', (e) => e.stopPropagation());
            numInput.addEventListener('keyup', (e) => e.stopPropagation());
            numInput.addEventListener('mousedown', (e) => e.stopPropagation());
            card.addEventListener('mousedown', (e) => e.stopPropagation());
            card.addEventListener('pointerdown', (e) => e.stopPropagation());

            card.appendChild(range);
            return card;
        };

        const makeToggle = (label: string, getVal: () => boolean, setVal: (val: boolean) => void) => {
            const btn = createEl('button');
            btn.className = 'tetris-suite-btn' + (getVal() ? ' pin-btn active' : ' pin-btn');
            btn.innerText = label + ': ' + (getVal() ? 'ON' : 'OFF');
            btn.onclick = () => {
                const cur = getVal();
                setVal(!cur);
                btn.innerText = label + ': ' + (!cur ? 'ON' : 'OFF');
                btn.className = 'tetris-suite-btn' + (!cur ? ' pin-btn active' : ' pin-btn');
                debouncedSave();
            };
            return btn;
        };

        const makeColorRow = (label: string, getVal: () => string, setVal: (c: string) => void, desc?: string) => {
            const card = createDiv();
            card.className = 'tetris-slider-card';

            const header = createDiv();
            header.className = 'card-header';

            const title = createSpan();
            title.className = 'card-title';
            title.innerText = label;

            const input = createEl('input');
            input.type = 'color';
            input.value = getVal();
            setCssStyles(input, { width: '44px' });
            setCssStyles(input, { height: '26px' });
            setCssStyles(input, { border: '1.5px solid rgba(255, 255, 255, 0.3)' });
            setCssStyles(input, { borderRadius: '4px' });
            setCssStyles(input, { cursor: 'pointer' });
            setCssStyles(input, { background: 'transparent' });
            input.oninput = (e) => {
                const col = (e.target as HTMLInputElement).value;
                setVal(col);
                debouncedSave();
            };

            header.appendChild(title);
            header.appendChild(input);
            card.appendChild(header);

            if (desc) {
                const descEl = createDiv();
                descEl.className = 'card-desc';
                descEl.innerText = desc;
                card.appendChild(descEl);
            }
            return card;
        };

        // 1. Master On/Off Toggle
        container.appendChild(makeToggle('✨ MASTER CELESTIAL ETHER EFFECT', () => (this.masterState as any).etherEnabled !== false, v => (this.masterState as any).etherEnabled = v));

        // 2. Flow Mode Selector Title & Grid
        container.appendChild(makeSectionTitle('🌊 CELESTIAL ETHER FLOW MODE'));

        const modeGrid = createDiv();
        modeGrid.className = 'ether-mode-grid';

        const modes: { id: string; label: string; desc: string }[] = [
            { id: 'waterfall', label: '🌊 WATERFALL', desc: 'Cascading downward pastel stream' },
            { id: 'aurora', label: '🌌 AURORA', desc: 'Flowing wavy celestial ribbons' },
            { id: 'nebula', label: '☁️ SPIRIT MIST', desc: 'Ascending ethereal incense & embers' },
            { id: 'vortex', label: '🌀 VORTEX', desc: 'Orbital swirling spiral rings' }
        ];

        const modeButtons: HTMLButtonElement[] = [];

        modes.forEach(m => {
            const btn = createEl('button');
            btn.className = 'ether-mode-btn' + (((this.masterState as any).etherMode || 'waterfall') === m.id ? ' active' : '');
            btn.innerText = m.label;
            btn.title = m.desc;
            btn.onclick = () => {
                (this.masterState as any).etherMode = m.id;
                modeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                debouncedSave();
                new Notice(`✨ Ethereal Mode: ${m.label}`);
            };
            modeButtons.push(btn);
            modeGrid.appendChild(btn);
        });
        container.appendChild(modeGrid);

        // 3. 🧲 LIVING MOUSE INTERACTION & 3D GYRO PARALLAX
        container.appendChild(makeSectionTitle('🧲 LIVING MOUSE INTERACTION & 3D GYRO PARALLAX'));

        container.appendChild(makeToggle('🧲 CURSOR MAGNETIC FLUID WAKE', () => (this.masterState as any).etherMouseInteraction !== false, v => (this.masterState as any).etherMouseInteraction = v));

        container.appendChild(makeSlider('CURSOR FLUID FORCE (SWIRL)', 0.20, 3.00, 0.10, () => (this.masterState as any).etherMouseForce ?? 1.20, v => (this.masterState as any).etherMouseForce = v, 'Magnetic swirl and wake displacement power when moving mouse across ether.'));

        container.appendChild(makeToggle('🕹️ 3D MOUSE PARALLAX FLOAT TILT', () => (this.masterState as any).etherParallaxTilt !== false, v => (this.masterState as any).etherParallaxTilt = v));

        container.appendChild(makeSlider('3D PARALLAX TILT AMPLITUDE', 0.01, 0.25, 0.005, () => (this.masterState as any).etherParallaxStrength ?? 0.08, v => (this.masterState as any).etherParallaxStrength = v, 'Subtle zero-gravity tilt banking angle of the floating console toward cursor.'));

        // 4. ✨ MICRO-SCINTILLATION & TWINKLE
        container.appendChild(makeSectionTitle('✨ MICRO-SCINTILLATION & STARBURST TWINKLE'));

        container.appendChild(makeSlider('STARBURST TWINKLE & GLINT BRILLIANCE', 0.00, 3.00, 0.10, () => (this.masterState as any).etherTwinkleIntensity ?? 1.00, v => (this.masterState as any).etherTwinkleIntensity = v, 'Organic diamond sparkle glints and prismatic starburst scintillation.'));

        // 5. 💡 FLOOR CAUSTICS & UNDERSIDE LIGHT POOL
        container.appendChild(makeSectionTitle('💡 FLOOR CAUSTICS & UNDERSIDE LIGHT POOL'));

        container.appendChild(makeToggle('💡 FLOOR CAUSTICS & RIM LIGHT', () => (this.masterState as any).etherFloorLightEnabled !== false, v => (this.masterState as any).etherFloorLightEnabled = v));

        container.appendChild(makeSlider('FLOOR LIGHT ILLUMINATION INTENSITY', 0.00, 2.00, 0.05, () => (this.masterState as any).etherFloorLightIntensity ?? 0.85, v => (this.masterState as any).etherFloorLightIntensity = v, 'Brightness of the pulsating floor caustics pool and underside chassis glow.'));

        // 6. ☁️ ASCENDING SPIRIT SPLASH EMBERS
        container.appendChild(makeSectionTitle('☁️ ASCENDING SPIRIT SPLASH EMBERS'));

        container.appendChild(makeToggle('☁️ ASCENDING SPLASH EMBERS', () => (this.masterState as any).etherSplashEmbers !== false, v => (this.masterState as any).etherSplashEmbers = v));

        // 7. 🌈 ANIMATED COLOR HUE SHIFTING CONTROLS
        container.appendChild(makeSectionTitle('🌈 ANIMATED COLOR HUE SHIFTING & SPECTRAL ROTATION'));

        container.appendChild(makeSlider('HUE SHIFT ANIMATION SPEED', 0.00, 4.00, 0.05, () => (this.masterState as any).etherHueShiftSpeed ?? 0.80, v => (this.masterState as any).etherHueShiftSpeed = v, 'Continuous spectral rotation speed cycling dynamically through the pastel colors (0.0 = Static).'));

        container.appendChild(makeSlider('HUE COLOR WAVE FREQUENCY', 0.20, 6.00, 0.10, () => (this.masterState as any).etherHueCycleFreq ?? 2.00, v => (this.masterState as any).etherHueCycleFreq = v, 'How rapidly rainbow color bands wrap vertically along the waterfall height.'));

        container.appendChild(makeSlider('HUE COLOR SATURATION / VIBRANCE', 0.00, 2.00, 0.05, () => (this.masterState as any).etherHueSat ?? 1.00, v => (this.masterState as any).etherHueSat = v, 'Color saturation and chromatic vibrancy of the animated pastel glow.'));

        // 8. Preset Palettes
        container.appendChild(makeSectionTitle('⚡ PASTEL PALETTE PRESETS'));

        const presetGrid = createDiv();
        presetGrid.className = 'ether-preset-grid';

        const presets = [
            { label: '🦪 Opal Nacre', c1: '#d8b4fe', c2: '#7dd3fc', c3: '#f472b6', c4: '#fef08a' },
            { label: '🌌 Aurora', c1: '#34d399', c2: '#38bdf8', c3: '#818cf8', c4: '#fcd34d' },
            { label: '🦄 Prism', c1: '#f472b6', c2: '#c084fc', c3: '#60a5fa', c4: '#4ade80' },
            { label: '🍸 Champagne', c1: '#fbbf24', c2: '#f472b6', c3: '#fed7aa', c4: '#ffffff' },
            { label: '🌙 Moonlight', c1: '#6366f1', c2: '#a855f7', c3: '#93c5fd', c4: '#e2e8f0' },
            { label: '🍑 Sunset', c1: '#fb7185', c2: '#f59e0b', c3: '#f43f5e', c4: '#fda4af' }
        ];

        presets.forEach(p => {
            const btn = createEl('button');
            btn.className = 'ether-preset-btn';
            btn.innerText = p.label;
            btn.onclick = () => {
                const s = this.masterState as any;
                s.etherColor1 = p.c1;
                s.etherColor2 = p.c2;
                s.etherColor3 = p.c3;
                s.etherColor4 = p.c4;
                debouncedSave();
                new Notice(`✨ Applied Preset: ${p.label}`);
            };
            presetGrid.appendChild(btn);
        });
        container.appendChild(presetGrid);

        // 9. Color Pickers (4-way pastel gradient)
        const colorGrid = createDiv();
        colorGrid.className = 'ether-color-grid';
        colorGrid.appendChild(makeColorRow('COLOR 1 (LILAC)', () => (this.masterState as any).etherColor1 || '#d8b4fe', c => (this.masterState as any).etherColor1 = c));
        colorGrid.appendChild(makeColorRow('COLOR 2 (CYAN)', () => (this.masterState as any).etherColor2 || '#7dd3fc', c => (this.masterState as any).etherColor2 = c));
        colorGrid.appendChild(makeColorRow('COLOR 3 (ROSE)', () => (this.masterState as any).etherColor3 || '#f472b6', c => (this.masterState as any).etherColor3 = c));
        colorGrid.appendChild(makeColorRow('COLOR 4 (GOLD)', () => (this.masterState as any).etherColor4 || '#fef08a', c => (this.masterState as any).etherColor4 = c));
        container.appendChild(colorGrid);

        // 10. 🌊 WATERFALL PHYSICAL DIMENSIONS & DROP HEIGHT
        container.appendChild(makeSectionTitle('🌊 WATERFALL PHYSICAL DIMENSIONS & DROP HEIGHT'));

        container.appendChild(makeSlider('WATERFALL WIDTH (SPREAD X)', 0.50, 8.00, 0.10, () => (this.masterState as any).etherSpreadX ?? (this.masterState as any).etherTrailSpread ?? 2.6, v => {
            (this.masterState as any).etherSpreadX = v;
            (this.masterState as any).etherTrailSpread = v;
        }, 'Horizontal width span of the cascading waterfall stream (real-time responsive).'));

        container.appendChild(makeSlider('WATERFALL DEPTH (SPREAD Z)', 0.50, 6.00, 0.10, () => (this.masterState as any).etherSpreadZ ?? 1.8, v => {
            (this.masterState as any).etherSpreadZ = v;
        }, 'Front-to-back thickness and depth perimeter around the console (real-time responsive).'));

        container.appendChild(makeSlider('WATERFALL VERTICAL DROP (MAX HEIGHT)', 1.00, 10.00, 0.20, () => (this.masterState as any).etherDropHeight ?? 4.5, v => (this.masterState as any).etherDropHeight = v, 'How deep the waterfall cascades down before recycling into the mist.'));

        container.appendChild(makeSlider('VERTICAL GRAVITY ACCELERATION', 0.20, 4.00, 0.10, () => (this.masterState as any).etherGravity ?? 1.0, v => (this.masterState as any).etherGravity = v, 'Downward waterfall fall acceleration speed.'));

        // 11. 🌀 CURL & DRIFT DIMENSIONAL CONTROLS
        container.appendChild(makeSectionTitle('🌀 CURL & DRIFT DIMENSIONAL CONTROLS'));

        container.appendChild(makeSlider('CURL HORIZONTAL DRIFT (SWAY X)', 0.00, 3.00, 0.05, () => (this.masterState as any).etherCurlSwayX ?? (this.masterState as any).etherTurbulence ?? 0.65, v => {
            (this.masterState as any).etherCurlSwayX = v;
            (this.masterState as any).etherTurbulence = v;
        }, 'Horizontal left/right curling sway amplitude.'));

        container.appendChild(makeSlider('CURL DEPTH DRIFT (SWAY Z)', 0.00, 3.00, 0.05, () => (this.masterState as any).etherCurlSwayZ ?? 0.55, v => (this.masterState as any).etherCurlSwayZ = v, 'Front-to-back swirling depth displacement amplitude.'));

        container.appendChild(makeSlider('CURL WAVE FREQUENCY (RIPPLE TIGHTNESS)', 0.20, 5.00, 0.10, () => (this.masterState as any).etherCurlFreq ?? 1.6, v => (this.masterState as any).etherCurlFreq = v, 'Density and tightness of the 3D spiral curl loops along the stream.'));

        container.appendChild(makeSlider('CURL SWIRL SPEED (DRIFT TEMPO)', 0.10, 4.00, 0.05, () => (this.masterState as any).etherCurlSpeed ?? 1.3, v => (this.masterState as any).etherCurlSpeed = v, 'Velocity of the undulating air currents and curl motion.'));

        // 12. 🌌 AURORA BACKDROP PLACEMENT & OCCLUSION
        container.appendChild(makeSectionTitle('🌌 AURORA BACKDROP PLACEMENT (NO-CLIPPING)'));

        container.appendChild(makeSlider('AURORA BACKDROP DISTANCE (DEPTH Z)', -5.00, -1.20, 0.10, () => (this.masterState as any).etherAuroraPosZ ?? -2.50, v => (this.masterState as any).etherAuroraPosZ = v, 'Depth distance behind console model so the aurora never intersects or clips console plastic.'));

        container.appendChild(makeSlider('AURORA ELEVATION (HEIGHT Y)', -2.00, 3.00, 0.10, () => (this.masterState as any).etherAuroraPosY ?? 0.40, v => (this.masterState as any).etherAuroraPosY = v, 'Vertical height elevation of the aurora backdrop ribbons.'));

        container.appendChild(makeSlider('AURORA CURTAIN BREADTH (WIDTH)', 2.00, 16.00, 0.20, () => (this.masterState as any).etherAuroraScaleX ?? 7.50, v => (this.masterState as any).etherAuroraScaleX = v, 'Horizontal breadth and span of the aurora curtain.'));

        // 13. 🎛️ PARTICLE SPRITES & IDLE DYNAMICS
        container.appendChild(makeSectionTitle('🎛️ PARTICLE SPRITES & IDLE DYNAMICS'));

        container.appendChild(makeSlider('PARTICLE DENSITY (COUNT)', 100, 3000, 50, () => (this.masterState as any).etherParticleCount ?? 1200, v => {
            (this.masterState as any).etherParticleCount = v;
            if (this.activeSceneRef) this.initConsoleEtherSystem(this.activeSceneRef);
        }, 'Total number of shimmering ethereal particle motes in the 3D scene.'));

        container.appendChild(makeSlider('PARTICLE GLOW RADIUS (SIZE)', 0.05, 0.80, 0.01, () => (this.masterState as any).etherParticleSize ?? 0.22, v => (this.masterState as any).etherParticleSize = v, 'Visual particle sprite scale and soft glow radius.'));

        container.appendChild(makeSlider('FLOW VELOCITY (BASE SPEED)', 0.10, 4.00, 0.05, () => (this.masterState as any).etherFlowSpeed ?? 1.20, v => (this.masterState as any).etherFlowSpeed = v, 'Base movement speed of cascading waterfall motes and undulating aurora ribbons.'));

        container.appendChild(makeSlider('ETHER OPACITY (INTENSITY)', 0.00, 1.50, 0.05, () => (this.masterState as any).etherOpacity ?? 0.75, v => (this.masterState as any).etherOpacity = v, 'Soft additive glow brilliance of the particles and ribbons.'));

        container.appendChild(makeSlider('CONSOLE HOVER FLOAT (HEIGHT)', 0.00, 0.25, 0.005, () => (this.masterState as any).etherHoverAmplitude ?? 0.06, v => (this.masterState as any).etherHoverAmplitude = v, 'Gentle vertical floating bobbing of the console while resting in place.'));

        container.appendChild(makeSlider('CONSOLE HOVER FLOAT (TEMPO)', 0.20, 4.00, 0.05, () => (this.masterState as any).etherHoverSpeed ?? 1.5, v => (this.masterState as any).etherHoverSpeed = v, 'Oscillation tempo and rhythm of the idle console hover breathing.'));

        container.appendChild(makeSlider('SPIN VORTEX FLARE MULTIPLIER', 1.00, 5.00, 0.10, () => (this.masterState as any).etherSpinVortexMult ?? 2.2, v => (this.masterState as any).etherSpinVortexMult = v, 'Particle acceleration flare boost when switching between NES and PS1.'));

        return container;
    }

    private ensureCrtClipPathDefs() {
        if (document.getElementById('nes-bubble-crt-clip-svg')) return;
        const svg = createSvg('svg');
        svg.id = 'nes-bubble-crt-clip-svg';
        setCssStyles(svg, { position: 'absolute' });
        setCssStyles(svg, { width: '0' });
        setCssStyles(svg, { height: '0' });
        setCssStyles(svg, { pointerEvents: 'none' });
        setCssStyles(svg, { overflow: 'hidden' });
        const svgDefs = createSvg('defs');
        const clip = createSvg('clipPath');
        clip.setAttribute('id', 'nes-bubble-crt-clip');
        clip.setAttribute('clipPathUnits', 'objectBoundingBox');
        const clipPathEl = createSvg('path');
        clipPathEl.setAttribute('d', 'M 0.080 0.050 Q 0.500 -0.018, 0.920 0.050 C 0.960 0.065, 0.980 0.085, 0.990 0.120 Q 1.018 0.500, 0.990 0.880 C 0.980 0.915, 0.960 0.935, 0.920 0.950 Q 0.500 1.018, 0.080 0.950 C 0.040 0.935, 0.020 0.915, 0.010 0.880 Q -0.018 0.500, 0.010 0.120 C 0.020 0.085, 0.040 0.065, 0.080 0.050 Z');
        clip.appendChild(clipPathEl);
        svgDefs.appendChild(clip);
        svg.appendChild(svgDefs);
        document.body.appendChild(svg);
    }

    public applyCrtScreenShape() {
        this.ensureCrtClipPathDefs();
        const shape = (this.masterState as any).crtScreenShape || 'vintage_bubble';
        const isBubble = (shape === 'vintage_bubble');
        if (this.overlayCanvas) {
            this.overlayCanvas.classList.toggle('crt-shape-bubble', isBubble);
            this.overlayCanvas.classList.toggle('crt-shape-modern', !isBubble);
        }
        if (this.crtOverlayEl) {
            this.crtOverlayEl.classList.toggle('crt-shape-bubble', isBubble);
            this.crtOverlayEl.classList.toggle('crt-shape-modern', !isBubble);

            let bezelSvg = this.crtOverlayEl.querySelector('.crt-bubble-bezel-svg') as SVGElement | null;
            if (isBubble) {
                if (!bezelSvg) {
                    const svg = createSvg('svg');
                    svg.setAttribute('class', 'crt-bubble-bezel-svg');
                    svg.setAttribute('viewBox', '0 0 1000 1000');
                    svg.setAttribute('preserveAspectRatio', 'none');
                    setCssStyles(svg, { position: 'absolute' });
                    setCssStyles(svg, { top: '0' });
                    setCssStyles(svg, { left: '0' });
                    setCssStyles(svg, { width: '100%' });
                    setCssStyles(svg, { height: '100%' });
                    setCssStyles(svg, { pointerEvents: 'none' });
                    setCssStyles(svg, { overflow: 'visible' });
                    setCssStyles(svg, { zIndex: '2' });
                    setCssStyles(svg, { filter: 'drop-shadow(0 0 2px #0a0a0d) drop-shadow(0 25px 60px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 35px rgba(147, 197, 253, 0.22))' });
                    const path1 = createSvg('path');
                    path1.setAttribute('d', 'M 80 50 Q 500 -18, 920 50 C 960 65, 980 85, 990 120 Q 1018 500, 990 880 C 980 915, 960 935, 920 950 Q 500 1018, 80 950 C 40 935, 20 915, 10 880 Q -18 500, 10 120 C 20 85, 40 65, 80 50 Z');
                    path1.setAttribute('fill', 'none');
                    path1.setAttribute('stroke', '#0a0a0d');
                    path1.setAttribute('stroke-width', '30');
                    path1.setAttribute('stroke-linejoin', 'round');
                    path1.setAttribute('stroke-linecap', 'round');

                    const path2 = createSvg('path');
                    path2.setAttribute('d', 'M 80 50 Q 500 -18, 920 50 C 960 65, 980 85, 990 120 Q 1018 500, 990 880 C 980 915, 960 935, 920 950 Q 500 1018, 80 950 C 40 935, 20 915, 10 880 Q -18 500, 10 120 C 20 85, 40 65, 80 50 Z');
                    path2.setAttribute('fill', 'none');
                    path2.setAttribute('stroke', '#18181b');
                    path2.setAttribute('stroke-width', '26');
                    path2.setAttribute('stroke-linejoin', 'round');
                    path2.setAttribute('stroke-linecap', 'round');

                    svg.appendChild(path1);
                    svg.appendChild(path2);
                    this.crtOverlayEl.appendChild(svg);
                } else {
                    setCssStyles(bezelSvg, { display: 'block' });
                }
            } else {
                if (bezelSvg) setCssStyles(bezelSvg, { display: 'none' });
            }
        }
    }

    private updateViewportColorCorrection() {
        if (!this.boxArtEl) return;
        const canvas = this.boxArtEl.querySelector('canvas:not(.curtain-3d-flag-canvas)') as HTMLCanvasElement;
        if (!canvas) return;

        const s = this.masterState as any;
        const brightness = s.viewportBrightness ?? 1.0;
        const contrast = s.viewportContrast ?? 1.0;
        const saturate = s.viewportSaturate ?? 1.0;
        const warmth = s.viewportWarmth ?? 0.0;
        const gamma = s.viewportGamma ?? 1.0;

        let filterStr = `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;
        if (warmth > 0) {
            filterStr += ` sepia(${warmth * 0.35}) hue-rotate(${-warmth * 15}deg)`;
        } else if (warmth < 0) {
            filterStr += ` hue-rotate(${-warmth * 25}deg)`;
        }
        setCssStyles(canvas, { filter: filterStr });

        if (this.activeRenderer) {
            this.activeRenderer.toneMappingExposure = (s.exposure ?? 1.0) * gamma;
        }
    }

    private buildViewportColorCorrectionContainer(): HTMLElement {
        const container = createDiv();
        setCssStyles(container, { display: 'flex' });
        setCssStyles(container, { flexDirection: 'column' });
        setCssStyles(container, { gap: '8px' });

        let saveTimer: any = null;
        const debouncedSave = () => {
            if (saveTimer) window.clearTimeout(saveTimer);
            saveTimer = window.setTimeout(() => {
                if (this.plugin && this.plugin.settings) {
                    this.plugin.settings.masterState = Object.assign({}, this.masterState);
                    this.plugin.saveSettings();
                }
            }, 250);
        };

        const makeSlider = (label: string, min: number, max: number, step: number, getValue: () => number, setValue: (val: number) => void, description?: string) => {
            const card = createDiv();
            card.className = 'tetris-slider-card';

            const header = createDiv();
            header.className = 'card-header';

            const title = createSpan();
            title.className = 'card-title';
            title.innerText = label;

            const numInput = createEl('input');
            numInput.type = 'number';
            numInput.step = String(step);
            numInput.className = 'card-badge';
            numInput.value = Number(getValue().toFixed(step < 0.01 ? 3 : (step < 0.1 ? 2 : 1))).toString();

            header.appendChild(title);
            header.appendChild(numInput);
            card.appendChild(header);

            if (description) {
                const desc = createDiv();
                desc.className = 'card-desc';
                desc.innerText = description;
                card.appendChild(desc);
            }

            const range = createEl('input');
            range.type = 'range';
            range.min = min.toString();
            range.max = max.toString();
            range.step = step.toString();
            range.value = getValue().toString();
            range.className = 'tetris-slider';

            range.oninput = (e) => {
                const num = parseFloat((e.target as HTMLInputElement).value);
                setValue(num);
                numInput.value = Number(num.toFixed(step < 0.01 ? 3 : (step < 0.1 ? 2 : 1))).toString();
                this.updateViewportColorCorrection();
                debouncedSave();
            };

            numInput.oninput = (e) => {
                const valStr = (e.target as HTMLInputElement).value;
                const v = parseFloat(valStr);
                if (!isNaN(v)) {
                    setValue(v);
                    range.value = String(v);
                    this.updateViewportColorCorrection();
                    debouncedSave();
                }
            };

            numInput.addEventListener('keydown', (e) => e.stopPropagation());
            numInput.addEventListener('keyup', (e) => e.stopPropagation());
            numInput.addEventListener('mousedown', (e) => e.stopPropagation());
            card.addEventListener('mousedown', (e) => e.stopPropagation());
            card.addEventListener('pointerdown', (e) => e.stopPropagation());

            card.appendChild(range);
            return card;
        };

        container.appendChild(makeSlider('VIEWPORT BRIGHTNESS', 0.20, 2.50, 0.02, () => (this.masterState as any).viewportBrightness ?? 1.0, v => (this.masterState as any).viewportBrightness = v, 'Overall luminance brightness multiplier of the 3D viewport canvas.'));
        container.appendChild(makeSlider('VIEWPORT CONTRAST', 0.20, 2.50, 0.02, () => (this.masterState as any).viewportContrast ?? 1.0, v => (this.masterState as any).viewportContrast = v, 'Dynamic range contrast expansion between shadows and highlights.'));
        container.appendChild(makeSlider('COLOR SATURATION / VIBRANCE', 0.00, 3.00, 0.05, () => (this.masterState as any).viewportSaturate ?? 1.0, v => (this.masterState as any).viewportSaturate = v, 'Color saturation intensity (0.0 = Black & White monochrome, 1.0 = Natural, 2.0+ = Vivid).'));
        container.appendChild(makeSlider('COLOR TEMPERATURE (WARMTH / COOL)', -1.00, 1.00, 0.05, () => (this.masterState as any).viewportWarmth ?? 0.0, v => (this.masterState as any).viewportWarmth = v, 'Adjust color warmth: Negative = Cool Cyberpunk Cyan/Blue, Positive = Warm 80s Amber/Golden.'));
        container.appendChild(makeSlider('TONE MAPPING EXPOSURE', 0.20, 3.50, 0.05, () => (this.masterState as any).exposure ?? 1.0, v => { (this.masterState as any).exposure = v; if (this.activeRenderer) this.activeRenderer.toneMappingExposure = v; }, 'ACES Filmic tone mapping exposure level in Three.js renderer.'));
        container.appendChild(makeSlider('COLOR GRADING GAMMA', 0.40, 2.40, 0.05, () => (this.masterState as any).viewportGamma ?? 1.0, v => (this.masterState as any).viewportGamma = v, 'Mid-tone gamma curve balance for deep retro film curves.'));

        const resetBtn = createEl('button');
        resetBtn.className = 'tetris-suite-btn';
        resetBtn.innerText = '↺ RESET COLOR CORRECTION TO DEFAULT';
        resetBtn.onclick = () => {
            (this.masterState as any).viewportBrightness = 1.0;
            (this.masterState as any).viewportContrast = 1.0;
            (this.masterState as any).viewportSaturate = 1.0;
            (this.masterState as any).viewportWarmth = 0.0;
            (this.masterState as any).exposure = 1.0;
            (this.masterState as any).viewportGamma = 1.0;
            this.updateViewportColorCorrection();
            debouncedSave();
            new Notice("🎨 Viewport Color Correction Reset to Defaults!");
            if (container.parentElement) {
                container.replaceWith(this.buildViewportColorCorrectionContainer());
            }
        };
        container.appendChild(resetBtn);

        return container;
    }

    private buildNesCartridgeTunerContainer(): HTMLElement {
        const container = createDiv();
        setCssStyles(container, { display: 'flex' });
        setCssStyles(container, { flexDirection: 'column' });
        setCssStyles(container, { gap: '8px' });

        const makeSlider = (label: string, min: number, max: number, step: number, getValue: () => number, setValue: (val: number) => void, description?: string) => {
            const card = createDiv();
            card.className = 'tetris-slider-card';

            const header = createDiv();
            header.className = 'card-header';

            const title = createSpan();
            title.className = 'card-title';
            title.innerText = label;

            const numInput = createEl('input');
            numInput.type = 'number';
            numInput.step = String(step);
            numInput.className = 'card-badge';
            numInput.value = Number(getValue().toFixed(step < 0.01 ? 3 : (step < 0.1 ? 2 : 1))).toString();

            header.appendChild(title);
            header.appendChild(numInput);
            card.appendChild(header);

            if (description) {
                const desc = createDiv();
                desc.className = 'card-desc';
                desc.innerText = description;
                card.appendChild(desc);
            }

            const range = createEl('input');
            range.type = 'range';
            range.min = min.toString();
            range.max = max.toString();
            range.step = step.toString();
            range.value = getValue().toString();
            range.className = 'tetris-slider';

            range.oninput = (e) => {
                const num = parseFloat((e.target as HTMLInputElement).value);
                setValue(num);
                numInput.value = Number(num.toFixed(step < 0.01 ? 3 : (step < 0.1 ? 2 : 1))).toString();
                if (this.plugin && this.plugin.settings) {
                    this.plugin.settings.masterState = Object.assign({}, this.masterState);
                    this.plugin.saveSettings();
                }
            };

            numInput.oninput = (e) => {
                const valStr = (e.target as HTMLInputElement).value;
                const v = parseFloat(valStr);
                if (!isNaN(v)) {
                    setValue(v);
                    range.value = String(v);
                    if (this.plugin && this.plugin.settings) {
                        this.plugin.settings.masterState = Object.assign({}, this.masterState);
                        this.plugin.saveSettings();
                    }
                }
            };

            numInput.addEventListener('keydown', (e) => e.stopPropagation());
            numInput.addEventListener('keyup', (e) => e.stopPropagation());
            numInput.addEventListener('mousedown', (e) => e.stopPropagation());
            card.addEventListener('mousedown', (e) => e.stopPropagation());
            card.addEventListener('pointerdown', (e) => e.stopPropagation());

            card.appendChild(range);
            return card;
        };

        container.appendChild(makeSlider('NES CARTRIDGE SCALE (3D SIZE)', 0.40, 1.80, 0.01, () => (typeof (this.masterState as any).nesCartScale === 'number' ? (this.masterState as any).nesCartScale : 0.85), v => (this.masterState as any).nesCartScale = v, 'Adjusts the physical 3D size of NES cartridges (0.85 = Default). Only affects NES.'));
        container.appendChild(makeSlider('SLOT POS X (LEFT ◄ ► RIGHT)', -3.0, 3.0, 0.01, () => (typeof (this.masterState as any).nesSlotX === 'number' ? (this.masterState as any).nesSlotX : (typeof (this.masterState as any).slotX === 'number' ? (this.masterState as any).slotX : -0.575)), v => { (this.masterState as any).nesSlotX = v; (this.masterState as any).slotX = v; }, 'Horizontal center position inside the NES front-loading chamber.'));
        container.appendChild(makeSlider('SLOT POS Y (UP ▲ ▼ DOWN)', 0.5, 3.5, 0.01, () => (typeof (this.masterState as any).nesSlotY === 'number' ? (this.masterState as any).nesSlotY : (typeof (this.masterState as any).slotY === 'number' ? (this.masterState as any).slotY : 1.95)), v => { (this.masterState as any).nesSlotY = v; (this.masterState as any).slotY = v; }, 'Height elevation of the cartridge when seated inside the NES slot.'));
        container.appendChild(makeSlider('SLOT POS Z (DEPTH IN ◄ ► OUT)', -1.0, 2.0, 0.01, () => (typeof (this.masterState as any).nesSlotZ === 'number' ? (this.masterState as any).nesSlotZ : (typeof (this.masterState as any).slotZ === 'number' ? (this.masterState as any).slotZ : 0.20)), v => { (this.masterState as any).nesSlotZ = v; (this.masterState as any).slotZ = v; }, 'How deep the cartridge sits inside the console connector when seated.'));
        container.appendChild(makeSlider('SLOT ROT X (PITCH TILT)', -3.14, 3.14, 0.02, () => (typeof (this.masterState as any).nesSlotRotX === 'number' ? (this.masterState as any).nesSlotRotX : (typeof (this.masterState as any).slotRotX === 'number' ? (this.masterState as any).slotRotX : 1.45)), v => { (this.masterState as any).nesSlotRotX = v; (this.masterState as any).slotRotX = v; }, 'Tilts the cartridge forward or backward inside the chamber.'));
        container.appendChild(makeSlider('SLOT ROT Y (YAW TURN)', -3.14, 3.14, 0.02, () => (typeof (this.masterState as any).nesSlotRotY === 'number' ? (this.masterState as any).nesSlotRotY : (typeof (this.masterState as any).slotRotY === 'number' ? (this.masterState as any).slotRotY : 0.00)), v => { (this.masterState as any).nesSlotRotY = v; (this.masterState as any).slotRotY = v; }, 'Swivels the cartridge left or right inside the chamber.'));
        container.appendChild(makeSlider('SLOT ROT Z (ROLL LEAN)', -1.50, 1.50, 0.02, () => (typeof (this.masterState as any).nesSlotRotZ === 'number' ? (this.masterState as any).nesSlotRotZ : (typeof (this.masterState as any).slotRotZ === 'number' ? (this.masterState as any).slotRotZ : 0.00)), v => { (this.masterState as any).nesSlotRotZ = v; (this.masterState as any).slotRotZ = v; }, 'Levels the cartridge sideways inside the chamber.'));
        container.appendChild(makeSlider('EJECT POP Z (POP DISTANCE)', 0.20, 2.00, 0.02, () => (typeof (this.masterState as any).nesEjectPopZ === 'number' ? (this.masterState as any).nesEjectPopZ : (typeof (this.masterState as any).ejectPopZ === 'number' ? (this.masterState as any).ejectPopZ : 0.86)), v => { (this.masterState as any).nesEjectPopZ = v; (this.masterState as any).ejectPopZ = v; }, 'How far forward the cartridge pops out upon ejection.'));

        const resetBtn = createEl('button');
        resetBtn.className = 'tetris-suite-btn pin-btn';
        resetBtn.innerText = '↺ RESET NES CARTRIDGE ALIGNMENT TO DEFAULT';
        setCssStyles(resetBtn, { marginTop: '4px' });
        resetBtn.onclick = () => {
            (this.masterState as any).nesCartScale = 0.85;
            (this.masterState as any).nesSlotX = -0.575;
            (this.masterState as any).nesSlotY = 1.95;
            (this.masterState as any).nesSlotZ = 0.20;
            (this.masterState as any).nesSlotRotX = 1.45;
            (this.masterState as any).nesSlotRotY = 0.00;
            (this.masterState as any).nesSlotRotZ = 0.00;
            (this.masterState as any).nesEjectPopZ = 0.86;
            (this.masterState as any).slotX = -0.575;
            (this.masterState as any).slotY = 1.95;
            (this.masterState as any).slotZ = 0.20;
            (this.masterState as any).slotRotX = 1.45;
            (this.masterState as any).slotRotY = 0.00;
            (this.masterState as any).slotRotZ = 0.00;
            (this.masterState as any).ejectPopZ = 0.86;
            if (this.plugin && this.plugin.settings) {
                this.plugin.settings.masterState = Object.assign({}, this.masterState);
                this.plugin.saveSettings();
            }
        };
        container.appendChild(resetBtn);

        return container;
    }

    private toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        this.containerEl.classList.toggle('tetris-minimized', this.isMinimized);
    }

    private updateStatus() {
        if (!this.statusDisplay) return;
        const totalNodes = this.NES_WIDTH * this.NES_HEIGHT;
        this.statusDisplay.textContent = '';
        const nLabel = createSpan(); nLabel.textContent = 'Nodes: ';
        const nVal = createSpan(); nVal.className = 'stat-val'; nVal.textContent = totalNodes.toLocaleString();
        const rLabel = createSpan(); rLabel.textContent = 'Resolution: ';
        const rVal = createSpan(); rVal.className = 'stat-val'; rVal.textContent = this.NES_WIDTH + 'x' + this.NES_HEIGHT;
        const sLabel = createSpan(); sLabel.textContent = 'Status: ';
        const sVal = createSpan(); sVal.className = this.nodesCreated ? 'stat-good' : 'stat-warn'; sVal.textContent = this.nodesCreated ? 'Ready to play' : 'Nodes not created yet';
        
        this.statusDisplay.appendChild(nLabel);
        this.statusDisplay.appendChild(nVal);
        this.statusDisplay.appendChild(createEl('br'));
        this.statusDisplay.appendChild(rLabel);
        this.statusDisplay.appendChild(rVal);
        this.statusDisplay.appendChild(createEl('br'));
        this.statusDisplay.appendChild(sLabel);
        this.statusDisplay.appendChild(sVal);
    }

    private async createGrid() {
        this.clearGrid();
        
        const total = this.NES_WIDTH * this.NES_HEIGHT;
        this.fakePixels = new Array(total);
        this.pixelColors = new Array(total).fill('#000000');
        this.pixelColors24 = new Uint32Array(total).fill(0);
        
        const canvas = this.canvasView.canvas;
        const size = this.PIXEL_SCALE;
        const fullWidth = this.NES_WIDTH * size;
        const fullHeight = this.NES_HEIGHT * size;
        
        let cx = 0, cy = 0;
        if (this.canvasView && this.canvasView.canvas && this.canvasView.containerEl) {
            const rect = this.canvasView.containerEl.getBoundingClientRect();
            const centerPos = this.canvasView.canvas.posFromClient({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            });
            if (centerPos) {
                cx = centerPos.x;
                cy = centerPos.y;
            }
        }

        let startX = cx - (fullWidth / 2);
        let startY = cy - (fullHeight / 2) - 40;

        // Sanitize to avoid NaN propagation
        if (Number.isNaN(startX) || !isFinite(startX)) startX = 0;
        if (Number.isNaN(startY) || !isFinite(startY)) startY = 0;

        for (let r = 0; r < this.NES_HEIGHT; r++) {
            for (let c = 0; c < this.NES_WIDTH; c++) {
                this.fakePixels[r * this.NES_WIDTH + c] = {
                    x: startX + (c * size),
                    y: startY + (r * size),
                    w: size,
                    h: size,
                    selected: true
                };
            }
        }
        
        this.cachedMinX = startX;
        this.cachedMinY = startY;
        
        // Keep Obsidian Canvas viewport zoom steady without forcing zoomToBbox
        
        const canvasContainer = this.canvasView.canvas?.contentEl || this.canvasView.containerEl.querySelector('.canvas-node-layer') || this.canvasView.containerEl.querySelector('.canvas-nodes') || this.canvasView.containerEl.querySelector('.canvas') || this.canvasView.containerEl;
        if (!this.overlayCanvas) {
            this.overlayCanvas = createEl('canvas');
            this.overlayCanvas.className = 'doom-viewport-overlay';
            setCssStyles(this.overlayCanvas, { position: 'absolute' });
            setCssStyles(this.overlayCanvas, { top: '0' });
            setCssStyles(this.overlayCanvas, { left: '0' });
            setCssStyles(this.overlayCanvas, { zIndex: '999' });
            setCssStyles(this.overlayCanvas, { pointerEvents: 'none' });
            setCssStyles(this.overlayCanvas, { imageRendering: 'pixelated' });
            
            canvasContainer.appendChild(this.overlayCanvas);
            this.overlayCtx = this.overlayCanvas.getContext('2d', { alpha: true })!;
            
            const container = this.canvasView.containerEl;
            container.addEventListener('mousedown', this.onCanvasMousedown, { capture: true });
            container.addEventListener('mousemove', this.onCanvasMousemove, { capture: true });
            container.addEventListener('mouseup', this.onCanvasMouseup, { capture: true });
            container.addEventListener('mouseleave', this.onCanvasMouseup, { capture: true });
        }

        if (!this.crtOverlayEl) {
            this.crtOverlayEl = createDiv();
            this.crtOverlayEl.className = 'crt-screen-overlay';
            if (this.isCrtActive) this.crtOverlayEl.classList.add('active');
            canvasContainer.appendChild(this.crtOverlayEl);
        }

        if (this.overlayCanvas && this.isCrtActive) {
            this.overlayCanvas.classList.add('crt-curved');
        }
        this.applyCrtScreenShape();

        if (!this.cordSvgEl) {
            const svg = createSvg('svg');
            svg.setAttribute('class', 'nes-dynamic-cord-svg');
            setCssStyles(svg, { position: 'absolute' });
            setCssStyles(svg, { top: '0' });
            setCssStyles(svg, { left: '0' });
            setCssStyles(svg, { width: '100%' });
            setCssStyles(svg, { height: '100%' });
            setCssStyles(svg, { pointerEvents: 'none' });
            setCssStyles(svg, { zIndex: '1' });
            setCssStyles(svg, { overflow: 'visible' });

            const defs = createSvg('defs');
            const f1 = createSvg('filter');
            f1.setAttribute('id', 'cord-shadow-filter');
            f1.setAttribute('x', '-20%'); f1.setAttribute('y', '-20%'); f1.setAttribute('width', '140%'); f1.setAttribute('height', '140%');
            const dropShadow = createSvg('feDropShadow');
            dropShadow.setAttribute('dx', '4'); dropShadow.setAttribute('dy', '8'); dropShadow.setAttribute('stdDeviation', '5');
            dropShadow.setAttribute('flood-color', '#000000'); dropShadow.setAttribute('flood-opacity', '0.75');
            f1.appendChild(dropShadow);

            const f2 = createSvg('filter');
            f2.setAttribute('id', 'cable-shine-blur');
            f2.setAttribute('x', '-20%'); f2.setAttribute('y', '-20%'); f2.setAttribute('width', '140%'); f2.setAttribute('height', '140%');
            const blur = createSvg('feGaussianBlur');
            blur.setAttribute('stdDeviation', '1.0');
            f2.appendChild(blur);

            const grad = createSvg('linearGradient');
            grad.setAttribute('id', 'cable-gloss-gradient');
            grad.setAttribute('gradientUnits', 'userSpaceOnUse');
            grad.setAttribute('x1', '0'); grad.setAttribute('y1', '0'); grad.setAttribute('x2', '0'); grad.setAttribute('y2', '100');
            const stops = [
                { offset: '0%', color: '#ffffff', opacity: '0.95' },
                { offset: '22%', color: '#ffffff', opacity: '0.75' },
                { offset: '50%', color: '#ffffff', opacity: '0.08' },
                { offset: '78%', color: '#ffffff', opacity: '0.75' },
                { offset: '100%', color: '#ffffff', opacity: '0.95' },
            ];
            stops.forEach(st => {
                const s = createSvg('stop');
                s.setAttribute('offset', st.offset);
                s.setAttribute('stop-color', st.color);
                s.setAttribute('stop-opacity', st.opacity);
                grad.appendChild(s);
            });

            defs.appendChild(f1);
            defs.appendChild(f2);
            defs.appendChild(grad);
            svg.appendChild(defs);

            const shadowPath = createSvg('path');
            shadowPath.setAttribute('stroke', 'rgba(0,0,0,0.55)');
            shadowPath.setAttribute('stroke-width', '24');
            shadowPath.setAttribute('fill', 'none');
            shadowPath.setAttribute('stroke-linecap', 'round');
            shadowPath.setAttribute('filter', 'url(#cord-shadow-filter)');

            const activeSys = this.plugin.settings.activeSystem;
            const outerPath = createSvg('path');
            outerPath.setAttribute('stroke', activeSys === 'psx' ? '#454854' : '#14161f');
            outerPath.setAttribute('stroke-width', '16');
            outerPath.setAttribute('fill', 'none');
            outerPath.setAttribute('stroke-linecap', 'round');

            const innerPath = createSvg('path');
            innerPath.setAttribute('stroke', 'url(#cable-gloss-gradient)');
            innerPath.setAttribute('stroke-width', '2.5');
            innerPath.setAttribute('filter', 'url(#cable-shine-blur)');
            innerPath.setAttribute('fill', 'none');
            innerPath.setAttribute('stroke-linecap', 'round');

            svg.appendChild(shadowPath);
            svg.appendChild(outerPath);
            svg.appendChild(innerPath);

            canvasContainer.appendChild(svg);
            this.cordSvgEl = svg;
            this.cordShadowPath = shadowPath;
            this.cordOuterPath = outerPath;
            this.cordInnerPath = innerPath;
        } else if (this.cordInnerPath && this.cordOuterPath) {
            const activeSys = this.plugin.settings.activeSystem;
            this.cordOuterPath.setAttribute('stroke', activeSys === 'psx' ? '#454854' : '#14161f');
            this.cordInnerPath.setAttribute('stroke', 'url(#cable-gloss-gradient)');
            this.cordInnerPath.setAttribute('stroke-width', '2.5');
            this.cordInnerPath.setAttribute('filter', 'url(#cable-shine-blur)');
        }

        const activeSys = this.plugin.settings.activeSystem;
        if (!this.controllerPadEl || this.currentControllerSystem !== activeSys) {
            if (this.controllerPadEl && this.controllerPadEl.parentElement) {
                this.controllerPadEl.parentElement.removeChild(this.controllerPadEl);
            }
            this.controllerPadEl = createDiv();
            this.currentControllerSystem = activeSys;

            if (activeSys === 'nes') {
                this.controllerPadEl.className = 'retro-controller-overlay nes-controller-pad';
                this.controllerPadEl.empty();
                this.controllerPadEl.createDiv({ cls: 'nes-cord-port' });
                const decal = this.controllerPadEl.createDiv({ cls: 'nes-decal-panel' });
                
                // DPAD SECTION
                const dpadSec = decal.createDiv({ cls: 'nes-dpad-section' });
                const dpadWrap = dpadSec.createDiv({ cls: 'nes-dpad-wrapper' });
                const dpadSvg = createSvg('svg');
                dpadSvg.setAttribute('class', 'nes-dpad-svg');
                dpadSvg.setAttribute('viewBox', '0 0 80 80');
                const dpadBg = createSvg('path');
                dpadBg.setAttribute('d', 'M 26 2 H 54 V 26 H 78 V 54 H 54 V 78 H 26 V 54 H 2 V 26 H 26 Z');
                dpadBg.setAttribute('fill', '#161618');
                dpadBg.setAttribute('stroke', '#dbdbdd');
                dpadBg.setAttribute('stroke-width', '4');
                dpadBg.setAttribute('stroke-linejoin', 'miter');
                dpadSvg.appendChild(dpadBg);
                dpadWrap.appendChild(dpadSvg);

                const cross = dpadWrap.createDiv({ cls: 'nes-dpad-cross' });
                const makeArrowSvg = (d: string) => {
                    const s = createSvg('svg');
                    s.setAttribute('class', 'dpad-arrow');
                    s.setAttribute('viewBox', '0 0 24 24');
                    const p = createSvg('path');
                    p.setAttribute('d', d);
                    p.setAttribute('fill', 'none');
                    p.setAttribute('stroke', 'currentColor');
                    p.setAttribute('stroke-width', '2.5');
                    p.setAttribute('stroke-linejoin', 'round');
                    s.appendChild(p);
                    return s;
                };

                const upBtn = cross.createDiv({ cls: 'dpad-btn dpad-up', attr: { title: 'Up (W / ↑)' } });
                upBtn.appendChild(makeArrowSvg('M12 4L5 13h4v7h6v-7h4z'));

                const leftBtn = cross.createDiv({ cls: 'dpad-btn dpad-left', attr: { title: 'Left (A / ←)' } });
                leftBtn.appendChild(makeArrowSvg('M4 12l9-7v4h7v6h-7v4z'));

                cross.createDiv({ cls: 'dpad-center-hole' });

                const rightBtn = cross.createDiv({ cls: 'dpad-btn dpad-right', attr: { title: 'Right (D / →)' } });
                rightBtn.appendChild(makeArrowSvg('M20 12l-9 7v-4H4v-6h7V5z'));

                const downBtn = cross.createDiv({ cls: 'dpad-btn dpad-down', attr: { title: 'Down (S / ↓)' } });
                downBtn.appendChild(makeArrowSvg('M12 20l7-9h-4V4H9v7H5z'));

                // CENTER SECTION
                const centerSec = decal.createDiv({ cls: 'nes-center-section' });
                centerSec.createDiv({ cls: 'nes-top-welded-bar' });
                centerSec.createDiv({ cls: 'nes-rounded-bar' });
                const selStartBar = centerSec.createDiv({ cls: 'nes-select-start-bar' });
                selStartBar.createSpan({ text: 'SELECT' });
                selStartBar.createSpan({ text: 'START' });
                const pillBezel = centerSec.createDiv({ cls: 'nes-pill-bezel' });
                pillBezel.createDiv({ cls: 'pill-btn nes-select', attr: { title: 'Select (C / Shift)' } });
                pillBezel.createDiv({ cls: 'pill-btn nes-start', attr: { title: 'Start (B / Enter)' } });
                centerSec.createDiv({ cls: 'nes-bottom-welded-bar' });

                // RIGHT SECTION
                const rightSec = decal.createDiv({ cls: 'nes-right-section' });
                const brand = rightSec.createDiv({ cls: 'nes-brand' });
                brand.appendText('Nintendo');
                brand.createEl('sup', { text: '®' });

                const btnGroup = rightSec.createDiv({ cls: 'nes-buttons-group' });
                const wrapB = btnGroup.createDiv({ cls: 'nes-sharp-square-wrapper' });
                const bezelB = wrapB.createDiv({ cls: 'nes-sharp-square-bezel' });
                bezelB.createDiv({ cls: 'round-btn nes-btn-b', attr: { title: 'B Button (J)' } });
                wrapB.createDiv({ cls: 'nes-corner-label nes-label-b', text: 'B' });

                const wrapA = btnGroup.createDiv({ cls: 'nes-sharp-square-wrapper' });
                const bezelA = wrapA.createDiv({ cls: 'nes-sharp-square-bezel' });
                bezelA.createDiv({ cls: 'round-btn nes-btn-a', attr: { title: 'A Button (K)' } });
                wrapA.createDiv({ cls: 'nes-corner-label nes-label-a', text: 'A' });
            } else {
                this.controllerPadEl.className = 'retro-controller-overlay psx-mode';
                let controllerImgSrc = '';
                try {
                    const manifestDir = getPluginDir(this.plugin);
                    const basePath = (this.plugin.app.vault.adapter as any).basePath || '';
                    const fullImgPath = path.isAbsolute(manifestDir) ? path.join(manifestDir, 'assets', 'psx', 'ps1 controller.png') : (basePath ? path.join(basePath, manifestDir, 'assets', 'psx', 'ps1 controller.png') : path.join('assets', 'psx', 'ps1 controller.png'));
                    if (fs.existsSync(fullImgPath)) {
                        const data = fs.readFileSync(fullImgPath);
                        controllerImgSrc = `data:image/png;base64,${data.toString('base64')}`;
                    }
                } catch(e) {
                    console.error("Failed to load PS1 controller PNG:", e);
                }

                this.controllerPadEl.empty();
                const bodyEl = this.controllerPadEl.createDiv({ cls: 'psx-controller-body' });
                bodyEl.createEl('img', { cls: 'psx-png-body', attr: { src: controllerImgSrc, alt: 'PS1 Controller' } });

                bodyEl.createDiv({ cls: 'psx-shoulder psx-l2', attr: { title: 'L2' } });
                bodyEl.createDiv({ cls: 'psx-shoulder psx-r2', attr: { title: 'R2' } });
                bodyEl.createDiv({ cls: 'psx-shoulder psx-l1', attr: { title: 'L1' } });
                bodyEl.createDiv({ cls: 'psx-shoulder psx-r1', attr: { title: 'R1' } });

                const dpadCross = bodyEl.createDiv({ cls: 'psx-dpad-cross' });
                dpadCross.createDiv({ cls: 'psx-dpad-btn psx-dpad-up', attr: { title: 'Up' } });
                dpadCross.createDiv({ cls: 'psx-dpad-btn psx-dpad-left', attr: { title: 'Left' } });
                dpadCross.createDiv({ cls: 'psx-dpad-btn psx-dpad-right', attr: { title: 'Right' } });
                dpadCross.createDiv({ cls: 'psx-dpad-btn psx-dpad-down', attr: { title: 'Down' } });

                const selectStart = bodyEl.createDiv({ cls: 'psx-select-start-container' });
                selectStart.createDiv({ cls: 'psx-pill-btn psx-select', attr: { title: 'Select' } });
                selectStart.createDiv({ cls: 'psx-pill-btn psx-start', attr: { title: 'Start (Play Button)' } });

                const diamond = bodyEl.createDiv({ cls: 'psx-buttons-diamond' });
                diamond.createDiv({ cls: 'psx-round-btn psx-btn-triangle', attr: { title: 'Triangle' } });
                diamond.createDiv({ cls: 'psx-round-btn psx-btn-square', attr: { title: 'Square' } });
                diamond.createDiv({ cls: 'psx-round-btn psx-btn-circle', attr: { title: 'Circle' } });
                diamond.createDiv({ cls: 'psx-round-btn psx-btn-cross', attr: { title: 'Cross' } });
            }

            canvasContainer.appendChild(this.controllerPadEl);

            const bindPadButton = (btnEl: HTMLElement | null, nesButton: number) => {
                if (!btnEl) return;
                btnEl.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.sendGameInput(nesButton, true);
                    btnEl.classList.add('active');
                });
                btnEl.addEventListener('mouseup', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.sendGameInput(nesButton, false);
                    btnEl.classList.remove('active');
                });
                btnEl.addEventListener('mouseleave', () => {
                    this.sendGameInput(nesButton, false);
                    btnEl.classList.remove('active');
                });
            };

            if (activeSys === 'nes') {
                bindPadButton(this.controllerPadEl.querySelector('.dpad-up'), 4);
                bindPadButton(this.controllerPadEl.querySelector('.dpad-down'), 5);
                bindPadButton(this.controllerPadEl.querySelector('.dpad-left'), 6);
                bindPadButton(this.controllerPadEl.querySelector('.dpad-right'), 7);
                bindPadButton(this.controllerPadEl.querySelector('.nes-btn-a'), 0);
                bindPadButton(this.controllerPadEl.querySelector('.nes-btn-b'), 1);
                bindPadButton(this.controllerPadEl.querySelector('.nes-start'), 3);
                bindPadButton(this.controllerPadEl.querySelector('.nes-select'), 2);
            } else {
                // PSX Binds
                bindPadButton(this.controllerPadEl.querySelector('.psx-dpad-up'), 4);
                bindPadButton(this.controllerPadEl.querySelector('.psx-dpad-down'), 5);
                bindPadButton(this.controllerPadEl.querySelector('.psx-dpad-left'), 6);
                bindPadButton(this.controllerPadEl.querySelector('.psx-dpad-right'), 7);
                bindPadButton(this.controllerPadEl.querySelector('.psx-btn-cross'), 0);
                bindPadButton(this.controllerPadEl.querySelector('.psx-btn-square'), 1);
                bindPadButton(this.controllerPadEl.querySelector('.psx-btn-circle'), 8);
                bindPadButton(this.controllerPadEl.querySelector('.psx-btn-triangle'), 9);
                bindPadButton(this.controllerPadEl.querySelector('.psx-l1'), 10);
                bindPadButton(this.controllerPadEl.querySelector('.psx-l2'), 11);
                bindPadButton(this.controllerPadEl.querySelector('.psx-r1'), 12);
                bindPadButton(this.controllerPadEl.querySelector('.psx-r2'), 13);
                bindPadButton(this.controllerPadEl.querySelector('.psx-start'), 3);
                bindPadButton(this.controllerPadEl.querySelector('.psx-select'), 2);
            }

            let isDraggingPad = false;
            let dragStartX = 0, dragStartY = 0;
            let initOffsetX = 0, initOffsetY = 0;

            this.controllerPadEl.addEventListener('mousedown', (e: MouseEvent) => {
                if ((e.target as HTMLElement).closest('.dpad-btn, .pill-btn, .round-btn, .psx-dpad-btn, .psx-pill-btn, .psx-round-btn, .psx-shoulder')) return;
                isDraggingPad = true;
                const startCoords = this.getWorkspaceCoords(e);
                dragStartX = startCoords.x;
                dragStartY = startCoords.y;
                initOffsetX = this.controllerOffset.x;
                initOffsetY = this.controllerOffset.y;
                e.preventDefault();
            });

            window.addEventListener('mousemove', (e: MouseEvent) => {
                if (!isDraggingPad) return;
                const currCoords = this.getWorkspaceCoords(e);
                const dx = currCoords.x - dragStartX;
                const dy = currCoords.y - dragStartY;
                this.controllerOffset.x = initOffsetX + dx;
                this.controllerOffset.y = initOffsetY + dy;
                this.updateControllerTransform();
            });

            window.addEventListener('mouseup', () => {
                isDraggingPad = false;
            });
        }

        this.updateOverlayCanvasSize();
        this.updateControllerTransform();
        this.pixelColors.fill('#000000');
        this.drawOverlay();

        this.nodesCreated = true;
        this.updateStatus();
    }

    private clearGrid() {
        this.nodesCreated = false;
        this.fakePixels = [];
        this.pixelColors = [];
        
        if (this.crtOverlayEl) {
            this.crtOverlayEl.remove();
            this.crtOverlayEl = null;
        }

        if (this.controllerPadEl) {
            this.controllerPadEl.remove();
            this.controllerPadEl = null;
        }

        if (this.overlayCanvas) {
            const container = this.canvasView.containerEl;
            if (container) {
                container.removeEventListener('mousedown', this.onCanvasMousedown, { capture: true });
                container.removeEventListener('mousemove', this.onCanvasMousemove, { capture: true });
                container.removeEventListener('mouseup', this.onCanvasMouseup, { capture: true });
                container.removeEventListener('mouseleave', this.onCanvasMouseup, { capture: true });
            }
            this.overlayCanvas.remove();
            this.overlayCanvas = null;
            this.overlayCtx = null;
        }
        
        if (this.dummyNode) {
            this.isUpdatingDummy = true;
            try {
                this.canvasView.canvas?.removeNode(this.dummyNode);
            } catch { /* ignore */ }
            this.dummyNode = null;
            this.isUpdatingDummy = false;
        }
        this.updateStatus();
    }

    // ── DOOM-STYLE DUMMY NODE & SELECTION LOGIC ──

    private getWorkspaceCoords(e: MouseEvent) {
        if (!this.canvasView.canvas) return { x: 0, y: 0 };
        const canvas = this.canvasView.canvas;
        if (typeof canvas.posFromClient === 'function') {
            return canvas.posFromClient({ x: e.clientX, y: e.clientY });
        }
        
        const rect = this.overlayCanvas ? this.overlayCanvas.getBoundingClientRect() : { left: 0, top: 0 };
        const scale = canvas.scale ?? canvas.zoom ?? 1;
        
        const cssX = e.clientX - rect.left;
        const cssY = e.clientY - rect.top;
        
        const offsetX = this.cachedMinX;
        const offsetY = this.cachedMinY;
        
        return {
            x: cssX / scale + offsetX,
            y: cssY / scale + offsetY
        };
    }


    private onHistoryMousedown = (e: MouseEvent) => {
        if (e.button !== 0) return;
        this.tempSnapshot = this.takeSnapshot();
    };

    private onHistoryMouseup = (e: MouseEvent) => {
        if (e.button !== 0) return;
        if (this.tempSnapshot) {
            const current = this.takeSnapshot();
            if (this.isSnapshotDifferent(this.tempSnapshot, current)) {
                this.undoStack.push(this.tempSnapshot);
                if (this.undoStack.length > 50) {
                    this.undoStack.shift();
                }
                this.redoStack = [];
            }
            this.tempSnapshot = null;
        }
    };
    private onCanvasMousedown = (e: MouseEvent) => {
        if (e.button !== 0) return; // Only left click
        if (document.pointerLockElement === document.body) return; // Game controls
        if (!this.overlayCanvas) return;
        if (this.isRedirectingEvent) return; // Prevent recursion loops
        
        // Ignore clicks on the HUD panel or canvas menu
        if ((e.target as HTMLElement).closest('.tetris-canvas-panel, .tetris-advanced-details, .tetris-studio-suite-scrollable, .canvas-menu') !== null) {
            return;
        }
        
        const coords = this.getWorkspaceCoords(e);

        // Pre-populate lastGroupCoords on mousedown so we have exact starting coordinates
        if (this.canvasView.canvas && this.canvasView.canvas.nodes) {
            this.canvasView.canvas.nodes.forEach((node: any) => {
                if (node.type === 'group') {
                    this.lastGroupCoords.set(node.id, { x: node.x, y: node.y });
                }
            });
        }

        // Ignore clicks on native canvas nodes (group nodes, text nodes, etc.)
        const nativeNode = (e.target as HTMLElement).closest('.canvas-node');
        if (nativeNode && !nativeNode.classList.contains('doom-dummy-node')) {
            // Find the clicked canvas node object and check if it is a group node
            if (this.canvasView.canvas && this.canvasView.canvas.nodes) {
                let clickedNode: any = null;
                this.canvasView.canvas.nodes.forEach((node: any) => {
                    if (node.nodeEl === nativeNode) {
                        clickedNode = node;
                    }
                });
                if (clickedNode && clickedNode.type === 'group') {
                    // Clicked a group node!
                    // Select all pixels inside its bounds
                    const minX = clickedNode.x;
                    const maxX = clickedNode.x + clickedNode.width;
                    const minY = clickedNode.y;
                    const maxY = clickedNode.y + clickedNode.height;

                    let changed = false;
                    const len = this.fakePixels.length;
                    for (let i = 0; i < len; i++) {
                        const p = this.fakePixels[i];
                        if (p) {
                            const cx = p.x + (p.w !== undefined ? p.w : this.PIXEL_SCALE) / 2;
                            const cy = p.y + (p.h !== undefined ? p.h : this.PIXEL_SCALE) / 2;
                            const inside = (cx >= minX && cx <= maxX && cy >= minY && cy <= maxY);
                            if (inside && !p.selected) {
                                p.selected = true;
                                changed = true;
                            }
                        }
                    }
                    if (changed) {
                        // Pass true to prevent selection focus shifting to the dummy node,
                        // keeping selection focus on the clicked group node!
                        this.updateDummyNode(true);
                        this.updateOverlayCanvasSize();
                        this.drawOverlay();
                    }
                }
            }

            window.addEventListener('mousemove', this.dragMoveListener, { capture: true });
            window.addEventListener('mouseup', this.dragUpListener, { capture: true });
            return;
        }

        // If clicked inside/on the dummy node, let Obsidian handle it natively
        if (this.dummyNode) {
            const node = this.dummyNode;
            const clickedInsideDummy = (
                (coords.x >= node.x && coords.x <= node.x + node.width &&
                 coords.y >= node.y && coords.y <= node.y + node.height) ||
                (e.target as HTMLElement).closest('.doom-dummy-node') !== null
            );
            if (clickedInsideDummy) {
                // If the click is inside the bounding box but not directly targeting the node element,
                // redirect it so the selection doesn't bubble up to the background and trigger native selection box
                const isTargetInsideDummy = (e.target as HTMLElement).closest('.doom-dummy-node') !== null;
                if (!isTargetInsideDummy && node.nodeEl) {
                    const targetEl = node.nodeEl.querySelector('.canvas-node-container') || node.nodeEl;
                    
                    e.preventDefault();
                    e.stopPropagation();
                    
                    this.isRedirectingEvent = true;
                    const clone = new MouseEvent('mousedown', {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                        detail: e.detail,
                        screenX: e.screenX,
                        screenY: e.screenY,
                        clientX: e.clientX,
                        clientY: e.clientY,
                        ctrlKey: e.ctrlKey,
                        altKey: e.altKey,
                        shiftKey: e.shiftKey,
                        metaKey: e.metaKey,
                        button: e.button,
                        buttons: e.buttons,
                        relatedTarget: e.relatedTarget
                    });
                    targetEl.dispatchEvent(clone);
                    this.isRedirectingEvent = false;
                }
                return;
            }
        }

        let clickedPixelIdx = -1;
        for (let i = 0; i < this.fakePixels.length; i++) {
            const p = this.fakePixels[i];
            if (p && coords.x >= p.x && coords.x <= p.x + (p.w !== undefined ? p.w : this.PIXEL_SCALE) &&
                coords.y >= p.y && coords.y <= p.y + (p.h !== undefined ? p.h : this.PIXEL_SCALE)) {
                clickedPixelIdx = i;
                break;
            }
        }

        if (clickedPixelIdx !== -1) {
            // Clicked game screen / virtual pixel
            if (!e.shiftKey && !e.metaKey && !e.ctrlKey) {
                // Default: select entire screen so dragging moves the whole game screen canvas node!
                this.fakePixels.forEach(px => { if (px) px.selected = true; });
            } else {
                const p = this.fakePixels[clickedPixelIdx];
                if (p) p.selected = !p.selected;
            }
            this.updateDummyNode(false);
            this.updateOverlayCanvasSize();
            this.drawOverlay();
            
            // Redirect the event so Obsidian drags the dummy node natively!
            if (this.dummyNode && this.dummyNode.nodeEl) {
                const targetEl = this.dummyNode.nodeEl.querySelector('.canvas-node-container') || this.dummyNode.nodeEl;
                
                e.preventDefault();
                e.stopPropagation();
                
                this.isRedirectingEvent = true;
                const clone = new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    detail: e.detail,
                    screenX: e.screenX,
                    screenY: e.screenY,
                    clientX: e.clientX,
                    clientY: e.clientY,
                    ctrlKey: e.ctrlKey,
                    altKey: e.altKey,
                    shiftKey: e.shiftKey,
                    metaKey: e.metaKey,
                    button: e.button,
                    buttons: e.buttons,
                    relatedTarget: e.relatedTarget
                });
                targetEl.dispatchEvent(clone);
                this.isRedirectingEvent = false;
            }
        } else {
            // Clicked empty space near the grid to start selection
            const size = this.PIXEL_SCALE;
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            const len = this.fakePixels.length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    const p = this.fakePixels[i];
                    if (p) {
                        if (p.x < minX) minX = p.x;
                        if (p.x > maxX) maxX = p.x;
                        if (p.y < minY) minY = p.y;
                        if (p.y > maxY) maxY = p.y;
                    }
                }
                const margin = 100;
                if (coords.x >= minX - margin && coords.x <= maxX + size + margin &&
                    coords.y >= minY - margin && coords.y <= maxY + size + margin) {
                    
                    if (!e.shiftKey && !e.metaKey && !e.ctrlKey) {
                        this.fakePixels.forEach(px => { if (px) px.selected = false; });
                    }
                    this.isSelecting = true;
                    this.selStart = { x: coords.x, y: coords.y };
                    this.selCurr = { x: coords.x, y: coords.y };
                    this.updateDummyNode(false);
                    this.updateOverlayCanvasSize();
                    this.drawOverlay();
                }
            }
        }
    };

    private onCanvasMousemove = (e: MouseEvent) => {
        if (document.pointerLockElement === document.body) return;
        if (!this.overlayCanvas) return;

        if (this.isSelecting) {
            const coords = this.getWorkspaceCoords(e);
            this.selCurr = { x: coords.x, y: coords.y };
            this.updateOverlayCanvasSize();
            this.drawOverlay();
        } else {
            this.checkGroupMovements();
        }
    };

    private dragMoveListener = (e: MouseEvent) => {
        this.checkGroupMovements();
    };

    private dragUpListener = (e: MouseEvent) => {
        window.removeEventListener('mousemove', this.dragMoveListener, { capture: true });
        window.removeEventListener('mouseup', this.dragUpListener, { capture: true });
        this.checkGroupMovements();
    };

    private checkGroupMovements(skipRedraw = false) {
        if (!this.canvasView.canvas) return;
        const canvas = this.canvasView.canvas;
        if (!canvas.nodes) return;

        let movedAny = false;
        canvas.nodes.forEach((node: any) => {
            if (node.type === 'group') {
                const last = this.lastGroupCoords.get(node.id);
                if (last) {
                    const dx = node.x - last.x;
                    const dy = node.y - last.y;
                    if (dx !== 0 || dy !== 0) {
                        movedAny = true;
                        const prevMinX = last.x;
                        const prevMinY = last.y;
                        const prevMaxX = last.x + node.width;
                        const prevMaxY = last.y + node.height;
                        
                        const len = this.fakePixels.length;
                        for (let i = 0; i < len; i++) {
                            const p = this.fakePixels[i];
                            if (p) {
                                const cx = p.x + (p.w !== undefined ? p.w : this.PIXEL_SCALE) / 2;
                                const cy = p.y + (p.h !== undefined ? p.h : this.PIXEL_SCALE) / 2;
                                if (cx >= prevMinX && cx <= prevMaxX && cy >= prevMinY && cy <= prevMaxY) {
                                    let dummySelected = false;
                                    if (this.dummyNode && canvas.selection) {
                                        if (typeof canvas.selection.has === 'function') {
                                            dummySelected = canvas.selection.has(this.dummyNode);
                                        } else if (this.dummyNode.nodeEl) {
                                            dummySelected = this.dummyNode.nodeEl.classList.contains('is-focused');
                                        }
                                    }
                                    if (p.selected && dummySelected) continue;
                                    p.x += dx;
                                    p.y += dy;
                                }
                            }
                        }
                    }
                }
                this.lastGroupCoords.set(node.id, { x: node.x, y: node.y });
            }
        });

        // Cleanup removed groups from the map
        this.lastGroupCoords.forEach((val, id) => {
            if (!canvas.nodes.has(id)) {
                this.lastGroupCoords.delete(id);
            }
        });

        if (movedAny && !skipRedraw) {
            this.updateDummyNode(false);
            this.updateOverlayCanvasSize();
            this.drawOverlay();
        }
    }

    private onCanvasMouseup = (e: MouseEvent) => {
        if (document.pointerLockElement === document.body) return;
        if (!this.overlayCanvas) return;

        if (this.isSelecting) {
            this.isSelecting = false;
            const minX = Math.min(this.selStart.x, this.selCurr.x);
            const maxX = Math.max(this.selStart.x, this.selCurr.x);
            const minY = Math.min(this.selStart.y, this.selCurr.y);
            const maxY = Math.max(this.selStart.y, this.selCurr.y);

            const len = this.fakePixels.length;
            for (let i = 0; i < len; i++) {
                const p = this.fakePixels[i];
                if (!p) continue;
                const cx = p.x + (p.w !== undefined ? p.w : this.PIXEL_SCALE) / 2;
                const cy = p.y + (p.h !== undefined ? p.h : this.PIXEL_SCALE) / 2;
                if (cx >= minX && cx <= maxX && cy >= minY && cy <= maxY) {
                    p.selected = true;
                }
            }
            this.updateDummyNode(false);
            this.updateOverlayCanvasSize();
            this.drawOverlay();
        }

        window.setTimeout(() => {
            this.syncGroupSelection();
        }, 50);
    };

    private syncGroupSelection() {
        if (!this.canvasView.canvas) return;
        const canvas = this.canvasView.canvas;
        
        const selectedGroupNodes: any[] = [];
        if (canvas.nodes) {
            canvas.nodes.forEach((node: any) => {
                if (node.type === 'group') {
                    let isSel = false;
                    if (canvas.selection && typeof canvas.selection.has === 'function') {
                        isSel = canvas.selection.has(node);
                    } else if (node.nodeEl) {
                        isSel = node.nodeEl.classList.contains('is-focused');
                    }
                    if (isSel) {
                        selectedGroupNodes.push(node);
                    }
                }
            });
        }

        if (selectedGroupNodes.length > 0) {
            let changed = false;
            const len = this.fakePixels.length;
            for (let i = 0; i < len; i++) {
                const p = this.fakePixels[i];
                if (p) {
                    const cx = p.x + (p.w !== undefined ? p.w : this.PIXEL_SCALE) / 2;
                    const cy = p.y + (p.h !== undefined ? p.h : this.PIXEL_SCALE) / 2;
                    
                    let insideAny = false;
                    for (const node of selectedGroupNodes) {
                        const minX = node.x;
                        const maxX = node.x + node.width;
                        const minY = node.y;
                        const maxY = node.y + node.height;
                        if (cx >= minX && cx <= maxX && cy >= minY && cy <= maxY) {
                            insideAny = true;
                            break;
                        }
                    }
                    if (insideAny && !p.selected) {
                        p.selected = true;
                        changed = true;
                    }
                }
            }
            if (changed) {
                this.updateDummyNode(true);
                this.updateOverlayCanvasSize();
                this.drawOverlay();
            }
        }
    }

    private updateOverlayCanvasSize() {
        if (!this.overlayCanvas) return;
        
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        
        for (let i = 0; i < this.fakePixels.length; i++) {
            const p = this.fakePixels[i];
            if (p) {
                if (p.x < minX) minX = p.x;
                if (p.y < minY) minY = p.y;
                const pw = p.w !== undefined ? p.w : this.PIXEL_SCALE;
                const ph = p.h !== undefined ? p.h : this.PIXEL_SCALE;
                if (p.x + pw > maxX) maxX = p.x + pw;
                if (p.y + ph > maxY) maxY = p.y + ph;
            }
        }
        
        if (minX === Infinity || !isFinite(minX)) {
            minX = this.dummyNode ? this.dummyNode.x : this.cachedMinX;
            minY = this.dummyNode ? this.dummyNode.y : this.cachedMinY;
            const isPSX = this.plugin.settings.activeSystem === 'psx';
            const currentW = isPSX ? 320 : 256;
            const currentH = 240;
            maxX = minX + currentW * this.PIXEL_SCALE;
            maxY = minY + currentH * this.PIXEL_SCALE;
        }
        
        this.cachedMinX = minX;
        this.cachedMinY = minY;
        
        const w = maxX - minX;
        const h = maxY - minY;
        
        this.overlayCanvas.width = w;
        this.overlayCanvas.height = h;
        setCssStyles(this.overlayCanvas, { width: w + 'px' });
        setCssStyles(this.overlayCanvas, { height: h + 'px' });
        setCssStyles(this.overlayCanvas, { left: minX + 'px' });
        setCssStyles(this.overlayCanvas, { top: minY + 'px' });

        if (this.crtOverlayEl) {
            setCssStyles(this.crtOverlayEl, { width: w + 'px' });
            setCssStyles(this.crtOverlayEl, { height: h + 'px' });
            setCssStyles(this.crtOverlayEl, { left: minX + 'px' });
            setCssStyles(this.crtOverlayEl, { top: minY + 'px' });
        }

        if (this.controllerPadEl) {
            this.updateControllerTransform();
        }
    }

    private drawOverlay() {
        if (!this.overlayCtx || !this.overlayCanvas || !this.canvasView.canvas) return;
        if (!this.isConsolePowerOn) {
            setCssStyles(this.overlayCanvas, { display: 'none' });
            if (this.crtOverlayEl) setCssStyles(this.crtOverlayEl, { display: 'none' });
            return;
        }

        const offsetX = this.cachedMinX;
        const offsetY = this.cachedMinY;
        const size = this.PIXEL_SCALE;
        const w = this.overlayCanvas.width;
        const h = this.overlayCanvas.height;

        this.overlayCtx.clearRect(0, 0, w, h);

        // ── GPU ACCELERATED FAST PATH: ALWAYS 1-SHOT BLIT ───────
        if (this.isRunning && (this.selectedVaultRomPath || this.customRomString)) {
            if (this.plugin.settings.activeSystem === 'psx' && this.psxEngine) {
                const psxCanvas = this.psxEngine.getCanvas();
                if (psxCanvas) {
                    this.overlayCtx.imageSmoothingEnabled = false;
                    this.overlayCtx.fillStyle = '#000000';
                    this.overlayCtx.fillRect(0, 0, w, h);

                    // Authentic PS1 4:3 Fullscreen Edge-to-Edge Fill:
                    const srcW = psxCanvas.width;
                    const srcH = psxCanvas.height;
                    const cropY = (srcH >= 220) ? Math.round(srcH * (8 / 240)) : 0;
                    const cropX = 0;
                    const activeW = srcW - cropX * 2;
                    const activeH = srcH - cropY * 2;

                    this.overlayCtx.drawImage(
                        psxCanvas,
                        cropX, cropY, activeW, activeH,
                        0, 0, w, h
                    );
                    return;
                }
            } else if (this.previewCanvas) {
                this.overlayCtx.imageSmoothingEnabled = false;
                this.overlayCtx.fillStyle = '#000000';
                this.overlayCtx.fillRect(0, 0, w, h);
                const cropX = 8;
                const cropY = 8;
                const activeW = 240;
                const activeH = 224;
                this.overlayCtx.drawImage(
                    this.previewCanvas,
                    cropX, cropY, activeW, activeH,
                    0, 0, w, h
                );
                return;
            }
        }

        // ── RETRO STANDBY DISPLAY: Console Powered ON with Empty Bay ─────────
        if (!this.selectedVaultRomPath && !this.customRomString) {
            const isPSX = (this.plugin.settings.activeSystem === 'psx');
            this.overlayCtx.fillStyle = isPSX ? '#0a0d14' : '#05070a';
            this.overlayCtx.fillRect(0, 0, w, h);

            // Subtle CRT phosphor scanline raster
            this.overlayCtx.fillStyle = 'rgba(255, 255, 255, 0.025)';
            for (let y = 0; y < h; y += 4) {
                this.overlayCtx.fillRect(0, y, w, 2);
            }
            return;
        }

        // ── SLOW PATH: selection/drag active or emulator stopped ─────────────────
        const colorMap = new Map<string, number[]>();
        const total = this.fakePixels.length;
        for (let i = 0; i < total; i++) {
            const color = this.pixelColors[i];
            if (color) {
                let arr = colorMap.get(color);
                if (!arr) { arr = []; colorMap.set(color, arr); }
                arr.push(i);
            }
        }
        
        for (const [color, indices] of colorMap) {
            this.overlayCtx.fillStyle = color;
            this.overlayCtx.beginPath();
            for (const i of indices) {
                const p = this.fakePixels[i];
                if (p) this.overlayCtx.rect(p.x - offsetX, p.y - offsetY, size, size);
            }
            this.overlayCtx.fill();
        }
    }

    

private updateDummyNode(preventSelect = false) {
        if (!this.canvasView.canvas) return;
        const canvas = this.canvasView.canvas;

        // Calculate bounding box of selected pixels
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        let anySelected = false;
        const size = this.PIXEL_SCALE;

        for (let i = 0; i < this.fakePixels.length; i++) {
            const p = this.fakePixels[i];
            if (p && p.selected) {
                anySelected = true;
                const pw = p.w !== undefined ? p.w : size;
                const ph = p.h !== undefined ? p.h : size;
                if (p.x < minX) minX = p.x;
                if (p.y < minY) minY = p.y;
                if (p.x + pw > maxX) maxX = p.x + pw;
                if (p.y + ph > maxY) maxY = p.y + ph;
            }
        }

        if (!anySelected) {
            // Remove dummy node if it exists
            if (this.dummyNode) {
                this.isUpdatingDummy = true;
                try {
                    canvas.removeNode(this.dummyNode);
                } catch (e) {
                    console.error("Error removing dummy node:", e);
                }
                this.dummyNode = null;
                this.isUpdatingDummy = false;
            }
            return;
        }

        const w = maxX - minX;
        const h = maxY - minY;

        if (this.dummyNode) {
            // Update existing dummy node position and size
            this.isUpdatingDummy = true;
            this.dummyNode.x = minX;
            this.dummyNode.y = minY;
            this.dummyNode.width = w;
            this.dummyNode.height = h;
            if (typeof this.dummyNode.render === 'function') {
                this.dummyNode.render();
            }
            this.dummyNodeLastX = minX;
            this.dummyNodeLastY = minY;
            this.isUpdatingDummy = false;
        } else {
            // Create new dummy node
            this.isUpdatingDummy = true;
            try {
                this.dummyNode = canvas.createTextNode({
                    pos: { x: minX, y: minY },
                    size: { width: w, height: h },
                    text: "",
                    save: false,
                    focus: false
                });

                if (this.dummyNode) {
                    // Add dummy class
                    if (this.dummyNode.nodeEl) {
                        this.dummyNode.nodeEl.classList.add('doom-dummy-node');
                    }

                    // Wrap property getters/setters/setData
                    this.wrapDummyNodeProperties(this.dummyNode, minX, minY, w, h);

                    // Patch destroy to clear selected pixels when deleted
                    const originalDestroy = this.dummyNode.destroy?.bind(this.dummyNode);
                    if (originalDestroy) {
                        this.dummyNode.destroy = () => {
                            if (!this.isUpdatingDummy) {
                                // Delete selected virtual pixels!
                                const len = this.fakePixels.length;
                                for (let i = 0; i < len; i++) {
                                    const p = this.fakePixels[i];
                                    if (p && p.selected) {
                                        this.fakePixels[i] = null as any;
                                        this.pixelColors[i] = '#000000';
                                    }
                                }
                                this.dummyNode = null;
                                this.updateOverlayCanvasSize();
                                this.drawOverlay();
                            }
                            originalDestroy();
                        };
                    }

                    this.dummyNodeLastX = minX;
                    this.dummyNodeLastY = minY;

                    // Programmatically select it
                    if (!preventSelect) {
                        canvas.selectOnly(this.dummyNode);
                    }
                }
            } catch (e) {
                console.error("Error creating dummy node:", e);
            }
            this.isUpdatingDummy = false;
        }
    }

    private wrapDummyNodeProperties(node: any, initialX?: number, initialY?: number, initialW?: number, initialH?: number) {
        const proto = Object.getPrototypeOf(node);
        const getProtoProp = (prop: string) => {
            let p = proto;
            while (p) {
                const desc = Object.getOwnPropertyDescriptor(p, prop);
                if (desc) return desc;
                p = Object.getPrototypeOf(p);
            }
            return null;
        };

        const descX = getProtoProp('x');
        const descY = getProtoProp('y');
        const descW = getProtoProp('width');
        const descH = getProtoProp('height');

        let valX = initialX !== undefined ? initialX : (node.x ?? 0);
        let valY = initialY !== undefined ? initialY : (node.y ?? 0);
        let valW = initialW !== undefined ? initialW : (node.width ?? 0);
        let valH = initialH !== undefined ? initialH : (node.height ?? 0);

        // Update initial values natively if descriptors exist
        if (initialX !== undefined) {
            if (descX && descX.set) descX.set.call(node, initialX);
            else node.x = initialX;
        }
        if (initialY !== undefined) {
            if (descY && descY.set) descY.set.call(node, initialY);
            else node.y = initialY;
        }
        if (initialW !== undefined) {
            if (descW && descW.set) descW.set.call(node, initialW);
            else node.width = initialW;
        }
        if (initialH !== undefined) {
            if (descH && descH.set) descH.set.call(node, initialH);
            else node.height = initialH;
        }
        
        const originalSetData = node.setData?.bind(node);
        if (originalSetData) {
            node.setData = (data: any) => {
                let didChange = false;
                const oldX = valX;
                const oldY = valY;
                const oldW = valW;
                const oldH = valH;

                if (data.x !== undefined && data.x !== valX) {
                    valX = data.x;
                    didChange = true;
                }
                if (data.y !== undefined && data.y !== valY) {
                    valY = data.y;
                    didChange = true;
                }
                if (data.width !== undefined && data.width !== valW) {
                    valW = data.width;
                    didChange = true;
                }
                if (data.height !== undefined && data.height !== valH) {
                    valH = data.height;
                    didChange = true;
                }

                if (didChange && !this.isUpdatingDummy) {
                    this.isUpdatingDummy = true;
                    
                    const rawScaleX = (oldW > 0 && valW > 0) ? (valW / oldW) : 1;
                    const rawScaleY = (oldH > 0 && valH > 0) ? (valH / oldH) : 1;
                    const uniformScale = (rawScaleX !== 1 && rawScaleY !== 1) ? Math.max(rawScaleX, rawScaleY) : (rawScaleX !== 1 ? rawScaleX : rawScaleY);
                    
                    valW = oldW * uniformScale;
                    valH = oldH * uniformScale;
                    const scaleX = uniformScale;
                    const scaleY = uniformScale;

                    const len = this.fakePixels.length;
                    for (let i = 0; i < len; i++) {
                        const p = this.fakePixels[i];
                        if (p && p.selected) {
                            const relX = p.x - oldX;
                            const relY = p.y - oldY;
                            p.x = valX + relX * scaleX;
                            p.y = valY + relY * scaleY;
                            p.w = (p.w ?? this.PIXEL_SCALE) * scaleX;
                            p.h = (p.h ?? this.PIXEL_SCALE) * scaleY;
                        }
                    }
                    this.dummyNodeLastX = valX;
                    this.dummyNodeLastY = valY;
                    this.isUpdatingDummy = false;
                }

                const result = originalSetData(data);
                this.updateOverlayCanvasSize();
                this.drawOverlay();
                return result;
            };
        }
        
        Object.defineProperty(node, 'x', {
            get: () => {
                if (descX && descX.get) return descX.get.call(node);
                return valX;
            },
            set: (newX) => {
                const currentX = (descX && descX.get) ? descX.get.call(node) : valX;
                if (newX !== currentX) {
                    const dx = newX - currentX;
                    if (descX && descX.set) descX.set.call(node, newX);
                    valX = newX;
                    if (!this.isUpdatingDummy) {
                        this.isUpdatingDummy = true;
                        const len = this.fakePixels.length;
                        for (let i = 0; i < len; i++) {
                            const p = this.fakePixels[i];
                            if (p && p.selected) {
                                p.x += dx;
                            }
                        }
                        this.dummyNodeLastX = newX;
                        this.isUpdatingDummy = false;
                        this.updateOverlayCanvasSize();
                        this.drawOverlay();
                    }
                }
            },
            configurable: true
        });

        Object.defineProperty(node, 'y', {
            get: () => {
                if (descY && descY.get) return descY.get.call(node);
                return valY;
            },
            set: (newY) => {
                const currentY = (descY && descY.get) ? descY.get.call(node) : valY;
                if (newY !== currentY) {
                    const dy = newY - currentY;
                    if (descY && descY.set) descY.set.call(node, newY);
                    valY = newY;
                    if (!this.isUpdatingDummy) {
                        this.isUpdatingDummy = true;
                        const len = this.fakePixels.length;
                        for (let i = 0; i < len; i++) {
                            const p = this.fakePixels[i];
                            if (p && p.selected) {
                                p.y += dy;
                            }
                        }
                        this.dummyNodeLastY = newY;
                        this.isUpdatingDummy = false;
                        this.updateOverlayCanvasSize();
                        this.drawOverlay();
                    }
                }
            },
            configurable: true
        });

        Object.defineProperty(node, 'width', {
            get: () => {
                if (descW && descW.get) return descW.get.call(node);
                return valW;
            },
            set: (newW) => {
                const currentW = (descW && descW.get) ? descW.get.call(node) : valW;
                if (newW !== currentW && currentW > 0) {
                    const oldW = currentW;
                    const scale = newW / oldW;
                    const currentH = (descH && descH.get) ? descH.get.call(node) : valH;
                    const oldH = currentH;
                    const targetH = oldH * scale;

                    if (descW && descW.set) descW.set.call(node, newW);
                    if (descH && descH.set) descH.set.call(node, targetH);
                    valW = newW;
                    valH = targetH;

                    if (!this.isUpdatingDummy) {
                        this.isUpdatingDummy = true;
                        const currentX = (descX && descX.get) ? descX.get.call(node) : valX;
                        const currentY = (descY && descY.get) ? descY.get.call(node) : valY;

                        const len = this.fakePixels.length;
                        for (let i = 0; i < len; i++) {
                            const p = this.fakePixels[i];
                            if (p && p.selected) {
                                const relX = p.x - currentX;
                                const relY = p.y - currentY;
                                p.x = currentX + relX * scale;
                                p.y = currentY + relY * scale;
                                p.w = (p.w ?? this.PIXEL_SCALE) * scale;
                                p.h = (p.h ?? this.PIXEL_SCALE) * scale;
                            }
                        }
                        this.isUpdatingDummy = false;
                        this.updateOverlayCanvasSize();
                        this.drawOverlay();
                    }
                }
            },
            configurable: true
        });

        Object.defineProperty(node, 'height', {
            get: () => {
                if (descH && descH.get) return descH.get.call(node);
                return valH;
            },
            set: (newH) => {
                const currentH = (descH && descH.get) ? descH.get.call(node) : valH;
                if (newH !== currentH && currentH > 0) {
                    const oldH = currentH;
                    const scale = newH / oldH;
                    const currentW = (descW && descW.get) ? descW.get.call(node) : valW;
                    const oldW = currentW;
                    const targetW = oldW * scale;

                    if (descH && descH.set) descH.set.call(node, newH);
                    if (descW && descW.set) descW.set.call(node, targetW);
                    valH = newH;
                    valW = targetW;

                    if (!this.isUpdatingDummy) {
                        this.isUpdatingDummy = true;
                        const currentX = (descX && descX.get) ? descX.get.call(node) : valX;
                        const currentY = (descY && descY.get) ? descY.get.call(node) : valY;

                        const len = this.fakePixels.length;
                        for (let i = 0; i < len; i++) {
                            const p = this.fakePixels[i];
                            if (p && p.selected) {
                                const relX = p.x - currentX;
                                const relY = p.y - currentY;
                                p.x = currentX + relX * scale;
                                p.y = currentY + relY * scale;
                                p.w = (p.w ?? this.PIXEL_SCALE) * scale;
                                p.h = (p.h ?? this.PIXEL_SCALE) * scale;
                            }
                        }
                        this.isUpdatingDummy = false;
                        this.updateOverlayCanvasSize();
                        this.drawOverlay();
                    }
                }
            },
            configurable: true
        });
    }



    private getAllAvailableRoms(system: 'nes' | 'psx'): { name: string; path: string; isAsset: boolean }[] {
        const roms: { name: string; path: string; isAsset: boolean }[] = [];
        
        // 1. Scan plugin assets folder using Node.js fs
        try {
            const manifestDir = getPluginDir(this.plugin);
            if (manifestDir) {
                const basePath = (this.plugin.app.vault.adapter as any).basePath || '';
                const fullAssetsDir = path.isAbsolute(manifestDir) 
                    ? path.join(manifestDir, 'assets', system, 'roms')
                    : path.join(basePath, manifestDir, 'assets', system, 'roms');
                if (fs.existsSync(fullAssetsDir)) {
                    const walkSync = (dir: string, filelist: string[] = []): string[] => {
                        const files = fs.readdirSync(dir);
                        for (const file of files) {
                            const filepath = path.join(dir, file);
                            const stat = fs.statSync(filepath);
                            if (stat.isDirectory()) {
                                filelist = walkSync(filepath, filelist);
                            } else {
                                filelist.push(filepath);
                            }
                        }
                        return filelist;
                    };

                    const allFiles = walkSync(fullAssetsDir);
                    for (const fullPath of allFiles) {
                        const file = path.basename(fullPath);
                        const isNes = system === 'nes' && file.toLowerCase().endsWith('.nes');
                        const isPsx = system === 'psx' && (file.toLowerCase().endsWith('.bin') || file.toLowerCase().endsWith('.cue') || file.toLowerCase().endsWith('.iso'));
                        if (isNes || isPsx) {
                            // Strip (Track 1), (Track 01), etc. from multi-track names
                            const baseName = file.replace(/\.(nes|bin|cue|iso)$/i, '').replace(/\s*\([^)]*track\s*\d+[^)]*\)/i, '').trim();
                            const properName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
                            
                            const existingIndex = roms.findIndex(r => r.name.toLowerCase() === properName.toLowerCase());
                            if (existingIndex !== -1) {
                                // If existing entry is a .bin and current is a .cue, replace it with .cue (master index sheet)!
                                if (fullPath.toLowerCase().endsWith('.cue')) {
                                    roms[existingIndex] = {
                                        name: properName,
                                        path: fullPath,
                                        isAsset: true
                                    };
                                }
                            } else {
                                roms.push({
                                    name: properName,
                                    path: fullPath,
                                    isAsset: true
                                });
                            }
                        }
                    }
                }
            }
        } catch (e) {
            console.error("Error scanning plugin assets directory:", e);
        }

        return roms;
    }

    private loadRomBytesSync(romPath: string): Uint8Array | null {
        try {
            if (fs.existsSync(romPath)) {
                const buf = fs.readFileSync(romPath);
                return new Uint8Array(buf);
            }
        } catch (e) {
            console.error("Error reading file via fs:", e);
        }
        return null;
    }

    private async loadRomBytesAsync(romPath: string): Promise<Uint8Array | null> {
        try {
            if (fs.existsSync(romPath)) {
                const buf = await fs.promises.readFile(romPath);
                return new Uint8Array(buf);
            }
        } catch (e) {
            console.error("Error reading file via fs async:", e);
        }
        return null;
    }

    private findCoverImageForRom(romPath: string, system: 'nes' | 'psx'): string | null {
        if (this.coverCache.has(romPath)) {
            return this.coverCache.get(romPath) || null;
        }

        try {
            const baseName = romPath.replace(/\.(nes|bin|cue|iso|chd|pbp)$/i, '');
            const romBasenameOnly = path.basename(baseName).toLowerCase();
            const extensions = ['png', 'jpg', 'jpeg', 'webp'];
            const dir = path.dirname(romPath);

            // 1. Scan plugin asset cover directories (NES & PSX)
            const pluginDir = getPluginDir(this.plugin);
            const coversFolder = system === 'nes'
                ? path.join(pluginDir, 'assets', 'nes', 'covers')
                : path.join(pluginDir, 'assets', 'psx', 'covers');

            const configDir = this.plugin.app.vault.configDir;
            const adapter = this.plugin.app?.vault?.adapter as any;
            const basePath = adapter?.getBasePath?.() || adapter?.basePath || '';
            const searchFolders: string[] = [
                path.join(dir, '..', 'covers'),
                path.join(dir, 'covers'),
                coversFolder
            ];
            if (basePath) {
                searchFolders.push(path.join(basePath, configDir, 'plugins', 'canvas-retro-engine', 'assets', 'nes', 'covers'));
                searchFolders.push(path.join(basePath, configDir, 'plugins', 'canvas-retro-engine', 'assets', 'psx', 'covers'));
                searchFolders.push(path.join(basePath, configDir, 'plugins', 'canvas-nes-emulator', 'assets', 'nes', 'covers'));
            }

            for (const fld of searchFolders) {
                if (fs.existsSync(fld)) {
                    const coverFiles = fs.readdirSync(fld);
                    for (const cf of coverFiles) {
                        const cfLower = cf.toLowerCase();
                        const cfBase = cfLower.replace(/\.(png|jpg|jpeg|webp)$/i, '');
                        if (
                            cfBase === romBasenameOnly ||
                            cfBase.startsWith(romBasenameOnly) ||
                            romBasenameOnly.startsWith(cfBase) ||
                            romBasenameOnly.replace(/[^a-z0-9]/g, '') === cfBase.replace(/[^a-z0-9]/g, '')
                        ) {
                            const fullImgPath = path.join(fld, cf);
                            const data = fs.readFileSync(fullImgPath);
                            const ext = path.extname(cf).substring(1).toLowerCase();
                            const mimeType = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;
                            const result = `data:${mimeType};base64,${data.toString('base64')}`;
                            this.coverCache.set(romPath, result);
                            return result;
                        }
                    }
                }
            }

            // 2. Scan the direct directory of the ROM file
            const absDir = path.isAbsolute(dir) ? dir : (basePath ? path.join(basePath, dir) : dir);

            if (fs.existsSync(absDir)) {
                const dirFiles = fs.readdirSync(absDir);
                for (const file of dirFiles) {
                    const fileLower = file.toLowerCase();
                    const ext = path.extname(fileLower).substring(1);
                    if (extensions.includes(ext)) {
                        const nameWithoutExt = path.basename(fileLower, '.' + ext);
                        if (
                            nameWithoutExt === romBasenameOnly ||
                            nameWithoutExt.startsWith(romBasenameOnly) ||
                            romBasenameOnly.startsWith(nameWithoutExt)
                        ) {
                            const fullImgPath = path.join(absDir, file);
                            const data = fs.readFileSync(fullImgPath);
                            const mimeType = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;
                            const result = `data:${mimeType};base64,${data.toString('base64')}`;
                            this.coverCache.set(romPath, result);
                            return result;
                        }
                    }
                }
            }

            // 3. Fallback: Search inside Obsidian vault files
            const vaultFiles = this.plugin.app?.vault?.getFiles?.() || [];
            for (const ext of extensions) {
                const match = vaultFiles.find((f: any) => {
                    const p = f.path.toLowerCase();
                    return p.includes(romBasenameOnly) && p.endsWith('.' + ext);
                });
                if (match) {
                    const fullPath = path.join(basePath, match.path);
                    if (fs.existsSync(fullPath)) {
                        const data = fs.readFileSync(fullPath);
                        const mimeType = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;
                        const result = `data:${mimeType};base64,${data.toString('base64')}`;
                        this.coverCache.set(romPath, result);
                        return result;
                    }
                }
            }
        } catch (e) {
            console.error("Error finding cover image:", e);
        }

        return null;
    }

    private updateBoxArtCover(gameName: string, coverUrl: string | null) {
        if (!this.boxArtEl) return;
        this.boxArtEl.textContent = '';

        if (coverUrl) {
            const img = createEl('img');
            img.src = coverUrl;
            img.className = 'tetris-box-art-img';
            this.boxArtEl.appendChild(img);
        } else {
            const card = createDiv();
            card.className = 'tetris-box-art-placeholder';
            const grooves = createDiv(); grooves.className = 'cart-top-grooves';
            const label = createDiv(); label.className = 'cart-label';
            const title = createDiv(); title.className = 'cart-title'; title.textContent = gameName.toUpperCase();
            const sub = createDiv(); sub.className = 'cart-sub';
            const sub1 = createDiv(); sub1.textContent = 'OFFICIAL NINTENDO';
            const sub2 = createDiv(); sub2.textContent = 'PAK COMPATIBLE';
            sub.appendChild(sub1); sub.appendChild(sub2);
            label.appendChild(title); label.appendChild(sub);
            card.appendChild(grooves); card.appendChild(label);
            this.boxArtEl.appendChild(card);
        }
    }

    private renderCartridgeDrawer() {
        this.renderUnifiedCartridgeSystem();
    }

    private renderLoadingBay() {
        this.renderUnifiedCartridgeSystem();
    }

    private renderUnifiedCartridgeSystem() {
        this.build3DScene();
    }



    private getAssetDataUrl(relPath: string): string {
        try {
            const manifestDir = getPluginDir(this.plugin);
            if (manifestDir) {
                const basePath = (this.plugin.app.vault.adapter as any).basePath || '';
                const fullPath = path.isAbsolute(manifestDir)
                    ? path.join(manifestDir, 'assets', relPath)
                    : path.join(basePath, manifestDir, 'assets', relPath);
                if (fs.existsSync(fullPath)) {
                    const buf = fs.readFileSync(fullPath);
                    return `data:image/png;base64,${buf.toString('base64')}`;
                }
            }
        } catch (e) {
            console.error("Failed to load asset logo data URL:", e);
        }
        return '';
    }

    // ── 🧹 DEEP RECURSIVE THREE.JS RESOURCE DISPOSAL (ZERO MEMORY LEAKS) ──────────
    private disposeThreeObject(obj: any) {
        if (!obj) return;
        try {
            if (obj.geometry && typeof obj.geometry.dispose === 'function') {
                obj.geometry.dispose();
            }
            if (obj.material) {
                const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
                for (const mat of mats) {
                    if (!mat) continue;
                    const textureSlots = [
                        'map', 'alphaMap', 'aoMap', 'bumpMap', 'displacementMap',
                        'emissiveMap', 'envMap', 'lightMap', 'metalnessMap',
                        'normalMap', 'roughnessMap', 'specularMap', 'gradientMap'
                    ];
                    for (const slot of textureSlots) {
                        if (mat[slot] && typeof mat[slot].dispose === 'function') {
                            mat[slot].dispose();
                        }
                    }
                    if (typeof mat.dispose === 'function') {
                        mat.dispose();
                    }
                }
            }
            if (obj.dispose && typeof obj.dispose === 'function' && !obj.isMesh && !obj.isScene && !obj.isGroup) {
                obj.dispose();
            }
        } catch (e) {
            console.error("Error disposing Three.js object:", e);
        }
    }

    private disposeThreeHierarchy(root: THREE.Object3D | null) {
        if (!root) return;
        try {
            root.traverse((node: any) => {
                this.disposeThreeObject(node);
            });
        } catch (e) {
            console.error("Error disposing Three.js hierarchy:", e);
        }
    }

    // ── 🏁 TRUE 3D CTR WAVY SILK MESH TRANSITION ENGINE (VIEWPORT ANCHORED) ────────────────
    private ensureCurtainOverlay() {
        if (!this.boxArtEl) return;
        if (this.curtainOverlayEl && this.curtainOverlayEl.parentElement === this.boxArtEl) return;

        if (this.curtainOverlayEl && this.curtainOverlayEl.parentElement) {
            this.curtainOverlayEl.parentElement.removeChild(this.curtainOverlayEl);
        }

        const curtain = createDiv();
        curtain.className = 'retro-viewport-curtain';

        const blade = createDiv();
        blade.className = 'curtain-blade';

        // 3D Flag WebGL Canvas
        const flagCanvas = createEl('canvas');
        flagCanvas.className = 'curtain-3d-flag-canvas';
        blade.appendChild(flagCanvas);
        this.flagCanvasEl = flagCanvas;

        // 🌟 Center Animated Author Logo (Title Pill Lottie Animation)
        const logoWrapper = createDiv();
        logoWrapper.className = 'curtain-author-logo-wrapper';
        const logoSize = (this.masterState as any).curtainLogoSize ?? 95;
        setCssStyles(logoWrapper, { width: `${logoSize}px` });
        setCssStyles(logoWrapper, { height: `${logoSize}px` });
        this.curtainLogoWrapperEl = logoWrapper;

        try {
            lottie.loadAnimation({
                container: logoWrapper,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: logoAnimationData,
                rendererSettings: { preserveAspectRatio: 'xMidYMid meet' }
            });
            const svg = logoWrapper.querySelector('svg');
            if (svg) {
                setCssStyles(svg, { backgroundColor: 'transparent' });
                setCssStyles(svg, { display: 'block' });
                setCssStyles(svg, { width: '100%' });
                setCssStyles(svg, { height: '100%' });
            }
        } catch (e) {
            console.error("Failed to load curtain lottie animation:", e);
        }

        blade.appendChild(logoWrapper);
        curtain.appendChild(blade);

        this.boxArtEl.appendChild(curtain);
        this.curtainOverlayEl = curtain;
        this.curtainBladeEl = blade;

        this.init3DFlagScene();
    }

    private init3DFlagScene() {
        if (!this.flagCanvasEl) return;
        const width = this.flagCanvasEl.clientWidth || 800;
        const height = this.flagCanvasEl.clientHeight || 500;

        const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
        const renderer = new THREE.WebGLRenderer({
            canvas: this.flagCanvasEl,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(dpr);
        renderer.setSize(width, height, false);
        this.flagRenderer = renderer;

        const scene = new THREE.Scene();
        this.flagScene = scene;

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 8.5);
        this.flagCamera = camera;

        // Optimized 128x64 cloth grid: Silky smooth cloth curves with 4x higher FPS and zero frame drops
        const geometry = new THREE.PlaneGeometry(16, 10, 128, 64);

        const vertexShader = `
            uniform float uTime;
            uniform float uAmplitude;
            uniform float uWavelength;
            uniform float uWaveFreq;
            uniform float uWaveTurbulence;
            uniform float uWaveSpeed;
            uniform vec3 uRot;
            uniform vec3 uPos;
            uniform vec3 uFlagScale;
            uniform float uSweepProgress;
            uniform float uSweepMode;
            uniform float uWaveGrowth;
            
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            
            mat3 rotationMatrix(vec3 angles) {
                float cx = cos(angles.x), sx = sin(angles.x);
                float cy = cos(angles.y), sy = sin(angles.y);
                float cz = cos(angles.z), sz = sin(angles.z);
                
                mat3 rx = mat3(1.0, 0.0, 0.0,  0.0, cx, -sx,  0.0, sx, cx);
                mat3 ry = mat3(cy, 0.0, sy,   0.0, 1.0, 0.0,  -sy, 0.0, cy);
                mat3 rz = mat3(cz, -sz, 0.0,  sz, cz, 0.0,   0.0, 0.0, 1.0);
                
                return rz * ry * rx;
            }

            void main() {
                vUv = uv;
                vec3 pos = position;
                pos *= uFlagScale;
                
                float t = uTime * uWaveSpeed;
                float k = (6.2831853 / max(0.2, uWavelength)) * uWaveFreq;
                
                // Primary undulating silk wave along X and Y
                float wave1 = sin(pos.x * k - t) * uAmplitude;
                // Secondary cross-flutter turbulence
                float wave2 = sin(pos.x * k * 1.6 + pos.y * (k * 0.7) - t * 1.3) * (uAmplitude * uWaveTurbulence * 0.4);
                // Vertical micro-creases
                float wave3 = cos(pos.y * k * 1.1 - t * 0.9) * (uAmplitude * uWaveTurbulence * 0.25);
                
                float totalWave = (wave1 + wave2 + wave3) * uWaveGrowth;
                
                // Normalized X across geometry: 0.0 (left edge) to 1.0 (right edge)
                float normX = clamp((position.x / 16.0) + 0.5, 0.0, 1.0);
                
                if (uSweepMode < 0.5) {
                    // 🌊 TRUE BILLOWING WAVE-IN UNFURL (Left to Right)
                    float front = uSweepProgress * 1.32 - 0.16;
                    float d = normX - front;
                    
                    // Unfurled factor (1.0 = fully billowed across viewport, 0.0 = rolled back)
                    float unfold = smoothstep(0.16, -0.16, d);
                    
                    // Dynamic crest roll at the advancing front
                    float crest = sin(clamp((1.0 - d * 3.8), 0.0, 1.0) * 3.14159) * (1.0 - unfold);
                    
                    pos.z += totalWave * unfold + crest * (uAmplitude * 2.1);
                    
                    // Natural cloth unfurling: vertices expand outward from the wave crest
                    float foldCompression = (1.0 - unfold) * 16.0;
                    pos.x -= foldCompression;
                    pos.z -= (1.0 - unfold) * 3.2;
                } else {
                    // 🌊 TRUE BILLOWING WAVE-OUT FLUTTER (Left to Right Dissolve)
                    float front = uSweepProgress * 1.32 - 0.16;
                    float d = normX - front;
                    
                    float flutterAway = smoothstep(0.16, -0.16, d);
                    float flutter = sin(pos.x * k * 2.2 - t * 2.8) * (uAmplitude * flutterAway * 1.1);
                    
                    pos.z += totalWave * (1.0 - flutterAway * 0.6) + flutter;
                    
                    // Accelerated wave pull towards the right
                    pos.x += flutterAway * (16.0 * (0.85 + uSweepProgress * 0.5));
                    pos.z -= flutterAway * 3.0;
                }
                
                // Analytical normal derivatives for pristine lighting creases
                float dzdx = (cos(pos.x * k - t) * k * uAmplitude
                           + cos(pos.x * k * 1.6 + pos.y * (k * 0.7) - t * 1.3) * (k * 1.6) * (uAmplitude * uWaveTurbulence * 0.4)) * uWaveGrowth;
                float dzdy = (cos(pos.x * k * 1.6 + pos.y * (k * 0.7) - t * 1.3) * (k * 0.7) * (uAmplitude * uWaveTurbulence * 0.4)
                           - sin(pos.y * k * 1.1 - t * 0.9) * (k * 1.1) * (uAmplitude * uWaveTurbulence * 0.25)) * uWaveGrowth;
                
                vec3 localNormal = normalize(vec3(-dzdx, -dzdy, 1.0));
                
                mat3 rot = rotationMatrix(uRot);
                vec3 rotatedPos = rot * pos;
                
                rotatedPos.x += uPos.x;
                rotatedPos.y += uPos.y;
                rotatedPos.z += uPos.z;
                
                vec3 rotatedNormal = normalize(rot * localNormal);
                
                vec4 mvPosition = modelViewMatrix * vec4(rotatedPos, 1.0);
                vViewPosition = -mvPosition.xyz;
                vNormal = normalMatrix * rotatedNormal;
                
                gl_Position = projectionMatrix * mvPosition;
            }
        `;

        const fragmentShader = `
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform float uCheckScaleX;
            uniform float uCheckScaleY;
            uniform float uAspectCorrect;
            uniform float uContrast;
            uniform float uSpecularGloss;
            uniform bool uLeadingEdgeEnabled;
            uniform vec3 uLeadingEdgeColor;
            uniform float uPearlIntensity;
            uniform float uPearlSpread;
            uniform float uPearlPhase;
            uniform float uPearlBrightness;
            uniform float uPearlSaturation;
            uniform float uPearlFresnelPower;
            uniform float uPearlSpecular;
            uniform vec3 uPearlTint;
            
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            
            vec3 spectralPal(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
                return a + b * cos(6.2831853 * (c * t + d));
            }
            
            void main() {
                // High-Fidelity Analytical Box-Filtered Anti-Aliasing (Inigo Quilez AA formulation)
                vec2 checkCoord = vec2(vUv.x * max(1.0, uCheckScaleX) * max(0.1, uAspectCorrect), vUv.y * max(1.0, uCheckScaleY));
                vec2 w = max(fwidth(checkCoord), 0.00001);
                vec2 i = 2.0 * (abs(fract((checkCoord - 0.5 * w) * 0.5) - 0.5) - abs(fract((checkCoord + 0.5 * w) * 0.5) - 0.5)) / w;
                float checkPattern = clamp(0.5 - 0.5 * i.x * i.y, 0.0, 1.0);
                vec3 baseColor = mix(uColor1, uColor2, checkPattern);
                
                vec3 normal = normalize(vNormal);
                vec3 viewDir = normalize(vViewPosition);
                
                vec3 lightDir1 = normalize(vec3(0.4, 0.7, 0.9));
                vec3 lightDir2 = normalize(vec3(-0.5, -0.2, 0.6));
                
                float diff1 = max(dot(normal, lightDir1), 0.0);
                float diff2 = max(dot(normal, lightDir2), 0.0) * 0.35;
                float totalDiff = 0.20 + (diff1 + diff2) * 0.80;
                
                vec3 shadedColor = baseColor * mix(1.0, totalDiff, uContrast);
                
                // 🦪 Pearlescent & Iridescent Optical Sheen Model
                float NdotV = max(dot(normal, viewDir), 0.0);
                float NdotL1 = max(dot(normal, lightDir1), 0.0);
                
                // Pearlescent Fresnel factor at grazing angles
                float pearlFresnel = pow(1.0 - NdotV, max(0.2, uPearlFresnelPower));
                
                // Spectral iridescent interference: shifts through pastel cyan, pink/magenta, opal violet, and soft gold
                float pearlAngle = (1.0 - NdotV) * uPearlSpread + (NdotL1 * 0.35) + (uPearlPhase * 0.5);
                vec3 iridColor = spectralPal(pearlAngle,
                    vec3(uPearlBrightness),
                    vec3(uPearlSaturation),
                    vec3(1.0, 1.0, 1.0),
                    vec3(0.00, 0.33, 0.67)
                ) * uPearlTint;
                
                // Specular highlight with pearlescent tinted luster
                vec3 halfDir = normalize(lightDir1 + viewDir);
                float specAngle = max(dot(normal, halfDir), 0.0);
                float specular = pow(specAngle, 28.0) * uSpecularGloss * 0.9;
                vec3 pearlSpec = iridColor * pow(specAngle, 18.0) * (uPearlSpecular * uPearlIntensity);
                
                // Silk rim sheen (Fresnel)
                float baseFresnel = pow(1.0 - NdotV, 3.0) * 0.35 * uSpecularGloss;
                
                // Combined pearlescent body & sheen contribution
                vec3 pearlShimmer = iridColor * (pearlFresnel * 0.85 + 0.15) * uPearlIntensity;
                
                // Final blend: base shaded cloth + specular + iridescent sheen
                vec3 finalColor = shadedColor + vec3(specular + baseFresnel) + pearlShimmer + pearlSpec;
                
                if (uLeadingEdgeEnabled) {
                    float edgeDist = abs(vUv.x - 1.0);
                    float edgeWidth = max(fwidth(vUv.x) * 3.0, 0.035);
                    if (edgeDist < edgeWidth) {
                        float glow = smoothstep(edgeWidth, 0.0, edgeDist);
                        finalColor = mix(finalColor, uLeadingEdgeColor * 1.6, glow * 0.9);
                    }
                }
                
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

        const uniforms = {
            uTime: { value: 0.0 },
            uAmplitude: { value: 0.85 },
            uWavelength: { value: 4.2 },
            uWaveFreq: { value: 1.25 },
            uWaveSpeed: { value: 1.30 },
            uWaveTurbulence: { value: 0.40 },
            uRot: { value: new THREE.Vector3(0.12, 0.20, -0.04) },
            uPos: { value: new THREE.Vector3(0.0, 0.0, 0.0) },
            uFlagScale: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
            uSweepProgress: { value: this.flagSweepProgress },
            uSweepMode: { value: this.flagSweepMode },
            uWaveGrowth: { value: 1.0 },
            uColor1: { value: new THREE.Color('#181c26') },
            uColor2: { value: new THREE.Color('#080a0f') },
            uCheckScaleX: { value: 24.0 },
            uCheckScaleY: { value: 15.0 },
            uAspectCorrect: { value: 1.0 },
            uContrast: { value: 0.75 },
            uSpecularGloss: { value: 0.85 },
            uLeadingEdgeEnabled: { value: true },
            uLeadingEdgeColor: { value: new THREE.Color('#00f0ff') },
            uPearlIntensity: { value: 0.85 },
            uPearlSpread: { value: 2.2 },
            uPearlPhase: { value: 0.40 },
            uPearlBrightness: { value: 0.68 },
            uPearlSaturation: { value: 0.42 },
            uPearlFresnelPower: { value: 2.5 },
            uPearlSpecular: { value: 0.90 },
            uPearlTint: { value: new THREE.Color('#ffffff') }
        };

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
            side: THREE.DoubleSide
        });
        this.flagMaterial = material;

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        this.flagMesh = mesh;

        this.start3DFlagRenderLoop();
    }

    private start3DFlagRenderLoop() {
        if (this.flagAnimFrameId !== null) return;
        this.flagStartTime = performance.now();

        const renderLoop = () => {
            if (!this.curtainOverlayEl || !this.flagRenderer || !this.flagScene || !this.flagCamera || !this.flagMaterial) {
                this.flagAnimFrameId = null;
                return;
            }

            const isPinned = !!(this.masterState as any).curtainPinned;
            const isActive = this.curtainOverlayEl.classList.contains('active') || this.curtainOverlayEl.classList.contains('in-transit') || this.isCurtainTransitioning;

            if (!isPinned && !isActive && !this.flagIsAnimating && !this.isCurtainTransitioning) {
                this.flagAnimFrameId = null;
                return;
            }

            this.flagAnimFrameId = window.requestAnimationFrame(renderLoop);

            if (this.flagCanvasEl) {
                if (this.flagCanvasCachedWidth <= 0 || this.flagCanvasCachedHeight <= 0) {
                    const w = this.flagCanvasEl.clientWidth || 320;
                    const h = this.flagCanvasEl.clientHeight || 380;
                    this.flagCanvasCachedWidth = w;
                    this.flagCanvasCachedHeight = h;
                    const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
                    this.flagRenderer.setPixelRatio(dpr);
                    this.flagRenderer.setSize(w, h, false);
                    this.flagCamera.aspect = w / h;
                    this.flagCamera.updateProjectionMatrix();
                }
            }

            const elapsed = (performance.now() - this.flagStartTime) * 0.001;
            const s = this.masterState as any;

            if (this.curtainLogoWrapperEl) {
                const desiredSize = ((s.curtainLogoSize ?? 95)) + 'px';
                if (this.curtainLogoWrapperEl.style.width !== desiredSize) {
                    setCssStyles(this.curtainLogoWrapperEl, { width: desiredSize });
                    setCssStyles(this.curtainLogoWrapperEl, { height: desiredSize });
                }
            }

            const u = this.flagMaterial.uniforms;
            u.uTime.value = elapsed;
            u.uAmplitude.value = typeof s.curtainAmplitude === 'number' ? s.curtainAmplitude : 0.85;
            u.uWavelength.value = typeof s.curtainWavelength === 'number' ? s.curtainWavelength : 4.2;
            u.uWaveFreq.value = typeof s.curtainWaveFreq === 'number' ? s.curtainWaveFreq : 1.25;
            u.uWaveSpeed.value = this.flagIsAnimating ? this.flagCurrentSpeed : (typeof s.curtainWaveSpeed === 'number' ? s.curtainWaveSpeed : 1.25);
            u.uWaveGrowth.value = this.flagIsAnimating ? this.flagWaveGrowth : 1.0;
            u.uWaveTurbulence.value = typeof s.curtainWaveTurbulence === 'number' ? s.curtainWaveTurbulence : 0.40;
            u.uRot.value.set(
                typeof s.curtainRotX === 'number' ? s.curtainRotX : 0.12,
                typeof s.curtainRotY === 'number' ? s.curtainRotY : 0.20,
                typeof s.curtainRotZ === 'number' ? s.curtainRotZ : -0.04
            );
            u.uPos.value.set(
                typeof s.curtainPosX === 'number' ? s.curtainPosX : 0.0,
                typeof s.curtainPosY === 'number' ? s.curtainPosY : 0.0,
                typeof s.curtainPosZ === 'number' ? s.curtainPosZ : 0.0
            );

            const overallScale = typeof s.curtainFlagScale === 'number' ? s.curtainFlagScale : 1.0;
            u.uFlagScale.value.set(
                (typeof s.curtainFlagScaleX === 'number' ? s.curtainFlagScaleX : 1.0) * overallScale,
                (typeof s.curtainFlagScaleY === 'number' ? s.curtainFlagScaleY : 1.0) * overallScale,
                (typeof s.curtainFlagScaleZ === 'number' ? s.curtainFlagScaleZ : 1.0) * overallScale
            );

            u.uSweepProgress.value = this.flagSweepProgress;
            u.uSweepMode.value = this.flagSweepMode;
            u.uColor1.value.set(s.curtainPrimaryColor || '#181c26');
            u.uColor2.value.set(s.curtainSecondaryColor || '#080a0f');
            u.uCheckScaleX.value = typeof s.curtainCheckScaleX === 'number' ? s.curtainCheckScaleX : 24.0;
            u.uCheckScaleY.value = typeof s.curtainCheckScaleY === 'number' ? s.curtainCheckScaleY : 15.0;
            u.uAspectCorrect.value = typeof s.curtainAspectCorrect === 'number' ? s.curtainAspectCorrect : 1.0;
            u.uContrast.value = typeof s.curtainWaveContrast === 'number' ? s.curtainWaveContrast : 0.75;
            u.uSpecularGloss.value = typeof s.curtainSpecularGloss === 'number' ? s.curtainSpecularGloss : 0.85;
            u.uLeadingEdgeEnabled.value = s.curtainLeadingEdgeEnabled !== false;
            u.uLeadingEdgeColor.value.set(s.curtainLeadingEdgeColor || '#00f0ff');
            u.uPearlIntensity.value = typeof s.curtainPearlIntensity === 'number' ? s.curtainPearlIntensity : 0.85;
            u.uPearlSpread.value = typeof s.curtainPearlSpread === 'number' ? s.curtainPearlSpread : 2.2;
            u.uPearlPhase.value = typeof s.curtainPearlPhase === 'number' ? s.curtainPearlPhase : 0.40;
            u.uPearlBrightness.value = typeof s.curtainPearlBrightness === 'number' ? s.curtainPearlBrightness : 0.68;
            u.uPearlSaturation.value = typeof s.curtainPearlSaturation === 'number' ? s.curtainPearlSaturation : 0.42;
            u.uPearlFresnelPower.value = typeof s.curtainPearlFresnelPower === 'number' ? s.curtainPearlFresnelPower : 2.5;
            u.uPearlSpecular.value = typeof s.curtainPearlSpecular === 'number' ? s.curtainPearlSpecular : 0.90;
            u.uPearlTint.value.set(s.curtainPearlColor || '#ffffff');

            this.flagRenderer.render(this.flagScene, this.flagCamera);
        };

        this.flagAnimFrameId = window.requestAnimationFrame(renderLoop);
    }

    private togglePinCurtain(pin?: boolean) {
        this.ensureCurtainOverlay();
        if (!this.curtainOverlayEl) return;
        const s = this.masterState as any;
        const targetState = typeof pin === 'boolean' ? pin : !s.curtainPinned;
        s.curtainPinned = targetState;

        const curtain = this.curtainOverlayEl;

        if (targetState) {
            curtain.classList.add('active', 'in-transit');
            this.flagSweepProgress = 1.0;
            this.flagSweepMode = 0.0;
            this.flagWaveGrowth = 1.0;
            this.flagCurrentSpeed = (this.masterState as any).curtainWaveSpeed ?? 1.25;
            this.start3DFlagRenderLoop();
        } else {
            curtain.classList.remove('active', 'in-transit');
            this.flagSweepProgress = 0.0;
        }

        if (this.plugin && this.plugin.settings) {
            this.plugin.settings.masterState = Object.assign({}, this.masterState);
            this.plugin.saveSettings();
        }
    }

    private playCurtainSweepIn(targetSys: 'nes' | 'psx', onCovered: () => void) {
        this.ensureCurtainOverlay();
        if (!this.curtainOverlayEl) {
            onCovered();
            return;
        }

        const curtain = this.curtainOverlayEl;
        curtain.classList.add('active');

        const logo = this.curtainLogoWrapperEl;
        if (logo) {
            setCssStyles(logo, { opacity: '0' });
            setCssStyles(logo, { transform: 'scale(0.80)' });
            setCssStyles(logo, { transition: 'none' });
        }

        this.flagSweepProgress = 0.0;
        this.flagSweepMode = 0.0; // Wave-In
        this.flagWaveGrowth = 0.35;
        this.flagIsAnimating = true;

        const duration = (this.masterState as any).curtainInDurationMs ?? 650;
        const baseSpeed = (this.masterState as any).curtainWaveSpeed ?? 1.25;
        const peakSpeed = (this.masterState as any).curtainPeakSpeed ?? 2.6;
        const rampExp = (this.masterState as any).curtainRampExponent ?? 1.5;
        const startTime = performance.now();

        this.start3DFlagRenderLoop();

        const animateIn = () => {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(1.0, elapsed / duration);
            const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

            this.flagSweepProgress = ease;
            this.flagWaveGrowth = 0.35 + (0.65 * ease);
            // Dynamic wave ripple speed ramp with controllable curve exponent
            const speedFactor = Math.pow(1.0 - ease, rampExp);
            this.flagCurrentSpeed = baseSpeed + (peakSpeed - baseSpeed) * speedFactor;

            if (logo) {
                if (progress >= 0.40) {
                    const logoT = Math.min(1.0, (progress - 0.40) / 0.35);
                    setCssStyles(logo, { opacity: String(logoT) });
                    setCssStyles(logo, { transform: `scale(${0.80 + 0.20 * logoT})` });
                } else {
                    setCssStyles(logo, { opacity: '0' });
                    setCssStyles(logo, { transform: 'scale(0.80)' });
                }
            }

            if (progress < 1.0) {
                window.requestAnimationFrame(animateIn);
            } else {
                this.flagSweepProgress = 1.0;
                this.flagWaveGrowth = 1.0;
                this.flagCurrentSpeed = baseSpeed;
                this.flagIsAnimating = false;
                if (logo) {
                    setCssStyles(logo, { opacity: '1' });
                    setCssStyles(logo, { transform: 'scale(1)' });
                }
                curtain.classList.add('in-transit');
                onCovered();
            }
        };

        window.requestAnimationFrame(animateIn);
    }

    private playCurtainSweepOut(onComplete: () => void) {
        this.ensureCurtainOverlay();
        if (!this.curtainOverlayEl) {
            onComplete();
            return;
        }

        // Only block sweep-out if it's purely a live preview pin AND NOT an active system transition
        if ((this.masterState as any).curtainPinned && !this.isCurtainTransitioning) {
            onComplete();
            return;
        }

        const curtain = this.curtainOverlayEl;
        curtain.classList.add('active');

        const logo = this.curtainLogoWrapperEl;
        if (logo) {
            setCssStyles(logo, { opacity: '1' });
            setCssStyles(logo, { transform: 'scale(1)' });
            setCssStyles(logo, { transition: 'none' });
        }

        this.flagSweepProgress = 0.0;
        this.flagSweepMode = 1.0; // Wave-Out
        this.flagIsAnimating = true;

        // Play reverse whoosh sound effect on sweep-out reveal
        this.sfxEngine.playReverse('psx_disc_flight_whoosh', 0.85);

        const duration = (this.masterState as any).curtainOutDurationMs ?? 650;
        const baseSpeed = (this.masterState as any).curtainWaveSpeed ?? 1.25;
        const peakSpeed = (this.masterState as any).curtainPeakSpeed ?? 2.6;
        const rampExp = (this.masterState as any).curtainRampExponent ?? 1.5;
        const startTime = performance.now();

        this.start3DFlagRenderLoop();

        const animateOut = () => {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(1.0, elapsed / duration);
            const ease = progress * progress * progress; // Cubic ease-in

            this.flagSweepProgress = ease;
            this.flagWaveGrowth = 1.0 - (0.65 * ease);
            // Dynamic wave ripple speed ramp with controllable curve exponent
            const speedFactor = Math.pow(ease, rampExp);
            this.flagCurrentSpeed = baseSpeed + (peakSpeed - baseSpeed) * speedFactor;

            if (logo) {
                if (progress >= 0.25) {
                    const logoOutT = Math.min(1.0, (progress - 0.25) / 0.35);
                    setCssStyles(logo, { opacity: String(1.0 - logoOutT) });
                    setCssStyles(logo, { transform: `scale(${1.0 - 0.20 * logoOutT})` });
                } else {
                    setCssStyles(logo, { opacity: '1' });
                    setCssStyles(logo, { transform: 'scale(1)' });
                }
            }

            if (progress < 1.0) {
                window.requestAnimationFrame(animateOut);
            } else {
                this.flagSweepProgress = 1.0;
                this.flagWaveGrowth = 0.35;
                this.flagCurrentSpeed = baseSpeed;
                this.flagIsAnimating = false;
                curtain.classList.remove('active');
                curtain.classList.remove('in-transit');
                if (logo) {
                    setCssStyles(logo, { opacity: '0' });
                    setCssStyles(logo, { transform: 'scale(0.80)' });
                }
                onComplete();
            }
        };

        window.requestAnimationFrame(animateOut);
    }





    private build3DScene() {
        if (!this.boxArtEl) return;
        try {
        // Show START button immediately when scene is ready (OFF state)
        this.ensureRetroStartButton();

        // Prevent parallel animation loops and WebGL context leaks
        if (this.animationFrameId !== null) {
            window.cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        if (this.activeComposer !== null) {
            try {
                if (this.activeComposer.renderTarget1) this.activeComposer.renderTarget1.dispose();
                if (this.activeComposer.renderTarget2) this.activeComposer.renderTarget2.dispose();
                if (Array.isArray(this.activeComposer.passes)) {
                    this.activeComposer.passes.forEach((pass: any) => {
                        if (pass.dispose && typeof pass.dispose === 'function') pass.dispose();
                    });
                }
            } catch (e) {
                console.error("Error disposing active composer:", e);
            }
            this.activeComposer = null;
        }

        if (this.activeScene !== null) {
            try {
                this.disposeThreeHierarchy(this.activeScene);
                this.activeScene.clear();
            } catch (e) {
                console.error("Error disposing active Three.js scene:", e);
            }
            this.activeScene = null;
        }

        if (this.activeRenderer !== null) {
            try {
                this.activeRenderer.dispose();
                this.activeRenderer.forceContextLoss();
            } catch (e) {
                console.error("Error disposing active WebGL renderer:", e);
            }
            this.activeRenderer = null;
        }

        const children = Array.from(this.boxArtEl.children);
        for (const ch of children) {
            if (ch !== this.curtainOverlayEl && ch !== this.retroStartBtnEl) {
                ch.remove();
            }
        }

        const allRoms = this.getAllAvailableRoms(this.plugin.settings.activeSystem);
        if (allRoms.length === 0) {
            const p = createDiv();
            p.className = 'nes-slot-prompt';
            p.innerText = '— NO ROMS FOUND —';
            this.boxArtEl.appendChild(p);
            return;
        }

        const width = this.boxArtEl.clientWidth || 320;
        const canvasHeight = 380;
        setCssStyles(this.boxArtEl, { height: '380px' });

        const masterState = this.masterState;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            precision: 'highp',
            stencil: false
        });
        this.activeRenderer = renderer;
        renderer.setSize(width, canvasHeight);
        renderer.setPixelRatio(Math.max(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = masterState.exposure;
        renderer.shadowMap.enabled = masterState.shadowsEnabled;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        setCssStyles(renderer.domElement, { background: 'transparent' });
        setCssStyles(renderer.domElement, { cursor: 'pointer' });
        setCssStyles(renderer.domElement, { borderRadius: '12px' });
        setCssStyles(renderer.domElement, { overflow: 'hidden' });
        setCssStyles(renderer.domElement, { display: 'block' });
        this.boxArtEl.insertBefore(renderer.domElement, this.boxArtEl.firstChild);
        this.ensureCurtainOverlay();
        this.ensureRetroStartButton();

        const scene = new THREE.Scene();
        this.activeScene = scene;

        // ── DYNAMIC 3D ROOM ENVIRONMENT & LIGHTING ────────────────────────────
        let roomTex: THREE.CanvasTexture;
        let deskColor: number, deskRough: number, deskMetal: number, trimColor: number;
        let keyCol: number, keyPwr: number, fillCol: number, fillPwr: number;

        if (this.selectedRoomEnvironment === 'synthwave') {
            roomTex = createSynthwaveRoomTexture();
            deskColor = 0x0c0b14; deskRough = 0.15; deskMetal = 0.6; trimColor = 0x00f0ff;
            keyCol = 0x00f0ff; keyPwr = 2.2; fillCol = 0xff007f; fillPwr = 1.8;
        } else if (this.selectedRoomEnvironment === 'warm80s') {
            roomTex = create3D80sRoomTexture();
            deskColor = 0x2e1a10; deskRough = 0.38; deskMetal = 0.08; trimColor = 0xc89840;
            keyCol = 0xffb860; keyPwr = 2.0; fillCol = 0xd06030; fillPwr = 1.2;
        } else if (this.selectedRoomEnvironment === 'minimal') {
            roomTex = createMinimalRoomTexture();
            deskColor = 0x14151c; deskRough = 0.5; deskMetal = 0.1; trimColor = 0x303444;
            keyCol = 0xfff8e8; keyPwr = 1.5; fillCol = 0x7080a0; fillPwr = 1.0;
        } else {
            // Default: 'midnight' Modern Midnight Studio
            roomTex = createMidnightRoomTexture();
            deskColor = 0x181a24; deskRough = 0.3; deskMetal = 0.45; trimColor = 0x565a6e;
            keyCol = 0xfff8e8; keyPwr = 1.8; fillCol = 0x80a0ff; fillPwr = 1.2;
        }

        // 360 3D Room Enclosure Box
        const roomGeo = new THREE.BoxGeometry(24, 16, 24);
        const roomMat = new THREE.MeshBasicMaterial({
            map: roomTex,
            side: THREE.BackSide
        });
        const roomMesh = new THREE.Mesh(roomGeo, roomMat);
        roomMesh.position.set(0, 4, 0);
        scene.add(roomMesh);

        // 🌫️ Atmospheric Carousel Fog Engine
        if (masterState.fogEnabled !== false) {
            const fogColor = masterState.fogColor || '#0b0e17';
            if (masterState.fogMode === 'exp2') {
                scene.fog = new THREE.FogExp2(
                    fogColor,
                    typeof masterState.fogDensity === 'number' ? masterState.fogDensity : 0.08
                );
            } else {
                scene.fog = new THREE.Fog(
                    fogColor,
                    typeof masterState.fogNear === 'number' ? masterState.fogNear : 3.2,
                    typeof masterState.fogFar === 'number' ? masterState.fogFar : 14.0
                );
            }
        } else {
            scene.fog = null;
        }

        // 3D Studio Desk Surface
        const deskGeo = new THREE.BoxGeometry(10, 0.25, 7.5);
        const deskMat = new THREE.MeshStandardMaterial({
            color: deskColor,
            roughness: deskRough,
            metalness: deskMetal,
        });
        const deskMesh = new THREE.Mesh(deskGeo, deskMat);
        deskMesh.position.set(0, -1.9, -0.4);
        deskMesh.receiveShadow = masterState.shadowsEnabled;
        scene.add(deskMesh);

        // Chamfered Trim Edge
        const trimGeo = new THREE.BoxGeometry(10.08, 0.04, 7.58);
        const trimMat = new THREE.MeshStandardMaterial({
            color: trimColor,
            roughness: 0.2,
            metalness: 0.85,
        });
        const trimMesh = new THREE.Mesh(trimGeo, trimMat);
        trimMesh.position.set(0, -1.78, -0.4);
        trimMesh.receiveShadow = masterState.shadowsEnabled;
        scene.add(trimMesh);

        // High-Angle 3D Studio Camera
        const camera = new THREE.PerspectiveCamera(masterState.camFov, width / canvasHeight, 0.1, 100);
        camera.position.set(masterState.camX, masterState.camY, masterState.camZ);
        camera.lookAt(0, masterState.lookAtY, masterState.lookAtZ);
        this.current3DCamera = camera;

        // Dynamic Room Lighting Rig
        const hemi = new THREE.HemisphereLight(0xfff8e8, 0x1a1c24, masterState.hemiPower);
        scene.add(hemi);

        const keyLight = new THREE.DirectionalLight(keyCol, keyPwr);
        keyLight.position.set(masterState.keyX ?? 3, masterState.keyY ?? 6, masterState.keyZ ?? 6);
        keyLight.target.position.set(masterState.keyTargetX ?? 0, masterState.keyTargetY ?? 0.3, masterState.keyTargetZ ?? 0);
        keyLight.castShadow = masterState.shadowsEnabled;
        keyLight.shadow.mapSize.width = 1024;
        keyLight.shadow.mapSize.height = 1024;
        keyLight.shadow.bias = masterState.shadowBias ?? -0.0005;
        keyLight.shadow.camera.near = 0.5;
        keyLight.shadow.camera.far = 25;
        keyLight.shadow.camera.left = -6;
        keyLight.shadow.camera.right = 6;
        keyLight.shadow.camera.top = 6;
        keyLight.shadow.camera.bottom = -6;
        scene.add(keyLight);
        scene.add(keyLight.target);

        const fillLight = new THREE.DirectionalLight(fillCol, fillPwr);
        fillLight.position.set(masterState.fillX ?? -4, masterState.fillY ?? 2, masterState.fillZ ?? 3);
        fillLight.target.position.set(masterState.fillTargetX ?? 0, masterState.fillTargetY ?? 0.3, masterState.fillTargetZ ?? 0);
        scene.add(fillLight);
        scene.add(fillLight.target);

        const rimLight = new THREE.DirectionalLight(0xffb060, masterState.rimPower);
        rimLight.position.set(masterState.rimX ?? 0.0, masterState.rimY ?? 6.0, masterState.rimZ ?? -5.0);
        rimLight.target.position.set(masterState.rimTargetX ?? 0.0, masterState.rimTargetY ?? 0.5, masterState.rimTargetZ ?? 0.0);
        scene.add(rimLight);
        scene.add(rimLight.target);

        const key2Light = new THREE.DirectionalLight(0xfff8e8, masterState.key2Power ?? 1.8);
        key2Light.position.set(masterState.key2X ?? -3.0, masterState.key2Y ?? 5.0, masterState.key2Z ?? 4.0);
        key2Light.target.position.set(masterState.key2TargetX ?? 0.0, masterState.key2TargetY ?? 0.3, masterState.key2TargetZ ?? 0.0);
        key2Light.visible = (masterState.key2LightEnabled !== false);
        scene.add(key2Light);
        scene.add(key2Light.target);

        // 3D Light Gizmo Helpers for Visual Light Inspection
        const showGizmos = (masterState.showLightGizmos === true);
        const keyHelper = new THREE.DirectionalLightHelper(keyLight, 0.8, 0xffff00);
        const fillHelper = new THREE.DirectionalLightHelper(fillLight, 0.8, 0x00ffff);
        const rimHelper = new THREE.DirectionalLightHelper(rimLight, 0.8, 0xffa500);
        const key2Helper = new THREE.DirectionalLightHelper(key2Light, 0.8, 0xff00ff);
        keyHelper.visible = showGizmos;
        fillHelper.visible = showGizmos;
        rimHelper.visible = showGizmos;
        key2Helper.visible = showGizmos;
        scene.add(keyHelper);
        scene.add(fillHelper);
        scene.add(rimHelper);
        scene.add(key2Helper);

        // ── Custom Dynamic Lights Array & Spawner ─────────────────────────────
        interface LiveCustomLight {
            config: any;
            light: THREE.Light;
            helper?: THREE.Object3D;
        }
        const liveCustomLights: LiveCustomLight[] = [];

        const spawnCustomLightInScene = (cfg: any): LiveCustomLight => {
            let lightObj: THREE.Light;
            let helperObj: THREE.Object3D | undefined;
            const col = new THREE.Color(cfg.color || '#ffffff');

            if (cfg.type === 'point') {
                const pl = new THREE.PointLight(col, cfg.power ?? 2.8, cfg.distance ?? 25, cfg.decay ?? 2);
                pl.position.set(cfg.x ?? 0, cfg.y ?? 5, cfg.z ?? 2.5);
                lightObj = pl;
                helperObj = new THREE.PointLightHelper(pl, 0.5, 0x00ffaa);
            } else if (cfg.type === 'spot') {
                const sl = new THREE.SpotLight(col, cfg.power ?? 3.0, cfg.distance ?? 30, Math.PI / 4, 0.3, cfg.decay ?? 2);
                sl.position.set(cfg.x ?? 0, cfg.y ?? 6, cfg.z ?? 2.5);
                sl.target.position.set(cfg.targetX ?? 0, cfg.targetY ?? 0.3, cfg.targetZ ?? 0);
                scene.add(sl.target);
                lightObj = sl;
                helperObj = new THREE.SpotLightHelper(sl, 0x00ffaa);
            } else {
                const dl = new THREE.DirectionalLight(col, cfg.power ?? 2.8);
                dl.position.set(cfg.x ?? 3, cfg.y ?? 6, cfg.z ?? 3);
                dl.target.position.set(cfg.targetX ?? 0, cfg.targetY ?? 0.3, cfg.targetZ ?? 0);
                scene.add(dl.target);
                lightObj = dl;
                helperObj = new THREE.DirectionalLightHelper(dl, 0.6, 0x00ffaa);
            }

            scene.add(lightObj);
            if (helperObj) {
                helperObj.visible = showGizmos;
                scene.add(helperObj);
            }

            const liveItem = { config: cfg, light: lightObj, helper: helperObj };
            liveCustomLights.push(liveItem);
            return liveItem;
        };

        (this as any).spawnCustomLight = (cfg: any) => {
            spawnCustomLightInScene(cfg);
        };

        (this as any).removeCustomLight = (id: string) => {
            const idx = liveCustomLights.findIndex(item => item.config.id === id);
            if (idx >= 0) {
                const item = liveCustomLights[idx];
                scene.remove(item.light);
                if (item.helper) scene.remove(item.helper);
                if ((item.light as any).target) scene.remove((item.light as any).target);
                liveCustomLights.splice(idx, 1);
            }
        };

        if (Array.isArray(masterState.customLights)) {
            masterState.customLights.forEach(cfg => spawnCustomLightInScene(cfg));
        }

        // ── POST-PROCESSING RETRO BLOOM & HALATION SHADER PIPELINE ─────────────
        const pixelRatio = Math.max(window.devicePixelRatio || 1, 2);
        const composer = new EffectComposer(renderer);
        this.activeComposer = composer;
        composer.setPixelRatio(pixelRatio);
        composer.setSize(width, canvasHeight);

        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(width * pixelRatio, canvasHeight * pixelRatio),
            masterState.bloomIntensity,
            masterState.bloomRadius,
            masterState.bloomThreshold
        );
        composer.addPass(bloomPass);

        const HalationShader = {
            uniforms: {
                tDiffuse: { value: null },
                uHalation: { value: 0.35 },
            },
            vertexShader:
                'varying vec2 vUv;\n' +
                'void main() {\n' +
                '    vUv = uv;\n' +
                '    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n' +
                '}\n',
            fragmentShader:
                'uniform sampler2D tDiffuse;\n' +
                'uniform float uHalation;\n' +
                'varying vec2 vUv;\n' +
                'void main() {\n' +
                '    vec4 base = texture2D(tDiffuse, vUv);\n' +
                '    if (uHalation <= 0.001) {\n' +
                '        gl_FragColor = base;\n' +
                '        return;\n' +
                '    }\n' +
                '    vec2 shift = vec2(0.002 * uHalation, 0.001 * uHalation);\n' +
                '    float rGlow = texture2D(tDiffuse, vUv + shift).r;\n' +
                '    float bGlow = texture2D(tDiffuse, vUv - shift).b;\n' +
                '    vec3 halated = vec3(\n' +
                '        base.r + rGlow * 0.16 * uHalation,\n' +
                '        base.g,\n' +
                '        base.b + bGlow * 0.12 * uHalation\n' +
                '    );\n' +
                '    halated += vec3(0.03, 0.015, 0.0) * base.r * uHalation;\n' +
                '    gl_FragColor = vec4(halated, base.a);\n' +
                '}\n'
        };

        // 📷 Camera Depth of Field (DOF) Bokeh Pass
        let bokehPass: BokehPass | null = null;
        try {
            bokehPass = new BokehPass(scene, camera, {
                focus: typeof masterState.dofFocusDistance === 'number' ? masterState.dofFocusDistance : 6.2,
                aperture: typeof masterState.dofAperture === 'number' ? masterState.dofAperture : 0.035,
                maxblur: typeof masterState.dofMaxBlur === 'number' ? masterState.dofMaxBlur : 0.02,
                width: width * pixelRatio,
                height: canvasHeight * pixelRatio
            });
            bokehPass.enabled = (masterState.dofEnabled !== false);
            composer.addPass(bokehPass);
        } catch (e) {
            console.warn("BokehPass warning:", e);
        }

        const halationPass = new ShaderPass(HalationShader);
        composer.addPass(halationPass);

        const smaaPass = new SMAAPass(width * pixelRatio, canvasHeight * pixelRatio);
        composer.addPass(smaaPass);

        const outputPass = new OutputPass();
        composer.addPass(outputPass);

        // ── 3D CONSOLE ASSEMBLY (NES PROCEDURAL OR PS1 GLB) ───────────────
        const isLocked = !!this.selectedVaultRomPath;
        const consoleGroup = new THREE.Group();
        this.activeConsoleGroupRef = consoleGroup;
        this.activeSceneRef = scene;
        this.initConsoleEtherSystem(scene);
        this.lidHingeGroup = null; // Prepare for PS1 hinge
        let nesDoorFlapGroup: THREE.Group | null = null;
        let nesLedMat: THREE.MeshBasicMaterial | null = null;
        let nesLedPointLight: THREE.PointLight | null = null;

        if (this.plugin.settings.activeSystem === 'nes') {
            // NES GLB Model Loading
            const manifestDir = getPluginDir(this.plugin);
            if (manifestDir) {
                const basePath = (this.plugin.app.vault.adapter as any).basePath || '';
                const gltfPath = path.isAbsolute(manifestDir) 
                    ? path.join(manifestDir, 'assets', 'nes', 'NES_nintendo.glb')
                    : path.join(basePath, manifestDir, 'assets', 'nes', 'NES_nintendo.glb');
                try {
                    const glbBuffer = fs.readFileSync(gltfPath);
                    const arrayBuffer = glbBuffer.buffer.slice(glbBuffer.byteOffset, glbBuffer.byteOffset + glbBuffer.byteLength);
                    const loader = new GLTFLoader();
                    loader.parse(arrayBuffer, '', (gltf) => {
                        const model = gltf.scene;
                        
                        model.traverse((node: any) => {
                            if (node.name === 'Sketchfab_model') {
                                node.position.set(0, 0, 0);
                                node.rotation.set(0, 0, 0);
                            }
                            if (node.isMesh) {
                                node.castShadow = true;
                                node.receiveShadow = true;
                            }
                        });
                        
                        model.rotation.x = -Math.PI / 2;
                        const scaleFactor = 2.8;
                        model.scale.set(scaleFactor, scaleFactor, scaleFactor);
                        model.position.set(0, 1.05, -0.3); // Aligned with NES console height/depth

                        consoleGroup.add(model);
                    }, (error) => {
                        console.error("Error parsing NES GLB Model:", error);
                    });
                } catch (e) {
                    console.error("Failed to read NES GLB file:", e);
                }
            }
        } else {
            // PS1 Model Loading
            const manifestDir = getPluginDir(this.plugin);
            if (manifestDir) {
                const basePath = (this.plugin.app.vault.adapter as any).basePath || '';
                const gltfPath = path.isAbsolute(manifestDir) 
                    ? path.join(manifestDir, 'assets', 'psx', 'Sony_Playstation_one_slim.glb')
                    : path.join(basePath, manifestDir, 'assets', 'psx', 'Sony_Playstation_one_slim.glb');
                try {
                    const glbBuffer = fs.readFileSync(gltfPath);
                    const arrayBuffer = glbBuffer.buffer.slice(glbBuffer.byteOffset, glbBuffer.byteOffset + glbBuffer.byteLength);
                    const loader = new GLTFLoader();
                    loader.parse(arrayBuffer, '', (gltf) => {
                        const model = gltf.scene;
                        
                        // Reset internal Sketchfab offset/tilt so model center is (0,0,0)
                        model.traverse((node: any) => {
                            if (node.name === 'Sketchfab_model') {
                                node.position.set(0, 0, 0);
                                node.rotation.set(0, 0, 0);
                            }
                        });
                        
                        const scaleFactor = typeof masterState.ps1Scale === 'number' ? masterState.ps1Scale : 0.2;
                        model.scale.set(scaleFactor, scaleFactor, scaleFactor);
                        model.rotation.set(
                            typeof masterState.ps1RotX === 'number' ? masterState.ps1RotX : 1.66,
                            typeof masterState.ps1RotY === 'number' ? masterState.ps1RotY : -3.14,
                            typeof masterState.ps1RotZ === 'number' ? masterState.ps1RotZ : -3.14
                        );
                        model.position.set(
                            typeof masterState.ps1PosX === 'number' ? masterState.ps1PosX : 0,
                            typeof masterState.ps1PosY === 'number' ? masterState.ps1PosY : 1.45,
                            typeof masterState.ps1PosZ === 'number' ? masterState.ps1PosZ : -0.3
                        );

                        this.ps1ModelGroup = model;
                        this.lidHingeGroup = null;
                        consoleGroup.add(model);
                    }, (error) => {
                        console.error("Error parsing PS1 GLB Model:", error);
                        const boxGeo = new THREE.BoxGeometry(3.6, 0.65, 3.0);
                        const boxMat = new THREE.MeshStandardMaterial({ color: 0xcccccc });
                        const placeholder = new THREE.Mesh(boxGeo, boxMat);
                        placeholder.position.set(0, 1.4, -0.5);
                        consoleGroup.add(placeholder);
                    });
                } catch (e) {
                    console.error("Error reading PS1 GLB File:", e);
                    const boxGeo = new THREE.BoxGeometry(3.6, 0.65, 3.0);
                    const boxMat = new THREE.MeshStandardMaterial({ color: 0xcccccc });
                    const placeholder = new THREE.Mesh(boxGeo, boxMat);
                    placeholder.position.set(0, 1.4, -0.5);
                    consoleGroup.add(placeholder);
                }
            }

            // Power LED Indicator Bulb for PS1 Console (Front-Left Power Button Area)
            const ps1LedGeo = new THREE.SphereGeometry(0.045, 16, 16);
            const ps1LedMat = new THREE.MeshBasicMaterial({ color: isLocked ? 0x00ff66 : 0x113311 });
            nesLedMat = ps1LedMat;
            const ps1LedMesh = new THREE.Mesh(ps1LedGeo, ps1LedMat);
            ps1LedMesh.position.set(masterState.ps1LedX ?? -1.43, masterState.ps1LedY ?? 1.905, masterState.ps1LedZ ?? 1.12);
            consoleGroup.add(ps1LedMesh);
            this.ps1LedMeshRef = ps1LedMesh;

            const ps1LedPointLight = new THREE.PointLight(0x00ff66, isLocked ? 1.25 : 0.0, 2.0);
            nesLedPointLight = ps1LedPointLight;
            ps1LedPointLight.position.set(masterState.ps1LedX ?? -1.43, (masterState.ps1LedY ?? 1.905) + 0.07, masterState.ps1LedZ ?? 1.12);
            consoleGroup.add(ps1LedPointLight);
            this.ps1LedPointLightRef = ps1LedPointLight;
        }

        scene.add(consoleGroup);

        // ── RACK STACK GEOMETRY CONFIGURATION & WHEEL SCROLL STATE ──────────
        const STACK_BASE_Y = -1.4;
        const STACK_BASE_Z = 1.0;
        const REST_ROT_X = 0.38;  

        interface BiomechanicalProfile {
            seed: number;
            gripPitch: number;
            gripYaw: number;
            gripRoll: number;
            liftArcHeight: number;
            swayFreq: number;
            tremorAmp: number;
            hesitationPoint: number;
            hesitationStrength: number;
            chunkDamping: number;
        }

        const createBioProfile = (): BiomechanicalProfile => ({
            seed: Math.random() * 10000 + (Date.now() % 1000),
            gripPitch: (Math.random() - 0.5) * 0.055,
            gripYaw: (Math.random() - 0.5) * 0.045,
            gripRoll: (Math.random() - 0.5) * 0.075,
            liftArcHeight: 0.95 + Math.random() * 0.12,
            swayFreq: 0.85 + Math.random() * 0.30,
            tremorAmp: 0.85 + Math.random() * 0.30,
            hesitationPoint: 0.44 + Math.random() * 0.10,
            hesitationStrength: 0.02 + Math.random() * 0.02,
            chunkDamping: 14.0 + Math.random() * 4.0
        });

        type CartEntry = {
            mesh: THREE.Group;
            rom: any;
            idx: number;
            state: 'DECK' | 'BAY' | 'ANIM_TO_BAY' | 'ANIM_TO_DECK';
            animT: number;
            startPos: THREE.Vector3;
            startRotX: number;
            bio?: BiomechanicalProfile;
        };

        const entries: CartEntry[] = [];
        this.activeEntriesRef = entries;
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(-999, -999);
        let hoveredStackIdx = -1;

        allRoms.forEach((rom, i) => {
            const isSelected = (this.selectedVaultRomPath === rom.path);

            const coverUrl = this.findCoverImageForRom(rom.path, this.plugin.settings.activeSystem);
            let mesh: THREE.Group;
            if (this.plugin.settings.activeSystem === 'psx') {
                mesh = createPsxJewelCase3DMesh(rom.name, coverUrl);
            } else {
                mesh = createNesCartridge3DMesh(rom.name, coverUrl, this.plugin);
            }

            let state: CartEntry['state'] = isSelected ? 'BAY' : 'DECK';
            if (isSelected) {
                if (this.plugin.settings.activeSystem === 'psx') {
                    // For PS1, the jewel case remains in its carousel rack slot
                    const CY = typeof masterState.rolodexCY === 'number' ? masterState.rolodexCY : -3.2;
                    const CZ = typeof masterState.rolodexCZ === 'number' ? masterState.rolodexCZ : 2.5;
                    const R = typeof masterState.rolodexR === 'number' ? masterState.rolodexR : 1.7;
                    const angStep = typeof masterState.rolodexAngle === 'number' ? masterState.rolodexAngle : 0.38;
                    const angle = i * angStep;
                    mesh.position.set(0, CY + R * Math.cos(angle), CZ - R * Math.sin(angle));
                    mesh.rotation.set(REST_ROT_X - angle, 0, 0);

                    // And the active spinning CD disc is detached to the world scene and placed on the PS1 spindle tray
                    const cdDisc = mesh.userData.cdDiscMesh;
                    if (cdDisc) {
                        scene.attach(cdDisc);
                        cdDisc.userData.detached = true;
                        cdDisc.position.set(0, 1.47, -0.34);
                        cdDisc.rotation.set(-Math.PI / 2, 0, 0);
                    }
                } else {
                    mesh.position.set(0, masterState.slotY, masterState.slotZ);
                    mesh.rotation.set(masterState.slotRotX, 0, masterState.slotRotZ);
                }
            } else {
                const CY = typeof masterState.rolodexCY === 'number' ? masterState.rolodexCY : -3.2;
                const CZ = typeof masterState.rolodexCZ === 'number' ? masterState.rolodexCZ : 2.5;
                const R = typeof masterState.rolodexR === 'number' ? masterState.rolodexR : 1.7;
                const angStep = typeof masterState.rolodexAngle === 'number' ? masterState.rolodexAngle : 0.38;
                const angle = i * angStep;
                mesh.position.set(0, CY + R * Math.cos(angle), CZ - R * Math.sin(angle));
                mesh.rotation.set(REST_ROT_X - angle, 0, 0);
            }

            scene.add(mesh);
            entries.push({
                mesh, rom, idx: i, state, animT: 1.0,
                startPos: mesh.position.clone(), startRotX: REST_ROT_X
            });
        });

        // ── Eject Helper Callback for Power Off & Hot-Swap ──────────────────
        (this as any).ejectBayCartridge = () => {
            const currentBayEntry = entries.find(e => e.state === 'BAY' || e.state === 'ANIM_TO_BAY');
            if (currentBayEntry) {
                this.sfxEngine.resetCues();
                currentBayEntry.state = 'ANIM_TO_DECK';
                currentBayEntry.animT = 0.0;
                currentBayEntry.startPos.copy(currentBayEntry.mesh.position);
                currentBayEntry.startRotX = currentBayEntry.mesh.rotation.x;
                currentBayEntry.bio = createBioProfile();
                pendingInsertEntry = null;

                this.selectedVaultRomPath = null;
                this.customRomString = null;
                if (this.romSelectEl) this.romSelectEl.value = '';

                if (nesLedMat) nesLedMat.color.setHex(0x555555);
                if (nesLedPointLight) nesLedPointLight.intensity = 0.0;
            }
        };

        // ── Bulletproof Raycaster Mouse Hover & Click ───────────────────────
        let pendingInsertEntry: CartEntry | null = null;

        const getEntryUnderMouse = (): CartEntry | null => {
            raycaster.setFromCamera(mouse, camera);
            const allMeshes = entries.map(e => e.mesh);
            const intersects = raycaster.intersectObjects(allMeshes, true);
            if (intersects.length > 0) {
                let hitObj: THREE.Object3D | null = intersects[0].object;
                while (hitObj && hitObj.parent && hitObj.parent !== scene) {
                    hitObj = hitObj.parent;
                }
                return entries.find(e => e.mesh === hitObj) || null;
            }
            return null;
        };

        let lastHoveredStackIdx = -1;
        let lastWheelTimestamp = 0;
        let pendingHoverEnterTimeout: any = null;

        const onMouseMove = (e: MouseEvent) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            this.etherMouseNDC.x = mouse.x;
            this.etherMouseNDC.y = mouse.y;
            this.etherMouseNDC.active = true;

            const found = getEntryUnderMouse();
            const newHoveredIdx = (found && found.state === 'DECK') ? found.idx : -1;
            
            if (newHoveredIdx !== lastHoveredStackIdx) {
                const isPSX = (this.plugin.settings.activeSystem === 'psx');
                const isScrolling = (Date.now() - lastWheelTimestamp < 350) || (Math.abs(this.targetScrollOffset - this.currentScrollOffset) > 0.08);

                // Clear any pending enter timeout from rapid mouse movement
                if (pendingHoverEnterTimeout) {
                    window.clearTimeout(pendingHoverEnterTimeout);
                    pendingHoverEnterTimeout = null;
                }

                // Only play hover enter / leave sounds if NOT actively scrolling
                if (!isScrolling) {
                    const hadPrevious = (lastHoveredStackIdx !== -1);
                    const hasNew = (newHoveredIdx !== -1);

                    // 1. Instantly play Hover Leave (N04 / P04) as the previous item settles
                    if (hadPrevious) {
                        this.sfxEngine.play(isPSX ? 'psx_case_hover_leave' : 'nes_card_hover_leave', 0.70);
                    }

                    // 2. Play Hover Enter (N03 / P03) for the newly focused item:
                    // If moving directly from an item to another, micro-stagger by 45ms so Leave settle and Enter lift form a natural physical cadence
                    // If coming from empty space, play with 0ms delay for immediate responsiveness
                    if (hasNew) {
                        const targetIdx = newHoveredIdx;
                        const delayMs = hadPrevious ? 45 : 0;

                        if (delayMs > 0) {
                            pendingHoverEnterTimeout = window.setTimeout(() => {
                                if (hoveredStackIdx === targetIdx) {
                                    this.sfxEngine.play(isPSX ? 'psx_case_hover_enter' : 'nes_card_hover_enter', 0.75);
                                }
                            }, delayMs);
                        } else {
                            this.sfxEngine.play(isPSX ? 'psx_case_hover_enter' : 'nes_card_hover_enter', 0.75);
                        }
                    }
                }
                lastHoveredStackIdx = newHoveredIdx;
            }
            hoveredStackIdx = newHoveredIdx;
        };

        const onMouseLeave = () => {
            if (pendingHoverEnterTimeout) {
                window.clearTimeout(pendingHoverEnterTimeout);
                pendingHoverEnterTimeout = null;
            }
            const isScrolling = (Date.now() - lastWheelTimestamp < 350) || (Math.abs(this.targetScrollOffset - this.currentScrollOffset) > 0.08);
            if (hoveredStackIdx !== -1 && !isScrolling) {
                const isPSX = (this.plugin.settings.activeSystem === 'psx');
                this.sfxEngine.play(isPSX ? 'psx_case_hover_leave' : 'nes_card_hover_leave', 0.70);
            }
            hoveredStackIdx = -1;
            lastHoveredStackIdx = -1;
            this.etherMouseNDC.active = false;
        };

        const onWheel = (e: WheelEvent) => {
            if ((e.target as HTMLElement).closest('.tetris-studio-suite-scrollable, .tetris-advanced-details, .tetris-advanced-content')) {
                return;
            }
            e.preventDefault();
            lastWheelTimestamp = Date.now();

            const step = (e.deltaY > 0 ? 0.7 : -0.7);
            this.targetScrollOffset += step;

            const isPSX = (this.plugin.settings.activeSystem === 'psx');
            const isUp = (e.deltaY < 0);
            if (isPSX) {
                this.sfxEngine.play(isUp ? 'psx_scroll_notch_up' : 'psx_scroll_notch_down', 0.85);
                if (hoveredStackIdx !== -1) {
                    this.sfxEngine.play('psx_scroll_hover_riffle', 0.45);
                }
            } else {
                this.sfxEngine.play(isUp ? 'nes_scroll_notch_up' : 'nes_scroll_notch_down', 0.85);
                if (hoveredStackIdx !== -1) {
                    this.sfxEngine.play('nes_scroll_hover_riffle', 0.45);
                }
            }

            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };

        const onClick = (e: MouseEvent) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            // ── 🎯 INTERACTIVE VIEWPORT LIGHT PICKING HANDLER ─────────────────
            if (this.lightPickingMode !== 'none') {
                raycaster.setFromCamera(mouse, camera);
                const pickTargets = [consoleGroup, deskMesh, roomMesh, ...entries.map(e => e.mesh)];
                const intersects = raycaster.intersectObjects(pickTargets, true);
                if (intersects.length > 0) {
                    const pt = intersects[0].point;
                    const selKey = this.activeSelectedLightId || 'key';
                    const customConfig = Array.isArray(this.masterState.customLights)
                        ? this.masterState.customLights.find((cl: any) => cl.id === selKey)
                        : null;

                    if (this.lightPickingMode === 'aim_target') {
                        const tx = parseFloat(pt.x.toFixed(2));
                        const ty = parseFloat(pt.y.toFixed(2));
                        const tz = parseFloat(pt.z.toFixed(2));
                        if (customConfig) {
                            customConfig.targetX = tx;
                            customConfig.targetY = ty;
                            customConfig.targetZ = tz;
                        } else {
                            this.masterState[selKey + 'TargetX'] = tx;
                            this.masterState[selKey + 'TargetY'] = ty;
                            this.masterState[selKey + 'TargetZ'] = tz;
                        }
                        new Notice(`🎯 Light aimed at (${tx}, ${ty}, ${tz})`);
                    } else if (this.lightPickingMode === 'place_light') {
                        const px = parseFloat(pt.x.toFixed(2));
                        const py = parseFloat((pt.y + 1.2).toFixed(2));
                        const pz = parseFloat((pt.z + 0.8).toFixed(2));
                        if (customConfig) {
                            customConfig.x = px;
                            customConfig.y = py;
                            customConfig.z = pz;
                        } else {
                            this.masterState[selKey + 'X'] = px;
                            this.masterState[selKey + 'Y'] = py;
                            this.masterState[selKey + 'Z'] = pz;
                        }
                        new Notice(`📍 Light placed at (${px}, ${py}, ${pz})`);
                    }

                    if (this.plugin && this.plugin.settings) {
                        this.plugin.settings.masterState = Object.assign({}, this.masterState);
                        this.plugin.saveSettings();
                    }

                    this.lightPickingMode = 'none';
                    setCssStyles(renderer.domElement, { cursor: 'pointer' });
                    if (typeof (this as any).refreshActiveLightInspector === 'function') {
                        (this as any).refreshActiveLightInspector();
                    }
                    return;
                }
            }

            let clickedConsole = false;
            if (this.activeConsoleGroupRef) {
                raycaster.setFromCamera(mouse, camera);
                if (raycaster.intersectObject(this.activeConsoleGroupRef, true).length > 0) {
                    clickedConsole = true;
                }
            }

            const clicked = getEntryUnderMouse();

            // 1. If clicking a CAROUSEL / RACK cartridge -> INSERT (or SWAP)
            if (clicked && clicked.state === 'DECK') {
                const isPSX = (this.plugin.settings.activeSystem === 'psx');
                this.sfxEngine.resetCues();
                this.sfxEngine.play(isPSX ? 'psx_case_click_press' : 'nes_card_click_press', 0.85);

                const currentBayEntry = entries.find(e => e.state === 'BAY' || e.state === 'ANIM_TO_BAY');

                if (currentBayEntry) {
                    // AUTO-SWAP: Eject current, queue new one to insert
                    pendingInsertEntry = clicked;
                    currentBayEntry.state = 'ANIM_TO_DECK';
                    currentBayEntry.animT = 0.0;
                    currentBayEntry.startPos.copy(currentBayEntry.mesh.position);
                    currentBayEntry.startRotX = currentBayEntry.mesh.rotation.x;
                    currentBayEntry.bio = createBioProfile();

                    if (nesLedMat) nesLedMat.color.setHex(0x555555);
                    if (nesLedPointLight) nesLedPointLight.intensity = 0.0;
                } else {
                    // No cartridge loaded: Insert smoothly into console chamber!
                    clicked.state = 'ANIM_TO_BAY';
                    clicked.animT = 0.0;
                    clicked.startPos.copy(clicked.mesh.position);
                    clicked.startRotX = clicked.mesh.rotation.x;
                    clicked.bio = createBioProfile();
                }
                return;
            }

            // 2. If clicking an INSERTED cartridge/disc in the bay -> EJECT
            if (clicked && clicked.state === 'BAY') {
                this.sfxEngine.resetCues();
                clicked.state = 'ANIM_TO_DECK';
                clicked.animT = 0.0;
                clicked.startPos.copy(clicked.mesh.position);
                clicked.startRotX = clicked.mesh.rotation.x;
                clicked.bio = createBioProfile();
                pendingInsertEntry = null;

                this.selectedVaultRomPath = null;
                this.customRomString = null;
                if (this.romSelectEl) this.romSelectEl.value = '';

                if (this.isRunning) {
                    this.stopEmulator();
                }

                if (nesLedMat) nesLedMat.color.setHex(0x555555);
                if (nesLedPointLight) nesLedPointLight.intensity = 0.0;
                if (this.ps1LedMeshRef) (this.ps1LedMeshRef.material as THREE.MeshBasicMaterial).color.setHex(0x113311);
                if (this.ps1LedPointLightRef) this.ps1LedPointLightRef.intensity = 0.0;

                this.ensureRetroStartButton();
                return;
            }

            // 3. If clicking the CONSOLE BODY itself
            if (clickedConsole) {
                if (this.isIntroPlaying) {
                    // Clicking console during intro camera swoop cancels intro
                    this.isIntroPlaying = false;
                    this.pendingStartGridCreation = false;
                    this.triggerPowerOffSequence();
                    return;
                }

                const bayEntry = entries.find(e => e.state === 'BAY');
                if (bayEntry) {
                    // Clicking console body ejects seated cartridge
                    this.sfxEngine.resetCues();
                    bayEntry.state = 'ANIM_TO_DECK';
                    bayEntry.animT = 0.0;
                    bayEntry.startPos.copy(bayEntry.mesh.position);
                    bayEntry.startRotX = bayEntry.mesh.rotation.x;
                    bayEntry.bio = createBioProfile();
                    pendingInsertEntry = null;

                    this.selectedVaultRomPath = null;
                    this.customRomString = null;
                    if (this.romSelectEl) this.romSelectEl.value = '';

                    if (this.isRunning) {
                        this.stopEmulator();
                    }

                    if (nesLedMat) nesLedMat.color.setHex(0x555555);
                    if (nesLedPointLight) nesLedPointLight.intensity = 0.0;
                    if (this.ps1LedMeshRef) (this.ps1LedMeshRef.material as THREE.MeshBasicMaterial).color.setHex(0x113311);
                    if (this.ps1LedPointLightRef) this.ps1LedPointLightRef.intensity = 0.0;

                    this.ensureRetroStartButton();
                }
                return;
            }
        };

        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('mouseleave', onMouseLeave);
        renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
        renderer.domElement.addEventListener('click', onClick);

        // ── 60FPS Render & Bezier Trajectory Animation Loop ─────────────────
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        let lastEtherFrameTime = performance.now();

        const animate = () => {
            try {
            this.animationFrameId = window.requestAnimationFrame(animate);

            // 🛑 FREE 100% GPU & CPU POWER FOR THE 3D FLAG DURING SYSTEM TRANSITIONS
            if (this.isCurtainTransitioning || this.isMinimized) {
                return;
            }

            const nowMs = performance.now();
            const deltaSec = Math.min((nowMs - lastEtherFrameTime) * 0.001, 0.05);
            lastEtherFrameTime = nowMs;
            const dt60 = deltaSec * 60;

            // ✨ Live 60 FPS Celestial Console Ether Waterfall & Trails Simulation
            this.updateConsoleEtherSystem(deltaSec, nowMs * 0.001);

            // 🌫️ Live 60 FPS Atmospheric Fog Updates
            if (masterState.fogEnabled !== false) {
                const fogColor = masterState.fogColor || '#0b0e17';
                if (masterState.fogMode === 'exp2') {
                    if (!scene.fog || !(scene.fog instanceof THREE.FogExp2)) {
                        scene.fog = new THREE.FogExp2(fogColor, typeof masterState.fogDensity === 'number' ? masterState.fogDensity : 0.08);
                    }
                    (scene.fog as THREE.FogExp2).color.set(fogColor);
                    (scene.fog as THREE.FogExp2).density = typeof masterState.fogDensity === 'number' ? masterState.fogDensity : 0.08;
                } else {
                    if (!scene.fog || !(scene.fog instanceof THREE.Fog)) {
                        scene.fog = new THREE.Fog(fogColor, typeof masterState.fogNear === 'number' ? masterState.fogNear : 3.2, typeof masterState.fogFar === 'number' ? masterState.fogFar : 14.0);
                    }
                    (scene.fog as THREE.Fog).color.set(fogColor);
                    (scene.fog as THREE.Fog).near = typeof masterState.fogNear === 'number' ? masterState.fogNear : 3.2;
                    (scene.fog as THREE.Fog).far = typeof masterState.fogFar === 'number' ? masterState.fogFar : 14.0;
                }
            } else {
                scene.fog = null;
            }

            // 📷 Live 60 FPS Depth of Field (DOF) Bokeh & Cinematic Autofocus Rack-Tracking
            if (bokehPass) {
                bokehPass.enabled = (masterState.dofEnabled !== false);

                // 🎥 Camera FOV calculation: baseline 50mm maps 1:1 to masterState.camFov (43°)
                if (camera) {
                    const baseFov = typeof masterState.camFov === 'number' ? masterState.camFov : 43;
                    const focalLength = typeof masterState.dofLensFocalLength === 'number' ? masterState.dofLensFocalLength : 50;
                    const targetFov = baseFov * (50 / Math.max(10, focalLength));
                    if (Math.abs(camera.fov - targetFov) > 0.05) {
                        camera.fov = targetFov;
                        camera.updateProjectionMatrix();
                    }
                }

                let rawTargetFocus = typeof masterState.dofFocusDistance === 'number' ? masterState.dofFocusDistance : 6.2;
                const isPSXSystem = (this.plugin.settings.activeSystem === 'psx');

                // 🌟 Smart Mid-Air Flight Focus Shift: Cinematically track flying cartridge / CD in 3D space!
                const flyingEntry = entries.find(e => e.state === 'ANIM_TO_BAY' || e.state === 'ANIM_TO_DECK');
                if (flyingEntry && camera) {
                    const flightWorldPos = new THREE.Vector3();
                    const cdDisc = flyingEntry.mesh.userData.cdDiscMesh;
                    if (isPSXSystem && cdDisc && cdDisc.userData.detached) {
                        cdDisc.getWorldPosition(flightWorldPos);
                    } else {
                        flyingEntry.mesh.getWorldPosition(flightWorldPos);
                    }
                    rawTargetFocus = camera.position.distanceTo(flightWorldPos);
                } else if (masterState.dofAutofocus === 'track_console' && camera) {
                    const consoleCenter = isPSXSystem
                        ? new THREE.Vector3(masterState.ps1PosX ?? 0, masterState.ps1PosY ?? 1.45, masterState.ps1PosZ ?? -0.3)
                        : new THREE.Vector3(masterState.nesX ?? 0, masterState.nesY ?? 0.3, masterState.nesZ ?? -0.1);
                    rawTargetFocus = camera.position.distanceTo(consoleCenter);
                } else if (masterState.dofAutofocus === 'track_hovered' && camera) {
                    if (hoveredStackIdx !== -1) {
                        const hoveredEntry = entries.find(e => e.idx === hoveredStackIdx);
                        if (hoveredEntry) {
                            const cartWorldPos = new THREE.Vector3();
                            hoveredEntry.mesh.getWorldPosition(cartWorldPos);
                            rawTargetFocus = camera.position.distanceTo(cartWorldPos);
                        }
                    } else {
                        const consoleCenter = isPSXSystem
                            ? new THREE.Vector3(masterState.ps1PosX ?? 0, masterState.ps1PosY ?? 1.45, masterState.ps1PosZ ?? -0.3)
                            : new THREE.Vector3(masterState.nesX ?? 0, masterState.nesY ?? 0.3, masterState.nesZ ?? -0.1);
                        rawTargetFocus = camera.position.distanceTo(consoleCenter);
                    }
                }

                // Smooth Cinematic Rack-Focus LERP
                if (typeof (this as any).currentDofFocusDistance !== 'number') {
                    (this as any).currentDofFocusDistance = rawTargetFocus;
                }
                const lerpDof = 1 - Math.pow(1 - 0.18, dt60);
                (this as any).currentDofFocusDistance = THREE.MathUtils.lerp((this as any).currentDofFocusDistance, rawTargetFocus, lerpDof);

                const activeFocus = (masterState.dofAutofocus !== 'manual')
                    ? (this as any).currentDofFocusDistance
                    : rawTargetFocus;

                const focalLength = typeof masterState.dofLensFocalLength === 'number' ? masterState.dofLensFocalLength : 50;
                const baseAperture = typeof masterState.dofAperture === 'number' ? masterState.dofAperture : 0.035;
                const opticalAperture = baseAperture * (focalLength / 50.0);

                if ((bokehPass as any).uniforms) {
                    const u = (bokehPass as any).uniforms;
                    if (u['focus']) u['focus'].value = activeFocus;
                    if (u['aperture']) u['aperture'].value = opticalAperture;
                    if (u['maxblur']) u['maxblur'].value = typeof masterState.dofMaxBlur === 'number' ? masterState.dofMaxBlur : 0.02;
                    if (u['aspect']) u['aspect'].value = (width / canvasHeight) * (masterState.dofAspectRings ?? 1.0);
                }
            }

            if (this.ps1ModelGroup) {
                this.ps1ModelGroup.position.set(
                    Number.isFinite(masterState.ps1PosX) ? masterState.ps1PosX : 0,
                    Number.isFinite(masterState.ps1PosY) ? masterState.ps1PosY : 1.45,
                    Number.isFinite(masterState.ps1PosZ) ? masterState.ps1PosZ : -0.3
                );
                this.ps1ModelGroup.rotation.set(
                    Number.isFinite(masterState.ps1RotX) ? masterState.ps1RotX : -Math.PI / 2,
                    Number.isFinite(masterState.ps1RotY) ? masterState.ps1RotY : Math.PI,
                    Number.isFinite(masterState.ps1RotZ) ? masterState.ps1RotZ : 0
                );
                const s = Number.isFinite(masterState.ps1Scale) ? masterState.ps1Scale : 0.2;
                this.ps1ModelGroup.scale.set(s, s, s);
            }

            if (this.ps1LedMeshRef) {
                this.ps1LedMeshRef.position.set(
                    masterState.ps1LedX ?? -1.43,
                    masterState.ps1LedY ?? 1.905,
                    masterState.ps1LedZ ?? 1.12
                );
            }
            if (this.ps1LedPointLightRef) {
                this.ps1LedPointLightRef.position.set(
                    masterState.ps1LedX ?? -1.43,
                    (masterState.ps1LedY ?? 1.905) + 0.07,
                    masterState.ps1LedZ ?? 1.12
                );
            }

            let curCamX = masterState.camX;
            let curCamY = masterState.camY;
            let curCamZ = masterState.camZ;
            let curCamFov = masterState.camFov;
            let curLookAtY = masterState.lookAtY;
            let curLookAtZ = masterState.lookAtZ;

            const startX = (typeof masterState.introCamX === 'number') ? masterState.introCamX : 0.00;
            const startY = (typeof masterState.introCamY === 'number') ? masterState.introCamY : 7.50;
            const startZ = (typeof masterState.introCamZ === 'number') ? masterState.introCamZ : 11.00;
            const startFov = (typeof masterState.introCamFov === 'number') ? masterState.introCamFov : 65;
            const startLookY = (typeof masterState.introLookAtY === 'number') ? masterState.introLookAtY : -1.00;
            const startLookZ = (typeof masterState.introLookAtZ === 'number') ? masterState.introLookAtZ : 0.00;

            if (this.isIntroPlaying && masterState.introEnabled) {
                const durationMs = (masterState.introDurationSec || 2.5) * 1000;
                const elapsed = Date.now() - this.introStartTime;
                const rawT = Math.min(1.0, elapsed / durationMs);
                const easeT = this.evaluateEasing(rawT, masterState.introEasing);

                const endX = (typeof masterState.introEndCamX === 'number') ? masterState.introEndCamX : masterState.camX;
                const endY = (typeof masterState.introEndCamY === 'number') ? masterState.introEndCamY : masterState.camY;
                const endZ = (typeof masterState.introEndCamZ === 'number') ? masterState.introEndCamZ : masterState.camZ;
                const endFov = (typeof masterState.introEndCamFov === 'number') ? masterState.introEndCamFov : masterState.camFov;
                const endLookY = (typeof masterState.introEndLookAtY === 'number') ? masterState.introEndLookAtY : masterState.lookAtY;
                const endLookZ = (typeof masterState.introEndLookAtZ === 'number') ? masterState.introEndLookAtZ : masterState.lookAtZ;

                const fromX = (typeof this.introFromCamX === 'number') ? this.introFromCamX : startX;
                const fromY = (typeof this.introFromCamY === 'number') ? this.introFromCamY : startY;
                const fromZ = (typeof this.introFromCamZ === 'number') ? this.introFromCamZ : startZ;
                const fromFov = (typeof this.introFromCamFov === 'number') ? this.introFromCamFov : startFov;
                const fromLookY = (typeof this.introFromLookAtY === 'number') ? this.introFromLookAtY : startLookY;
                const fromLookZ = (typeof this.introFromLookAtZ === 'number') ? this.introFromLookAtZ : startLookZ;

                curCamX = THREE.MathUtils.lerp(fromX, endX, easeT);
                curCamY = THREE.MathUtils.lerp(fromY, endY, easeT);
                curCamZ = THREE.MathUtils.lerp(fromZ, endZ, easeT);
                curCamFov = THREE.MathUtils.lerp(fromFov, endFov, easeT);
                curLookAtY = THREE.MathUtils.lerp(fromLookY, endLookY, easeT);
                curLookAtZ = THREE.MathUtils.lerp(fromLookZ, endLookZ, easeT);

                if (rawT >= 1.0) {
                    this.isIntroPlaying = false;
                    this.hasIntroRun = true;
                    if (this.pendingStartGridCreation) {
                        this.pendingStartGridCreation = false;
                        this.finishStartGridCreation();
                        this.startEmulator();
                    }
                }
            } else if (this.isOutroPlaying && masterState.introEnabled) {
                const durationMs = 1200; // Smooth camera return flight matching TV screen shutdown
                const elapsed = Date.now() - this.outroStartTime;
                const rawT = Math.min(1.0, elapsed / durationMs);
                const easeT = easeInOutQuad(rawT);

                const endX = startX;
                const endY = startY;
                const endZ = startZ;
                const endFov = startFov;
                const endLookY = startLookY;
                const endLookZ = startLookZ;

                const fromX = this.outroFromCamX;
                const fromY = this.outroFromCamY;
                const fromZ = this.outroFromCamZ;
                const fromFov = this.outroFromCamFov;
                const fromLookY = this.outroFromLookAtY;
                const fromLookZ = this.outroFromLookAtZ;

                curCamX = THREE.MathUtils.lerp(fromX, endX, easeT);
                curCamY = THREE.MathUtils.lerp(fromY, endY, easeT);
                curCamZ = THREE.MathUtils.lerp(fromZ, endZ, easeT);
                curCamFov = THREE.MathUtils.lerp(fromFov, endFov, easeT);
                curLookAtY = THREE.MathUtils.lerp(fromLookY, endLookY, easeT);
                curLookAtZ = THREE.MathUtils.lerp(fromLookZ, endLookZ, easeT);

                if (rawT >= 1.0) {
                    this.isOutroPlaying = false;
                    this.hasIntroRun = false;
                    this.idleBlendStartTime = Date.now();
                    this.ensureRetroStartButton();
                }
            } else if (!this.hasIntroRun && masterState.introEnabled) {
                // BEFORE PRESSING START: Subtle retro floating idle camera sway around the START KEYFRAME!
                const time = Date.now() * 0.0012;
                const blendElapsed = this.idleBlendStartTime ? (Date.now() - this.idleBlendStartTime) : 1200;
                const idleWeight = Math.min(1.0, Math.max(0.0, blendElapsed / 1200));

                const idleOffsetX = Math.sin(time) * 0.35 * idleWeight;
                const idleOffsetY = Math.cos(time * 0.7) * 0.18 * idleWeight;
                const idleOffsetZ = Math.sin(time * 0.5) * 0.25 * idleWeight;

                curCamX = startX + idleOffsetX;
                curCamY = startY + idleOffsetY;
                curCamZ = startZ + idleOffsetZ;
                curCamFov = startFov;
                curLookAtY = startLookY + (idleOffsetY * 0.5);
                curLookAtZ = startLookZ;

                this.lastIdleCamX = curCamX;
                this.lastIdleCamY = curCamY;
                this.lastIdleCamZ = curCamZ;
                this.lastIdleFov = curCamFov;
                this.lastIdleLookY = curLookAtY;
                this.lastIdleLookZ = curLookAtZ;
            }

            camera.position.set(curCamX, curCamY, curCamZ);
            camera.fov = curCamFov;
            camera.updateProjectionMatrix();
            camera.lookAt(0, curLookAtY, curLookAtZ);

            const nX = Number.isFinite(masterState.nesX) ? masterState.nesX : 0;
            const nY = Number.isFinite(masterState.nesY) ? masterState.nesY : 0;
            const nZ = Number.isFinite(masterState.nesZ) ? masterState.nesZ : 0;
            const rX = Number.isFinite(masterState.nesRotX) ? masterState.nesRotX : 0;
            const rY = Number.isFinite(masterState.nesRotY) ? masterState.nesRotY : 0;
            const rZ = Number.isFinite(masterState.nesRotZ) ? masterState.nesRotZ : 0;

            // ── 🍃 PERFECT HARMONIC LOOPING ZERO-G LEVITATION ENGINE ─────────
            const floatTime = performance.now() * 0.001;
            // Harmonic figure-8 Lissajous trajectory with exact 2:1 harmonic ratio:
            const consoleFloatY = Math.sin(floatTime * 1.2) * 0.022;
            const consoleFloatX = Math.cos(floatTime * 0.6) * 0.010;
            const consoleFloatZ = Math.sin(floatTime * 0.6) * 0.008;
            const consoleFloatRotX = Math.cos(floatTime * 1.2) * 0.005;
            const consoleFloatRotZ = Math.sin(floatTime * 0.6) * 0.003;
            const consoleFloatRotY = 0.0;

            consoleGroup.position.set(nX + consoleFloatX, nY + consoleFloatY, nZ + consoleFloatZ);
            consoleGroup.rotation.set(rX + consoleFloatRotX, rY + this.consoleSpinY + consoleFloatRotY, rZ + consoleFloatRotZ);

            // ── Live 60 FPS Desk Surface Position & Dimension Transforms ──────
            const dX = Number.isFinite(masterState.deskX) ? masterState.deskX : 0.0;
            const dY = Number.isFinite(masterState.deskY) ? masterState.deskY : -1.9;
            const dZ = Number.isFinite(masterState.deskZ) ? masterState.deskZ : -0.4;
            const dW = Math.max(0.5, Number.isFinite(masterState.deskW) ? masterState.deskW : 12.0);
            const dH = Math.max(0.05, Number.isFinite(masterState.deskH) ? masterState.deskH : 0.25);
            const dD = Math.max(0.5, Number.isFinite(masterState.deskD) ? masterState.deskD : 8.5);

            deskMesh.position.set(dX, dY, dZ);
            deskMesh.scale.set(dW / 10.0, dH / 0.25, dD / 7.5);

            trimMesh.position.set(dX, dY + (dH / 2) + 0.02, dZ);
            trimMesh.scale.set(dW / 10.0, 1.0, dD / 7.5);

            // ── Live 60 FPS Dynamic Light Rig Transforms & System Scoping ─────
            const currentSys = this.plugin.settings.activeSystem;
            const checkLightScope = (scope?: string) => {
                if (!scope || scope === 'all') return true;
                return scope === currentSys;
            };

            keyLight.visible = (masterState.keyLightEnabled !== false) && checkLightScope(masterState.keySystemScope);
            keyLight.color.setHex(keyCol);
            keyLight.intensity = masterState.keyPower;
            keyLight.position.set(
                Number.isFinite(masterState.keyX) ? masterState.keyX : 3.0,
                Number.isFinite(masterState.keyY) ? masterState.keyY : 6.0,
                Number.isFinite(masterState.keyZ) ? masterState.keyZ : 6.0
            );
            keyLight.target.position.set(
                Number.isFinite(masterState.keyTargetX) ? masterState.keyTargetX : 0.0,
                Number.isFinite(masterState.keyTargetY) ? masterState.keyTargetY : 0.3,
                Number.isFinite(masterState.keyTargetZ) ? masterState.keyTargetZ : 0.0
            );
            keyLight.target.updateMatrixWorld();

            fillLight.visible = (masterState.fillLightEnabled !== false) && checkLightScope(masterState.fillSystemScope);
            fillLight.color.setHex(fillCol);
            fillLight.intensity = masterState.fillPower;
            fillLight.position.set(
                Number.isFinite(masterState.fillX) ? masterState.fillX : -4.0,
                Number.isFinite(masterState.fillY) ? masterState.fillY : 2.0,
                Number.isFinite(masterState.fillZ) ? masterState.fillZ : 3.0
            );
            fillLight.target.position.set(
                Number.isFinite(masterState.fillTargetX) ? masterState.fillTargetX : 0.0,
                Number.isFinite(masterState.fillTargetY) ? masterState.fillTargetY : 0.3,
                Number.isFinite(masterState.fillTargetZ) ? masterState.fillTargetZ : 0.0
            );
            fillLight.target.updateMatrixWorld();

            // ── Live 60 FPS Dynamic Rim Light Edge Silhouette ─────────────────
            rimLight.visible = (masterState.rimLightEnabled !== false) && checkLightScope(masterState.rimSystemScope);
            let rColHex = 0xffb060;
            if (masterState.rimColor === 'cyan') rColHex = 0x00f0ff;
            else if (masterState.rimColor === 'crimson') rColHex = 0xff1030;
            else if (masterState.rimColor === 'pureWhite') rColHex = 0xffffff;

            rimLight.color.setHex(rColHex);
            rimLight.intensity = masterState.rimPower;
            rimLight.position.set(
                Number.isFinite(masterState.rimX) ? masterState.rimX : 0.0,
                Number.isFinite(masterState.rimY) ? masterState.rimY : 6.0,
                Number.isFinite(masterState.rimZ) ? masterState.rimZ : -5.0
            );
            rimLight.target.position.set(
                Number.isFinite(masterState.rimTargetX) ? masterState.rimTargetX : 0.0,
                Number.isFinite(masterState.rimTargetY) ? masterState.rimTargetY : 0.5,
                Number.isFinite(masterState.rimTargetZ) ? masterState.rimTargetZ : 0.0
            );
            rimLight.target.updateMatrixWorld();

            hemi.visible = (masterState.hemiLightEnabled !== false) && checkLightScope(masterState.hemiSystemScope);
            hemi.intensity = masterState.hemiPower;
            renderer.toneMappingExposure = masterState.exposure;

            // ── Live 60 FPS Key Light 2 ────────────────────────────────────────
            key2Light.visible = (masterState.key2LightEnabled !== false) && checkLightScope(masterState.key2SystemScope);
            let k2ColHex = 0xfff8e8;
            if (masterState.key2Color === 'coolBlue')  k2ColHex = 0x80a0ff;
            else if (masterState.key2Color === 'cyan')  k2ColHex = 0x00f0ff;
            else if (masterState.key2Color === 'crimson') k2ColHex = 0xff1030;
            else if (masterState.key2Color === 'pureWhite') k2ColHex = 0xffffff;
            key2Light.color.setHex(k2ColHex);
            key2Light.intensity = Number.isFinite(masterState.key2Power) ? masterState.key2Power : 2.2;
            key2Light.position.set(
                Number.isFinite(masterState.key2X) ? masterState.key2X : -3.0,
                Number.isFinite(masterState.key2Y) ? masterState.key2Y : 5.0,
                Number.isFinite(masterState.key2Z) ? masterState.key2Z : 4.0
            );
            key2Light.target.position.set(
                Number.isFinite(masterState.key2TargetX) ? masterState.key2TargetX : 0.0,
                Number.isFinite(masterState.key2TargetY) ? masterState.key2TargetY : 0.3,
                Number.isFinite(masterState.key2TargetZ) ? masterState.key2TargetZ : 0.0
            );
            key2Light.target.updateMatrixWorld();

            // ── Live 60 FPS 3D Light Gizmos Visibility & Position Updates ──────
            const showGizmos = (masterState.showLightGizmos === true);
            keyHelper.visible = showGizmos && keyLight.visible;
            fillHelper.visible = showGizmos && fillLight.visible;
            rimHelper.visible = showGizmos && rimLight.visible;
            key2Helper.visible = showGizmos && key2Light.visible;

            if (showGizmos) {
                keyHelper.update();
                fillHelper.update();
                rimHelper.update();
                key2Helper.update();
            }

            // ── Live 60 FPS Custom Dynamic Lights Updates ──────────────────────
            liveCustomLights.forEach(item => {
                const cfg = item.config;
                const l = item.light;
                l.visible = (cfg.enabled !== false) && checkLightScope(cfg.systemScope);
                l.intensity = Number.isFinite(cfg.power) ? cfg.power : 2.8;
                l.color.set(cfg.color || '#ffffff');
                l.position.set(
                    Number.isFinite(cfg.x) ? cfg.x : 0,
                    Number.isFinite(cfg.y) ? cfg.y : 5,
                    Number.isFinite(cfg.z) ? cfg.z : 2.5
                );
                if ((l as any).target) {
                    (l as any).target.position.set(
                        Number.isFinite(cfg.targetX) ? cfg.targetX : 0,
                        Number.isFinite(cfg.targetY) ? cfg.targetY : 0.3,
                        Number.isFinite(cfg.targetZ) ? cfg.targetZ : 0
                    );
                    (l as any).target.updateMatrixWorld();
                }
                if (item.helper) {
                    item.helper.visible = showGizmos && l.visible;
                    if (showGizmos && (item.helper as any).update) {
                        (item.helper as any).update();
                    }
                }
            });

            // ── 🌀 TRUE 3D SPIN TRANSITION ENGINE ────────────────────────────
            if (this.isSpinSwitching) {
                if (this.spinSwitchPhase === 'spinup') {
                    this.spinSwitchProgress += 0.035;
                    const t = Math.min(1.0, this.spinSwitchProgress);
                    const eased = t * t * t; // Cubic ease-in spin acceleration
                    this.consoleSpinY = eased * Math.PI * 2;
                    this.targetScrollOffset += eased * 2.2;

                    if (this.spinSwitchProgress >= 1.0) {
                        // MID-SPIN SWAP AT PEAK VELOCITY (360° rotation point):
                        this.spinSwitchPhase = 'spindown';
                        this.spinSwitchProgress = 0.0;
                        if (this.targetSpinSystem) {
                            this.plugin.settings.activeSystem = this.targetSpinSystem;
                            this.plugin.saveSettings();
                            this.performInPlace3DSystemSwap();
                        }
                    }
                } else if (this.spinSwitchPhase === 'spindown') {
                    this.spinSwitchProgress += 0.035;
                    const t = Math.min(1.0, this.spinSwitchProgress);
                    const invT = 1.0 - t;
                    const eased = invT * invT * invT; // Cubic ease-out spin deceleration
                    this.consoleSpinY = (1.0 - eased) * Math.PI * 2;
                    this.targetScrollOffset += eased * 1.5;

                    if (this.spinSwitchProgress >= 1.0) {
                        this.isSpinSwitching = false;
                        this.spinSwitchPhase = 'idle';
                        this.consoleSpinY = 0.0;
                        this.targetSpinSystem = null;
                    }
                }
            } else {
                this.consoleSpinY = 0.0;
            }

            if (consoleGroup) {
                consoleGroup.rotation.y = this.consoleSpinY;
            }

            // Smoothlerp rack scroll offset
            this.currentScrollOffset += (this.targetScrollOffset - this.currentScrollOffset) * 0.14;

            // Bounded wrapping for infinite loop scrolling
            const N = entries.length;
            if (N > 0) {
                if (this.targetScrollOffset >= N) {
                    this.targetScrollOffset -= N;
                    this.currentScrollOffset -= N;
                } else if (this.targetScrollOffset < 0) {
                    this.targetScrollOffset += N;
                    this.currentScrollOffset += N;
                }
            }

            // Re-evaluate hover target raycasting ONLY when carousel is actively scrolling!
            const isScrollingWheel = Math.abs(this.targetScrollOffset - this.currentScrollOffset) > 0.005;
            if (isScrollingWheel && mouse.x >= -1 && mouse.x <= 1 && mouse.y >= -1 && mouse.y <= 1) {
                const found = getEntryUnderMouse();
                if (found && found.state === 'DECK') {
                    hoveredStackIdx = found.idx;
                }
            }

            const hasCartInOrInserting = entries.some(e => e.state === 'BAY' || e.state === 'ANIM_TO_BAY');
            const targetDoorRotX = hasCartInOrInserting ? -0.75 : 0.0;
            if (nesDoorFlapGroup) {
                nesDoorFlapGroup.rotation.x += (targetDoorRotX - nesDoorFlapGroup.rotation.x) * 0.12;
            }

            entries.forEach((e) => {
                let diff = e.idx - this.currentScrollOffset;
                let wrappedDiff = ((diff % N) + N) % N;
                if (wrappedDiff > N / 2) {
                    wrappedDiff -= N;
                }
                const virtualIdx = wrappedDiff;
                const CX = typeof masterState.rolodexCX === 'number' ? masterState.rolodexCX : 0.00;
                const CY = typeof masterState.rolodexCY === 'number' ? masterState.rolodexCY : -3.20;
                const CZ = typeof masterState.rolodexCZ === 'number' ? masterState.rolodexCZ : 2.50;
                const R = typeof masterState.rolodexR === 'number' ? masterState.rolodexR : 1.70;
                const angStep = typeof masterState.rolodexAngle === 'number' ? masterState.rolodexAngle : 0.38;
                
                const wRotX = typeof masterState.wheelRotX === 'number' ? masterState.wheelRotX : 0.00;
                const wRotY = typeof masterState.wheelRotY === 'number' ? masterState.wheelRotY : 0.00;
                const wRotZ = typeof masterState.wheelRotZ === 'number' ? masterState.wheelRotZ : 0.00;

                const baseRotXParam = typeof masterState.rolodexRotX === 'number' ? masterState.rolodexRotX : 0.38;
                const baseRotYParam = typeof masterState.rolodexRotY === 'number' ? masterState.rolodexRotY : 0.00;
                const baseRotZParam = typeof masterState.rolodexRotZ === 'number' ? masterState.rolodexRotZ : 0.00;
                const hoverPop = typeof masterState.rolodexHoverPop === 'number' ? masterState.rolodexHoverPop : 0.40;
                const hoverTilt = typeof masterState.rolodexHoverTilt === 'number' ? masterState.rolodexHoverTilt : 0.15;

                const angle = virtualIdx * angStep;

                // 1. Position on untilted 2D circle around (0,0,0)
                let localY = R * Math.cos(angle);
                let localZ = -R * Math.sin(angle);
                let localX = 0;

                // 2. Rotate local position by Whole Wheel Rotation (Pitch, Yaw, Roll)
                const relPos = new THREE.Vector3(localX, localY, localZ);
                if (wRotX !== 0 || wRotY !== 0 || wRotZ !== 0) {
                    relPos.applyEuler(new THREE.Euler(wRotX, wRotY, wRotZ, 'XYZ'));
                }

                // 3. Offset by wheel center (CX, CY, CZ)
                const baseX = CX + relPos.x;
                const baseY = CY + relPos.y;
                const baseZ = CZ + relPos.z;

                const baseRotX = baseRotXParam - angle + wRotX;
                const baseRotY = baseRotYParam + wRotY;
                const baseRotZ = baseRotZParam + wRotZ;

                // ── Scale fix: always reset to correct per-system base scale before any state touches it
                const isNes = (this.plugin.settings.activeSystem === 'nes');
                const baseScale = isNes ? (typeof masterState.nesCartScale === 'number' ? masterState.nesCartScale : 0.85) : 1.0;

                if (e.state === 'DECK') {
                    const isHovered = (e.idx === hoveredStackIdx);

                    // 🍃 Harmonically synchronized carousel breathing (figure-8 Lissajous matching console)
                    const deckPhase = (virtualIdx * 0.38) + floatTime * 0.6;
                    const itemBobY = Math.sin(deckPhase * 2.0) * 0.012;
                    const itemBobZ = Math.cos(deckPhase * 2.0) * 0.006;
                    const itemTiltX = Math.cos(deckPhase * 2.0) * 0.004;
                    const itemBobX = 0;
                    const itemRollZ = 0;

                    let targetX = baseX + itemBobX;
                    let targetY = baseY + itemBobY;
                    let targetZ = baseZ + itemBobZ;
                    let targetRotX = baseRotX + itemTiltX;

                    if (isHovered) {
                        // Project radially outwards from the center of the wheel spindle
                        const dy = baseY - CY;
                        const dz = baseZ - CZ;
                        const dx = baseX - CX;
                        const len = Math.hypot(dx, dy, dz);
                        if (len > 0) {
                            targetX = baseX + (dx / len) * hoverPop;
                            targetY = baseY + (dy / len) * hoverPop + 0.04;
                            targetZ = baseZ + (dz / len) * hoverPop;
                        }
                        targetRotX = baseRotX + hoverTilt;
                    }

                    e.mesh.position.x += (targetX - e.mesh.position.x) * masterState.hoverSpeed;
                    e.mesh.position.y += (targetY - e.mesh.position.y) * masterState.hoverSpeed;
                    e.mesh.position.z += (targetZ - e.mesh.position.z) * masterState.hoverSpeed;

                    e.mesh.rotation.x += (targetRotX - e.mesh.rotation.x) * masterState.hoverSpeed;
                    e.mesh.rotation.y += (baseRotY - e.mesh.rotation.y) * masterState.hoverSpeed;
                    e.mesh.rotation.z += ((baseRotZ + itemRollZ + (isHovered ? masterState.hoverRollRotZ : 0.0)) - e.mesh.rotation.z) * masterState.hoverSpeed;

                    // Render depth sorting: items closest to front (smallest virtualIdx absolute distance) render on top
                    e.mesh.renderOrder = isHovered ? 500 : (100 - Math.round(Math.abs(virtualIdx)));

                    // 🔮 INFINITE CAROUSEL CULLING & FADE ARC MAGIC HACK:
                    const maxSpan = 6.8;
                    const absV = Math.abs(virtualIdx);

                    if (this.isSpinSwitching) {
                        // Keep items 100% full scale during spin so ZERO shrinking occurs!
                        e.mesh.visible = true;
                        e.mesh.scale.setScalar(baseScale);
                    } else if (N > 12) {
                        if (absV > maxSpan) {
                            e.mesh.visible = false;
                        } else {
                            e.mesh.visible = true;
                            const fadeScale = THREE.MathUtils.clamp((maxSpan - absV) / 1.5, 0.0, 1.0);
                            const currentS = baseScale * (0.20 + 0.80 * fadeScale);
                            e.mesh.scale.setScalar(currentS);
                        }
                    } else {
                        e.mesh.visible = true;
                        e.mesh.scale.setScalar(baseScale);
                    }
                }
                else if (e.state === 'BAY') {
                    e.mesh.visible = true;
                    e.mesh.scale.setScalar(baseScale);
                    const isPsxSystem = (this.plugin.settings.activeSystem === 'psx');
                    if (isPsxSystem) {
                        const itemPhase = (virtualIdx * 0.38) + floatTime * 0.6;
                        const itemBobY = Math.sin(itemPhase * 2.0) * 0.012;
                        const itemBobZ = Math.cos(itemPhase * 2.0) * 0.006;
                        const itemTiltX = Math.cos(itemPhase * 2.0) * 0.004;
                        const itemBobX = 0;
                        const itemRollZ = 0;

                        e.mesh.position.lerp(new THREE.Vector3(baseX + itemBobX, baseY + itemBobY, baseZ + itemBobZ), 0.15);
                        e.mesh.rotation.set(baseRotX + itemTiltX, 0, itemRollZ);

                        // Seated CD moves in lockstep with the floating PS1 console as one unified physical object:
                        const cdDisc = e.mesh.userData.cdDiscMesh;
                        if (cdDisc) {
                            const ps1TrayPos = new THREE.Vector3(0 + consoleFloatX, 1.47 + consoleFloatY, -0.34 + consoleFloatZ);
                            cdDisc.position.lerp(ps1TrayPos, 0.2);
                            if (!cdDisc.userData.spinAngle) cdDisc.userData.spinAngle = 0;
                            cdDisc.userData.spinAngle += 0.08 * dt60;
                            cdDisc.rotation.set(-Math.PI / 2 + consoleFloatRotX, consoleFloatRotY, cdDisc.userData.spinAngle + consoleFloatRotZ);
                        }
                    } else {
                        const targetSlotX = typeof masterState.nesSlotX === 'number' ? masterState.nesSlotX : (typeof masterState.slotX === 'number' ? masterState.slotX : -0.575);
                        const targetSlotY = typeof masterState.nesSlotY === 'number' ? masterState.nesSlotY : (typeof masterState.slotY === 'number' ? masterState.slotY : 1.95);
                        const targetSlotZ = typeof masterState.nesSlotZ === 'number' ? masterState.nesSlotZ : (typeof masterState.slotZ === 'number' ? masterState.slotZ : 0.20);
                        const targetSlotRotX = typeof masterState.nesSlotRotX === 'number' ? masterState.nesSlotRotX : (typeof masterState.slotRotX === 'number' ? masterState.slotRotX : 1.45);
                        const targetSlotRotY = typeof masterState.nesSlotRotY === 'number' ? masterState.nesSlotRotY : (typeof masterState.slotRotY === 'number' ? masterState.slotRotY : 0.00);
                        const targetSlotRotZ = typeof masterState.nesSlotRotZ === 'number' ? masterState.nesSlotRotZ : (typeof masterState.slotRotZ === 'number' ? masterState.slotRotZ : 0.00);

                        // Seated NES cartridge moves in lockstep with the floating NES console as one unified physical object:
                        const slotRestPos = new THREE.Vector3(
                            targetSlotX + consoleFloatX,
                            targetSlotY + consoleFloatY,
                            targetSlotZ + consoleFloatZ
                        );
                        const lerpSeated = 1 - Math.pow(1 - 0.2, dt60);
                        e.mesh.position.lerp(slotRestPos, lerpSeated);
                        e.mesh.rotation.set(
                            targetSlotRotX + consoleFloatRotX,
                            targetSlotRotY + consoleFloatRotY,
                            targetSlotRotZ + consoleFloatRotZ
                        );
                        e.mesh.renderOrder = 200;
                    }
                }
                else if (e.state === 'ANIM_TO_BAY') {
                    const isPsxSystem = (this.plugin.settings.activeSystem === 'psx');
                    const stepSpeed = isPsxSystem ? (typeof masterState.animSpeed === 'number' && masterState.animSpeed > 0 ? masterState.animSpeed : 0.004) : 0.016;
                    if (!masterState.scrubMode) {
                        e.animT += stepSpeed * dt60;
                    } else {
                        e.animT = masterState.scrubProgress;
                    }

                    const progress = Math.min(1.0, e.animT);
                    e.mesh.renderOrder = 600;

                    if (!e.bio) e.bio = createBioProfile();
                    const bio = e.bio;
                    const s = bio.seed;
                    const t = floatTime * bio.swayFreq;

                    // ── 🖐️ BIOMECHANICAL GHOST-HAND KINEMATICS LAYER ───────────────
                    // Continuous C2 smooth envelope across the entire handling sequence:
                    const env = Math.sin(Math.min(1.0, Math.max(0.0, progress)) * Math.PI);
                    const envSmooth = env * env;

                    // Arm & Wrist Multi-Frequency Human Sway:
                    const handSwayX = (Math.sin(t * 1.7 + s) * 0.038 + Math.cos(t * 3.1 + s * 1.4) * 0.015) * env;
                    const handSwayY = (Math.cos(t * 1.4 + s * 0.8) * 0.044 + Math.sin(t * 2.7 + s * 1.2) * 0.018) * env;
                    const handSwayZ = (Math.sin(t * 1.8 + s * 1.6) * 0.032 + Math.cos(t * 3.4 + s * 0.5) * 0.014) * env;

                    // Fingertip Micro-Tremor (High-Frequency Muscle Vibration):
                    const tremorT = floatTime * 13.2 + s * 2.3;
                    const tremorAmp = bio.tremorAmp * envSmooth;
                    const tremorX = (Math.sin(tremorT * 1.1) * 0.0055 + Math.cos(tremorT * 2.3) * 0.0028) * tremorAmp;
                    const tremorY = (Math.cos(tremorT * 1.2) * 0.0062 + Math.sin(tremorT * 2.1) * 0.0030) * tremorAmp;
                    const tremorZ = (Math.sin(tremorT * 0.9) * 0.0048 + Math.cos(tremorT * 1.9) * 0.0024) * tremorAmp;

                    // Dynamic Wrist Tilts, Banking & Micro-Grip Corrections:
                    const wristRotX = (bio.gripPitch * envSmooth * 1.8) + (Math.sin(t * 1.9 + s) * 0.045 + Math.cos(tremorT) * 0.008) * env;
                    const wristRotY = (bio.gripYaw * envSmooth * 1.8) + (Math.cos(t * 1.5 + s * 1.3) * 0.038 + Math.sin(tremorT * 1.2) * 0.006) * env;
                    const wristRotZ = (bio.gripRoll * envSmooth * 1.8) + (Math.sin(t * 2.1 + s * 0.7) * 0.052 + Math.cos(tremorT * 0.8) * 0.009) * env;

                    const jewelHinge = e.mesh.userData.jewelLidHinge;
                    const cdDisc = e.mesh.userData.cdDiscMesh;

                    if (isPsxSystem) {
                        let caseX = baseX, caseY = baseY, caseZ = baseZ, caseRotX = baseRotX, caseRotZ = 0;
                        const peakX = baseX - 0.55;
                        const peakTiltZ = 0.14;

                        // ── 💿 PS1 JEWEL CASE HANDLING BY GHOST HANDS ────────────────
                        // 0.00 -> 0.18: Grip & Lift forward from shelf with human wrist presentation
                        // 0.18 -> 0.58: Hold at showcase height while two-handed lid open & disc takeout occur
                        // 0.58 -> 0.74: Descend & curve back into carousel shelf slot
                        // 0.74 -> 1.00: Rest smoothly on Shelf
                        if (progress < 0.18) {
                            const tProg = easeOutCubic(progress / 0.18);
                            caseX = THREE.MathUtils.lerp(e.startPos.x, peakX, tProg);
                            caseY = THREE.MathUtils.lerp(e.startPos.y, masterState.peakY * bio.liftArcHeight, tProg);
                            caseZ = THREE.MathUtils.lerp(e.startPos.z, masterState.peakZ, tProg);
                            caseRotX = THREE.MathUtils.lerp(e.startRotX, -0.45, tProg);
                            caseRotZ = THREE.MathUtils.lerp(0.0, peakTiltZ, tProg);
                        } else if (progress < 0.58) {
                            caseX = peakX;
                            caseY = masterState.peakY * bio.liftArcHeight;
                            caseZ = masterState.peakZ;
                            caseRotX = -0.45;
                            caseRotZ = peakTiltZ;
                        } else if (progress < 0.74) {
                            const tProg = easeInOutQuad((progress - 0.58) / 0.16);
                            caseX = THREE.MathUtils.lerp(peakX, baseX, tProg);
                            caseY = THREE.MathUtils.lerp(masterState.peakY * bio.liftArcHeight, baseY, tProg);
                            caseZ = THREE.MathUtils.lerp(masterState.peakZ, baseZ, tProg);
                            caseRotX = THREE.MathUtils.lerp(-0.45, baseRotX, tProg);
                            caseRotZ = THREE.MathUtils.lerp(peakTiltZ, 0.0, tProg);
                        } else {
                            caseX = baseX;
                            caseY = baseY;
                            caseZ = baseZ;
                            caseRotX = baseRotX;
                            caseRotZ = 0.0;
                        }

                        // Apply Biomechanical Hand Handling Noise to Case Body:
                        const caseEnv = (progress < 0.74) ? Math.sin((progress / 0.74) * Math.PI) : 0;
                        e.mesh.position.set(
                            caseX + handSwayX * caseEnv + tremorX * caseEnv,
                            caseY + handSwayY * caseEnv + tremorY * caseEnv,
                            caseZ + handSwayZ * caseEnv + tremorZ * caseEnv
                        );
                        e.mesh.rotation.set(
                            caseRotX + wristRotX * caseEnv,
                            wristRotY * caseEnv,
                            caseRotZ + wristRotZ * caseEnv
                        );

                        // ── 📖 TWO-HANDED JEWEL LID HINGE OPENING DYNAMICS ────────────
                        if (jewelHinge) {
                            if (progress < 0.24) {
                                jewelHinge.rotation.y = 0;
                            } else if (progress < 0.42) {
                                const openT = easeOutCubic((progress - 0.24) / 0.18);
                                const latchCatch = Math.sin(openT * Math.PI) * 0.06 * Math.sin(floatTime * 15.0);
                                jewelHinge.rotation.y = THREE.MathUtils.lerp(0, -1.82, openT) + latchCatch;
                            } else if (progress < 0.50) {
                                jewelHinge.rotation.y = -1.82;
                            } else if (progress < 0.62) {
                                const closeT = easeInOutQuad((progress - 0.50) / 0.12);
                                jewelHinge.rotation.y = THREE.MathUtils.lerp(-1.82, 0, closeT);
                            } else {
                                jewelHinge.rotation.y = 0;
                            }
                        }

                        // ── 💿 CD DISC POP-OUT & FLIGHT TRAJECTORY ────────────────────
                        if (cdDisc) {
                            if (progress < 0.38) {
                                if (cdDisc.userData.detached) {
                                    e.mesh.attach(cdDisc);
                                    cdDisc.userData.detached = false;
                                }
                                cdDisc.position.set(0, 0, 0.012);
                                cdDisc.quaternion.set(0, 0, 0, 1);
                            } else {
                                if (!cdDisc.userData.detached) {
                                    scene.attach(cdDisc);
                                    cdDisc.userData.detached = true;
                                    e.mesh.updateMatrixWorld(true);
                                    cdDisc.userData.startPos = new THREE.Vector3(0, 0, 0.012).applyMatrix4(e.mesh.matrixWorld);
                                    cdDisc.userData.startQuat = e.mesh.quaternion.clone();
                                }

                                const floatHoverPosRight = new THREE.Vector3(1.3 + (bio.gripYaw * 2.0), (masterState.peakY + 0.32) * bio.liftArcHeight, masterState.peakZ + 0.5);
                                const floatHoverPosCenter = new THREE.Vector3(0.0 + (bio.gripYaw * 1.0), (masterState.peakY + 0.32) * bio.liftArcHeight, masterState.peakZ + 0.5);
                                const ps1TrayPos = new THREE.Vector3(0 + consoleFloatX, 1.47 + consoleFloatY, -0.34 + consoleFloatZ);

                                if (progress < 0.52) {
                                    // 1. Center Hub Press & Pop-out: Disc pops out of tray with natural fingertip edge grip & asymmetric lift
                                    const tProg = easeOutCubic((progress - 0.38) / 0.14);
                                    const localOutNormal = new THREE.Vector3(0, 0.2, 0.78).applyQuaternion(e.mesh.quaternion);
                                    const p1 = cdDisc.userData.startPos;
                                    const p2 = cdDisc.userData.startPos.clone().add(localOutNormal);
                                    const p3 = floatHoverPosRight;
                                    
                                    const q1 = p1.clone().lerp(p2, tProg);
                                    const q2 = p2.clone().lerp(p3, tProg);
                                    const popPos = q1.lerp(q2, tProg);
                                    
                                    // Subtle fingertip edge wobble as the hub releases:
                                    const hubReleaseWobble = Math.sin(tProg * Math.PI) * 0.022 * Math.sin(floatTime * 18.0);
                                    cdDisc.position.set(
                                        popPos.x + handSwayX * tProg + tremorX,
                                        popPos.y + handSwayY * tProg + tremorY + hubReleaseWobble,
                                        popPos.z + handSwayZ * tProg + tremorZ
                                    );
                                    
                                    const targetQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.2 + wristRotX, wristRotY, wristRotZ));
                                    cdDisc.quaternion.slerpQuaternions(cdDisc.userData.startQuat, targetQuat, tProg);
                                } else if (progress < 0.70) {
                                    // 2. Fingertip Carry Hover: Disc hovers with natural hand breathing while case lid closes
                                    cdDisc.position.set(
                                        floatHoverPosRight.x + handSwayX + tremorX,
                                        floatHoverPosRight.y + handSwayY + tremorY,
                                        floatHoverPosRight.z + handSwayZ + tremorZ
                                    );
                                    cdDisc.quaternion.setFromEuler(new THREE.Euler(-0.2 + wristRotX, wristRotY, wristRotZ));
                                } else if (progress < 0.78) {
                                    // 3. Graceful Glide to Center & Tilt to Horizontal (-Math.PI / 2):
                                    const tProg = easeInOutQuad((progress - 0.70) / 0.08);
                                    const glidePos = new THREE.Vector3().lerpVectors(floatHoverPosRight, floatHoverPosCenter, tProg);
                                    cdDisc.position.set(
                                        glidePos.x + handSwayX + tremorX,
                                        glidePos.y + handSwayY + tremorY,
                                        glidePos.z + handSwayZ + tremorZ
                                    );
                                    const startQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.2 + wristRotX, wristRotY, wristRotZ));
                                    const flatQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2 + wristRotX * 0.5, wristRotY * 0.5, wristRotZ * 0.5));
                                    cdDisc.quaternion.slerpQuaternions(startQuat, flatQuat, tProg);
                                } else {
                                    // 4. Parabolic Descent into PS1 Console Tray, Optical Spin-Up & 3-Ball Spindle Snap:
                                    const landT = Math.min(1.0, (progress - 0.78) / 0.22);
                                    const tProg = easeOutCubic(landT);
                                    const peakY = floatHoverPosCenter.y + 0.38;
                                    const p1 = floatHoverPosCenter;
                                    const p2 = new THREE.Vector3(0, peakY, -0.1);
                                    const p3 = ps1TrayPos;

                                    const q1 = p1.clone().lerp(p2, tProg);
                                    const q2 = p2.clone().lerp(p3, tProg);
                                    const flightPos = q1.lerp(q2, tProg);

                                    // Spindle Snap & Tactile Mechanical Settle (3 spring-loaded steel ball bearings):
                                    const snapProg = Math.max(0, (landT - 0.85) / 0.15);
                                    const snapSettle = (snapProg > 0) ? Math.exp(-bio.chunkDamping * snapProg) * Math.sin(snapProg * Math.PI * 6) * 0.022 : 0;

                                    const landEnv = 1.0 - easeInOutQuad(landT);
                                    cdDisc.position.set(
                                        flightPos.x + (handSwayX + tremorX) * landEnv,
                                        flightPos.y + (handSwayY + tremorY) * landEnv + snapSettle,
                                        flightPos.z + (handSwayZ + tremorZ) * landEnv
                                    );

                                    const spinAngle = THREE.MathUtils.lerp(0, Math.PI * 6.5, tProg);
                                    cdDisc.quaternion.setFromEuler(new THREE.Euler(
                                        -Math.PI / 2 + consoleFloatRotX + (wristRotX * 0.4 * landEnv),
                                        consoleFloatRotY + (wristRotY * 0.4 * landEnv),
                                        spinAngle + consoleFloatRotZ + (wristRotZ * 0.4 * landEnv)
                                    ));
                                }
                            }
                        }
                    } else {
                        // ── 🎮 NES CARTRIDGE HANDLING BY GHOST HANDS ─────────────────
                        const targetSlotX = typeof masterState.nesSlotX === 'number' ? masterState.nesSlotX : (typeof masterState.slotX === 'number' ? masterState.slotX : -0.575);
                        const targetSlotY = typeof masterState.nesSlotY === 'number' ? masterState.nesSlotY : (typeof masterState.slotY === 'number' ? masterState.slotY : 1.95);
                        const targetSlotZ = typeof masterState.nesSlotZ === 'number' ? masterState.nesSlotZ : (typeof masterState.slotZ === 'number' ? masterState.slotZ : 0.20);
                        const targetSlotRotX = typeof masterState.nesSlotRotX === 'number' ? masterState.nesSlotRotX : (typeof masterState.slotRotX === 'number' ? masterState.slotRotX : 1.45);
                        const targetSlotRotY = typeof masterState.nesSlotRotY === 'number' ? masterState.nesSlotRotY : (typeof masterState.slotRotY === 'number' ? masterState.slotRotY : 0.00);
                        const targetSlotRotZ = typeof masterState.nesSlotRotZ === 'number' ? masterState.nesSlotRotZ : (typeof masterState.slotRotZ === 'number' ? masterState.slotRotZ : 0.00);
                        const popZ = (typeof masterState.nesEjectPopZ === 'number') ? masterState.nesEjectPopZ : ((typeof masterState.ejectPopZ === 'number') ? masterState.ejectPopZ : 0.86);

                        let currY: number, currZ: number, currRotX: number, currRotZ: number;
                        let currX: number, currRotY: number;

                        if (progress < 0.20) {
                            // Phase 1a: Swift lift from carousel rack to showcase height & tilt facing player
                            const tProg = easeOutCubic(progress / 0.20);
                            currY = THREE.MathUtils.lerp(e.startPos.y, masterState.peakY * bio.liftArcHeight, tProg);
                            currZ = THREE.MathUtils.lerp(e.startPos.z, masterState.peakZ, tProg);
                            currRotX = THREE.MathUtils.lerp(e.startRotX, -0.45, tProg);
                            currRotZ = THREE.MathUtils.lerp(0.0, masterState.sideRollZ, tProg);
                            currX = e.startPos.x;
                            currRotY = 0.0;
                        }
                        else if (progress < 0.42) {
                            // Phase 1b: Showcase Linger — Holds presentation tilt directly facing player before flight
                            const lingerT = (progress - 0.20) / 0.22;
                            const lingerBreath = Math.sin(lingerT * Math.PI) * 0.018;
                            currY = masterState.peakY * bio.liftArcHeight + lingerBreath;
                            currZ = masterState.peakZ;
                            currRotX = -0.45;
                            currRotZ = masterState.sideRollZ;
                            currX = e.startPos.x;
                            currRotY = 0.0;
                        }
                        else if (progress < 0.74) {
                            // Phase 2: Flight towards NES front slot, door flap push & rail alignment
                            const tProg = easeInOutQuad((progress - 0.42) / 0.32);
                            currY = THREE.MathUtils.lerp(masterState.peakY * bio.liftArcHeight, targetSlotY + 0.18 + consoleFloatY, tProg);
                            currZ = THREE.MathUtils.lerp(masterState.peakZ, popZ + consoleFloatZ, tProg);
                            currRotX = THREE.MathUtils.lerp(-0.45, targetSlotRotX + consoleFloatRotX, tProg);
                            currRotZ = THREE.MathUtils.lerp(masterState.sideRollZ, targetSlotRotZ + consoleFloatRotZ, tProg);
                            currX = THREE.MathUtils.lerp(e.startPos.x, targetSlotX + consoleFloatX, tProg);
                            currRotY = THREE.MathUtils.lerp(0.0, targetSlotRotY + consoleFloatRotY, tProg);
                        }
                        else if (progress < 0.88) {
                            // Phase 3: Slide forward into 72-pin connector leaf springs with tactile rail friction
                            const tProg = easeInOutQuad((progress - 0.74) / 0.14);
                            currY = targetSlotY + 0.18 + consoleFloatY;
                            currZ = THREE.MathUtils.lerp(popZ + consoleFloatZ, targetSlotZ + consoleFloatZ, tProg);
                            currRotX = targetSlotRotX + consoleFloatRotX;
                            currRotZ = targetSlotRotZ + consoleFloatRotZ;
                            currX = targetSlotX + consoleFloatX;
                            currRotY = targetSlotRotY + consoleFloatRotY;
                        }
                        else {
                            // Phase 4: THE CHUNK — Hand firmly presses spring tray DOWN into mechanical lock with damped bounce!
                            const lockT = (progress - 0.88) / 0.12;
                            const tProg = easeInOutQuad(lockT);
                            const baseDownY = THREE.MathUtils.lerp(targetSlotY + 0.18 + consoleFloatY, targetSlotY + consoleFloatY, tProg);
                            
                            // Physical ZIF mechanical latch rebound settle:
                            const chunkSnap = Math.exp(-bio.chunkDamping * lockT) * Math.sin(lockT * Math.PI * 5) * 0.028;
                            currY = baseDownY + chunkSnap;
                            currZ = targetSlotZ + consoleFloatZ;
                            currRotX = targetSlotRotX + consoleFloatRotX;
                            currRotZ = targetSlotRotZ + consoleFloatRotZ;
                            currX = targetSlotX + consoleFloatX;
                            currRotY = targetSlotRotY + consoleFloatRotY;
                        }

                        // Velocity-based Wrist Banking & Continuous Ghost Hand Motion:
                        const flightEnv = (progress < 0.90) ? Math.sin((progress / 0.90) * Math.PI) : Math.max(0, 1.0 - ((progress - 0.90) / 0.10));

                        e.mesh.position.set(
                            currX + (handSwayX + tremorX) * flightEnv,
                            currY + (handSwayY + tremorY) * flightEnv,
                            currZ + (handSwayZ + tremorZ) * flightEnv
                        );
                        e.mesh.rotation.set(
                            currRotX + wristRotX * flightEnv,
                            currRotY + wristRotY * flightEnv,
                            currRotZ + wristRotZ * flightEnv
                        );
                    }

                    if (isPsxSystem) {
                        if (progress >= 0.02) this.sfxEngine.triggerCueOnce('psx_lift', 'psx_case_lift_emerge', 0.80);
                        if (progress >= 0.24) this.sfxEngine.triggerCueOnce('psx_creak', 'psx_case_hinge_creak_open', 0.85);
                        if (progress >= 0.38) this.sfxEngine.triggerCueOnce('psx_hub', 'psx_disc_hub_pop_out', 0.90);
                        if (progress >= 0.52) this.sfxEngine.triggerCueOnce('psx_open_btn', 'psx_open_button_plunge', 0.85);
                        if (progress >= 0.56) this.sfxEngine.triggerCueOnce('psx_lid_pop', 'psx_lid_spring_damper_pop', 0.90);
                        if (progress >= 0.60) this.sfxEngine.triggerCueOnce('psx_case_close', 'psx_case_clasp_snap_shut', 0.85);
                        if (progress >= 0.70) this.sfxEngine.triggerCueOnce('psx_whoosh', 'psx_disc_flight_whoosh', 0.75);
                        if (progress >= 0.96) this.sfxEngine.triggerCueOnce('psx_spindle', 'psx_spindle_3ball_snap', 0.95);
                        if (progress >= 0.99) this.sfxEngine.triggerCueOnce('psx_lid_shut', 'psx_lid_push_down_latch', 0.90);
                    } else {
                        if (progress >= 0.02) this.sfxEngine.triggerCueOnce('nes_lift', 'nes_card_lift_emerge', 0.80);
                        if (progress >= 0.08) this.sfxEngine.triggerCueOnce('nes_whoosh', 'nes_flight_glide_whoosh', 0.75);
                        if (progress >= 0.48) this.sfxEngine.triggerCueOnce('nes_flap', 'nes_front_flap_push', 0.85);
                        if (progress >= 0.60) this.sfxEngine.triggerCueOnce('nes_rail', 'nes_chamber_rail_slide', 0.80);
                        if (progress >= 0.78) this.sfxEngine.triggerCueOnce('nes_pin', 'nes_connector_72pin_seat', 0.90);
                        if (progress >= 0.90) this.sfxEngine.triggerCueOnce('nes_zif', 'nes_zif_chamber_lock_chunk', 0.95);
                    }

                    if (e.animT >= 1.0 && !masterState.scrubMode) {
                        e.state = 'BAY';
                        this.customRomString = null;
                        this.selectedVaultRomPath = e.rom.path;
                        this.activeRomName = e.rom.name;
                        if (this.romSelectEl) this.romSelectEl.value = e.rom.path;

                        if (nesLedMat) nesLedMat.color.setHex(0x00ff66);
                        if (nesLedPointLight) nesLedPointLight.intensity = 1.5;

                        if (this.isConsolePowerOn && this.hasIntroRun) {
                            // Hot-swap ROM: keep screen & controller alive, just restart the engine
                            const prevPowerOn = this.isConsolePowerOn;
                            this.stopEmulator();
                            this.isConsolePowerOn = prevPowerOn; // restore flag so startEmulator sees wasAlreadyRunning
                            this.startEmulator();
                        } else {
                            this.ensureRetroStartButton();
                        }

                    }
                }
                else if (e.state === 'ANIM_TO_DECK') {
                    const isPsxSystem = (this.plugin.settings.activeSystem === 'psx');
                    const stepSpeed = isPsxSystem ? (typeof masterState.animSpeed === 'number' && masterState.animSpeed > 0 ? masterState.animSpeed : 0.004) : 0.016;
                    if (!masterState.scrubMode) {
                        e.animT += stepSpeed * dt60;
                    } else {
                        e.animT = masterState.scrubProgress;
                    }

                    const progress = Math.min(1.0, e.animT);
                    e.mesh.renderOrder = 600;

                    if (!e.bio) e.bio = createBioProfile();
                    const bio = e.bio;
                    const s = bio.seed;
                    const t = floatTime * bio.swayFreq;

                    // ── 🖐️ BIOMECHANICAL GHOST-HAND KINEMATICS LAYER ───────────────
                    const env = Math.sin(Math.min(1.0, Math.max(0.0, progress)) * Math.PI);
                    const envSmooth = env * env;

                    const handSwayX = (Math.sin(t * 1.7 + s) * 0.038 + Math.cos(t * 3.1 + s * 1.4) * 0.015) * env;
                    const handSwayY = (Math.cos(t * 1.4 + s * 0.8) * 0.044 + Math.sin(t * 2.7 + s * 1.2) * 0.018) * env;
                    const handSwayZ = (Math.sin(t * 1.8 + s * 1.6) * 0.032 + Math.cos(t * 3.4 + s * 0.5) * 0.014) * env;

                    const tremorT = floatTime * 13.2 + s * 2.3;
                    const tremorAmp = bio.tremorAmp * envSmooth;
                    const tremorX = (Math.sin(tremorT * 1.1) * 0.0055 + Math.cos(tremorT * 2.3) * 0.0028) * tremorAmp;
                    const tremorY = (Math.cos(tremorT * 1.2) * 0.0062 + Math.sin(tremorT * 2.1) * 0.0030) * tremorAmp;
                    const tremorZ = (Math.sin(tremorT * 0.9) * 0.0048 + Math.cos(tremorT * 1.9) * 0.0024) * tremorAmp;

                    const wristRotX = (bio.gripPitch * envSmooth * 1.8) + (Math.sin(t * 1.9 + s) * 0.045 + Math.cos(tremorT) * 0.008) * env;
                    const wristRotY = (bio.gripYaw * envSmooth * 1.8) + (Math.cos(t * 1.5 + s * 1.3) * 0.038 + Math.sin(tremorT * 1.2) * 0.006) * env;
                    const wristRotZ = (bio.gripRoll * envSmooth * 1.8) + (Math.sin(t * 2.1 + s * 0.7) * 0.052 + Math.cos(tremorT * 0.8) * 0.009) * env;

                    const jewelHinge = e.mesh.userData.jewelLidHinge;
                    const cdDisc = e.mesh.userData.cdDiscMesh;

                    if (isPsxSystem) {
                        let caseX = baseX, caseY = baseY, caseZ = baseZ, caseRotX = baseRotX, caseRotZ = 0;
                        const peakX = baseX - 0.55;
                        const peakTiltZ = 0.14;

                        // ── 💿 PS1 JEWEL CASE RETURN SEQUENCE (GHOST HANDS) ──────────
                        // 0.00 -> 0.28: Rest at Shelf
                        // 0.28 -> 0.44: Rise to meet returning disc & open lid
                        // 0.44 -> 0.82: Hold while disc seats into rosette hub
                        // 0.82 -> 1.00: Close lid & descend smoothly back to shelf
                        if (progress < 0.28) {
                            caseX = baseX;
                            caseY = baseY;
                            caseZ = baseZ;
                            caseRotX = baseRotX;
                            caseRotZ = 0.0;
                        } else if (progress < 0.44) {
                            const tProg = easeOutCubic((progress - 0.28) / 0.16);
                            caseX = THREE.MathUtils.lerp(baseX, peakX, tProg);
                            caseY = THREE.MathUtils.lerp(baseY, masterState.peakY * bio.liftArcHeight, tProg);
                            caseZ = THREE.MathUtils.lerp(baseZ, masterState.peakZ, tProg);
                            caseRotX = THREE.MathUtils.lerp(baseRotX, -0.45, tProg);
                            caseRotZ = THREE.MathUtils.lerp(0.0, peakTiltZ, tProg);
                        } else if (progress < 0.82) {
                            caseX = peakX;
                            caseY = masterState.peakY * bio.liftArcHeight;
                            caseZ = masterState.peakZ;
                            caseRotX = -0.45;
                            caseRotZ = peakTiltZ;
                        } else {
                            const tProg = easeInOutQuad((progress - 0.82) / 0.18);
                            caseX = THREE.MathUtils.lerp(peakX, baseX, tProg);
                            caseY = THREE.MathUtils.lerp(masterState.peakY * bio.liftArcHeight, baseY, tProg);
                            caseZ = THREE.MathUtils.lerp(masterState.peakZ, baseZ, tProg);
                            caseRotX = THREE.MathUtils.lerp(-0.45, baseRotX, tProg);
                            caseRotZ = THREE.MathUtils.lerp(peakTiltZ, 0.0, tProg);
                        }

                        const caseEnv = (progress >= 0.28 && progress <= 0.95) ? Math.sin(((progress - 0.28) / 0.67) * Math.PI) : 0;
                        e.mesh.position.set(
                            caseX + (handSwayX + tremorX) * caseEnv,
                            caseY + (handSwayY + tremorY) * caseEnv,
                            caseZ + (handSwayZ + tremorZ) * caseEnv
                        );
                        e.mesh.rotation.set(
                            caseRotX + wristRotX * caseEnv,
                            wristRotY * caseEnv,
                            caseRotZ + wristRotZ * caseEnv
                        );

                        if (jewelHinge) {
                            if (progress < 0.38) {
                                jewelHinge.rotation.y = 0;
                            } else if (progress < 0.50) {
                                const openT = easeOutCubic((progress - 0.38) / 0.12);
                                jewelHinge.rotation.y = THREE.MathUtils.lerp(0, -1.82, openT);
                            } else if (progress < 0.62) {
                                jewelHinge.rotation.y = -1.82;
                            } else if (progress < 0.74) {
                                const closeT = easeInOutQuad((progress - 0.62) / 0.12);
                                jewelHinge.rotation.y = THREE.MathUtils.lerp(-1.82, 0, closeT);
                            } else {
                                jewelHinge.rotation.y = 0;
                            }
                        }

                        if (cdDisc) {
                            if (progress === 0 || cdDisc.userData.detached) {
                                scene.attach(cdDisc);
                                cdDisc.userData.detached = true;
                            }
                            
                            const floatHoverPosRight = new THREE.Vector3(1.3 + (bio.gripYaw * 2.0), (masterState.peakY + 0.32) * bio.liftArcHeight, masterState.peakZ + 0.5);
                            const floatHoverPosCenter = new THREE.Vector3(0.0 + (bio.gripYaw * 1.0), (masterState.peakY + 0.32) * bio.liftArcHeight, masterState.peakZ + 0.5);

                            if (progress < 0.22) {
                                // 1. Unsnap off spindle ball bearings & fly up into center air with reverse optical spin
                                const tProg = easeInOutQuad(progress / 0.22);
                                const peakY = floatHoverPosCenter.y + 0.38;
                                const ps1TrayPos = new THREE.Vector3(0 + consoleFloatX, 1.47 + consoleFloatY, -0.34 + consoleFloatZ);
                                const p1 = ps1TrayPos;
                                const p2 = new THREE.Vector3(0, peakY, -0.1);
                                const p3 = floatHoverPosCenter;

                                const q1 = p1.clone().lerp(p2, tProg);
                                const q2 = p2.clone().lerp(p3, tProg);
                                const returnFlightPos = q1.lerp(q2, tProg);

                                const spinEnv = 1.0 - tProg;
                                const reverseSpin = THREE.MathUtils.lerp(Math.PI * 6.5, 0, tProg);

                                cdDisc.position.set(
                                    returnFlightPos.x + handSwayX * spinEnv + tremorX * spinEnv,
                                    returnFlightPos.y + handSwayY * spinEnv + tremorY * spinEnv,
                                    returnFlightPos.z + handSwayZ * spinEnv + tremorZ * spinEnv
                                );
                                cdDisc.quaternion.setFromEuler(new THREE.Euler(
                                    -Math.PI / 2 + consoleFloatRotX + (wristRotX * 0.4 * (1 - tProg)),
                                    consoleFloatRotY + (wristRotY * 0.4 * (1 - tProg)),
                                    reverseSpin + consoleFloatRotZ
                                ));
                            } else if (progress < 0.30) {
                                // 2. Glide from center to right position
                                const tProg = easeInOutQuad((progress - 0.22) / 0.08);
                                const glidePos = new THREE.Vector3().lerpVectors(floatHoverPosCenter, floatHoverPosRight, tProg);
                                cdDisc.position.set(
                                    glidePos.x + handSwayX + tremorX,
                                    glidePos.y + handSwayY + tremorY,
                                    glidePos.z + handSwayZ + tremorZ
                                );
                                const flatQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
                                const tiltQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.2 + wristRotX, wristRotY, wristRotZ));
                                cdDisc.quaternion.slerpQuaternions(flatQuat, tiltQuat, tProg);
                            } else if (progress < 0.48) {
                                // 3. Hold on right while jewel case lifts from shelf and opens lid
                                cdDisc.position.set(
                                    floatHoverPosRight.x + handSwayX + tremorX,
                                    floatHoverPosRight.y + handSwayY + tremorY,
                                    floatHoverPosRight.z + handSwayZ + tremorZ
                                );
                                cdDisc.quaternion.setFromEuler(new THREE.Euler(-0.2 + wristRotX, wristRotY, wristRotZ));
                            } else if (progress < 0.60) {
                                // 4. Glide down into open jewel case tray & reseat onto center rosette hub
                                const tProg = easeOutCubic((progress - 0.48) / 0.12);
                                e.mesh.updateMatrixWorld(true);
                                const trayHubWorldPos = new THREE.Vector3(0, 0, 0.012).applyMatrix4(e.mesh.matrixWorld);
                                const localOutNormal = new THREE.Vector3(0, 0.2, 0.78).applyQuaternion(e.mesh.quaternion);
                                
                                const p1 = floatHoverPosRight;
                                const p2 = trayHubWorldPos.clone().add(localOutNormal);
                                const p3 = trayHubWorldPos;
                                
                                const q1 = p1.clone().lerp(p2, tProg);
                                const q2 = p2.clone().lerp(p3, tProg);
                                const returnPos = q1.lerp(q2, tProg);

                                cdDisc.position.set(
                                    returnPos.x + handSwayX * (1 - tProg) + tremorX * (1 - tProg),
                                    returnPos.y + handSwayY * (1 - tProg) + tremorY * (1 - tProg),
                                    returnPos.z + handSwayZ * (1 - tProg) + tremorZ * (1 - tProg)
                                );

                                const startTiltQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.2 + wristRotX, wristRotY, wristRotZ));
                                cdDisc.quaternion.slerpQuaternions(startTiltQuat, e.mesh.quaternion, tProg);
                            } else {
                                // 5. Locked inside tray & hold while lid closes and case returns
                                if (cdDisc.userData.detached) {
                                    e.mesh.attach(cdDisc);
                                    cdDisc.userData.detached = false;
                                }
                                cdDisc.position.set(0, 0, 0.012);
                                cdDisc.quaternion.set(0, 0, 0, 1);
                            }
                        }
                    } else {
                        // ── 🎮 NES CARTRIDGE EJECTION (GHOST HANDS) ──────────────────
                        const targetSlotX = typeof masterState.nesSlotX === 'number' ? masterState.nesSlotX : (typeof masterState.slotX === 'number' ? masterState.slotX : -0.575);
                        const targetSlotY = typeof masterState.nesSlotY === 'number' ? masterState.nesSlotY : (typeof masterState.slotY === 'number' ? masterState.slotY : 1.95);
                        const targetSlotZ = typeof masterState.nesSlotZ === 'number' ? masterState.nesSlotZ : (typeof masterState.slotZ === 'number' ? masterState.slotZ : 0.20);
                        const targetSlotRotX = typeof masterState.nesSlotRotX === 'number' ? masterState.nesSlotRotX : (typeof masterState.slotRotX === 'number' ? masterState.slotRotX : 1.45);
                        const targetSlotRotY = typeof masterState.nesSlotRotY === 'number' ? masterState.nesSlotRotY : (typeof masterState.slotRotY === 'number' ? masterState.slotRotY : 0.00);
                        const targetSlotRotZ = typeof masterState.nesSlotRotZ === 'number' ? masterState.nesSlotRotZ : (typeof masterState.slotRotZ === 'number' ? masterState.slotRotZ : 0.00);
                        const popZ = (typeof masterState.nesEjectPopZ === 'number') ? masterState.nesEjectPopZ : ((typeof masterState.ejectPopZ === 'number') ? masterState.ejectPopZ : 0.86);

                        let currY: number, currZ: number, currRotX: number, currRotZ: number;

                        if (progress < 0.20) {
                            // Phase 1: ZIF Spring Tray Pops Up with mechanical spring bounce
                            const popT = progress / 0.20;
                            const springBounce = Math.exp(-12.0 * popT) * Math.sin(popT * Math.PI * 4) * 0.028;
                            currY = THREE.MathUtils.lerp(targetSlotY, targetSlotY + 0.18, easeOutCubic(popT)) + consoleFloatY + springBounce;
                            currZ = targetSlotZ + consoleFloatZ;
                            currRotX = targetSlotRotX + consoleFloatRotX;
                            currRotZ = targetSlotRotZ + consoleFloatRotZ;
                        }
                        else if (progress < 0.45) {
                            // Phase 2: Ghost hand grabs cart and pulls out of 72-pin connector leaf springs
                            const pullT = easeInOutQuad((progress - 0.20) / 0.25);
                            currY = targetSlotY + 0.18 + consoleFloatY;
                            currZ = THREE.MathUtils.lerp(targetSlotZ + consoleFloatZ, popZ + consoleFloatZ, pullT);
                            currRotX = targetSlotRotX + consoleFloatRotX;
                            currRotZ = targetSlotRotZ + consoleFloatRotZ;
                        }
                        else if (progress < 0.78) {
                            // Phase 3: Lift up and carry through air towards carousel rack
                            const tProg = easeOutCubic((progress - 0.45) / 0.33);
                            currY = THREE.MathUtils.lerp(targetSlotY + 0.18 + consoleFloatY, masterState.peakY * bio.liftArcHeight, tProg);
                            currZ = THREE.MathUtils.lerp(popZ + consoleFloatZ, masterState.peakZ, tProg);
                            currRotX = THREE.MathUtils.lerp(targetSlotRotX + consoleFloatRotX, -0.45, tProg);
                            currRotZ = THREE.MathUtils.lerp(targetSlotRotZ + consoleFloatRotZ, masterState.sideRollZ, tProg);
                        }
                        else {
                            // Phase 4: Settle smoothly into carousel shelf rack slot
                            const tProg = easeInOutQuad((progress - 0.78) / 0.22);
                            currY = THREE.MathUtils.lerp(masterState.peakY * bio.liftArcHeight, baseY, tProg);
                            currZ = THREE.MathUtils.lerp(masterState.peakZ, baseZ, tProg);
                            currRotX = THREE.MathUtils.lerp(-0.45, baseRotX, tProg);
                            currRotZ = THREE.MathUtils.lerp(masterState.sideRollZ, 0.0, tProg);
                        }

                        const flightEnv = (progress >= 0.20) ? Math.sin(((progress - 0.20) / 0.80) * Math.PI) : 0;
                        const currX = THREE.MathUtils.lerp(targetSlotX + consoleFloatX, baseX, progress);
                        const currRotY = THREE.MathUtils.lerp(targetSlotRotY + consoleFloatRotY, 0.0, progress);

                        e.mesh.position.set(
                            currX + (handSwayX + tremorX) * flightEnv,
                            currY + (handSwayY + tremorY) * flightEnv,
                            currZ + (handSwayZ + tremorZ) * flightEnv
                        );
                        e.mesh.rotation.set(
                            currRotX + wristRotX * flightEnv,
                            currRotY + wristRotY * flightEnv,
                            currRotZ + wristRotZ * flightEnv
                        );
                    }

                    if (isPsxSystem) {
                        if (progress >= 0.00) this.sfxEngine.triggerCueOnce('psx_eject_btn', 'psx_eject_button_click', 0.85);
                        if (progress >= 0.04) this.sfxEngine.triggerCueOnce('psx_eject_lid', 'psx_lid_open_again', 0.85);
                        if (progress >= 0.08) this.sfxEngine.triggerCueOnce('psx_eject_spindle', 'psx_spindle_ball_unsnap', 0.85);
                        if (progress >= 0.24) this.sfxEngine.triggerCueOnce('psx_eject_flight', 'psx_disc_return_flight', 0.75);
                        if (progress >= 0.38) this.sfxEngine.triggerCueOnce('psx_eject_case_open', 'psx_case_hinge_creak_open', 0.85);
                        if (progress >= 0.58) this.sfxEngine.triggerCueOnce('psx_eject_rosette', 'psx_disc_reseat_rosette_snap', 0.90);
                        if (progress >= 0.72) this.sfxEngine.triggerCueOnce('psx_eject_clasp', 'psx_case_clasp_snap_shut', 0.90);
                    } else {
                        if (progress >= 0.00) this.sfxEngine.triggerCueOnce('nes_eject_pop', 'nes_zif_spring_pop_up', 0.90);
                        if (progress >= 0.20) this.sfxEngine.triggerCueOnce('nes_eject_pin', 'nes_connector_unseat_pull', 0.85);
                        if (progress >= 0.50) this.sfxEngine.triggerCueOnce('nes_eject_flap', 'nes_flap_snap_shut', 0.80);
                        if (progress >= 0.90) this.sfxEngine.triggerCueOnce('nes_eject_seat', 'nes_return_slot_reseat', 0.85);
                    }

                    if (e.animT >= 1.0 && !masterState.scrubMode) {
                        e.state = 'DECK';
                        
                        if (isPsxSystem && cdDisc && cdDisc.userData.detached) {
                            e.mesh.attach(cdDisc);
                            cdDisc.userData.detached = false;
                            cdDisc.position.set(0, 0, 0.012);
                            cdDisc.rotation.set(0, 0, 0);
                        }

                        if (pendingInsertEntry && pendingInsertEntry.state === 'DECK') {
                            const next = pendingInsertEntry;
                            pendingInsertEntry = null;
                            this.sfxEngine.resetCues();
                            next.state = 'ANIM_TO_BAY';
                            next.animT = 0.0;
                            next.startPos.copy(next.mesh.position);
                            next.startRotX = next.mesh.rotation.x;
                            next.bio = createBioProfile();
                        }
                    }
                }
            });

            const isAnyCartAnimating = entries.some(e => e.state === 'ANIM_TO_BAY' || e.state === 'ANIM_TO_DECK');
            const requiresComposer = masterState.bloomEnabled || masterState.dofEnabled;
            if (requiresComposer) {
                bloomPass.strength = masterState.bloomIntensity;
                bloomPass.radius = masterState.bloomRadius;
                bloomPass.threshold = masterState.bloomThreshold;
                halationPass.uniforms.uHalation.value = masterState.halationGlow;
                composer.render();
            } else {
                renderer.render(scene, camera);
            }
            } catch (err) {
                console.error("Error in animate loop:", err);
                if (this.animationFrameId !== null) window.cancelAnimationFrame(this.animationFrameId);
                new Notice("3D Render Error: " + err.message);
            }
        };
        animate();

        } catch (e) {
            new Notice("Error in build3DScene: " + e.message);
            console.error("build3DScene error:", e);
        }
    }

    private refreshRomSelectOptions() {
        if (!this.romSelectEl) return;
        this.romSelectEl.textContent = '';

        const allRoms = this.getAllAvailableRoms(this.plugin.settings.activeSystem);
        allRoms.forEach((rom) => {
            const opt = createEl('option');
            opt.value = rom.path;
            opt.text = rom.isAsset ? ('🎮 ' + rom.name + ' (Plugin Assets)') : ('📁 ' + rom.name + ' (Vault)');
            this.romSelectEl.appendChild(opt);
        });

        const uploadOption = createEl('option');
        uploadOption.value = 'upload';
        uploadOption.text = '📤 Load External .NES File...';
        this.romSelectEl.appendChild(uploadOption);

        if (this.selectedVaultRomPath) {
            this.romSelectEl.value = this.selectedVaultRomPath;
        }

        this.renderUnifiedCartridgeSystem();
    }

    private ejectCartridge() {
        if (!this.selectedVaultRomPath) {
            return;
        }

        this.selectedVaultRomPath = null;
        this.customRomString = null;
        if (this.romSelectEl) this.romSelectEl.value = '';
        if (this.isRunning) this.stopEmulator();
        this.renderUnifiedCartridgeSystem();
    }

    private startAnimTimeout1: any = null;
    private startAnimTimeout2: any = null;

    private async finishStartGridCreation() {
        if (!this.pendingStartGridCreation) return;
        this.pendingStartGridCreation = false;
        this.isConsolePowerOn = true;

        if (this.startAnimTimeout1) window.clearTimeout(this.startAnimTimeout1);
        if (this.startAnimTimeout2) window.clearTimeout(this.startAnimTimeout2);

        await this.createGrid();
        this.nodesCreated = true;
        this.updateOverlayCanvasSize();

        // 1. Keep controller pad hidden (isControllerVisible = false) during screen power-on animation
        this.isControllerVisible = false;
        if (this.controllerPadEl) {
            setCssStyles(this.controllerPadEl, { display: 'none' });
        }
        if (this.cordSvgEl) {
            setCssStyles(this.cordSvgEl, { display: 'none' });
        }

        // 2. Trigger GPU Hardware-Accelerated CRT TV Screen Power-On Animation (Dot -> Horizontal Line -> Full Height Screen)
        if (this.overlayCanvas) {
            setCssStyles(this.overlayCanvas, { display: 'block' });
            this.overlayCanvas.classList.remove('tetris-crt-power-on');
            void this.overlayCanvas.offsetWidth; // Force reflow
            this.overlayCanvas.classList.add('tetris-crt-power-on');
        }
        if (this.crtOverlayEl && this.isCrtActive) {
            setCssStyles(this.crtOverlayEl, { display: 'block' });
            this.crtOverlayEl.classList.remove('tetris-crt-power-on');
            void this.crtOverlayEl.offsetWidth; // Force reflow
            this.crtOverlayEl.classList.add('tetris-crt-power-on');
        }

        this.drawOverlay();

        // 3. Right after screen finishes expanding (1300ms), make controller visible and slide up from underneath!
        this.startAnimTimeout1 = window.setTimeout(() => {
            this.isControllerVisible = true;
            if (this.controllerPadEl && this.isControllerVisible) {
                this.isControllerAnimatingIn = true;
                const scale = (typeof this.controllerScale === 'number' && !isNaN(this.controllerScale)) ? this.controllerScale : 1.0;
                const targetScale = 0.975 * scale;

                const ox = this.controllerOffset.x;
                const oy = this.controllerOffset.y;
                const minX = this.dummyNode ? this.dummyNode.x : this.cachedMinX;
                const minY = this.dummyNode ? this.dummyNode.y : this.cachedMinY;
                const w = this.dummyNode ? this.dummyNode.width : (this.SCREEN_WIDTH * this.PIXEL_SCALE);
                const h = this.dummyNode ? this.dummyNode.height : (this.SCREEN_HEIGHT * this.PIXEL_SCALE);
                const isPSX = this.plugin.settings.activeSystem === 'psx';
                const padW = isPSX ? 440 : 370;
                const defaultRightShift = 55;
                const baseLeft = (minX + (w - padW) / 2) + defaultRightShift;
                const baseTop = (minY + h + 140);
                setCssStyles(this.controllerPadEl, { left: (baseLeft + ox) + 'px' });
                setCssStyles(this.controllerPadEl, { top: (baseTop + oy) + 'px' });

                // EMOJI / RETRO EMERGENCE: Tucked behind TV screen (-160px up) sliding DOWNWARDS into position with spring bounce!
                const startTransform = 'perspective(800px) translateY(-160px) scale(' + targetScale + ') rotateX(-4deg)';
                const overshootTransform = 'perspective(800px) translateY(18px) scale(' + (targetScale * 1.03) + ') rotateX(4deg)';
                const settleTransform = 'perspective(800px) translateY(-4px) scale(' + (targetScale * 0.99) + ') rotateX(-1deg)';
                const endTransform = 'perspective(800px) translateY(0px) scale(' + targetScale + ') rotateX(1.5deg)';

                // Set initial hidden start transform & opacity BEFORE making element visible
                setCssStyles(this.controllerPadEl, { transform: startTransform });
                setCssStyles(this.controllerPadEl, { opacity: '0' });
                setCssStyles(this.controllerPadEl, { display: 'block' });

                const anim = this.controllerPadEl.animate([
                    { transform: startTransform, opacity: 0 },
                    { transform: startTransform, opacity: 1, offset: 0.12 },
                    { transform: overshootTransform, opacity: 1, offset: 0.68 },
                    { transform: settleTransform, opacity: 1, offset: 0.86 },
                    { transform: endTransform, opacity: 1, offset: 1.0 }
                ], {
                    duration: 1100,
                    easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
                    fill: 'forwards'
                });

                anim.onfinish = () => {
                    this.isControllerAnimatingIn = false;
                    if (this.controllerPadEl) {
                        setCssStyles(this.controllerPadEl, { opacity: '1' });
                    }
                    this.updateControllerTransform();
                };
            }
            if (this.cordSvgEl && this.isControllerVisible) {
                setCssStyles(this.cordSvgEl, { display: 'block' });
            }
            this.updateCordPhysics();
        }, 1300);
    }

    public triggerIntroAnimation(force = true) {
        if (force) {
            this.hasIntroRun = false;
        }
        this.introFromCamX = this.lastIdleCamX;
        this.introFromCamY = this.lastIdleCamY;
        this.introFromCamZ = this.lastIdleCamZ;
        this.introFromCamFov = this.lastIdleFov;
        this.introFromLookAtY = this.lastIdleLookY;
        this.introFromLookAtZ = this.lastIdleLookZ;
        this.introStartTime = Date.now();
        this.isIntroPlaying = true;
    }

    public async triggerPowerOffSequence() {
        if (this.isControllerAnimatingIn) return;
        this.isControllerAnimatingIn = true;
        this.isConsolePowerOn = false;

        // Eject any seated cartridge / CD from the console bay back to the carousel rack
        if (typeof (this as any).ejectBayCartridge === 'function') {
            (this as any).ejectBayCartridge();
        }

        // Deactivate HUD Power button active glow state
        if (this.powerBtnEl) {
            this.powerBtnEl.classList.remove('active');
        }

        // Initialize 3D Camera Outro Flight (Smooth reverse sweep back to idle perspective)
        if (this.masterState.introEnabled && this.current3DCamera) {
            this.outroFromCamX = this.current3DCamera.position.x;
            this.outroFromCamY = this.current3DCamera.position.y;
            this.outroFromCamZ = this.current3DCamera.position.z;
            this.outroFromCamFov = this.current3DCamera.fov;
            this.outroFromLookAtY = this.masterState.introEndLookAtY ?? 0.3;
            this.outroFromLookAtZ = this.masterState.introEndLookAtZ ?? 0.2;
            this.outroStartTime = Date.now();
            this.isOutroPlaying = true;
        } else {
            this.hasIntroRun = false;
        }

        // 1. Controller Slide-UP Animation (slides UPWARDS back behind TV screen & fades out)
        if (this.controllerPadEl && (this.controllerPadEl.style.display !== 'none')) {
            const scale = (typeof this.controllerScale === 'number' && !isNaN(this.controllerScale)) ? this.controllerScale : 1.0;
            const targetScale = 0.975 * scale;

            const startTransform = 'perspective(800px) translateY(0px) scale(' + targetScale + ') rotateX(1.5deg)';
            const endUpTransform = 'perspective(800px) translateY(-160px) scale(' + targetScale + ') rotateX(-4deg)';

            const anim = this.controllerPadEl.animate([
                { transform: startTransform, opacity: 1 },
                { transform: endUpTransform, opacity: 0 }
            ], {
                duration: 500,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
            });

            anim.onfinish = () => {
                if (this.controllerPadEl) {
                    setCssStyles(this.controllerPadEl, { display: 'none' });
                    setCssStyles(this.controllerPadEl, { opacity: '0' });
                }
            };
        }

        if (this.cordSvgEl) {
            window.setTimeout(() => {
                if (this.cordSvgEl) setCssStyles(this.cordSvgEl, { display: 'none' });
            }, 300);
        }

        // 2. Trigger Reverse CRT Power-Off Screen Collapse Animation (Full screen -> Thin Line -> Dot -> 0 opacity)
        if (this.overlayCanvas) {
            this.overlayCanvas.classList.remove('tetris-crt-power-on');
            this.overlayCanvas.classList.remove('tetris-crt-power-off');
            void this.overlayCanvas.offsetWidth;
            this.overlayCanvas.classList.add('tetris-crt-power-off');
        }
        if (this.crtOverlayEl) {
            this.crtOverlayEl.classList.remove('tetris-crt-power-on');
            this.crtOverlayEl.classList.remove('tetris-crt-power-off');
            void this.crtOverlayEl.offsetWidth;
            this.crtOverlayEl.classList.add('tetris-crt-power-off');
        }

        // 3. After screen collapse animation finishes (900ms), hide screen elements & stop emulator!
        window.setTimeout(() => {
            if (this.overlayCanvas) {
                setCssStyles(this.overlayCanvas, { display: 'none' });
                this.overlayCanvas.classList.remove('tetris-crt-power-off');
            }
            if (this.crtOverlayEl) {
                setCssStyles(this.crtOverlayEl, { display: 'none' });
                this.crtOverlayEl.classList.remove('active');
                this.crtOverlayEl.classList.remove('tetris-crt-power-off');
            }
            if (this.controllerPadEl) {
                setCssStyles(this.controllerPadEl, { display: 'none' });
            }
            if (this.cordSvgEl) {
                setCssStyles(this.cordSvgEl, { display: 'none' });
            }
            this.isControllerVisible = false;
            this.isControllerAnimatingIn = false;
            this.stopEmulator();
            // System is now OFF — show START button
            this.ensureRetroStartButton();
        }, 900);
    }

    private updateControllerTransform() {
        if (!this.controllerPadEl) return;
        const scale = (typeof this.controllerScale === 'number' && !isNaN(this.controllerScale)) ? this.controllerScale : 1.0;
        const targetScale = 0.975 * scale;
        this.controllerPadEl.style.setProperty('--ctrl-target-scale', targetScale.toString());

        const ox = this.controllerOffset.x;
        const oy = this.controllerOffset.y;
        
        const minX = this.dummyNode ? this.dummyNode.x : this.cachedMinX;
        const minY = this.dummyNode ? this.dummyNode.y : this.cachedMinY;
        const w = this.dummyNode ? this.dummyNode.width : (this.SCREEN_WIDTH * this.PIXEL_SCALE);
        const h = this.dummyNode ? this.dummyNode.height : (this.SCREEN_HEIGHT * this.PIXEL_SCALE);
        const isPSX = this.plugin.settings.activeSystem === 'psx';
        const padW = isPSX ? 440 : 370;

        const defaultRightShift = 55;
        const baseLeft = (minX + (w - padW) / 2) + defaultRightShift;
        const baseTop = (minY + h + 140);

        setCssStyles(this.controllerPadEl, { left: (baseLeft + ox) + 'px' });
        setCssStyles(this.controllerPadEl, { top: (baseTop + oy) + 'px' });

        if (!this.isControllerAnimatingIn) {
            setCssStyles(this.controllerPadEl, { transform: 'perspective(800px) scale(' + targetScale + ') rotateX(1.5deg)' });
            setCssStyles(this.controllerPadEl, { opacity: '1' });
        }

        setCssStyles(this.controllerPadEl, { display: this.isControllerVisible ? 'block' : 'none' });

        this.updateCordPhysics();
    }

    private updateCordPhysics() {
        if (!this.cordSvgEl || !this.controllerPadEl) {
            if (this.cordSvgEl) setCssStyles(this.cordSvgEl, { display: 'none' });
            return;
        }
        if (!this.isControllerVisible && !this.isControllerAnimatingIn) {
            if (this.cordSvgEl) setCssStyles(this.cordSvgEl, { display: 'none' });
            return;
        }
        setCssStyles(this.cordSvgEl, { display: 'block' });

        const minX = this.dummyNode ? this.dummyNode.x : this.cachedMinX;
        const minY = this.dummyNode ? this.dummyNode.y : this.cachedMinY;
        const w = this.dummyNode ? this.dummyNode.width : (this.SCREEN_WIDTH * this.PIXEL_SCALE);
        const h = this.dummyNode ? this.dummyNode.height : (this.SCREEN_HEIGHT * this.PIXEL_SCALE);
        const isPSX = this.plugin.settings.activeSystem === 'psx';
        const padW = isPSX ? 440 : 370;

        const defaultRightShift = 55;
        const baseLeft = (minX + (w - padW) / 2) + defaultRightShift;
        const baseTop = (minY + h + 140);
        const padLeft = baseLeft + this.controllerOffset.x;
        const padTop = baseTop + this.controllerOffset.y;

        // P0: Bottom Center of NES screen / CRT frame
        const p0x = minX + w / 2;
        const p0y = minY + h;

        const effScale = 0.975 * this.controllerScale;
        const localX = isPSX ? 220 : 112; // Center for PS1, left for NES
        const localY = isPSX ? 173 : -6;

        const animOffsetY = 0;

        const p3x = (padLeft + padW / 2) + (localX - padW / 2) * effScale;
        const p3y = padTop + (localY * effScale) + animOffsetY;

        // Track velocity during drag/motion
        const vx = padLeft - (this.lastPadWorldX || padLeft);
        const vy = padTop - (this.lastPadWorldY || padTop);
        this.lastPadWorldX = padLeft;
        this.lastPadWorldY = padTop;

        // Apply velocity impulse to sway
        this.cordSwayX = this.cordSwayX * 0.82 - vx * 1.8;
        this.cordSwayY = this.cordSwayY * 0.82 - vy * 1.8;

        const dx = p3x - p0x;
        const dy = p3y - p0y;
        const dist = Math.hypot(dx, dy);

        // Sag distance increases with vertical/horizontal distance
        const sag = Math.max(50, dist * 0.45);

        // Control point 1 (exiting screen downward)
        const c1x = p0x + this.cordSwayX * 0.6;
        const c1y = p0y + sag + Math.max(0, this.cordSwayY * 0.5);

        // Control point 2 (entering pad top)
        const c2x = p3x + this.cordSwayX * 0.8;
        const c2y = p3y - (sag * 0.4) + this.cordSwayY;

        const dStr = 'M ' + p0x.toFixed(1) + ' ' + p0y.toFixed(1) + ' C ' + c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ', ' + c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ', ' + p3x.toFixed(1) + ' ' + p3y.toFixed(1);
        const dShadowStr = 'M ' + (p0x + 4).toFixed(1) + ' ' + (p0y + 8).toFixed(1) + ' C ' + (c1x + 4).toFixed(1) + ' ' + (c1y + 8).toFixed(1) + ', ' + (c2x + 4).toFixed(1) + ' ' + (c2y + 8).toFixed(1) + ', ' + (p3x + 4).toFixed(1) + ' ' + (p3y + 8).toFixed(1);

        if (this.cordShadowPath) this.cordShadowPath.setAttribute('d', dShadowStr);
        if (this.cordOuterPath) {
            this.cordOuterPath.setAttribute('d', dStr);
            this.cordOuterPath.setAttribute('stroke', isPSX ? '#454854' : '#14161f');
            this.cordOuterPath.setAttribute('stroke-width', '16');
        }
        if (this.cordInnerPath) {
            this.cordInnerPath.setAttribute('d', dStr);
            this.cordInnerPath.setAttribute('stroke', 'url(#cable-gloss-gradient)');
            this.cordInnerPath.setAttribute('stroke-width', '2.5');
            this.cordInnerPath.setAttribute('filter', 'url(#cable-shine-blur)');
        }

        const specGrad = this.cordSvgEl?.querySelector('#cable-gloss-gradient');
        if (specGrad) {
            specGrad.setAttribute('x1', p0x.toFixed(1));
            specGrad.setAttribute('y1', p0y.toFixed(1));
            specGrad.setAttribute('x2', p3x.toFixed(1));
            specGrad.setAttribute('y2', p3y.toFixed(1));
        }

        // Continue spring physics loop while cord is swaying or controller is animating in
        if ((this.isControllerAnimatingIn || Math.abs(this.cordSwayX) > 0.1 || Math.abs(this.cordSwayY) > 0.1 || Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) && !this.cordPhysicsRaf) {
            this.cordPhysicsRaf = window.requestAnimationFrame(() => {
                this.cordPhysicsRaf = 0;
                this.updateCordPhysics();
            });
        }
    }

    private animateControllerIn() {
        if (!this.controllerPadEl) return;
        this.isControllerAnimatingIn = true;
        const scale = (typeof this.controllerScale === 'number' && !isNaN(this.controllerScale)) ? this.controllerScale : 1.0;
        const targetScale = 0.975 * scale;
        const ox = this.controllerOffset.x;
        const oy = this.controllerOffset.y;
        
        const minX = this.dummyNode ? this.dummyNode.x : this.cachedMinX;
        const minY = this.dummyNode ? this.dummyNode.y : this.cachedMinY;
        const w = this.dummyNode ? this.dummyNode.width : (this.SCREEN_WIDTH * this.PIXEL_SCALE);
        const h = this.dummyNode ? this.dummyNode.height : (this.SCREEN_HEIGHT * this.PIXEL_SCALE);
        const isPSX = this.plugin.settings.activeSystem === 'psx';
        const padW = isPSX ? 440 : 370;

        const defaultRightShift = 55;
        const baseLeft = (minX + (w - padW) / 2) + defaultRightShift;
        const baseTop = (minY + h + 140);

        setCssStyles(this.controllerPadEl, { left: (baseLeft + ox) + 'px' });
        setCssStyles(this.controllerPadEl, { top: (baseTop + oy) + 'px' });
        setCssStyles(this.controllerPadEl, { display: 'block' });

        const p = `perspective(800px) translateY(-160px) scale(${targetScale}) rotateX(-4deg)`;
        const x = `perspective(800px) translateY(18px) scale(${targetScale * 1.03}) rotateX(4deg)`;
        const m = `perspective(800px) translateY(-4px) scale(${targetScale * 0.99}) rotateX(-1deg)`;
        const g = `perspective(800px) translateY(0px) scale(${targetScale}) rotateX(1.5deg)`;

        try {
            const anim = this.controllerPadEl.animate([
                { transform: p, opacity: 0 },
                { transform: p, opacity: 1, offset: 0.12 },
                { transform: x, opacity: 1, offset: 0.68 },
                { transform: m, opacity: 1, offset: 0.86 },
                { transform: g, opacity: 1, offset: 1.0 }
            ], {
                duration: 900,
                easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
                fill: 'forwards'
            });
            anim.onfinish = () => {
                this.isControllerAnimatingIn = false;
                if (this.controllerPadEl) {
                    setCssStyles(this.controllerPadEl, { opacity: '1' });
                    setCssStyles(this.controllerPadEl, { transform: g });
                }
                this.updateControllerTransform();
            };
        } catch (e) {
            this.isControllerAnimatingIn = false;
            if (this.controllerPadEl) {
                setCssStyles(this.controllerPadEl, { opacity: '1' });
                setCssStyles(this.controllerPadEl, { transform: g });
            }
            this.updateControllerTransform();
        }
    }

    private toggleControllerVisibility(visible?: boolean) {
        const target = visible !== undefined ? visible : !this.isControllerVisible;
        const wasVisible = !!(this.isControllerVisible && this.controllerPadEl && this.controllerPadEl.style.display !== 'none' && this.controllerPadEl.parentElement);
        this.isControllerVisible = target;

        if (this.canvasView) {
            const canvasContainer = this.canvasView.canvas?.contentEl || this.canvasView.containerEl.querySelector('.canvas-node-layer') || this.canvasView.containerEl.querySelector('.canvas-nodes') || this.canvasView.containerEl.querySelector('.canvas') || this.canvasView.containerEl;
            if (this.controllerPadEl && canvasContainer && !this.controllerPadEl.parentElement) {
                canvasContainer.appendChild(this.controllerPadEl);
            }
            if (this.cordSvgEl && canvasContainer && !this.cordSvgEl.parentElement) {
                canvasContainer.appendChild(this.cordSvgEl);
            }
        }

        if (target) {
            if (this.controllerPadEl) {
                setCssStyles(this.controllerPadEl, { display: 'block' });
            }
            if (this.cordSvgEl) {
                setCssStyles(this.cordSvgEl, { display: 'block' });
            }
            if (!wasVisible) {
                this.animateControllerIn();
            } else {
                this.updateControllerTransform();
            }
            this.updateCordPhysics();
        } else {
            if (this.controllerPadEl) {
                setCssStyles(this.controllerPadEl, { display: 'none' });
            }
            if (this.cordSvgEl) {
                setCssStyles(this.cordSvgEl, { display: 'none' });
            }
            this.isControllerAnimatingIn = false;
        }
    }

    // ── EMULATOR LOGIC ──

    private async startEmulator() {
        const isScreenAlreadyMounted = !!(this.overlayCanvas && this.overlayCanvas.style.display !== 'none');
        this.isConsolePowerOn = true;
        this.hasIntroRun = true;
        if (!this.nodesCreated) {
            await this.createGrid();
            this.nodesCreated = true;
        }
        if (this.overlayCanvas) {
            setCssStyles(this.overlayCanvas, { display: 'block' });
            if (!isScreenAlreadyMounted) {
                this.overlayCanvas.classList.remove('tetris-crt-power-on');
                void this.overlayCanvas.offsetWidth;
                this.overlayCanvas.classList.add('tetris-crt-power-on');
            }
        }
        if (this.crtOverlayEl && this.isCrtActive) {
            setCssStyles(this.crtOverlayEl, { display: 'block' });
            if (!isScreenAlreadyMounted) {
                this.crtOverlayEl.classList.remove('tetris-crt-power-on');
                void this.crtOverlayEl.offsetWidth;
                this.crtOverlayEl.classList.add('tetris-crt-power-on');
            }
        }
        this.updateOverlayCanvasSize();
        this.drawOverlay();
        if (!isScreenAlreadyMounted) {
            this.toggleControllerVisibility(true);
        }
        this.updateControllerTransform();
        if (this.powerBtnEl) this.powerBtnEl.classList.add('active');
        if (this.retroStartBtnEl) setCssStyles(this.retroStartBtnEl, { display: 'none' });

        const isPSX = (this.plugin.settings.activeSystem === 'psx');

        // If no cartridge/disc is loaded in the console bay:
        if (!this.selectedVaultRomPath && !this.customRomString) {
            if (isPSX) {
                this.sfxEngine.play('psx_open_button_plunge', 0.85);
            } else {
                this.sfxEngine.play('nes_power_switch_on', 0.85);
            }
            this.isRunning = false;
            this.drawOverlay();
            return;
        }

        if (isPSX) {
            this.sfxEngine.play('psx_laser_seek_spinup', 0.85);
        } else {
            this.sfxEngine.play('nes_power_switch_on', 0.85);
        }

        let romString = '';

        if (this.plugin.settings.activeSystem !== 'psx') {
            if (this.customRomString) {
                romString = this.customRomString;
            } else if (this.selectedVaultRomPath) {
                const bytes = this.loadRomBytesSync(this.selectedVaultRomPath);
                if (bytes) {
                    for (let i = 0; i < bytes.length; i++) {
                        romString += String.fromCharCode(bytes[i]);
                    }
                } else {
                    try {
                        const romData = await this.plugin.app.vault.adapter.readBinary(this.selectedVaultRomPath);
                        const b = new Uint8Array(romData);
                        for (let i = 0; i < b.length; i++) {
                            romString += String.fromCharCode(b[i]);
                        }
                    } catch (e) {
                        console.error("Failed to load vault ROM:", e);
                    }
                }
            }

            if (!romString) {
                this.updateStatus();
                this.stopEmulator();
                return;
            }
        }

        let audioSamplesL: number[] = [];
        let audioSamplesR: number[] = [];
        const bufferSize = 512;

        this.persistentBg = new Uint32Array(this.SCREEN_WIDTH * this.SCREEN_HEIGHT).fill(0);
        this.isRunning = true;
        if (this.startBtn) {
            this.startBtn.innerText = '■  STOP';
            this.startBtn.classList.add('running');
        }
        this.updateStatus();

        if (this.plugin.settings.activeSystem === 'psx') {
            if (!this.selectedVaultRomPath) {
                this.stopEmulator();
                return;
            }

            // Find BIOS if possible
            const basePath = (this.plugin.app.vault.adapter as any).basePath || '';
            const fallbackBios = path.isAbsolute(this.plugin.manifest.dir)
                ? path.join(this.plugin.manifest.dir, 'assets', 'psx', 'bios', 'SCPH1001.BIN')
                : path.join(basePath, this.plugin.manifest.dir, 'assets', 'psx', 'bios', 'SCPH1001.BIN');

            const biosPath = this.getAllAvailableRoms('psx').find(r => r.name.toLowerCase().includes('scph1001.bin'))?.path || fallbackBios;

            this.psxEngine = new PsxEngine(
                this.containerEl,
                this.selectedVaultRomPath,
                biosPath,
                (tex) => {
                    this.psxScreenTexture = tex;
                    if (this.psxScreenMaterial) {
                        this.psxScreenMaterial.map = tex;
                        this.psxScreenMaterial.needsUpdate = true;
                    }
                }
            );

            window.addEventListener('keydown', this.onKeyDown, { capture: true } as any);
            window.addEventListener('keyup', this.onKeyUp, { capture: true } as any);

            this.onWindowBlur = () => {
                if (document.hidden) {
                    // Only pause audio when the tab/window is truly hidden (actual app switch)
                    if (this.audioCtx && this.audioCtx.state === 'running') {
                        try { this.audioCtx.suspend(); } catch { /* ignore */ }
                    }
                    if (this.psxEngine) {
                        this.psxEngine.pause();
                    }
                }
            };
            this.onWindowFocus = () => {
                if (!document.hidden) {
                    if (this.isRunning && this.audioCtx && this.audioCtx.state === 'suspended') {
                        try { this.audioCtx.resume(); } catch { /* ignore */ }
                    }
                    if (this.psxEngine) {
                        this.psxEngine.resume();
                    }
                }
            };
            document.addEventListener('visibilitychange', this.onWindowBlur);
            document.addEventListener('visibilitychange', this.onWindowFocus);

            const loop = (now: number) => {
                if (!this.isRunning) return;
                this.rafId = window.requestAnimationFrame(loop);
                this.drawOverlay();
            };
            this.rafId = window.requestAnimationFrame(loop);
            
        } else {
            // NES
            this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            if (this.audioCtx.state === 'suspended') {
                try { await this.audioCtx.resume(); } catch { /* ignore */ }
            }
            
            this.nes = new NES({
                onFrame: this.onNesFrame.bind(this),
                onAudioSample: (l: number, r: number) => {
                    audioSamplesL.push(l);
                    audioSamplesR.push(r);
                    if (audioSamplesL.length >= bufferSize) {
                        if (this.scriptNode && this.scriptNode.port) {
                            this.scriptNode.port.postMessage({
                                l: audioSamplesL,
                                r: audioSamplesR
                            });
                        }
                        audioSamplesL = [];
                        audioSamplesR = [];
                    }
                },
                sampleRate: this.audioCtx.sampleRate
            });

            const workletCode = `
                const RING_SIZE = 16384;
                const MASK = RING_SIZE - 1;
                class NesWorklet extends AudioWorkletProcessor {
                    constructor() {
                        super();
                        this.bufL = new Float32Array(RING_SIZE);
                        this.bufR = new Float32Array(RING_SIZE);
                        this.writeIdx = 0;
                        this.readIdx = 0;
                        this.isBuffering = true;
                        this.port.onmessage = (e) => {
                            if (e.data && e.data.l) {
                                const l = e.data.l;
                                const r = e.data.r;
                                const len = l.length;
                                for (let k = 0; k < len; k++) {
                                    this.bufL[this.writeIdx] = l[k];
                                    this.bufR[this.writeIdx] = r[k];
                                    this.writeIdx = (this.writeIdx + 1) & MASK;
                                }
                            }
                        };
                    }
                    process(inputs, outputs, parameters) {
                        const output = outputs && outputs[0];
                        if (!output || output.length === 0) return true;
                        const left = output[0];
                        const right = output[1];
                        const len = left.length;

                        const count = (this.writeIdx - this.readIdx + RING_SIZE) & MASK;
                        if (this.isBuffering) {
                            if (count >= 1024) {
                                this.isBuffering = false;
                            } else {
                                left.fill(0);
                                if (right) right.fill(0);
                                return true;
                            }
                        }

                        for (let i = 0; i < len; i++) {
                            if (this.readIdx !== this.writeIdx) {
                                left[i] = this.bufL[this.readIdx];
                                if (right) right[i] = this.bufR[this.readIdx];
                                this.readIdx = (this.readIdx + 1) & MASK;
                            } else {
                                left[i] = 0;
                                if (right) right[i] = 0;
                                this.isBuffering = true;
                                break;
                            }
                        }
                        return true;
                    }
                }
                registerProcessor('nes-worklet', NesWorklet);
            `;
            const blob = new Blob([workletCode], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            
            await this.audioCtx.audioWorklet.addModule(url);
            URL.revokeObjectURL(url);

            this.scriptNode = new AudioWorkletNode(this.audioCtx, 'nes-worklet', {
                numberOfInputs: 0,
                numberOfOutputs: 1,
                outputChannelCount: [2]
            });
            this.scriptNode.connect(this.audioCtx.destination);
            if (this.audioCtx.state === 'suspended') {
                try { await this.audioCtx.resume(); } catch { /* ignore */ }
            }

            this.nes.loadROM(romString);
            this.applyNesPalette(this.nes);
            
            window.addEventListener('keydown', this.onKeyDown, { capture: true } as any);
            window.addEventListener('keyup', this.onKeyUp, { capture: true } as any);

            let lastFrameTime = performance.now();
            const frameInterval = 1000 / 60.0988;

            const loop = (now: number) => {
                if (!this.isRunning) return;
                this.rafId = window.requestAnimationFrame(loop);

                const elapsed = now - lastFrameTime;
                if (elapsed >= frameInterval) {
                    if (elapsed > frameInterval * 2) {
                        lastFrameTime = now - frameInterval;
                    } else {
                        lastFrameTime += frameInterval;
                    }
                    this.nes.frame();
                }
                
                // Check if the dummy node has been moved natively by Obsidian (fallback check)
                if (this.dummyNode && !this.isUpdatingDummy) {
                    const dx = this.dummyNode.x - this.dummyNodeLastX;
                    const dy = this.dummyNode.y - this.dummyNodeLastY;
                    if (dx !== 0 || dy !== 0) {
                        this.isUpdatingDummy = true;
                        const len = this.fakePixels.length;
                        for (let i = 0; i < len; i++) {
                            const p = this.fakePixels[i];
                            if (p && p.selected) {
                                p.x += dx;
                                p.y += dy;
                            }
                        }
                        this.dummyNodeLastX = this.dummyNode.x;
                        this.dummyNodeLastY = this.dummyNode.y;
                        this.isUpdatingDummy = false;
                        this.updateOverlayCanvasSize();
                        this.drawOverlay();
                    }
                }

                const canvas = this.canvasView.canvas;
                if (canvas) {
                    const currentTransform = canvas.tx + ',' + canvas.ty + ',' + canvas.zoom;
                    if (currentTransform !== this.lastTransform) {
                        this.lastTransform = currentTransform;
                        this.updateOverlayCanvasSize();
                        // During active PS1 play the RAF loop already blits every frame — skip the double call
                        if (!(this.isRunning && this.plugin.settings.activeSystem === 'psx')) {
                            this.drawOverlay();
                        }
                    }
                }
            };
            this.rafId = window.requestAnimationFrame(loop);
        }
    }

    private stopEmulator() {
        this.isRunning = false;
        
        if (this.startBtn) {
            this.startBtn.innerText = '▶  START';
            this.startBtn.classList.remove('running');
        }
        this.updateStatus();

        if (this.pixelColors && this.pixelColors.length > 0) {
            this.pixelColors.fill('#000000');
            this.drawOverlay();
        }
        
        window.removeEventListener('keydown', this.onKeyDown, { capture: true } as any);
        window.removeEventListener('keyup', this.onKeyUp, { capture: true } as any);
        if (this.onWindowBlur) {
            document.removeEventListener('visibilitychange', this.onWindowBlur);
            this.onWindowBlur = null;
        }
        if (this.onWindowFocus) {
            document.removeEventListener('visibilitychange', this.onWindowFocus);
            this.onWindowFocus = null;
        }
        
        if (this.rafId) {
            window.cancelAnimationFrame(this.rafId);
        }

        if (this.psxEngine) {
            this.psxEngine.destroy();
            this.psxEngine = null;
        }
        
        if (this.audioCtx) {
            this.audioCtx.close();
            this.audioCtx = null;
        }
        if (this.scriptNode) {
            this.scriptNode.disconnect();
        }
    }

    private applyNesPalette(nes: any) {
        if (!nes || !nes.ppu || !nes.ppu.palTable) return;
        try {
            const palTable = nes.ppu.palTable;
            const FBX_SMOOTH_PALETTE = [
                0x666666, 0x002A88, 0x1412A7, 0x3B00A4, 0x5C007E, 0x6E0040, 0x6C0600, 0x561D00,
                0x333500, 0x0B4800, 0x005200, 0x004F08, 0x00404D, 0x000000, 0x000000, 0x000000,
                0xADADAD, 0x155FD9, 0x4240FF, 0x7527FE, 0xA01ACC, 0xB71E7B, 0xB53120, 0x994E00,
                0x6B6D00, 0x388700, 0x0C9300, 0x008F32, 0x007C8D, 0x000000, 0x000000, 0x000000,
                0xFFFEFF, 0x64B0FF, 0x9290FF, 0xC676FF, 0xF36AFF, 0xFE6ECC, 0xFE8170, 0xEA9E22,
                0xBCBE00, 0x88D800, 0x5CE430, 0x45E082, 0x48CDDE, 0x4F4F4F, 0x000000, 0x000000,
                0xFFFEFF, 0xC0E0FF, 0xD3D2FF, 0xE8C8FF, 0xFBC2FF, 0xFEC4EA, 0xFECCC5, 0xF7D8A5,
                0xE4E594, 0xCFEF96, 0xBDF4AB, 0xB3F3CC, 0xB5EBF2, 0xB8B8B8, 0x000000, 0x000000
            ];
            for (let i = 0; i < 64; i++) {
                palTable.curTable[i] = FBX_SMOOTH_PALETTE[i];
            }
            palTable.makeTables();
            palTable.setEmphasis(0);
            if (typeof nes.ppu.updatePalettes === 'function') {
                nes.ppu.updatePalettes();
            }
        } catch (err) {
            console.warn("Could not apply custom NES palette:", err);
        }
    }

    private onNesAudioSample(l: number, r: number) {
        // Overwritten in startEmulator
    }

    private onNesFrame(frameBuffer: number[]) {
        if (!this.previewCtx) return;

        if (!this.previewImageData) {
            this.previewImageData = this.previewCtx.createImageData(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
            this.previewBuf32 = new Uint32Array(this.previewImageData.data.buffer);
        }
        
        const fullBuf = this.previewBuf32!;
        const totalPixels = this.SCREEN_WIDTH * this.SCREEN_HEIGHT;

        for (let idx = 0; idx < totalPixels; idx++) {
            const color32 = frameBuffer[idx];
            const r = (color32 >>> 16) & 0xFF;
            const g = (color32 >>> 8)  & 0xFF;
            const b =  color32         & 0xFF;
            fullBuf[idx] = 0xFF000000 | (b << 16) | (g << 8) | r;
        }
        this.previewCtx.putImageData(this.previewImageData, 0, 0);

        this.drawOverlay();

        this.frameCount++;
        const now = performance.now();
        if (now - this.lastFpsTime >= 1000) {
            const fps = Math.round(this.frameCount * 1000 / (now - this.lastFpsTime));
            this.frameCount = 0;
            this.lastFpsTime = now;
            if (this.fpsDisplay) {
                this.fpsDisplay.innerText = fps + ' FPS';
                this.fpsDisplay.className = 'doom-fps-display' + (fps < 30 ? ' fps-bad' : fps < 50 ? ' fps-warn' : '');
            }
        }
    }

    private parseRgb(rgb: string): number[] {
        if (!rgb || rgb === '#000000') return [0, 0, 0];
        const m = rgb.match(/rgb\((\d+),(\d+),(\d+)\)/);
        if (m) {
            return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
        }
        return [0,0,0];
    }

    private sendGameInput(btn: number, isDown: boolean) {
        if (this.plugin.settings.activeSystem === 'psx' && this.psxEngine) {
            this.psxEngine.sendInput(btn, isDown);
        } else if (this.plugin.settings.activeSystem === 'nes' && this.nes) {
            if (isDown) this.nes.buttonDown(1, btn);
            else this.nes.buttonUp(1, btn);
        }
    }

    private keyMap: Record<string, number> = {
        'a': 6, 'arrowleft': 6,
        'd': 7, 'arrowright': 7,
        's': 5, 'arrowdown': 5,
        'w': 4, 'arrowup': 4,
        'k': 0, // Cross
        'j': 1, // Square
        'l': 8, // Circle
        'i': 9, // Triangle
        'u': 10, 'q': 10, // L1 (U / Q)
        'e': 11,          // L2 (E)
        'y': 12, 'r': 12, // R1 (Y / R)
        'o': 13,          // R2 (O)
        'b': 3, 'v': 3, 'enter': 3, // Start (B / V / Enter)
        'c': 2, 'shift': 2,        // Select (C / Shift)
    };

    private updateControllerUi(key: string, active: boolean) {
        let selector = '';
        if (this.plugin.settings.activeSystem === 'nes') {
            if (key === 'a' || key === 'arrowleft') selector = '.dpad-left';
            else if (key === 'd' || key === 'arrowright') selector = '.dpad-right';
            else if (key === 's' || key === 'arrowdown') selector = '.dpad-down';
            else if (key === 'w' || key === 'arrowup') selector = '.dpad-up';
            else if (key === 'k') selector = '.nes-btn-a';
            else if (key === 'j') selector = '.nes-btn-b';
            else if (key === 'b' || key === 'v' || key === 'enter') selector = '.nes-start';
            else if (key === 'c' || key === 'shift') selector = '.nes-select';
        } else {
            if (key === 'a' || key === 'arrowleft') selector = '.psx-dpad-left';
            else if (key === 'd' || key === 'arrowright') selector = '.psx-dpad-right';
            else if (key === 's' || key === 'arrowdown') selector = '.psx-dpad-down';
            else if (key === 'w' || key === 'arrowup') selector = '.psx-dpad-up';
            else if (key === 'k') selector = '.psx-btn-cross';
            else if (key === 'j') selector = '.psx-btn-square';
            else if (key === 'l') selector = '.psx-btn-circle';
            else if (key === 'i') selector = '.psx-btn-triangle';
            else if (key === 'u' || key === 'q') selector = '.psx-l1';
            else if (key === 'e') selector = '.psx-l2';
            else if (key === 'y' || key === 'r') selector = '.psx-r1';
            else if (key === 'o') selector = '.psx-r2';
            else if (key === 'b' || key === 'v' || key === 'enter') selector = '.psx-start';
            else if (key === 'c' || key === 'shift') selector = '.psx-select';
        }

        if (selector) {
            if (this.controllerPadEl) {
                const btnEl = this.controllerPadEl.querySelector(selector);
                if (btnEl) btnEl.classList.toggle('active', active);
            }
            if (this.containerEl) {
                const btnEl = this.containerEl.querySelector(selector);
                if (btnEl) btnEl.classList.toggle('active', active);
            }
        }
    }

    private onKeyDown = (e: KeyboardEvent) => {
        if (!e.isTrusted) return; // Prevent intercepting our own synthetic events!
        const key = e.key.toLowerCase();
        if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'enter', 'shift', 'j', 'k', 'i', 'l', 'c', 'v', 'b'].includes(key)) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (this.keyMap[key] !== undefined) {
            this.sendGameInput(this.keyMap[key], true);
            this.updateControllerUi(key, true);
        }
    };

    private onKeyUp = (e: KeyboardEvent) => {
        if (!e.isTrusted) return; // Prevent intercepting our own synthetic events!
        const key = e.key.toLowerCase();
        if (this.keyMap[key] !== undefined) {
            e.preventDefault();
            e.stopPropagation();
            this.sendGameInput(this.keyMap[key], false);
            this.updateControllerUi(key, false);
        }
    };

    public destroy() {
        this.stopEmulator();
        
        if (this.animationFrameId !== null) {
            window.cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        if (this.activeComposer !== null) {
            try {
                if (this.activeComposer.renderTarget1) this.activeComposer.renderTarget1.dispose();
                if (this.activeComposer.renderTarget2) this.activeComposer.renderTarget2.dispose();
                if (Array.isArray(this.activeComposer.passes)) {
                    this.activeComposer.passes.forEach((pass: any) => {
                        if (pass.dispose && typeof pass.dispose === 'function') pass.dispose();
                    });
                }
            } catch (e) {
                console.error("Error disposing active composer:", e);
            }
            this.activeComposer = null;
        }

        if (this.activeScene !== null) {
            try {
                this.disposeThreeHierarchy(this.activeScene);
                this.activeScene.clear();
            } catch (e) {
                console.error("Error disposing 3D scene", e);
            }
            this.activeScene = null;
        }

        if (this.activeRenderer !== null) {
            try {
                this.activeRenderer.dispose();
                this.activeRenderer.forceContextLoss();
            } catch (e) {
                console.error("Error disposing active renderer:", e);
            }
            this.activeRenderer = null;
        }

        this.current3DCamera = null;

        this.clearGrid();
        if (this.curtainOverlayEl) {
            this.curtainOverlayEl.remove();
            this.curtainOverlayEl = null;
        }
        if (this.overlayCanvas) this.overlayCanvas.remove();
        if (this.crtOverlayEl) this.crtOverlayEl.remove();
        if (this.controllerPadEl) this.controllerPadEl.remove();
        if (this.dummyNode && this.dummyNode.nodeEl) this.dummyNode.nodeEl.remove();
        if (this.containerEl) this.containerEl.remove();
    }

    private triggerSystemSwitch(target: 'nes' | 'psx') {
        if (this.plugin.settings.activeSystem === target || this.isCurtainTransitioning) return;
        this.isCurtainTransitioning = true;

        // Step 1: Immediately power off the current system (screen + controller exit animations)
        if (this.isConsolePowerOn || this.isControllerVisible || this.isRunning) {
            this.stopEmulator();
        }

        // Forcefully hide screen and controller instantly (flag covers them during transition)
        if (this.overlayCanvas) setCssStyles(this.overlayCanvas, { display: 'none' });
        if (this.crtOverlayEl) setCssStyles(this.crtOverlayEl, { display: 'none' });
        if (this.controllerPadEl) setCssStyles(this.controllerPadEl, { display: 'none' });
        if (this.cordSvgEl) setCssStyles(this.cordSvgEl, { display: 'none' });
        this.isControllerVisible = false;
        this.isConsolePowerOn = false;
        this.hasIntroRun = false;
        if (this.powerBtnEl) this.powerBtnEl.classList.remove('active');

        this.selectedVaultRomPath = null;
        this.customRomString = null;
        if (this.romSelectEl) this.romSelectEl.value = '';
        this.updateStatus();

        // If curtain was pinned for preview, unpin it for the actual transition
        if ((this.masterState as any).curtainPinned) {
            (this.masterState as any).curtainPinned = false;
        }

        // Play high-end transition audio cue consistently on every system switch
        this.sfxEngine.play('psx_disc_flight_whoosh', 0.85);

        // 🎭 Play CTR-style wavy checkered flag sweep across the 3D viewport
        this.playCurtainSweepIn(target, async () => {
            try {
                // Viewport is now 100% occluded by the wavy checkered flag curtain.
                this.plugin.settings.activeSystem = target;
                this.plugin.saveSettings();

                // Give the browser event loop a breather so the 3D flag keeps waving at 60 FPS
                await new Promise(r => window.setTimeout(r, 20));

                // Safely swap system settings and rebuild 3D assets/models with zero visible lag:
                await this.performInPlace3DSystemSwap();

                // Settle GPU texture uploads, pre-compile shaders, and render clean frames while still occluded
                if (this.activeRenderer && this.activeScene && this.current3DCamera) {
                    try {
                        this.activeRenderer.compile(this.activeScene, this.current3DCamera);
                        if (this.activeComposer && this.masterState.bloomEnabled) {
                            this.activeComposer.render();
                        } else {
                            this.activeRenderer.render(this.activeScene, this.current3DCamera);
                        }
                    } catch { /* ignore */ }
                }

                // User-controlled flag linger / occlusion delay to ensure target scene has fully settled
                const lingerDelay = Math.max(150, (this.masterState as any).curtainLingerMs ?? 200);
                await new Promise(r => window.setTimeout(r, lingerDelay));
            } catch (e) {
                console.error("Error during system transition:", e);
            } finally {
                // Sweep the checkered flag away to the right, revealing the pristine 60 FPS scene with 0 pop-in
                this.playCurtainSweepOut(() => {
                    this.isCurtainTransitioning = false;
                    // Arrive in OFF state on new system — show START button
                    this.ensureRetroStartButton();
                });
            }
        });
    }

    private async performInPlace3DSystemSwap(): Promise<void> {
        const targetSys = this.plugin.settings.activeSystem;

        if (targetSys === 'psx') {
            this.NES_WIDTH = 320;
            this.NES_HEIGHT = 240;
            this.SCREEN_WIDTH = 320;
            this.SCREEN_HEIGHT = 240;
        } else {
            this.NES_WIDTH = 256;
            this.NES_HEIGHT = 240;
            this.SCREEN_WIDTH = 256;
            this.SCREEN_HEIGHT = 240;
        }
        
        // Update UI switcher buttons
        if (this.nesBtnRef) this.nesBtnRef.className = 'system-logo-btn nes-logo-btn' + (targetSys === 'nes' ? ' active' : '');
        if (this.psxBtnRef) this.psxBtnRef.className = 'system-logo-btn psx-logo-btn' + (targetSys === 'psx' ? ' active' : '');

        // 🧹 Cleanly dispose and rebuild Console 3D Model in-place (ZERO LEAKS)
        if (this.activeConsoleGroupRef) {
            const cg = this.activeConsoleGroupRef;
            while (cg.children.length > 0) {
                const child = cg.children[0];
                this.disposeThreeHierarchy(child);
                cg.remove(child);
            }

            const manifestDir = getPluginDir(this.plugin);
            if (manifestDir) {
                const basePath = (this.plugin.app.vault.adapter as any).basePath || '';
                const subFolder = targetSys === 'nes' ? 'nes' : 'psx';
                const fileName = targetSys === 'nes' ? 'NES_nintendo.glb' : 'Sony_Playstation_one_slim.glb';
                const gltfPath = path.isAbsolute(manifestDir)
                    ? path.join(manifestDir, 'assets', subFolder, fileName)
                    : path.join(basePath, manifestDir, 'assets', subFolder, fileName);
                
                const applyConsoleModel = (sourceModel: THREE.Group) => {
                    const model = sourceModel.clone(true);
                    model.traverse((node: any) => {
                        if (node.name === 'Sketchfab_model') {
                            node.position.set(0, 0, 0);
                            node.rotation.set(0, 0, 0);
                        }
                        if (node.isMesh) {
                            node.castShadow = true;
                            node.receiveShadow = true;
                        }
                    });
                    if (targetSys === 'nes') {
                        this.ps1ModelGroup = null;
                        this.ps1LedMeshRef = null;
                        this.ps1LedPointLightRef = null;
                        model.rotation.x = -Math.PI / 2;
                        model.scale.set(2.8, 2.8, 2.8);
                        model.position.set(0, 1.05, -0.3);
                    } else {
                        this.ps1ModelGroup = model;
                        const scaleFactor = typeof this.masterState.ps1Scale === 'number' ? this.masterState.ps1Scale : 0.2;
                        model.scale.set(scaleFactor, scaleFactor, scaleFactor);
                        model.rotation.set(
                            typeof this.masterState.ps1RotX === 'number' ? this.masterState.ps1RotX : 1.66,
                            typeof this.masterState.ps1RotY === 'number' ? this.masterState.ps1RotY : -3.14,
                            typeof this.masterState.ps1RotZ === 'number' ? this.masterState.ps1RotZ : -3.14
                        );
                        model.position.set(
                            typeof this.masterState.ps1PosX === 'number' ? this.masterState.ps1PosX : 0,
                            typeof this.masterState.ps1PosY === 'number' ? this.masterState.ps1PosY : 1.45,
                            typeof this.masterState.ps1PosZ === 'number' ? this.masterState.ps1PosZ : -0.3
                        );

                        // Power LED Indicator Bulb for PS1 Console (Front-Left Power Button Area)
                        const isLocked = !!this.selectedVaultRomPath;
                        const ps1LedGeo = new THREE.SphereGeometry(0.045, 16, 16);
                        const ps1LedMat = new THREE.MeshBasicMaterial({ color: isLocked ? 0x00ff66 : 0x113311 });
                        const ps1LedMesh = new THREE.Mesh(ps1LedGeo, ps1LedMat);
                        ps1LedMesh.position.set(this.masterState.ps1LedX ?? -1.43, this.masterState.ps1LedY ?? 1.905, this.masterState.ps1LedZ ?? 1.12);
                        cg.add(ps1LedMesh);
                        this.ps1LedMeshRef = ps1LedMesh;

                        const ps1LedPointLight = new THREE.PointLight(0x00ff66, isLocked ? 1.25 : 0.0, 2.0);
                        ps1LedPointLight.position.set(this.masterState.ps1LedX ?? -1.43, (this.masterState.ps1LedY ?? 1.905) + 0.07, this.masterState.ps1LedZ ?? 1.12);
                        cg.add(ps1LedPointLight);
                        this.ps1LedPointLightRef = ps1LedPointLight;
                    }
                    cg.add(model);
                };

                if (this.parsedModelCache.has(gltfPath)) {
                    applyConsoleModel(this.parsedModelCache.get(gltfPath)!);
                } else {
                    let arrayBuffer = this.glbBufferCache.get(gltfPath);
                    if (!arrayBuffer) {
                        try {
                            const glbBuffer = await fs.promises.readFile(gltfPath);
                            arrayBuffer = glbBuffer.buffer.slice(glbBuffer.byteOffset, glbBuffer.byteOffset + glbBuffer.byteLength);
                            this.glbBufferCache.set(gltfPath, arrayBuffer);
                        } catch (e) {
                            console.error("Failed to read GLTF file:", e);
                        }
                    }

                    if (arrayBuffer) {
                        await new Promise<void>((resolve) => {
                            const loader = new GLTFLoader();
                            loader.parse(arrayBuffer!, '', (gltf) => {
                                this.parsedModelCache.set(gltfPath, gltf.scene);
                                applyConsoleModel(gltf.scene);
                                resolve();
                            }, (err) => {
                                console.error("Failed to parse GLTF:", err);
                                resolve();
                            });
                        });
                    }
                }
            }
        }

        await new Promise(r => window.setTimeout(r, 0));

        // 🧹 Cleanly dispose and rebuild Cartridges / Jewel Cases in-place (ZERO LEAKS)
        if (this.activeSceneRef && this.activeEntriesRef) {
            const scene = this.activeSceneRef;
            const entries = this.activeEntriesRef;
            
            // Explicitly dispose all previous geometries, textures, materials before removal
            entries.forEach(e => {
                this.disposeThreeHierarchy(e.mesh);
                scene.remove(e.mesh);
            });
            entries.length = 0;

            const allRoms = this.getAllAvailableRoms(targetSys);
            const REST_ROT_X = 0.38;

            allRoms.forEach((rom, i) => {
                const isSelected = (this.selectedVaultRomPath === rom.path);
                const coverUrl = this.findCoverImageForRom(rom.path, targetSys);
                let mesh: THREE.Group;
                if (targetSys === 'psx') {
                    mesh = createPsxJewelCase3DMesh(rom.name, coverUrl);
                } else {
                    mesh = createNesCartridge3DMesh(rom.name, coverUrl, this.plugin);
                }

                let state = isSelected ? 'BAY' : 'DECK';
                const CY = typeof this.masterState.rolodexCY === 'number' ? this.masterState.rolodexCY : -3.2;
                const CZ = typeof this.masterState.rolodexCZ === 'number' ? this.masterState.rolodexCZ : 2.5;
                const R = typeof this.masterState.rolodexR === 'number' ? this.masterState.rolodexR : 1.7;
                const angStep = typeof this.masterState.rolodexAngle === 'number' ? this.masterState.rolodexAngle : 0.38;
                const angle = i * angStep;
                mesh.position.set(0, CY + R * Math.cos(angle), CZ - R * Math.sin(angle));
                mesh.rotation.set(REST_ROT_X - angle, 0, 0);

                scene.add(mesh);
                entries.push({
                    mesh, rom, idx: i, state, animT: 1.0,
                    startPos: mesh.position.clone(), startRotX: REST_ROT_X
                });
            });
        }

        this.refreshRomSelectOptions();

        // Rebuild active gamepad controller overlay and cord for target system immediately
        if (this.nodesCreated) {
            this.currentControllerSystem = null; // Force rebuild of controller pad
            this.createGrid();
            if (this.isControllerVisible) {
                this.isControllerAnimatingIn = true;
                window.setTimeout(() => { this.isControllerAnimatingIn = false; }, 1500);
                this.updateCordPhysics();
            }
        }

        // If emulator is running, seamlessly restart running session for target system
        if (this.isRunning) {
            this.stopEmulator();
            this.startEmulator();
        }
    }
}
