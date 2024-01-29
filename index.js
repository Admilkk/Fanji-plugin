
import chalk from 'chalk';
import { appsOut } from './robot/index.js';
import config from "./model/index.js";
import fs from 'node:fs';
import chokidar from 'chokidar';
import path from 'node:path';
logger.info('\x1b[34m---------加载插件中---------\x1b[0m');
await (async () => {
  const configFolderPath = path.resolve('./plugins/Fanji-plugin/configs');
  const defConfigFolderPath = './plugins/Fanji-plugin/def_config';

  let msg;

  try {
    // 检查 config 文件夹是否存在
    const configExists = await fs.promises.stat(configFolderPath).catch(() => null);

    if (configExists) {
      // 配置文件夹已存在，强制复制 def_config 下的除了 config.yaml 之外的所有文件
      const files = await fs.promises.readdir(defConfigFolderPath);

      // 遍历文件并强制复制到 config 文件夹
      await Promise.all(files.map(async (file) => {
        // 排除 config.yaml 文件
        if (file !== 'config.yaml') {
          const sourcePath = path.join(defConfigFolderPath, file);
          const destPath = path.join(configFolderPath, file);

          try {
            // 删除目标文件
            await fs.promises.unlink(destPath);
          } catch (unlinkError) {
            // 如果文件不存在，忽略错误
          }

          // 复制文件
          await fs.promises.copyFile(sourcePath, destPath);
        }
      }));

      msg = '强制复制配置文件完成';
    } else {
      // 如果不存在则创建并复制所有文件
      await fs.promises.mkdir(configFolderPath, { recursive: true });

      // 获取 def_config 文件夹下的所有文件
      const files = await fs.promises.readdir(defConfigFolderPath);

      // 遍历文件并复制到 config 文件夹
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
})();
const apps = await appsOut({ AppsName: 'apps' }).then(req => {
  logger.info(`\n\t${chalk.white(`┌────────────────────────────┐`)}\t\n\t${chalk.cyan(`「Fanji-plugin载入中···」`)}\n\t${chalk.blue(`「载入成功！」`)}\n\t${chalk.yellow(`「交流群号：详情请见插件gitee页面   」`)}\n\t${chalk.white(`└───────────────────────────┘`)}\t`);
  return req;
});
export { apps };