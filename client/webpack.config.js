const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [new HtmlWebpackPlugin({
    inject: 'body', // Injects the script tag to the bottom of the body
    template: path.join(__dirname, './src/index.html'),
    templateParameters: {
      titleValue: 'Coffee Shops App' // Injects variables you can use in the HTML
    }
  })],
};