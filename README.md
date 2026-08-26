# Canvas Retro Engine 🕹️

[![Release](https://img.shields.io/badge/Release-v1.2.0-blue.svg?style=for-the-badge)](https://github.com/Momansour97/canvas-retro-engine)
[![Obsidian](https://img.shields.io/badge/Obsidian-v1.0.0+-7C3AED?style=for-the-badge&logo=obsidian)](https://obsidian.md)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

Play 8-bit NES and 32-bit PlayStation 1 games directly on the Obsidian Canvas with interactive 3D console hardware, tactile mechanical controls, vintage CRT TV shaders, physical gamepad support, and live interactive controller overlays.

---

## ✨ What's New in v1.2.0

- ⚡ **Supercharged Emulation Performance**: Main-thread rendering isolation during gameplay eliminates CPU bottlenecks, frame stutter, and audio crackling for both NES and 32-bit PS1 games.
- 🌐 **Starter Hub & Preservation Sets**: Integrated 1-click modal connecting directly to LaunchBox GamesDB (high-res 3D covers and spine art), No-Intro NES sets, Redump PS1 archives, and official Redump PS1 BIOS repositories.
- 🎮 **Universal Physical Gamepad Support**: Plug-and-play support for any USB or Bluetooth gamepad (PlayStation DualShock/DualSense, Xbox controllers, DirectInput USB adapters, generic PC controllers) with 60 FPS polling.
- 🕹️ **Live Tactile Button Feedback**: The on-screen controller overlay reacts in real time with physical indentation feedback to keyboard typing, mouse clicks, and gamepad presses **even before any game is inserted**.
- 💾 **Permanent Save States**: Robust disk persistence engine storing binary PS1 states and NES memory states directly in your vault, persisting permanently across app restarts.
- 🎛️ **Streamlined Action Bar**: Cleaned up bottom controls with full access to the Starter Hub inside the Advanced Settings drawer.

---

## 🎮 Features

- **🕹️ Dual Console System**: Seamlessly switch between the **Nintendo Entertainment System (NES)** and **Sony PlayStation 1 (PS1)** with an authentic 3D silk mesh transition.
- **✨ Interactive 3D Hardware**: High-detail 3D console bodies, cartridges, and jewel cases rendered in Three.js with realistic lighting, mechanical click sounds, disc spin-up, and physical tray animations.
- **📺 Authentic CRT TV Shaders**: Vintage CRT curvature distortion, scanlines, phosphor triads, and switchable **Modern Flat CRT** or **Retro Bubble CRT** modes.
- **🔊 Multi-Channel Mechanical SFX**: Over 35 authentic mechanical switch, button plunge, disc spin, lid hinge, and cartridge insertion sound effects.
- **💾 Vault-Backed Save States**: Save and restore game states on disk at any point during gameplay.

---

## 🎮 Controls & Keybindings Reference

### 🕹️ NES Controller Mapping

| Action | Keyboard Key | Physical Gamepad (PS / Xbox / Generic) |
| :--- | :--- | :--- |
| **D-Pad Up** | `W` / `↑` Arrow | D-Pad Up / Left Analog Stick Up |
| **D-Pad Down** | `S` / `↓` Arrow | D-Pad Down / Left Analog Stick Down |
| **D-Pad Left** | `A` / `←` Arrow | D-Pad Left / Left Analog Stick Left |
| **D-Pad Right** | `D` / `→` Arrow | D-Pad Right / Left Analog Stick Right |
| **B Button** (Run / Fire) | `J` | **Square (`□`)** / **Cross (`✕`)** |
| **A Button** (Jump) | `K` | **Circle (`○`)** / **Triangle (`△`)** |
| **Select** | `C` / `Shift` | **Select / Share / Back** (Button 8) |
| **Start** | `Enter` / `V` / `B` | **Start / Options** (Button 9) |

---

### 🕹️ PS1 (PlayStation 1) Controller Mapping

| PS1 Button | Keyboard Key | Physical Gamepad (W3C Standard) | DirectInput USB Gamepad |
| :--- | :--- | :--- | :--- |
| **Cross (`✕`)** | `K` | **Button 0** (Bottom) | **Button 2** (Bottom) |
| **Circle (`○`)** | `L` | **Button 1** (Right) | **Button 1** (Right) |
| **Square (`□`)** | `J` | **Button 2** (Left) | **Button 3** (Left) |
| **Triangle (`△`)** | `I` | **Button 3** (Top) | **Button 0** (Top) |
| **L1** (Left Bumper) | `Q` / `U` | **Button 4** (L1) | **Button 4** (L1) |
| **R1** (Right Bumper) | `R` / `Y` | **Button 5** (R1) | **Button 5** (R1) |
| **L2** (Left Trigger) | `E` / `1` | **Button 6** (L2) | **Button 6** (L2) |
| **R2** (Right Trigger) | `O` / `2` | **Button 7** (R2) | **Button 7** (R2) |
| **Select** | `C` / `Shift` | **Button 8** (Select) | **Button 8** (Select) |
| **Start** | `Enter` / `V` / `B` | **Button 9** (Start) | **Button 9** (Start) |
| **D-Pad Directionals** | `W`, `A`, `S`, `D` / Arrows | **D-Pad** & Left Stick | **D-Pad** & Left Stick |

---

## 🚀 Quick Start & Installation

1. Copy the `canvas-retro-engine` folder into your Obsidian vault's plugin directory:
   `<Vault>/.obsidian/plugins/canvas-retro-engine/`
2. Run `npm install` and `npm run build` (or use the pre-built `main.js`, `manifest.json`, and `styles.css`).
3. Enable **Canvas Retro Engine** in Obsidian **Settings → Community Plugins**.
4. Open any Canvas note and enjoy your 3D retro console right on the canvas.

---

## 📂 Adding Games, Covers & BIOS

Place your files in the respective folders inside the plugin's `assets/` directory (or click **🌐 GET ROMS & 3D COVERS...** in Advanced Settings):

- **NES ROMs**: `assets/nes/roms/` (`.nes` files)
- **PS1 Games**: `assets/psx/roms/` (`.iso`, `.bin`, `.cue`, `.chd`, `.pbp` files)
- **PS1 BIOS**: `assets/psx/bios/SCPH1001.BIN` or `SCPH5501.BIN`
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
