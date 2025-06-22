# 🌀 Fractal Explorer

Fractal Explorer is a beautiful and interactive fractal rendering app built with React.js. It allows users to explore and customize Mandelbrot and Julia sets, change color schemes, animate the fractals, zoom, pan, and even download the canvas as an image.

---

## ✨ Features

- 🎨 Select between Mandelbrot and Julia fractals
- 🌈 Switch color schemes: Classic, Fire, Cool, Grayscale
- 🔄 Enable animation to cycle color palettes
- 🔍 Zoom in/out with mouse wheel or buttons
- 🖱️ Pan across the fractal with mouse drag
- 📸 Download the current view as a PNG image
- 📱 Fully responsive and clean UI

---

## 📸 Preview

### 🔹 App UI
![App UI](https://github.com/RaushanGupta1516/Fractal-Generator/blob/main/Screenshot%202025-06-22%20201324.png)

### 🔹 Mandelbrot Zoom
![Mandelbrot Zoom](https://github.com/RaushanGupta1516/Fractal-Generator/blob/main/Screenshot%202025-06-22%20201332.png)

### 🔹 Julia Set
![Julia Set](https://github.com/RaushanGupta1516/Fractal-Generator/blob/main/Screenshot%202025-06-22%20201435.png)


## 🚀 Getting Started

### 1. Clone the Repository

git clone https://github.com/RaushanGupta1516/fractal-explorer.git
cd fractal-explorer
npm install
npm start


🛠️ Folder Structure
fractal-explorer/
├── public/
├── src/
│   ├── components/
│   │   ├── ControlsPanel.jsx
│   │   ├── FractalCanvas.jsx
│   │   └── LoadingSpinner.jsx
│   ├── utils/
│   │   ├── colorPalettes.js
│   │   └── fractals.js
│   ├── App.jsx
│   ├── App.css
│   └── index.js
└── README.md

## 📁 Core Files Explained

-  App.jsx – Main component that manages app state and renders controls and canvas.
-  ControlsPanel.jsx – UI for selecting fractal type, color scheme, animation, zoom, reset, and download options.
-  FractalCanvas.jsx – Renders fractal to canvas, handles mouse zoom/pan, and allows export/download.
-  fractals.js – Contains fractal rendering logic for both Mandelbrot and Julia sets.
-  colorPalettes.js – Provides color-mapping logic for different color schemes.
-  App.css – Includes all the styles: dark theme, responsive layout, and button styling.

---

## 🧠 How It Works

- The fractal is rendered on an HTML <canvas> element.
- User interactions (via the control panel) update the React state.
- On every state change (like zoom, pan, or switching fractal types), the canvas is redrawn.
- Julia fractals use constant complex numbers ( cRe  and cIm) defined in the parameters.
- Animation mode cycles through color schemes at intervals.
- Users can zoom with the mouse wheel, pan by dragging, and download the image.

---

## 👨‍💻 Built With

- React.js – Component-based frontend framework
- HTML5 Canvas API – For pixel-level rendering of fractals
- JavaScript (ES6+) – Logic for rendering and interactivity
- CSS3 – Layout and responsive design using Flexbox & media queries

