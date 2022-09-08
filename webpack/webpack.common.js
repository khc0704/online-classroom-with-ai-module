const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const entry = path.resolve(__dirname, "../src/index/index.tsx");

const output = {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.[chunkhash].js",
};

const resolve = {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
};

const scriptRule = {
    test: /\.(t|j)sx?/,
    exclude: /node_modules/,
    use: [
        {
            loader: "babel-loader",
        },
    ],
};

const styleLoader = [
    {
        loader: process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
    },
    {
        loader: "css-loader",
        options: {
            sourceMap: true,
            modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
                auto: /\.module\.\w+$/i,
            },
        },
    },
    {
        loader: "postcss-loader",
        options: {
            sourceMap: true,
        },
    },
    {
        loader: "resolve-url-loader",
        options: {
            sourceMap: true,
        },
    },
    {
        loader: "sass-loader",
        options: {
            sourceMap: true,
        },
    },
];

const cssRule = {
    test: /\.(s[ac]|c)ss$/i,
    exclude: /node_modules/,
    use: styleLoader,
};

const lessRule = {
    test: /\.less$/i,
    exclude: /node_moudles/,
    use: styleLoader,
};

lessRule.use = [
    ...lessRule.use,
    {
        loader: "less-loader",
        options: {
            sourceMap: true,
        },
    },
];

const fileRule = {
    test: /\.(?:ico|gif|png|jpe?g|svg)$/i,
    type: "asset/resource",
    generator: {
        filename: "assets/images/[name]__[hash][ext]",
    },
};

const inlineRule = {
    test: /\.(woff(2)?|eot|ttf|otf)$/,
    type: "asset/inline",
    generator: {
        filename: "assets/fonts/[name]__[hash][ext]",
    },
};

const modules = {
    rules: [scriptRule, cssRule, lessRule, fileRule, inlineRule],
};

const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../src/index/index.html"),
    }),
    process.env.NODE_ENV === "production"
        ? new MiniCssExtractPlugin({
              filename: "bundle.[chunkhash].css",
          })
        : false,
].filter(Boolean);

module.exports = {
    entry: entry,
    output: output,
    resolve: resolve,
    module: modules,
    plugins: plugins,
};
