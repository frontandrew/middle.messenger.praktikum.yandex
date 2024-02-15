import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/components')
    }),
  ],
});
