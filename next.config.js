require("dotenv").config();

const { config } = require("dotenv");
const webpack = require("webpack");

//Setup so environment in .env can be read and consumed using bundle webpack
module.exports = {
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  },
  reactStrictMode: true,
};
