
// const path = require('path');//引入path模块
// function resolve(dir) {
//   return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
// }
// chainWebpack: (config) => {
//   config.resolve.alias
//     .set('@', resolve('./src'))
//     .set("assets", resolve("@/assets"))
//     .set("components", resolve("@/components"))
//     .set("views", resolve("@/views"))
//     .set("common", resolve("@/common"))
//     .set("network", resolve("@/network"))
//   // //set第一个参数：设置的别名，第二个参数：设置的路径

// }

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}