// Rollup.js
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const
  productionMode = (process.env.NODE_ENV !== 'development'),
  values = require('./lib/json.cjs').flatten( require('./tokens.json'), '__', '__' ),

  // processing plugins
  plugins = [

    replace({
      values,
      preventAssignment: true
    })

  ],

  // output plugins
  pluginsOut = [

  ];

if (productionMode) {

  pluginsOut.push(

    terser({
      ecma: 2018,
      mangle: {
        toplevel: true
      },
      compress: {
        module: true,
        toplevel: true,
        unsafe_arrows: true,
        drop_console: true,
        drop_debugger: true
      },
      output: {
        quote_style: 1
      }
    })

  );

}


export default [

  // JavaScript
  {
    input: './src/js/main.js',
    output: {
      file: './build/js/main.js',
      format: 'es',
      plugins: pluginsOut
    },
    plugins
  }

];
