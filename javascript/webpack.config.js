const path = require('path')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './example.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'example.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
}