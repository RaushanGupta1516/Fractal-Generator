import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import LoadingSpinner from './LoadingSpinner';
import { drawMandelbrot, drawJulia } from '../utils/fractals';

const COLOR_LIST = ['classic', 'fire', 'cool', 'grayscale'];

const FractalCanvas = forwardRef(
  ({ fractalType, colorScheme, params, viewportKey }, ref) => {
    const canvasRef = useRef(null);

    const [viewport, setViewport] = useState({
      x: -2.5,
      y: -1.5,
      scale: 3,
    });

    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(null);
    const [loading, setLoading] = useState(true);

    // Reset viewport on reset trigger
    useEffect(() => {
      setViewport({ x: -2.5, y: -1.5, scale: 3 });
    }, [viewportKey]);

    // Handle drawing logic on changes
    useEffect(() => {
      let intervalId;
      let loadingTimeout;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      let colorIndex = COLOR_LIST.indexOf(colorScheme);
      const drawFn = fractalType === 'mandelbrot' ? drawMandelbrot : drawJulia;

      // Only show spinner if render takes longer than 100ms
      loadingTimeout = setTimeout(() => setLoading(true), 100);

      const renderFractal = (scheme) => {
        drawFn(data, width, height, viewport, scheme, params);
        ctx.putImageData(imageData, 0, 0);
        clearTimeout(loadingTimeout);
        setLoading(false);
      };

      if (params.animate) {
        renderFractal(COLOR_LIST[colorIndex]);
        intervalId = setInterval(() => {
          colorIndex = (colorIndex + 1) % COLOR_LIST.length;
          renderFractal(COLOR_LIST[colorIndex]);
        }, 1000);
      } else {
        renderFractal(colorScheme);
      }

      return () => {
        clearInterval(intervalId);
        clearTimeout(loadingTimeout);
      };
    }, [fractalType, colorScheme, params, viewport]);

    // Mouse wheel zoom
    const handleWheel = (e) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      const { width, height } = canvas;
      const rect = canvas.getBoundingClientRect();

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const zoom = e.deltaY < 0 ? 0.9 : 1.1;

      const x = viewport.x + (mouseX / width) * viewport.scale;
      const y = viewport.y + (mouseY / height) * viewport.scale;

      setViewport({
        x: x - (zoom * viewport.scale * (mouseX / width)),
        y: y - (zoom * viewport.scale * (mouseY / height)),
        scale: viewport.scale * zoom,
      });
    };

    // Start drag
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartPos({ x: e.clientX, y: e.clientY });
    };

    // End drag
    const handleMouseUp = () => setIsDragging(false);

    // Drag move
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      const canvas = canvasRef.current;
      const { width, height } = canvas;

      const moveX = (dx / width) * viewport.scale;
      const moveY = (dy / height) * viewport.scale;

      setViewport((prev) => ({
        ...prev,
        x: prev.x - moveX,
        y: prev.y - moveY,
      }));

      setStartPos({ x: e.clientX, y: e.clientY });
    };

    // Expose methods for zoom/reset/download to parent
    useImperativeHandle(ref, () => ({
      downloadFractal: () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = `fractal-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      },
      zoomIn: () => {
        setViewport((prev) => ({ ...prev, scale: prev.scale * 0.8 }));
      },
      zoomOut: () => {
        setViewport((prev) => ({ ...prev, scale: prev.scale * 1.25 }));
      },
    }));

    return (
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{
            borderRadius: '10px',
            cursor: isDragging ? 'grabbing' : 'grab',
            border: '2px solid #ccc',
            background: '#000',
          }}
        />
        {loading && <LoadingSpinner />}
      </div>
    );
  }
);

export default FractalCanvas;
