````md
# 🧪 Lab Unit Converter (PWA)

A lightweight, installable **Progressive Web App (PWA)** for converting laboratory test units and interpreting clinical reference ranges.

Built with modern JavaScript modules, Tailwind CSS, and Service Worker caching for fast offline-first performance across desktop and mobile devices.

---

## 🚀 Live Demo

🌐 Live App:  
`https://lab-units-converter.netlify.app`

📦 GitHub Repository:  
`https://github.com/Amoswasike/lab-units-converter`

---

## ✨ Features

- 🔬 Convert laboratory values between medical units
- 📊 Automatic reference range interpretation
- 🚨 Critical value detection
- ❤️ Cholesterol / HDL ratio calculator
- 📱 Installable PWA experience
- 📴 Offline functionality with Service Worker caching
- ⚡ Fast lightweight UI using Tailwind CSS
- 🧩 Modular JavaScript architecture
- 🔄 Update notification system
- 🎯 Mobile-first responsive layout
- 💾 Fully frontend-based (no backend required)

---

## 🧠 Supported Laboratory Tests

- Phosphate
- Magnesium
- Uric Acid
- Cholesterol / HDL Ratio

---

## 🛠 Tech Stack

- HTML5
- JavaScript (ES Modules)
- Tailwind CSS
- Service Workers
- Web App Manifest
- Progressive Web App APIs

---

## 📦 Local Development Setup

Clone the repository:

```bash
git clone git@github.com:Amoswasike/lab-units-converter.git
cd lab-units-converter
````

Install dependencies:

```bash
npm install
```

Build Tailwind CSS:

```bash
npm run build
```

Run with Live Server:

```bash
npx live-server
```

Or open directly:

```bash
index.html
```

---

## 📲 PWA Installation

On supported browsers (Chrome, Edge, Brave):

1. Open the app
2. Click the **Install App** button
3. Install to desktop or mobile home screen
4. Launch like a native application

### PWA Features Included

* Install prompt support
* Offline caching
* Standalone display mode
* Update detection notifications
* Cached assets and screenshots
* Faster repeat visits

---

## 🧪 How the App Works

### Standard Lab Conversion

1. Select a laboratory test
2. Enter a value
3. Select the input unit
4. App converts automatically

The app displays:

* Converted values
* Standardized unit
* Reference range comparison
* Clinical interpretation
* Critical alerts (if applicable)

---

### Cholesterol / HDL Ratio

1. Enter Total Cholesterol
2. Enter HDL Cholesterol
3. Ratio is calculated automatically

The app then provides:

* Ratio value
* Cardiovascular interpretation category

---

## 📂 Project Structure

```text
LAB-UNITS-CONVERTER/
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── maskable-512.png
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
│   ├── input.css
│   └── output.css
├── index.html
├── manifest.json
├── package.json
├── package-lock.json
├── service-worker.js
├── .gitignore
└── README.md
```

---

## 📸 Screenshots

### 💻 Desktop View

![Desktop Screenshot](./screenshots/desktop.png)

---

### 📱 Mobile View

![Mobile Screenshot](./screenshots/mobile.png)

---

## ⚙️ Build Script

Current Tailwind production build command:

```json
"scripts": {
  "build": "tailwindcss -i ./src/input.css -o ./src/output.css --minify"
}
```

---

## 🌐 Deployment

### 🔵 Netlify (Recommended)

This project is optimized for Netlify deployment.

#### Build Settings

| Setting           | Value           |
| ----------------- | --------------- |
| Base Directory    | `.`             |
| Build Command     | `npm run build` |
| Publish Directory | `.`             |

#### Deployment Steps

1. Push project to GitHub
2. Open Netlify
3. Import existing GitHub repository
4. Select repository
5. Configure build settings
6. Deploy site

---

### 🟢 GitHub Pages (Alternative)

1. Open repository settings
2. Enable GitHub Pages
3. Select:

   * Branch: `main`
   * Folder: `/root`

---

## 🧠 Architecture Notes

This project uses:

* Centralized application state
* Modular ES module imports
* Dynamic UI rendering
* Reusable conversion utilities
* Shared interpretation data maps
* Progressive enhancement principles

---

## 🧭 Roadmap

Planned future improvements:

* 📈 Interactive graphs
* 🌙 Dark mode
* 🧠 AI-assisted lab interpretation
* 📊 Historical result tracking
* 🔔 Smart critical alerts
* 🌍 Multi-language support
* 📱 Enhanced mobile animations
* 🧪 Additional laboratory tests
* ☁️ Cloud synchronization
* 📤 Export/share results

---

## ⚠️ Disclaimer

This application is intended for educational, informational, and reference purposes only.

It should not replace:

* Professional medical advice
* Laboratory systems
* Clinical judgment
* Diagnostic decision-making

Always consult qualified healthcare professionals for clinical interpretation.

---

## 👨‍💻 Author

Built and maintained by **Wako**
Iteratively improved with modern frontend tooling and ChatGPT assistance 🚀

---

## 📄 License

MIT License

Feel free to fork, improve, and build upon this project.

```
```

