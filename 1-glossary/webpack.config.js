require("dotenv").config();

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/*
  What should go here?  Great question!

  Before you go to documentation, verify which version of webpack
  you are using.

  Use this config to copy production versions of your
  index.html and styles.css to dist folder upon build
*/

module.exports = {
  entry:  path.join(__dirname, "client/src", "index.jsx"),
  output: {
    path: path.resolve(__dirname, "client/dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "client/src", "index.html"),
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.?jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};
