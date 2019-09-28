// webpack的配置文件
// 引入node.js路径模块
const path = require("path");
//引入gzip压缩插件
// const CompressionPlugin = require('compression-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 导入webpack
const webpack = require("webpack");
module.exports = {
  // webpack4.0之后的写法,压缩代码,去除注释
  // webpack打包配置
  //1, 默认构建前先清除原来的dist文件夹(构建时传入 --no-clean 可关闭该行为
  outputDir: 'dist',
  //2,eslint语法检查
  lintOnSave: false,
  // 3，soourcemap
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      // new CompressionPlugin({ //gzip压缩配置
      //   test: /\.js$|\.html$|\.css/, //匹配文件名
      //   threshold: 10240, //对超过10kb的数据进行压缩
      //   deleteOriginalAssets: true, //是否删除原文件
      //   algorithm:'gzip',
      //   minRatio:0.8,
      // }),
      // 打包时去除掉console.log
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     warnings: false,
      //     compress: {
      //       // warnings: false,
      //       drop_debugger: true,
      //       drop_console: true,
      //     },
      //   },
      //   sourceMap: false,
      //   parallel: true,
      // })
    ]
  },
  //   configureWebpack:config=>{
  //     if(progress.env.NODE_ENV === 'production'){
  //       // 生产环境的配置
  //         return{
  //             plugins: [
  //                 new CompressionPlugin({
  //                     test:/\.js$|\.html$|.\css/, //匹配文件名
  //                     threshold: 10240,//对超过10k的数据压缩
  //                     deleteOriginalAssets: false //不删除源文件
  //                 })
  //             ]
  //         }
  //     }else {
  //       // 为开发环境修改配置...
  //     }
  // },
  // css配置
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        data: `@import "./src/assets/style/main.scss";`
      },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 20, // 换算的基数
            propList: ['*'],
          }),
        ]
      }
    }
  },
  devServer: {
    port: 8000, //端口号
    disableHostCheck: true,
    hot: true, //模块热替换
    compress: true, //gzip压缩
    // proxy: 'http://localhost:8000'//前端和后台不在同一主机,api请求代理到api服务器路径
  },
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target: "http://yapi.demo.qunar.com",
  //       ws: true,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/api": "/mock/24076/api" // rewrite path
  //       }
  //     }
  //   }
  // }
  // 插件选项

  pluginOptions: {
    foo: {
      // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
    }
  }

};