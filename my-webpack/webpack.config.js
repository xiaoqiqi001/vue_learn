let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let Uglifyjs  = require('uglifyjs-webpack-plugin')
let webpack = require('webpack')
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let axios = require('axios')

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
  // 解析第三方包 定义目录别名
  resolve: {
    modules: [path.resolve('node_modules')],
    // 如果在项目代码中，引入文件，但是没有写文件的后缀名，就默认按照下面的顺序寻找
    extensions: ['.js', '.css', '.vue'],
    alias: { // 定义项目中要使用的地址别名，定义以后就可以使用import引入这个名称
      '@': path.resolve(__dirname),
      myCss: '@/src/index.css'
    }
  },
  devServer: {
    // port: 3000,
    progress: true,
    contentBase: './build',
    // open: true,
    // 1. 配置开发代理
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        pathRewrite: { "/api": "" } // 将上面的/api在请求链接中替换为空串
      },
    },
    // 2. 在webpack中直接使用express，模拟接口
    before (app) {
      // app.get('/test', (req, res) => {
      //   console.log('1222')
      //   axios.get('https://book.douban.com/j/home/review_recommend?user_id=').then(result1 => {
      //     res.json({ test: JSON.stringify(result1) })
      //   })
      // })
    }
  },
  mode: 'development',
  entry: {
    home: './src/index.js',
    other: './src/other.js'
  },
  output: {
    // [name]就代表上面入口文件的home, other
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  // 1. source-map，源码映射，会单独生成一个source-map文件，出错了会标示到确定的文件中 大而全
  // 2. eval-source-map，不会产生单独的source-map文件，但是出错了也会标示到确定的文件中
  // 3. cheap-module-source-map，不会产生列，但是是一个单独的映射文件，可以保留用作调试
  // 4. cheap-module-eval-source-map，不会产生文件，集成在打包后的文件中，也不会产生列
  devtool: 'cheap-module-source-map', // 增加映射文件（sourcemap）
  // 只要修改了代码，代码就会自动打包
  // watch: true,
  // // 上面watch的选项
  // watchOptions: {
  //   poll: 2000, // 每隔多久查看是否要更新
  //   aggregateTimeout: 500, // 防抖，每隔500毫秒打包一次
  //   ignored: /node_modules/ // 忽略不需要监控的文件夹
  // },
  plugins: [ // 放置所有webpack插件，多页面打包
    new HtmlWebpackPlugin({ // 对模版文件进行操作
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseInlineTagWhitespace: true
      },
      hash: true,
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({ // 生成第二个html文件other.html，并且引入home.js和other.js
      template: './src/index.html',
      filename: 'other.html',
      minify: {
        removeAttributeQuotes: true,
        collapseInlineTagWhitespace: true
      },
      hash: true,
      chunks: ['home', 'other']
    }),
    new MiniCssExtractPlugin({ // 将放在style标签中的样式另起一个文件存起来
      filename: 'css/main.css'
    }),
    new webpack.ProvidePlugin({ // 向每个js文件中注入$变量
      $: 'jQuery'
    }),
    new CleanWebpackPlugin(), // 每次打完包，先把build目录清空，再把文件放进去
    new CopyWebpackPlugin([ // 每次打包的时候，把doc目录拷贝到build目录中去
      {
        from: './src/doc',
        to: './doc'
      }
    ]),
    // 定义一个环境变量，可以在js代码中直接使用变量名
    new webpack.DefinePlugin({
      env: "'dev'"
    })
  ],
  // externals: { // 不需要打包的插件
  //   jquery: 'jquery'
  // },
  module: { // 模块
    noParse: /jquery/, // 不去解析jquery这个依赖中的依赖关系
    rules: [
      {
        test: /(png|gif|jpg)$/, // 当图片小于多少K的时候 用base64来转化 否则用file-loader来产生真实的图片
        exclude: /node_modules/, // 在加载loader的时候不对node_modules中的文件进行过滤
        include: path.resolve('src'), // 只对src目录下的文件进行过滤
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 200 * 1024,
              outputPath: 'img/', // 把图片放在build/img下
              publicPath: 'http://img4.imgtn.bdimg.com' // 给生成的图片都加上这个路径
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