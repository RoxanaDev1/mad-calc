const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const CLIENT_DIR = path.join(__dirname, "./src/client");
const BUILD_DIR = path.join(__dirname, "./build");

const ENV = `${process.env.NODE_ENV}`;
console.log("ENV:", ENV);

module.exports = {
    entry: path.join(CLIENT_DIR, "index.tsx"), //Define the entry point for the project
    output: {   //Define where the compilation package would be placed
        filename: "bundle.js",
        path: BUILD_DIR
    },

    mode: ENV === 'prod' ? 'production' : 'development',

    target: 'node',

    // Enable sourcemaps for debugging webpack's output.
    // http://blog.teamtreehouse.com/introduction-source-maps
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/, },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Mad Calc',
            template: path.join(CLIENT_DIR, "index.html")
          }),
        new Dotenv({path: path.resolve(__dirname, ENV === 'prod' ? '.env.prod' : '.env.dev' )})
    ]
};