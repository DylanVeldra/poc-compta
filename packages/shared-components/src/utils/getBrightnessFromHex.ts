import { hexToRgb } from "@shared-utils";

// Algorithme que l'on peu retrouver sur W3C : https://www.w3.org/TR/AERT#color-contrast
export const getBrightnessFromHex = (hex: string) => {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return;
  }
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
};
