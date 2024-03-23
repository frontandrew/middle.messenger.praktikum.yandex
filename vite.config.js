import { resolve } from 'path';
import { defineConfig } from 'vite';

import handlebars from 'vite-plugin-handlebars';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    handlebars({ partialDirectory: resolve(__dirname, 'src/shared/ui') }),
    tsconfigPaths(),
  ],
});
