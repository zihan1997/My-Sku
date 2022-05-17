const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    mode: 'development',
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/build",
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {
        modules: ["node_modules", path.resolve(__dirname, "src")],
        extensions: [".js", ".jsx", ".json", ".css"]
    },
    // externals: {
    //     'react': 'React'
    // },
    devServer: {
        hot: true,
        port: 3000,
    },

    plugins: [
        new HtmlWebpackPlugin({template: "./public/index.html"}),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            "React": "react",
        })
    ]
}