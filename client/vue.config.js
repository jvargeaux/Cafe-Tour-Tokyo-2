// vue.config.js
// ...

module.exports = {
  chainWebpack: config => {
    // remove vue-cli-service's progress output
    config.plugins.delete('progress')
    // optionally replace with another progress output plugin
    // `npm i -D simple-progress-webpack-plugin` to use
    config.plugin('simple-progress-webpack-plugin').use(require.resolve('simple-progress-webpack-plugin'), [
      {
        format: 'minimal', // options are minimal, compact, expanded, verbose
      },
    ])
  },
  devServer: {
    progress: false
  },
  configureWebpack: {
    devServer: {
      progress: false
    }
  },
  publicPath: '',
  lintOnSave: false
}

// process.env.NODE_ENV === 'production' ? '/dist' : '/'

// module.exports = {
//   devServer: {
//     stats: {
//       colors: true,
//       hash: false,
//       version: false,
//       timings: false,
//       assets: false,
//       chunks: false,
//       modules: false,
//       reasons: false,
//       children: false,
//       source: false,
//       errors: false,
//       errorDetails: false,
//       warnings: false,
//       publicPath: false
//     }
//   }
// }
