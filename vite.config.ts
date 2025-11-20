/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteFonts from "vite-plugin-fonts";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  plugins: [
    svgr(),
    react({
      include: /\.(jsx|tsx)$/,
      exclude: /\.(test|spec)\.(jsx|tsx)$/,
    }),
    ViteFonts({
      google: {
        families: ["Montserrat"],
      },
    }),
  ],
} as any);
