const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const plugins = [];

plugins.push(new htmlWebpackPlugin({
    hash: true, //para fazer versionamento
    minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true
    },
    filename: 'index.html',
    template:  path.resolve(__dirname, 'demo', 'index.html'),
}));

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
                    "style-loader",
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
    mode: process.env.NODE_ENV || 'production',
    devServer: { 
        port: '7777',
        open: true,
    },
    plugins
}
