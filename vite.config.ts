import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Relative base so the build works at a domain root or under /portfolio/ on GitHub Pages.
  base: './',
  plugins: [react(), tailwindcss()],
});
