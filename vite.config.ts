import path from "path"
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/meteo-flow/",
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
