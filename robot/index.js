import fs from 'node:fs';
import path from 'path';
import { AppName } from '../app.config.js';
import chalk from 'chalk';

export const appsOut = async ({ AppsName }) => {
  // 获取插件名称
  const firstName = `plugins/${AppName}`;
  // 获取插件路径
  const filepath = `./${firstName}/${AppsName}`;
  // 存储插件名称
  const name = [];
  // 存储插件路径
  const sum = [];
  // 遍历插件路径
  const travel = (dir, callback) => {
    // 读取插件名称
    fs.readdirSync(dir).forEach(file => {
      // 判断插件名称是否为js文件
      if (file.search('.js') != -1) name.push(file.replace('.js', ''));
      // 获取插件路径
      let pathname = path.join(dir, file);
      // 判断插件路径是否为文件夹
      if (fs.statSync(pathname).isDirectory()) {
        // 递归遍历文件夹
        travel(pathname, callback);
      } else {
        // 调用回调函数
        callback(pathname);
      }
    });
  };
  // 遍历插件路径
  travel(filepath, path => {
    // 判断插件路径是否为js文件
    if (path.search('.js') != -1) sum.push(path);
  });
  // 存储插件对象
  let apps = {};
  // 遍历插件路径
  for (let item of sum) {
    // 获取插件地址
    let address = `..${item.replace(/\\/g, '/').replace(`${firstName}`, '')}`;
    try {
      // 导入插件
      let allExport = await import(address);
      // 获取插件属性
      let keys = Object.keys(allExport);
      // 遍历插件属性
      keys.forEach(key => {
        // 判断插件属性是否为类
        if (allExport[key].prototype) {
          // 判断插件对象是否已经存在该类
          if (apps.hasOwnProperty(key))
            logger.info(
              `Template detection:已经存在class ${key}同名导出\n    ${address}`
            );
          // 存储插件对象
          apps[key] = allExport[key];
          logger.info(chalk.cyan('[Fanji-plugin]'), `加载${address.replace(/\.\.\/apps\//g, '')}文件完成`);
        } else {
          logger.info(
            `Template detection:存在非class属性${key}导出\n    ${address}`
          );
        }
      });
    } catch (error) {
      logger.error(chalk.red(`[Fanji-plugin] 加载${address.replace(/\.\.\/apps\//g, '')}文件失败: ${error.message}`));
    }
  }
  // 返回插件对象
  return apps;
};
