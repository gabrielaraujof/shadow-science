const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const plugins = [];

plugins.push(new htmlWebpackPlugin({
    hash: true,
    minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true
    },
    filename: 'index.html',
    template:  path.resolve(__dirname, 'demo', 'index.html'),
}));

plugins.push(new miniCssExtractPlugin({
    filename: 'shadow-sci.min.css'
}));

if (!devMode) {
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
}

module.exports = {
    entry: {
        app: './demo/index.js',
    },
    output: {
        filename: 'bundle.[hash:4].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            'shadow-sci': path.resolve(__dirname, 'src/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            hmr: devMode
                        }
                    },
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        },
                    },
                    "sass-loader"
                ],
            },  
        ]
    },
    mode: devMode,
    devServer: { 
        port: '7777',
        open: true,
    },
    plugins
}
