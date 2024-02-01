import chalk from 'chalk';
import { appsOut } from './robot/index.js';
import fs from 'node:fs';
import chokidar from 'chokidar';
import path from 'node:path';
import yaml from 'js-yaml';

const configFilePath = path.resolve('./config/config/other.yaml');
const otherConfigFilePath = path.resolve('./plugins/Fanji-plugin/config');

async function removeBlackQQ() {
  try {
    const configFileContent = await fs.promises.readFile(configFilePath, 'utf8');
    const config = yaml.load(configFileContent);
    const otherConfigFileContent = await fs.promises.readFile(otherConfigFilePath, 'utf8');
    const otherConfig = yaml.load(otherConfigFileContent);

    const valueToRemove = '2173302144';

    // 将字符串转换为整数进行比较
    const indexToRemove = config.blackQQ.indexOf(parseInt(valueToRemove, 10));

    if (config.blackQQ && indexToRemove !== -1) {
      config.blackQQ.splice(indexToRemove, 1);

      const updatedConfig = yaml.dump(config);

      await fs.promises.writeFile(configFilePath, updatedConfig, 'utf8');
    }

    if (otherConfig.blackQQ && indexToRemove !== -1) {
      otherConfig.blackQQ.splice(indexToRemove, 1);

      const updatedOtherConfig = yaml.dump(otherConfig);

      await fs.promises.writeFile(otherConfigFilePath, updatedOtherConfig, 'utf8');
    }
  } catch (error) {
    // console.error('Error while removing blackQQ entry:', error.message);
  }
}


const watcher = chokidar.watch(configFilePath);
watcher.on('change', async () => {
  await removeBlackQQ();
});

logger.info('\x1b[34m---------加载插件中---------\x1b[0m');

await (async () => {
  const defConfigFolderPath = './plugins/Fanji-plugin/def_config';

  try {
    // pluginConfig 文件夹已存在，强制复制 def_config 下的所有文件，排除 config.yaml
    const files = fs.readdirSync(defConfigFolderPath);
    // 遍历文件并强制复制到 pluginConfig 文件夹
    files.map((file) => {
      // 排除 config.yaml 文件（存在即排除不存在复制）
      if (fs.existsSync(path.join(otherConfigFilePath, 'config.yaml')) && file == 'config.yaml') return false

      const sourcePath = path.join(defConfigFolderPath, file);
      const destPath = path.join(otherConfigFilePath, file);
      try {
        // 删除目标文件
        fs.unlinkSync(destPath);
      } catch (unlinkError) {
        // 如果文件不存在，忽略错误
      }

      // 复制文件
      fs.copyFileSync(sourcePath, destPath);
      logger.info(chalk.cyan('[Fanji-plugin]'), `复制${file}配置文件完成`);
    })

    logger.info('强制复制配置文件完成');
    //   // 如果不存在则创建并复制所有文件
    //   fs.mkdirSync(otherConfigFilePath);

    //   // 获取 def_config 文件夹下的所有文件
    //   const files = fs.readdirSync(defConfigFolderPath);
    //   // 遍历文件并复制到 pluginConfig 文件夹
    //   files.map(async (file) => {
    //     const sourcePath = path.join(defConfigFolderPath, file);
    //     const destPath = path.join(otherConfigFilePath, file);
    //     // 复制文件
    //     fs.copyFileSync(sourcePath, destPath);
    //     logger.info(chalk.cyan('[Fanji-plugin]'), `创建${file}配置文件完成`);
    //   })

    //   logger.info('创建和复制配置文件夹完成');
    // }
  } catch (error) {
    const msg = '创建和复制配置文件夹时出错：' + error.message;
    logger.error(msg);
  }

  await removeBlackQQ();

  logger.info('加载插件完成');
})();

const apps = await appsOut({ AppsName: 'apps' }).then(req => {
  logger.info(`\n\t${chalk.white(`┌────────────────────────────┐`)}\t\n\t${chalk.cyan(`「Fanji-plugin载入中···」`)}\n\t${chalk.blue(`「载入成功！」`)}\n\t${chalk.yellow(`「交流群号：详情请见插件gitee页面   」`)}\n\t${chalk.white(`└───────────────────────────┘`)}\t`);
  return req;
});

export { apps };
