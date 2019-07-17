const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './src/index.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        library: 'goshare-client',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}

module.exports = config;