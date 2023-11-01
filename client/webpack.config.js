const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    inject: 'body', // Injects the script tag to the bottom of the body
    template: path.join(__dirname, './src/index.html'),
    // templateParameters: {
    //   titleValue: 'Coffee Shops App' // Injects variables you can use in the HTML
    // }
  })],
  devServer: {
    watchFiles: ['./src/lib/index.html'],
    port: 8080
  }
};