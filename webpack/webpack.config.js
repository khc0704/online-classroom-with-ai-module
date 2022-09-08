const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = () => {
    const env = process.env.NODE_ENV !== "production" ? "dev" : "prod";
    const envConfig = require(`./webpack.${env}.js`);
    const combineConfig = merge(commonConfig, envConfig);
    return combineConfig;
};
