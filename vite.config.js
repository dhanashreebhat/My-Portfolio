import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/My-Portfolio/", // ✅ required for GitHub Pages
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
  },
});
