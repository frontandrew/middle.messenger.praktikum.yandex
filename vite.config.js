import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  plugins: [handlebars({
    partialDirectory: resolve(__dirname, 'src')
  })],
}) 