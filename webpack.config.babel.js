/* eslint global-require: "off", import/no-dynamic-require: "off" */
require('@babel/register');

module.exports = env =>
  require(`./webpack/webpack.${env}.js`);
