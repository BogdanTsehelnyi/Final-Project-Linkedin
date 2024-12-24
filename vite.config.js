import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Final-Project-Linkedin/', // Базовий шлях для GitHub Pages
  plugins: [react()],
});
