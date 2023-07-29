const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  return {
    mode: env.production ? 'production' : 'development',
    entry: './src/index.tsx',
    devtool: env.production ? false : 'inline-source-map',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, env.production ? 'build' : 'build_dev'),
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.ts(x?)$/i,
          loader: 'ts-loader',
          exclude: '/node_modules/',
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name].[contenthash][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name].[contenthash][ext]',
          },
        },
        ...(env.production
          ? [
              {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
              },
            ]
          : [
              {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
              },
            ]),
      ],
    },
    // pass all js files through Babel
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
      }),
      ...(env.production ? [new MiniCssExtractPlugin()] : []),
    ],
    devServer: {
      historyApiFallback: true,
      // static: {
      //   directory: path.join(__dirname, 'build_dev'),
      // },
      port: 3011,
    },
  };
};
