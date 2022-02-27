const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const dotenv = require('dotenv')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
    }
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
   })
  ]
};

module.exports = config;
