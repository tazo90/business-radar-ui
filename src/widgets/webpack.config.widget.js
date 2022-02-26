const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const dotenv = require('dotenv')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// this will update the process.env with environment variables in .env file
dotenv.config();

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
  entry: collectWidgets(__dirname),
  output: {
    path: path.resolve(__dirname, '..', '..', 'public', 'static', 'widgets'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        include: [path.resolve('src')],
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
