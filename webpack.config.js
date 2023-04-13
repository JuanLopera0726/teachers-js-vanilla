// Esta es la herramienta para compilar-transpilar el código

// Sirve para identificar la ruta de donde se encuentra este archivo
const path = require('path');

// Trabajar con documentos html
const htmlWebpackPlugin = require('html-webpack-plugin');

// Extraer el código css, minificarlo y optimizarlo. Además lo agrega como parte del head
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Nos permite copiar archivos de una ruta a otra 
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Es una funcion que se crea con la flecha
module.exports = (env, argv) => {

    // Investigar operadores en javascript, diferencia existe entre el operador == y el ===
    const isProduction = argv.mode === 'production';

    return {
        entry: {
            index: './src/index.js',
            styles: './src/styles.js' 
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src/assets/js'),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        plugins: [
            new htmlWebpackPlugin({
                template: './src/index.html',
                chunks: ['index', 'styles']
            }),
            // averiguar que significa un spread operator
            ...(isProduction ? [new MiniCssExtractPlugin({ filename: 'assets/css/[name].[contenthash].css' })] : [])
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            open: true,
            hot: true,
            watchFiles: [
                'src/**/*'
            ]
        }
    };
}