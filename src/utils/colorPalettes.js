// src/utils/colorPalettes.js

/**
 * Returns an RGB color based on the iteration count and chosen color scheme.
 * 
 * @param {number} iteration - Number of iterations taken for the point to escape.
 * @param {number} max - Maximum number of iterations allowed.
 * @param {string} scheme - Name of the color scheme to apply.
 * @returns {[number, number, number]} - RGB color as an array [r, g, b].
 */
export const getColor = (iteration, max, scheme = 'classic') => {
  const t = iteration / max; // Normalize iteration (0 to 1)

  // If the point didn't escape, color it black (inside the set)
  if (iteration === max) return [0, 0, 0];

  // Return color based on selected color scheme
  switch (scheme) {
    case 'fire':
      // Shades of red/orange (fire-like)
      return [255 * t, 50 * t, 0];

    case 'blue':
      // Shades of blue
      return [0, 0, 255 * t];

    case 'rainbow':
      // Gradient from red to green to purple
      return [255 * t, 255 * (1 - t), 127 * t];

    case 'classic':
    default:
      // Grayscale (black to white)
      const v = Math.floor(255 * t);
      return [v, v, v];
  }
};
