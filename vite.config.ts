import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { peerDependencies } from "./package.json";

export default defineConfig(({ command }) => {
  const target = command === "build" ? "esnext" : "es2020";

  return {
    build: {
      target,
      lib: {
        entry: "./src/index.ts",
        formats: ["es", "cjs"],
        fileName: (format) => `index.qwik.${format === "es" ? "mjs" : "cjs"}`,
      },
      rollupOptions: {
        external: Object.keys(peerDependencies),
      },
    },
    plugins: [qwikVite()],
  };
});
