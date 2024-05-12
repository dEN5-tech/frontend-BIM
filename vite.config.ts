import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        // Enables the use of the latest JavaScript features and optimizations
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import"
      ],
      presets: [
        // Use the preset that includes optimizations for React and TypeScript
        ["@babel/preset-react", { runtime: "automatic", development: process.env.NODE_ENV === "development" }],
        "@babel/preset-typescript"
      ]
    }
  })],
  build: {
    // Further optimize the output
    minify: 'esbuild', // Use esbuild for minification
    sourcemap: false, // Disable sourcemaps for production builds
    target: 'esnext', // Target modern JavaScript
    polyfillModulePreload: true,
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // Inline assets less than 4kb
  }
});


