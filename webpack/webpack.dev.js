const webpack = require("webpack");
const path = require("path");

const mode = "development";

const devtool = "source-map";

const plugins = [new webpack.DefinePlugin({})];

const devServer = {
    static: {
        directory: path.resolve(__dirname, "../public"),
    },
    hot: true,
    compress: true,
    port: 9000,
};

module.exports = {
    mode: mode,
    devtool: devtool,
    plugins: plugins,
    devServer: devServer,
};
