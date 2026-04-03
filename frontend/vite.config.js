import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    setupFiles: ["./setup.js"], // Point to your converted setup file
    environment: "jsdom", // Required for DOM testing
  },
});
