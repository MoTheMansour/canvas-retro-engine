# Canvas Retro Engine 🕹️

Play 8-bit NES and 32-bit PlayStation 1 games directly on the Obsidian Canvas with interactive 3D console hardware, tactile mechanical controls, vintage CRT TV shaders, and draggable gamepads.

---

## ✨ Features

- **🎮 Dual Console System**: Seamlessly switch between the **Nintendo Entertainment System (NES)** and **Sony PlayStation 1 (PS1)**.
- **✨ 3D Hardware Canvas**: Fully interactive 3D console and cartridge models powered by Three.js with realistic lighting, mechanical click sound effects, and cartridge insertion physics.
- **📺 CRT TV Simulation**: Authentic CRT scanlines, RGB phosphor triad mask, curvature distortion, and switchable **Modern Flat CRT** or **Vintage 1980s Bubble CRT** (curvilinear quadrangle squircle) screen shapes.
- **🔊 Realistic Audio**: 35 mechanical switch, button plunge, disc spinup, lid hinge, and insertion sound effects.
- **🕹️ Tactile On-Screen Gamepad**: Draggable, resizable retro controller overlays with cable physics and customizable button mapping.
- **💾 Save States**: Save and resume your gameplay progress directly inside your vault.

---

## 🚀 Installation

1. Copy the `canvas-retro-engine` folder into your Obsidian vault's plugin directory:
   `<Vault>/.obsidian/plugins/canvas-retro-engine/`
2. Run `npm install` and `npm run build` (or use the pre-built `main.js`).
3. Enable **Canvas Retro Engine** in Obsidian **Settings -> Community Plugins**.

---

## 📂 Adding Games & BIOS

Place your files in the respective folders inside the plugin's `assets/` directory:

- **NES ROMs**: `assets/nes/roms/` (`.nes` files)
- **PS1 Games**: `assets/psx/roms/` (`.iso`, `.bin`, `.cue`, `.chd` files)
- **PS1 BIOS**: `assets/psx/bios/SCPH1001.BIN`
- **Box Art Covers**: `assets/nes/covers/` and `assets/psx/covers/` (`.png` / `.jpg`)

---

## 📜 License

MIT License. Open source and free for the community.
