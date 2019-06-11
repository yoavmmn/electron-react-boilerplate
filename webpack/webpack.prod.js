/* eslint import/no-extraneous-dependencies: "off" */
import path from 'path';
import merge from 'webpack-merge';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import commonConfig from './webpack.common';

export default merge(commonConfig, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: path.resolve(__dirname, '../dist'),
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'public' },
    ]),
  ],
});
