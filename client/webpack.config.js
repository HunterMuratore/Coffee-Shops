const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const WebpackPwaManifest = require('webpack-pwa-manifest');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const is_prod = process.env.NODE_ENV.trim() === 'production';

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Coffee Shop App',
    inject: 'body',
    template: path.join(__dirname, './src/index.html')
  }),
  new CleanWebpackPlugin(),
];

if (is_prod) {
  plugins.push(new GenerateSW({
    clientsClaim: true,
    skipWaiting: true,
  }));

  plugins.push(new WebpackPwaManifest({
    name: 'Coffee Shop App',
    short_name: 'CShop',
    description: 'App to find coffee around the world!',
    background_color: '#ffffff',
    publicPath: '/',
    inject: true,
    crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    icons: [
      {
        src: path.resolve('src/images/logo_bgWhite_512.png'),
        sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      },
      {
        src: path.resolve('src/images/logo_bgWhite_512.png'),
        size: '512x512', // you can also use the specifications pattern
        purpose: 'maskable'
      }
    ]
  }));
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.[fullhash].js', // Cache busting by making it create a new file name every time you build so it forces the browser to make a server request for the new file 
  },
  mode: is_prod ? 'production' : 'development',
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
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
    ],
  },
  plugins,
  devServer: {
    watchFiles: ['./src/lib/index.html'],
    port: 8080,
    proxy: {
      '*': 'http://localhost:3333' // This makes is so that all requests get made throught the 3333 port
    }
  }
};