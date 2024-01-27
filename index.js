/*
 * @Author: 枫林 670979892@qq.com
 * @Date: 2023-10-28 14:29:41
 * @LastEditors: 枫林 670979892@qq.com
 * @LastEditTime: 2023-11-05 22:44:45
 * @FilePath: \MEMZ\btc-memz-plugin\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * 
 */
import chalk from 'chalk';
import { appsOut } from './robot/index.js';
import config from "./model/index.js";
import fs from 'node:fs';
import chokidar from 'chokidar';
import path from 'node:path';
logger.info('\x1b[34m---------加载插件中---------\x1b[0m');
async function createConfigFolder() {
  const configFolderPath = path.resolve('./plugins/Fanji-plugin/configs');
  const defConfigFolderPath = './plugins/Fanji-plugin/def_config';

  let msg;

  try {
    // 检查config文件夹是否存在
    const configExists = await fs.promises.stat(configFolderPath).catch(() => null);

    if (configExists) {
      // 配置文件夹已存在
      msg = '配置文件已存在';
    } else {
      // 如果不存在则创建
      await fs.promises.mkdir(configFolderPath, { recursive: true });

      // 获取def_config文件夹下的所有文件
      const files = await fs.promises.readdir(defConfigFolderPath);

      // 遍历文件并复制到config文件夹
      await Promise.all(files.map(async (file) => {
        const sourcePath = path.join(defConfigFolderPath, file);
        const destPath = path.join(configFolderPath, file);

        // 复制文件
        await fs.promises.copyFile(sourcePath, destPath);
      }));

      msg = '复制配置文件完成';
    }
  } catch (error) {
    msg = '创建和复制配置文件夹时出错：' + error.message;
    logger.error(msg);
  }

  logger.info(msg);
}


createConfigFolder();

const apps = await appsOut({ AppsName: 'apps' }).then(req => {
  logger.info(`\n\t${chalk.white(`┌────────────────────────────┐`)}\t\n\t${chalk.cyan(`「Fanji-plugin载入中···」`)}\n\t${chalk.blue(`「载入成功！」`)}\n\t${chalk.yellow(`「交流群号：776370425   」`)}\n\t${chalk.white(`└───────────────────────────┘`)}\t`);
  return req;
});
export { apps };