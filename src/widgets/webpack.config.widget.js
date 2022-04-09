const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const dotenv = require('dotenv')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

// this will update the process.env with environment variables in .env file
dotenv.config();

const ROOT_DIR = path.join(__dirname,  '..', '..');
const WIDGETS_DIR = path.resolve('src');

function collectWidgets(path) {
  const widgets = {};
  glob.sync(`${path}/**/*.widget.@(ts|tsx)`).map(filePath => {
    const fileName = filePath.split('/').pop().split('.')[0];
    widgets[fileName] = filePath;
  });
  return widgets;
}

const config = {
  mode: 'production', 
  devtool: false,
  entry: collectWidgets(WIDGETS_DIR),
  output: {
    path: path.resolve(ROOT_DIR, 'public', 'static', 'widgets'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        include: [WIDGETS_DIR],
        loader: 'ts-loader',
        options: {
          transpileOnly: false,
          compilerOptions: {
            module: 'es2015',
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

module.exports = config;
