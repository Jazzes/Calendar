const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    mode: "production",
    module: {
        rules: [
            {
                test: /\.bundle\.ts$/,
                use: {
                    loader: "bundle-loader",
                    options: {
                        name: '[name]'
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html')
        })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
};