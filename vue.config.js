
const pkg = require('./package')
var path = require('path')
const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const resolve = dir => path.join(__dirname, dir)
module.exports = {
    publicPath: './', // build 环境根路径，如有静态资源地址则填地址
    productionSourceMap: false,
    // outputDir: undefined,
    // assetsDir: undefined,
    runtimeCompiler: true,
    // parallel: undefined,
    // css: undefined,
    pages: {
        // index: './src/main.js',
        // center: './src/main.center.js',
        // admin: './src/main.admin.js',
        index: {
            entry: './src/main.js',
            title: '残联'
        },
        center: {
            entry: './src/main.center.js',
            title: '残联后台管理系统'
            // template: 'public/center.html'
        },
        admin: {
            entry: './src/main.admin.js',
            title: '残联机构后台管理系统'
            // template: 'public/center.html'
        },
    },
    devServer: {
        port: "8090", //代理端口
        // https:true,
        open: true, //项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
        proxy: {
            '/api': { //代理api
                // target: "http://8.129.144.107:60527/", //测试服务器地址
                // target: "http://disabled.sosoc.top:60527",
                // target: "http://bacl.wangduoyutz.top:80",
                target:"http://bacl.wangduoyutz.top",

                // target: "http://localhost:60527/", //测试服务器地址
                changeOrigin: true, //是否跨域
                ws: true, // proxy websockets
            }
        },
    },
    // configureWebpack: {
    //      //支持jquery
    //      plugins: [
    //         new webpack.ProvidePlugin({
    //             $:"jquery",
    //             jQuery:"jquery",
    //             "windows.jQuery":"jquery"
    //         })
    //      ]
    // },
}