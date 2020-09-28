const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const dotenv = require('dotenv');
const fs = require('fs');

let config = {
    entry: ['./src/index'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        modules: ['node_modules'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.([jt])s(x)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: [
                            [
                                '@babel/preset-env',
                                { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
                            ],
                            '@babel/preset-typescript',
                            '@babel/preset-react',
                        ],
                        plugins: [
                            // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
                            ['@babel/plugin-proposal-decorators', { legacy: true }],
                            ['@babel/plugin-proposal-class-properties', { loose: true }],
                            'react-hot-loader/babel',
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ],
    },
    devtool: 'eval-source-map',
    plugins: [new ForkTsCheckerWebpackPlugin(), new webpack.NamedModulesPlugin(), new HtmlWebpackPlugin({
        template: './public/index.html'
    })],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3000,
        sockPort: 8000,
        host: '0.0.0.0',
        disableHostCheck: true,
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "https://test.sssp.local:8000"
        },
    }
};

module.exports = (env, argv) => {

    let envConfig;

    if(argv.mode === 'production') {
        envConfig = { 
            path: '.envProd'
        };
    }
    else {
        envConfig = { 
            path: '.envDev'
        };
    }

    try {
        if (fs.existsSync(envConfig.path)) {
            const envFile = dotenv.config(envConfig).parsed;
            const envKeys = Object.keys(envFile).reduce((prev, next) => {
                prev[`process.env.${next}`] = JSON.stringify(envFile[next]);
                return prev;
              }, {});
            config.plugins.push(new webpack.DefinePlugin(envKeys));
        }
        return config;
      } catch(err) {
        console.error(err);
      }
}