import commonJS from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import externalDeps from 'rollup-plugin-peer-deps-external';
import size from 'rollup-plugin-size';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import pkg from './package.json';

const external = ['react'];

const globals = {
  react: 'React',
};

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'];
const babelConfig = { extensions };
const resolveConfig = { extensions };

export default [
  {
    input: pkg.main,
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    external,
    plugins: [resolve(resolveConfig), babel(babelConfig), commonJS(), externalDeps()],
  },
  {
    input: pkg.main,
    output: {
      file: 'dist/react-pagination.min.mjs',
      format: 'es',
      sourcemap: true,
    },
    external,
    plugins: [resolve(resolveConfig), babel(babelConfig), commonJS(), externalDeps(), terser()],
  },
  {
    input: pkg.main,
    output: {
      name: 'react-pagination',
      file: 'dist/react-pagination.development.js',
      format: 'umd',
      sourcemap: true,
      globals,
    },
    external,
    plugins: [resolve(resolveConfig), babel(babelConfig), commonJS(), externalDeps()],
  },
  {
    input: pkg.main,
    output: {
      name: 'react-pagination',
      file: 'dist/react-pagination.production.min.js',
      format: 'umd',
      sourcemap: true,
      globals,
    },
    external,
    plugins: [
      // replace({ 'process.env.NODE_ENV': `"production"`, delimiters: ['', ''] }),
      resolve(resolveConfig),
      babel(babelConfig),
      commonJS(),
      externalDeps(),
      terser(),
      size(),
      visualizer(),
    ],
  },
];
