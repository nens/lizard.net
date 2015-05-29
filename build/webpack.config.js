module.exports = {
    entry: {
    	partners: "./partners"
    },
    output: {
        path: "../js/",
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            { test: /\.js$/, loader: "jsx-loader"},
            { test: /\.html$/, loader: "html" },
            { test: /\.(png|jpg|svg|woff|eot|ttf|otf)$/, loader: 'url-loader?limit=100000'}
        ]
    }
};