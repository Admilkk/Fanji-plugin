import { createApps, getAppName } from 'alemonjs'
// 获取当前插件的名称
const AppName = getAppName(import.meta.url)
// 引入fs模块
import fs from 'node:fs'
// 读取当前插件下的apps文件夹下的所有js文件
const files = fs
  .readdirSync(`./plugins/${AppName}/apps`)
  .filter(file => file.endsWith('.js'))
// 创建一个空数组用于存放apps
let ret = []
// 遍历文件，将文件路径添加到ret数组中
files.forEach(file => {
  ret.push(import(`./apps/${file}`))
})
// 等待所有文件加载完毕
ret = await Promise.allSettled(ret)
// 创建一个空对象用于存放apps
const apps = {}
// 遍历文件，将文件名作为key，文件内容作为value，添加到apps对象中
for (const i in files) {
  const name = files[i].replace('.js', '')
  // 如果文件加载失败，则报错并跳过
  if (ret[i].status != 'fulfilled') {
    console.error(`载入插件错误：${name}`)
    console.error(ret[i].reason)
    continue
  }
  // 将文件内容添加到apps对象中
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
// 创建apps对象
const app = createApps(import.meta.url)
// 将apps对象添加到app中
app.component(apps)
// 挂载app
app.mount()