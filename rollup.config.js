import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import externalDeps from 'rollup-plugin-peer-deps-external';
import size from 'rollup-plugin-size';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';

const input = 'src/index.js';
const external = ['react'];
const plugins = [
  resolve(),
  babel({
    exclude: 'node_modules/**',
  }),
  commonjs(),
  externalDeps(),
];

const globals = {
  react: 'React',
};

const developmentConfig = {
  input,
  output: {
    name: 'react-pagination',
    file: 'dist/react-pagination.development.js',
    format: 'umd',
    sourcemap: true,
    globals,
  },
  external,
  plugins,
};

let config;
if (process.env.NODE_ENV === 'development') {
  config = [developmentConfig];
} else {
  config = [
    {
      input,
      output: {
        file: 'dist/react-pagination.mjs',
        format: 'es',
        sourcemap: true,
      },
      external,
      plugins,
    },
    {
      input,
      output: {
        file: 'dist/react-pagination.min.mjs',
        format: 'es',
        sourcemap: true,
      },
      external,
      plugins: [...plugins, terser()],
    },
    developmentConfig,
    {
      input,
      output: {
        name: 'react-pagination',
        file: 'dist/react-pagination.production.min.js',
        format: 'umd',
        sourcemap: true,
        globals,
      },
      external,
      plugins: [...plugins, terser(), size(), visualizer()],
    },
  ];
}

export default config;
