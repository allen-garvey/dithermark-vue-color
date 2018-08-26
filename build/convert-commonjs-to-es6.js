//because webpack only supports commonjs module export, not es6 modules
//fortunately, we only need to do a simple replacement to fix this

const replace = require('replace-in-file');
const options = {
  files: 'dist/vue-color.module.js',
  from: /^module.exports =/,
  to: 'export default',
};

replace(options);