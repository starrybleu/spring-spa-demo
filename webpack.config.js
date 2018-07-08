'use strict'

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const target = process.env.npm_lifecycle_event; // npm run dev || npm run prod 로 build 해야 함

const isProd = target === 'prod'; // [chunkhash] 는 prod 에서만 사용함

const common = {
  cache: true, // 캐시를 사용하지 않으면 매번 full build 를 한다. (webpack-dev-server 에서도)
  entry: { // key 이름이 entry point 의 이름이 되고, chunk 의 [name]으로 매핑된다.
    main: [path.join(__dirname, '/front-vue/index.js')]
  },
  output: {
    path: path.join(__dirname, '/src/main/resources/static/script/'), // 번들한 결과물이 위치할 실제 물리적인 파일 경로
    filename: isProd ? 'bundle.[name].[chunkhash].js' : 'dev-bundle.[name].js', // 번들한 결과물의 파일 이름
    chunkFilename: isProd ? 'bundle.[name].[chunkhash].js' : 'dev-bundle.[name].js', // entry 를 제외한 청크의 파일 이름
    publicPath: '/script/' // 번들한 결과물이 위치할 URL 경로
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/

      },
      {
        test: /\.js$/,
        loader: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/,
        loader: 'url-loader?limit=1024'
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ // template-index.html 을 기본으로 번들된 결과물을 </body> 태그 전에 삽입하고 spring boot 가 serve 할 수 있도록 경로를 바꿔서 저장(chunkhash 를 미리 알 수 없음)
      template: './front-vue/template-index.html',
      filename: '../../templates/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.npm_lifecycle_event': JSON.stringify(target)
    })
  ]
};

const prodConfig = {
  mode: 'production'
};

let config = {};
console.log('target: ', target);
if (target === 'prod') {
  console.log('### !!! production build... !!!');
  config = webpackMerge(common, prodConfig);
} else {
  console.log('### development build...');
  config = webpackMerge(common, require('./webpack.dev.config.js'));
}

module.exports = config;