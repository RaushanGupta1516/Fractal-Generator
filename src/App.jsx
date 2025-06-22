import React, { useRef, useState } from 'react';
import FractalCanvas from './components/FractalCanvas';
import ControlsPanel from './components/ControlsPanel';
import './App.css';

function App() {
  // Current selected fractal type: "mandelbrot" or "julia"
  const [fractalType, setFractalType] = useState('mandelbrot');

  // Current selected color scheme: "classic", "neon", etc.
  const [colorScheme, setColorScheme] = useState('classic');

  // Parameters like iteration count and animation toggle
 const [params, setParams] = useState({
  maxIterations: 300,
  animate: false,
  cRe: -0.7,    
  cIm: 0.27015,
});


  // Used to force a reset on the canvas by changing the key
  const [viewportKey, setViewportKey] = useState(0);

  // Reference to call functions directly on the FractalCanvas
  const fractalRef = useRef();

  // Resets the fractal view by changing the key (re-renders the canvas)
  const handleReset = () => {
    setViewportKey((prev) => prev + 1);
  };

  return (
    <div className="app">
      <h1>🌀 Fractal Explorer</h1>

      {/* Control panel for switching types, color schemes, parameters, and actions */}
      <ControlsPanel
        fractalType={fractalType}
        setFractalType={setFractalType}
        colorScheme={colorScheme}
        setColorScheme={setColorScheme}
        params={params}
        setParams={setParams}
        onResetView={handleReset}
        onDownload={() => fractalRef.current.downloadFractal()}
        onZoomIn={() => fractalRef.current.zoomIn()}
        onZoomOut={() => fractalRef.current.zoomOut()}
      />

      {/* Canvas where the fractal is rendered and interacted with */}
      <FractalCanvas
        ref={fractalRef}
        fractalType={fractalType}
        colorScheme={colorScheme}
        params={params}
        viewportKey={viewportKey}
      />
    </div>
  );
}

export default App;
