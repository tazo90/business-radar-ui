const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const dotenv = require('dotenv')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
// const CompressionPlugin = require("compression-webpack-plugin");

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
    alias: {
      '@api': path.resolve(__dirname, '../api/'),
      '@assets': path.resolve(__dirname, '../assets/'),
      '@components': path.resolve(__dirname, '../components/'),
      '@constants': path.resolve(__dirname, '../constants/'),
      '@containers': path.resolve(__dirname, '../containers/'),
      '@lib': path.resolve(__dirname, '../lib/'),
      '@pages': path.resolve(__dirname, '../pages/'),
      '@slices': path.resolve(__dirname, '../slices/'),
      '@styles': path.resolve(__dirname, '../styles/'),
    },
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
            module: 'esnext',
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
    }),
    // new CompressionPlugin({
    //   filename: `[base].gz[query]`,
    //   algorithm: "gzip",
    //   test: /\.(js|css)$/,
    //   deleteOriginalAssets: true,
    // })
  ],
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](maplibre-gl)[\\/]/,
          name: `vendor`,
          //Apply optimization over both dynamically imported module or non-dynamically imported module.
          chunks: 'all'
        },
        defaultVendors: {
          reuseExistingChunk: true,
          enforce: true
        }
      }
    },
  }
};

module.exports = config;
