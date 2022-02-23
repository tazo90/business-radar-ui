const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
    })
  ]
};

module.exports = config;
