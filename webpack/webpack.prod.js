const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = "production";

const devtool = "source-map";

const plugins = [new webpack.DefinePlugin({})];

module.exports = {
    mode: mode,
    devtool: devtool,
    plugins: plugins,
};
