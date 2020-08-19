const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, '../', 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'img/[name]_[hash:7].[ext]',
          }
        }]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      publicUrl: path.resolve(__dirname, '../', 'dist/uploads')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html' ,
      favicon: './src/assets/favicon.ico'
    }),
    new WriteFilePlugin(),
    new CopyWebpackPlugin(
      [{
        from: path.resolve(__dirname, '../../server/', 'uploads'),
        to: path.resolve(__dirname, '../', 'dist/uploads'),
        force: true
      }],
      { copyUnmodified: true }
    ),
    new CleanWebpackPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../', 'dist'),
    compress: true,
    port: 9000,
    hot: true
  }
}
