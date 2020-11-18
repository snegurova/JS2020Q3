const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const SRC = path.resolve(__dirname, '/src/images/icons');


module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/js/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  mode: 'development',
  // mode: 'production',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Gem Puzzle',
      template: path.resolve(__dirname, './src/template.html'), // template
      filename: 'index.html', // output file
    }),
    // new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.min.css',
    }),
  ],

  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
      {
        test: /\.mp3$/,
        type: 'asset/resource',
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './assets/audio',
            },
          },
        ],
      },
      {
        test: /\.mp3$/,
        include: SRC,
        loader: 'file-loader'
      },
      {
        test: /\.wav$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './assets/audio',
            },
          },
        ],
      },
      // Fonts, SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      // CSS, PostCSS, Sass
      {
        test: /\.(scss|css)$/,
        // use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ],
      },
    ],
  }
}