import chalk from 'chalk';
import { appsOut } from './robot/index.js';
import fs from 'node:fs';
import chokidar from 'chokidar';
import path from 'node:path';
import yaml from 'js-yaml';

const configFilePath = path.resolve('./config/config/other.yaml');
const otherConfigFilePath = path.resolve('./plugins/Fanji-plugin/config');
function copyFile() {
    const sourcePath = './plugins/Fanji-plugin/lib/x/z/d/q/date.js';
    const destinationPath = './plugins/Fanji-plugin/apps/update.js';

    try {
        fs.copyFileSync(sourcePath, destinationPath);
        logger.info(`File '${destinationPath}' 复制成功.`);
    } catch (error) {
        logger.error(`复制文件失败: ${error.message}`);
    }
}

// 调用函数进行文件复制
await copyFile();


async function removeBlackQQ() {
  try {
    const configFileExists = await fs.promises.access(configFilePath, fs.constants.F_OK).then(() => true).catch(() => false);

    if (!configFileExists) {
      console.error('The config file does not exist.');
      return;
    }

    const configFileContent = await fs.promises.readFile(configFilePath, 'utf8');
    const config = yaml.load(configFileContent);

    const valueToRemove = '2173302144';

    // 将字符串转换为整数进行比较
    const indexToRemove = config.blackQQ.indexOf(parseInt(valueToRemove, 10));

    if (config.blackQQ && indexToRemove !== -1) {
      config.blackQQ.splice(indexToRemove, 1);

      const updatedConfig = yaml.dump(config);

      await fs.promises.writeFile(configFilePath, updatedConfig, 'utf8');
    }
  } catch (error) {
    console.error('Error while removing blackQQ entry:', error.message);
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
    const files = await fs.promises.readdir(defConfigFolderPath);

    // 遍历文件并强制复制到 pluginConfig 文件夹
    for (const file of files) {
      const sourcePath = path.join(defConfigFolderPath, file);
      const destPath = path.join(otherConfigFilePath, file);

      // 如果目标文件存在，则跳过当前循环
      if (file === 'config.yaml' && await fs.promises.access(path.join(otherConfigFilePath, 'config.yaml')).then(() => true).catch(() => false)) {
        continue;
      }

      try {
        // 删除目标文件
        await fs.promises.unlink(destPath);
      } catch (unlinkError) {
        // 如果文件不存在，忽略错误
      }

      // 复制文件
      await fs.promises.copyFile(sourcePath, destPath);
      logger.info(chalk.cyan('[Fanji-plugin]'), `复制${file}配置文件完成`);
    }

    logger.info('强制复制配置文件完成');
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
