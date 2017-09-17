const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCss = require('./webpack/css.extract');
const uglifyJs = require('./webpack/js.uglify');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');

const PATHS = {
    source: path.join(__dirname, 'public/assets'),
    build: path.join(__dirname, 'public/dist')
};

const common = merge([
    {
        entry: {
            'index': PATHS.source + '/js/index.js',
            'catalog': PATHS.source + '/js/catalog.js',
            'apartments': PATHS.source + '/js/apartments.js',
            'account': PATHS.source + '/js/account.js',
            'booking': PATHS.source + '/js/booking.js',
            'about': PATHS.source + '/js/about.js',
            'near': PATHS.source + '/js/near.js',
            'admin': PATHS.source + '/js/admin.js',
            'contacts': PATHS.source + '/js/contacts.js',
            'office': PATHS.source + '/js/office.js',
            'reviews': PATHS.source + '/js/reviews.js',
            'error': PATHS.source + '/js/error.js'
        },
        output: {
            path: PATHS.build,
            filename: 'js/[name].js'
        },
        devtool: 'cheap-eval-source-map',
        plugins: [
            new CleanWebpackPlugin(['public/dist']),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                chunks: ['index', 'catalog', 'apartments']
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common-1',
                chunks: ['office', 'near', 'contacts', 'about', 'booking', 'account', 'reviews']
            })
        ],
    },
    images(),
    fonts()
]);


module.exports = function(env) {
    if (env === 'production'){
        return merge([
            common,
            extractCss(),
            uglifyJs()
        ]);
    }
    if (env === 'development'){
        return merge([
            common,
            devserver(),
            sass(),
            css()
        ])
    }
};