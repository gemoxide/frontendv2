/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
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
    // Don't use React plugin for tests - esbuild handles JSX
    ViteFonts({
      google: {
        families: ["Montserrat"],
      },
    }),
  ],
  test: {
    // Test environment
    globals: true,
    environment: "jsdom",
    testTimeout: 10000,

    // Setup files (optional but recommended)
    setupFiles: ["./vitest.setup.ts"],

    // Coverage configuration
    coverage: {
      // Coverage provider (v8 is recommended for better performance)
      provider: "v8",
      // Enable all to avoid inspector issues
      all: false,

      // Reporters: text (console), json, html (browser), lcov (CI tools)
      reporter: ["text", "json", "html", "lcov"],

      // Files to exclude from coverage
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/coverage/**",
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        "**/fakers/**", // Test data generators
        "**/types/**", // Type definitions
        "**/interfaces/**", // Interface definitions
        "**/enums/**", // Enum definitions
        "**/constants/**", // Constants
        "**/main.tsx", // Entry point
        "**/index.tsx", // Barrel exports
        "**/vite-env.d.ts", // Vite type definitions
        "**/auto-imports.d.ts", // Auto-generated imports
      ],

      // Files to include in coverage
      include: ["src/**/*.{ts,tsx}"],

      // Coverage thresholds (set to 0 initially, adjust as needed)
      thresholds: {
        lines: 0, // Percentage of lines covered
        functions: 0, // Percentage of functions covered
        branches: 0, // Percentage of branches covered
        statements: 0, // Percentage of statements covered
      },
    },
  },
});
