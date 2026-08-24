# Canvas Retro Engine 🕹️

Play 8-bit NES and 32-bit PlayStation 1 games directly on the Obsidian Canvas with interactive 3D console hardware, tactile mechanical controls, vintage CRT TV shaders, and draggable gamepads.

---

## ✨ Features

- **🎮 Dual Console System**: Seamlessly switch between the **Nintendo Entertainment System (NES)** and **Sony PlayStation 1 (PS1)**.
- **✨ 3D Hardware Canvas**: Fully interactive 3D console, cartridge, and CD jewel case models powered by Three.js with realistic lighting, mechanical click sound effects, biomechanical handling kinematics, and physical tray/cartridge insertion.
- **📺 CRT TV Simulation**: Authentic CRT scanlines, RGB phosphor triad mask, curvature distortion, and switchable **Modern Flat CRT** or **Vintage 1980s Bubble CRT** (curvilinear quadrangle squircle) screen shapes.
- **🔊 Realistic Mechanical Audio**: 35 authentic mechanical switch, button plunge, disc spinup, lid hinge, and cartridge insertion sound effects.
- **🕹️ Tactile On-Screen Gamepad**: Draggable, resizable retro controller overlays with cable physics and customizable button mapping.
- **💾 Save States**: Save and resume your gameplay progress directly inside your vault.

---

## 🚀 Quick Start & Installation

1. Copy the `canvas-retro-engine` folder into your Obsidian vault's plugin directory:
   `<Vault>/.obsidian/plugins/canvas-retro-engine/`
2. Run `npm install` and `npm run build` (or use the pre-built `main.js`).
3. Enable **Canvas Retro Engine** in Obsidian **Settings → Community Plugins**.
4. Open any Canvas note and enjoy your 3D retro console right on the canvas.

---

## 📂 Adding Games, Covers & BIOS

Place your files in the respective folders inside the plugin's `assets/` directory:

- **NES ROMs**: `assets/nes/roms/` (`.nes` files)
- **PS1 Games**: `assets/psx/roms/` (`.iso`, `.bin`, `.cue`, `.chd`, `.pbp` files)
- **PS1 BIOS**: `assets/psx/bios/SCPH1001.BIN`
- **Box Art Covers**: `assets/nes/covers/` and `assets/psx/covers/` (`.png` / `.jpg` / `.webp`)

---

## 💎 Also Check Out: Crystal Canvas

If you enjoy interactive 3D hardware and spatial experiences on the Obsidian Canvas, check out **[Crystal Canvas](https://www.momansour.com/crystal-canvas)** — the ultimate visual workspace and 3D spatial organization engine for Obsidian.

[![Crystal Canvas](https://img.shields.io/badge/Crystal%20Canvas-Learn%20More%20%E2%86%92-6366f1?style=for-the-badge&logo=obsidian)](https://www.momansour.com/crystal-canvas)
[![Documentation](https://img.shields.io/badge/Documentation-Guides%20%26%20Docs-059669?style=for-the-badge&logo=googledocs)](https://www.momansour.com/docs)

### ✨ What is Crystal Canvas?
Crystal Canvas elevates Obsidian Canvas into a high-performance, hardware-accelerated visual workspace designed for researchers, worldbuilders, and visual thinkers:

- 🚀 **High-Performance GPU Architecture**: Hardware-accelerated rendering delivering buttery-smooth 144+ FPS fluid canvas navigation even with massive workspaces.
- 🎨 **3D Asset Gallery & Atmospheric Shaders**: Bring your canvas to life with interactive 3D visual assets, procedural WebGL background environments, and modern styling.
- 🗺️ **Interactive Mini-Map & Viewport HUD**: Real-time spatial radar, cluster tracking, and instant canvas overview navigation.
- 🔄 **100% JSON Canvas 1.0 Spec Compatible**: Seamlessly reads and writes standard `.canvas` files with zero lock-in.

👉 **[Discover Crystal Canvas at momansour.com →](https://www.momansour.com/crystal-canvas)** | 📖 **[Read the Documentation →](https://www.momansour.com/docs)**

---

## 📜 License

MIT License. Open source and free for the Obsidian community.
