let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let Uglifyjs  = require('uglifyjs-webpack-plugin')
let webpack = require('webpack')

module.exports = {
  optimization: {
    // minimizer: [
    //   new Uglifyjs({ // 压缩js
    //     cache: true,
    //     parallel: true,
    //     sourceMap: true
    //   }),
    //   new OptimizeCss() // 压缩css
    // ]
  },
  devServer: {
    port: 3000,
    progress: true,
    contentBase: './build',
    open: false,
    before (app) {
      app.get('/test', (req, res) => {
        res.json({ test: 111 })
      })
    }
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [ // 放置所有webpack插件
    new HtmlWebpackPlugin({ // 对模版文件进行操作
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseInlineTagWhitespace: true
      },
      hash: true
    }),
    new MiniCssExtractPlugin({ // 将放在style标签中的样式另起一个文件存起来
      filename: 'main.css'
    }),
    new webpack.ProvidePlugin({ // 向每个js文件中注入$变量
      $: 'jQuery'
    })
  ],
  // externals: { // 不需要打包的插件
  //   jquery: 'jquery'
  // },
  module: { // 模块
    rules: [
      {
        test: /(png|gif|jpg)$/, // 当图片小于多少K的时候 用base64来转化 否则用file-loader来产生真实的图片
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 200 * 1024
            }
          }
        ]
      },
      {
        test: /(png|gif|jpg)$/, // 默认会在内部生成一张图片，放在build目录下
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      // {
      //   test: require.resolve('jquery'),
      //   use: 'expose-loader?$'  // 把jquery对象挂载在window对象上
      // },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: 'pre' // 强制让这个loader在其他loader之前运行
      //     }
      //   }
      // },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: { // 用babel-loader把es6专程es5
              presets: [
                '@babel/preset-env'
              ],
              plugins: [
                '@babel/plugin-transform-runtime' // 对api进行转化
              ]
            }
          }
        ],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      // 规则：css-loader（解析@import这种语法）
      // style-loader 把css插入到head标签中
      // 顺序：从右到左，从下到上
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}
