module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api/user/': {
        target: 'http://192.168.100.44:8011/csf-permission/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/user/': ''
        }
      }
    }
  },
  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [
        // new UglifyJSPlugin()
      ],
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        minChunks: 1,
        automaticNameDelimiter: '.',
        cacheGroups: {
          vue: {
            name: 'vue',
            test: /[\\/]node_modules[\\/]vue/,
            priority: 20
          },
          'element-ui': {
            name: 'main',
            test: /[\\/]node_modules[\\/]element-ui/,
            priority: 20
          },
          utils: {
            name: 'utils',
            test: /[\\/]node_modules[\\/](axios|lodash|qs|moment)/,
            priority: 20
          },
          echarts: {
            name: 'echarts',
            test: /[\\/]node_modules[\\/]echarts/,
            priority: 14
          },
          swiper: {
            name: 'swiper',
            test: /[\\/]node_modules[\\/]swiper/,
            priority: 14
          },
          encrypt: {
            name: 'encrypt',
            test: /[\\/]node_modules[\\/](js-md5|node-forge)/,
            priority: 14
          },
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          }
        }
      }
    }
  }
}