import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import unoCss from "unocss/vite";
import { presetIcons, presetAttributify, presetUno } from "unocss";
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    unoCss({
      presets: [presetIcons(), presetAttributify(), presetUno()],
    }),
  ],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
});
