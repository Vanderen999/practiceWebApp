// node js path modual
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// mode is the envierment dev or prod
let mode = "production";
/* target fixes a bug with browserlist and live reload and hot reload */
let target = "web";

if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}
/*
add to your scripts in packeage.json 
"build": "NODE_ENV-production webpack" 
and "build-dev": "webpack"
set mode in module.exports below to mode as the let var above

this will let you depending on what cmd you use build for dev or prod
*/

// exporting a node js object
module.exports = {
  // what mode it is in
  mode: "production",
  target: target,
  //   sets the entry point for the bundling process
  entry: "./src/index.js",
  output: {
    assetModuleFilename: "Assets/[contenthash][ext][query]",
  },
  devtool: false, // if you dont wont src maps like in the prod config use false
  devServer: {
    static: "./dist",
    /*
    Hot Module Replacement (or HMR) is one of the most useful features offered by webpack. It allows all kinds of modules to be updated at runtime without the need for a full refresh.
    Hot Module Replacement (HMR) exchanges, adds, or removes modules while an application is running, without a full reload. This can significantly speed up development in a few ways:

    Retain application state which is lost during a full reload.
    Save valuable development time by only updating what's changed.
    Instantly update the browser when modifications are made to CSS/JS in the source code, which is almost comparable to changing styles directly in the browser's dev tools.
    */
    hot: true,
  },
  module: {
    rules: [
      {
        // may or may not have an x like jsx file extension
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // imports images
      {
        test: /\.(png|jp?g|gif|svg)$/i,
        type: "asset/resource",
      },

      {
        // always use this loader order the order is very important
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "auto" },
          },
          // Creates `style` nodes from JS strings
          // "style-loader",
          //  Loads CSS file with resolved imports and returns CSS code
          "css-loader",
          // makes more advanced css useable
          "postcss-loader",
          // Loads and compiles a SASS/SCSS file into css
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // set the tital of the html page
      title: "yolo",
      // set the file name
      filename: "index.html",
      // set the url path to the main index html file to be used as a template
      template: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[hash].css",
    }),
  ],
  // resolve extension tells webpack to what kinds of files to infer
  resolve: {
    extensions: [".js", ".jsx"],
  },
  //   tells web pack where to output what it bundels
  output: {
    filename: "[name].[contenthash].js",
    // __dirname stands for directory part of and from node js
    path: path.resolve(__dirname, "dist"),
    clean: true,
    // puts the imag and other resourses into an img folder
    assetModuleFilename: "images/[hash][ext][query]",
  },
};
