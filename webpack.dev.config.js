const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const isRunningServer = process.env.npm_lifecycle_event.includes('start');

module.exports = {
  mode: 'development',
  devtool: 'inline-cheap-module-eval-source-map',
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    compress: true,
    hot: true,
    host: '0.0.0.0',
    port: 3000,
    publicPath: '/script/',
    contentBase: [path.resolve(__dirname, 'front-vue'), path.resolve(__dirname, 'src/main/resources/static')],
    proxy: [
      {
        context: ['/api', '/login', '/logout'],
        target: 'http://localhost:8080',
        secure: false, // SSL verification
        proxyTimeout: 1000 * 60 * 10
      }
    ] // proxy options 에 대하여 잘 정리된 문서 = https://github.com/chimurai/http-proxy-middleware#context-matching
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './front-vue/template-index.html',
      filename: isRunningServer ? 'index.html' : '../../templates/index.html', // 개발 서버를 구동할 땐 ./front-vue/index.html 로 결과물이 나오도록 설정. webpack-dev-server 의 index 가 index.html 이고 실제 serve 하는 파일이기 때문
      alwaysWriteToDisk: isRunningServer
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(__dirname, 'front-vue')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};