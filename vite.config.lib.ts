import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "url";
import { dirname } from "path";

import pkg from "./package.json";

const deps = Object.keys(pkg.dependencies);

const external = function (id: string) {
  return /^vue/.test(id) || deps.some((k) => new RegExp("^" + k).test(id));
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
      scss: {
        api: "modern-compiler",
      },
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./packages/index.ts"),
      name: "BeeComponents",
      fileName: (format) => {
        return `index.${format}.js`;
      },
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: external,
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
      plugins: [],
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    dts({
      root: ".",
      tsConfigFilePath: "./tsconfig.lib.json",
      insertTypesEntry: true,
      copyDtsFiles: false,
      outputDir: "dist/types",
      exclude: ["./node_modules"],
      beforeWriteFile: (filePath, content) => {
        const origin = path.resolve(__dirname, "dist/types/packages");
        const replaceVal = path.resolve(__dirname, "dist/types");
        const newFilepath = filePath.replace(origin, replaceVal);
        return { filePath: newFilepath, content };
      },
    }),
  ],
});
