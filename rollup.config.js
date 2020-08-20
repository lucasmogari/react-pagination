import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import externalDeps from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

const external = ['react'];

const globals = {
  react: 'React',
};

export default [
  {
    input: pkg.main,
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    external,
    plugins: [resolve(), babel(), commonJS(), externalDeps()],
  },
  {
    input: pkg.main,
    output: {
      file: 'dist/react-pagination.min.mjs',
      format: 'es',
      sourcemap: true,
    },
    external,
    plugins: [resolve(), babel(), commonJS(), externalDeps(), terser()],
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
    plugins: [resolve(), babel(), commonJS(), externalDeps()],
  },
  //   {
  //     input: inputSrc,
  //     output: {
  //       //   name: 'ReactQuery',
  //       file: 'dist/react-pagination.production.min.js',
  //       format: 'umd',
  //       sourcemap: true,
  //       globals,
  //     },
  //     external,
  //     plugins: [
  //       replace({ 'process.env.NODE_ENV': `"production"`, delimiters: ['', ''] }),
  //       resolve(),
  //       babel(),
  //       commonJS(),
  //       externalDeps(),
  //       terser(),
  //       size(),
  //       visualizer(),
  //     ],
  //   },
];
