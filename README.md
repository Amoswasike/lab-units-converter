

# 🧪 Lab Unit Converter (PWA)

![Netlify Status](https://api.netlify.com/api/v1/badges/c48ef497-2141-4d66-81ea-11defef6c377/deploy-status)
![GitHub repo size](https://img.shields.io/github/repo-size/Amoswasike/lab-units-converter)
![GitHub last commit](https://img.shields.io/github/last-commit/Amoswasike/lab-units-converter)
![PWA Ready](https://img.shields.io/badge/PWA-ready-green)

A **lightweight, installable Progressive Web App (PWA)** for converting laboratory test units and interpreting clinical reference ranges in real time.

Designed with a **fast, offline-first architecture**, this app behaves like a native tool on both mobile and desktop.

---

## 🚀 Live Demo

🌐 **Live App:**
[https://lab-units-converter.netlify.app](https://lab-units-converter.netlify.app)

📦 **Source Code:**
[https://github.com/Amoswasike/lab-units-converter](https://github.com/Amoswasike/lab-units-converter)

---

## ✨ What This App Does

Lab Unit Converter is built to simulate a **real clinical conversion workflow**:

* Convert lab values across medical units
* Normalize values to standard clinical units
* Evaluate against reference ranges
* Flag abnormal or critical results instantly
* Provide interpretation feedback for decision support
* Compute cholesterol/HDL ratio automatically

> ⚡ Built for speed, clarity, and real-world lab-style reasoning.

---

## ✨ Key Features

### 🔬 Laboratory Intelligence Engine

* Multi-test conversion system
* Standard unit normalization
* Clinical reference validation

### 📊 Result Interpretation System

* Normal / Low / High classification
* Critical value detection
* Color-coded feedback system

### ❤️ Cholesterol Ratio Calculator

* Automatic Total Cholesterol / HDL computation
* Risk interpretation output

### 📱 Progressive Web App (PWA)

* Installable on mobile & desktop
* Offline support (Service Worker caching)
* Native-app experience without a backend

### ⚡ Performance First Design

* Vanilla JavaScript ES Modules
* Tailwind CSS UI
* Zero backend dependency

---

## 🧠 Supported Tests

* Phosphate
* Magnesium
* Uric Acid
* Cholesterol / HDL Ratio

---

## 🛠 Tech Stack

| Layer        | Technology                     |
| ------------ | ------------------------------ |
| UI           | HTML5 + Tailwind CSS           |
| Logic        | JavaScript (ES Modules)        |
| PWA          | Service Workers + Manifest     |
| Architecture | Modular State + Utility Design |

---

## 📸 UI Preview

### 💻 Desktop Experience

![Desktop View](./screenshots/desktop.png)

### 📱 Mobile Experience

![Mobile View](./screenshots/mobile.png)

---

## ⚙️ How It Works

### Standard Conversion Flow

1. Select a laboratory test
2. Enter value + unit
3. System converts to standard unit
4. Engine evaluates clinical range
5. Output is displayed:

* Converted value
* Reference range comparison
* Interpretation (Normal / Low / High / Critical)

---

### Cholesterol Mode

* Input Total Cholesterol
* Input HDL Cholesterol
* Automatic ratio calculation
* Clinical interpretation generated instantly

---

## 📂 Project Structure

```text
LAB-UNITS-CONVERTER/
├── icons/
├── js/
│   ├── conversions.js
│   ├── data.js
│   ├── script.js
│   ├── state.js
│   └── ui.js
├── screenshots/
│   ├── desktop.png
│   └── mobile.png
├── src/
├── index.html
├── manifest.json
├── service-worker.js
├── package.json
└── README.md
```

---

## 📲 PWA Installation

This app can be installed like a native application:

### Steps

1. Open the app in Chrome / Edge
2. Click **Install App**
3. Launch from home screen or desktop

### PWA Capabilities

* Offline mode support
* Fast repeat loading
* Installable UI
* Auto update notifications
* Cached assets (including screenshots)

---

## 🌐 Deployment

### 🔵 Netlify (Recommended)

Optimized for static deployment.

| Setting           | Value           |
| ----------------- | --------------- |
| Base directory    | `.`             |
| Build command     | `npm run build` |
| Publish directory | `.`             |

### Deployment Flow

1. Push to GitHub
2. Import repo in Netlify
3. Deploy automatically

---

### 🟢 GitHub Pages

* Branch: `main`
* Root directory: `/`

---

## 🧠 Architecture Highlights

* Centralized state management (`state.js`)
* Modular ES6 architecture
* Separation of UI / logic / data layers
* Reusable conversion engine
* Real-time DOM rendering system
* Progressive enhancement approach

---

## 🧭 Roadmap (Next Upgrades)

* 📈 Graph visualization of lab ranges
* 🌙 Dark mode UI
* 🧠 AI-assisted interpretation engine
* 📊 History tracking system
* 🔔 Critical alert notifications
* 🌍 Multi-language support
* 📱 Advanced mobile UX animations

---

## ⚠️ Disclaimer

This tool is for **educational and reference purposes only**.

It is not intended to replace:

* Medical diagnosis
* Laboratory systems
* Clinical decision-making

---

## 👨‍💻 Author

**Wako (Amos Wasike)**
Frontend Developer | PWA Enthusiast | UI Systems Builder

---

## 🏁 Project Status

✔ Deployed on Netlify
✔ PWA enabled
✔ Offline support active
✔ Portfolio-ready architecture

---

If you want next upgrade, I can turn this into an **even higher-end README with:**

* animated banner header (GitHub-style hero image)
* collapsible sections (`<details>`)
* “feature cards” layout
* SVG workflow diagram of your app architecture
* and a recruiter-focused “impact section”

Just tell me 👍


