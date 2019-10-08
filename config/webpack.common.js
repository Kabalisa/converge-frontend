
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/**
 * Parses environment variables into a format acceptable by the webpack DefinePlugin
 * @param {object} configs Object literal containing configuration variables to
 * parse before sending them to react
 */
const parseConfigs = configs => Object.keys(configs || {}).reduce(
  (acc, val) => ({ ...acc, [val]: JSON.stringify(configs[val]) }),
  {},
);

// fetch system environment variables
const systemEnvVariables = parseConfigs(process.env);

// fetch environment variables from the dotenv file
const { parsed: dotenvConfigs } = dotenv.config();

// process the environment variables inorder to be able to pass them to react
const processedDotenvConfigs = parseConfigs(dotenvConfigs);


module.exports = {
  entry: {
    bundle: path.join(__dirname, '..', 'src', 'index.js'),
    styleGlobals: './src/assets/styles/index.scss',
    analytics: path.join(__dirname, '..', 'src', 'containers', 'Analytics.js'),
    setup: path.join(__dirname, '..', 'src', 'containers', 'Setup.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true, // default is false
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        use: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { ...processedDotenvConfigs, ...systemEnvVariables },
    }),
    new MiniCssExtractPlugin(),
  ],
};
