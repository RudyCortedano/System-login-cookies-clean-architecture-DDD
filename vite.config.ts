import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@tests": path.resolve(__dirname, "tests"),
    },
  },
  // test: {
  //   // tests-unit
  //   globals: true,
  //   environment: "node",
  //   coverage: {
  //     provider: "v8",
  //     reporter: ["text", "html"],
  //   },
  // },
});
