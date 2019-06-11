/* eslint import/no-extraneous-dependencies: "off" */
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

const port = process.env.PORT || 8080;
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Shared config (for both production and development)
 */
export default {
  target: 'electron-renderer',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}/`,
    './renderer',
  ],

  output: {
    filename: '[name].bundle.[hash:6].js',
    chunkFilename: '[name].chunk.[hash:6].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['@babel/env', {
              modules: false,
            }],
            '@babel/react',
          ],
          plugins: [
            'react-hot-loader/babel',
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {},
        },
      ],
    }],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      __DEV__: !isProduction,
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../templates/index.ejs'),
      minify: {
        minifyCSS: true,
        minifyJS: true,
      },
      templateParameters: {
        // This object will be available in the template
      },
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,

      cacheGroups: {
        vendor: {
          test: /node_modules/,
          priority: -10,
        },

        default: {
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
