import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: path.resolve(__dirname, "src/app"),
      components: path.resolve(__dirname, "src/components"),
      config: path.resolve(__dirname, "src/config"),
      consts: path.resolve(__dirname, "src/consts"),
      context: path.resolve(__dirname, "src/context"),
      icons: path.resolve(__dirname, "src/icons"),
      models: path.resolve(__dirname, "src/models"),
      pages: path.resolve(__dirname, "src/pages"),
      reducers: path.resolve(__dirname, "src/reducers"),
      services: path.resolve(__dirname, "src/services"),
      styles: path.resolve(__dirname, "src/styles"),
      utils: path.resolve(__dirname, "src/utils"),
    },
  },
  build: {
    outDir: "build",
  },
});
