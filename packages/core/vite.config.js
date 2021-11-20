import typescript from '@rollup/plugin-typescript';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'react-pagination',
      fileName: (format) => `react-pagination.${format}.js`,
    },
    sourcemap: true,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
      plugins: [
        typescript({
          target: 'es2020',
          rootDir: path.resolve(__dirname, './src'),
          declaration: true,
          declarationDir: path.resolve(__dirname, './dist/src'),
          exclude: '*.test.ts',
          allowSyntheticDefaultImports: true,
        }),
      ],
    },
  },
});
