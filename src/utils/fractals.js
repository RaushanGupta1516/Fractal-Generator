// src/utils/fractals.js
import { getColor } from './colorPalettes';

/**
 * Draws the Mandelbrot fractal on the canvas image data.
 */
export const drawMandelbrot = (data, width, height, viewport, colorScheme, params) => {
  const { x, y, scale } = viewport;
  const { maxIterations } = params;

  // Loop through every pixel on the canvas
  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      // Convert pixel coordinates to complex plane coordinates
      const cx = x + (px / width) * scale;
      const cy = y + (py / height) * scale;

      let zx = 0, zy = 0; // Start at origin
      let i = 0;

      // Iterate to check how fast it escapes (diverges)
      while (zx * zx + zy * zy < 4 && i < maxIterations) {
        const xtemp = zx * zx - zy * zy + cx;
        zy = 2 * zx * zy + cy;
        zx = xtemp;
        i++;
      }

      // Get color based on how many iterations before escape
      const [r, g, b] = getColor(i, maxIterations, colorScheme);
      const index = (py * width + px) * 4;

      // Set pixel color in the image data
      data[index] = r;
      data[index + 1] = g;
      data[index + 2] = b;
      data[index + 3] = 255; // Full opacity
    }
  }
};

/**
 * Draws the Julia set on the canvas image data.
 */
export const drawJulia = (data, width, height, viewport, colorScheme, params) => {
  const { x, y, scale } = viewport;
  const { maxIterations, cRe, cIm } = params;

  // Loop through every pixel on the canvas
  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      // Convert pixel to complex plane coordinate (z = zx + i*zy)
      let zx = x + (px / width) * scale;
      let zy = y + (py / height) * scale;

      let i = 0;

      // Iteratively apply z = z^2 + c
      while (zx * zx + zy * zy < 4 && i < maxIterations) {
        const xtemp = zx * zx - zy * zy + cRe;
        zy = 2 * zx * zy + cIm;
        zx = xtemp;
        i++;
      }

      // Get color based on how fast it escapes
      const [r, g, b] = getColor(i, maxIterations, colorScheme);
      const index = (py * width + px) * 4;

      // Set pixel color in image data
      data[index] = r;
      data[index + 1] = g;
      data[index + 2] = b;
      data[index + 3] = 255; // Fully opaque
    }
  }
};
