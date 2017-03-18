const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
    // Entry points to the project
    entry: [
        'webpack/hot/dev-server',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '/src/app/app.js'),
    ],
    // Server Configuration options
    devServer: {
        contentBase: 'src/www', // Relative directory for base of server
        devtool: 'eval',
        hot: true, // Live-reload
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        inline: true,
        port: 3000, // Port Number
        host: 'localhost', // Change to '0.0.0.0' for external facing server
    },
    devtool: 'eval',
    output: {
        path: buildPath, // Path of output file
        filename: 'app.js',
    },
    plugins: [
        // Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        // Allows error warnings but does not stop compiling.
        new webpack.NoErrorsPlugin(),
        // Moves files
        new TransferWebpackPlugin([
            {from: 'www'},
        ], path.resolve(__dirname, 'src')),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/, // All .js files
                loaders: ['babel-loader'],
                exclude: [nodeModulesPath],
            },
        ],
    },
    node: {
        net: 'empty',
        dns: 'empty'
    }
};

module.exports = config;
