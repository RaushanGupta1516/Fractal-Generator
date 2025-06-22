import React from "react";

const ControlsPanel = ({
  fractalType,
  setFractalType,
  colorScheme,
  setColorScheme,
  params,
  setParams,
  onResetView,
  onDownload,
  onZoomIn,
  onZoomOut,
}) => {
  return (
    <div className="controls">
      <h3>Controls</h3>

      {/* Fractal type switcher */}
      <div>
        <label>Fractal Type:</label>
        <select
          value={fractalType}
          onChange={(e) => setFractalType(e.target.value)}
        >
          <option value="mandelbrot">Mandelbrot</option>
          <option value="julia">Julia</option>
        </select>
      </div>

      {/* Color scheme selector */}
      <div>
        <label>Color Scheme:</label>
        <select
          value={colorScheme}
          onChange={(e) => setColorScheme(e.target.value)}
        >
          <option value="classic">Classic</option>
          <option value="fire">Fire</option>
          <option value="cool">Cool</option>
          <option value="grayscale">Grayscale</option>
        </select>
      </div>

      {/* Toggle animation */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={params.animate}
            onChange={(e) =>
              setParams((prev) => ({ ...prev, animate: e.target.checked }))
            }
          />
          Animate Colors
        </label>
      </div>

      {/* Iteration slider */}
      <div>
        <label id="itr">Iterations:</label>
        <input
          type="range"
          min="50"
          max="1000"
          step="10"
          value={params.maxIterations}
          onChange={(e) =>
            setParams((prev) => ({
              ...prev,
              maxIterations: parseInt(e.target.value),
            }))
          }
        />
        <span id="itrVal">{params.maxIterations}</span>
      </div>

      {/* Show only when fractal is Julia */}
      {fractalType === "julia" && (
        <>
          <div>
            <label htmlFor="cRe">Julia Constant (Re):</label>
            <input
              type="number"
              id="cRe"
              step="0.01"
              value={params.cRe}
              onChange={(e) =>
                setParams((prev) => ({
                  ...prev,
                  cRe: parseFloat(e.target.value),
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="cIm">Julia Constant (Im):</label>
            <input
              type="number"
              id="cIm"
              step="0.01"
              value={params.cIm}
              onChange={(e) =>
                setParams((prev) => ({
                  ...prev,
                  cIm: parseFloat(e.target.value),
                }))
              }
            />
          </div>
        </>
      )}

      {/* Button group */}
      <div className="button-group">
        <button onClick={onZoomIn}>🔍 Zoom In</button>
        <button onClick={onZoomOut}>🔎 Zoom Out</button>
        <button onClick={onResetView}>🔄 Reset</button>
        <button onClick={onDownload}>⬇ Download</button>
      </div>
    </div>
  );
};

export default ControlsPanel;
