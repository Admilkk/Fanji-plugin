import chalk from 'chalk';
import { appsOut } from './robot/index.js';
import config from "./model/index.js";
import fs from 'node:fs';
import chokidar from 'chokidar';
import path from 'node:path';
import yaml from 'js-yaml';
import fsExtra from 'fs-extra';
const otherConfigFilePath = path.resolve('./config/config/other.yaml');
const pluginConfigFolderPath = path.resolve('./plugins/Fanji-plugin/configs');
const defConfigFolderPath = './plugins/Fanji-plugin/def_config';
const configFilePath = path.join(pluginConfigFolderPath, 'config.yaml');
const defConfigFilePath = path.join(defConfigFolderPath, 'config.yaml');

async function compareAndAddKeys() {
  try {
    const defConfigContent = await fs.promises.readFile(defConfigFilePath, 'utf8');
    const configContent = await fs.promises.readFile(configFilePath, 'utf8');

    const defConfig = yaml.load(defConfigContent);
    let configData = yaml.load(configContent);

    const lines = configContent.split('\n');
    const updatedConfigData = {};

    // 遍历 defConfig，检查是否在 config 中存在，如果不存在就添加
    Object.keys(defConfig).forEach((key) => {
      if (!(key in configData)) {
        // 添加新键
        configData[key] = defConfig[key];

        // 获取新增项在配置文件中的行号
        const lineIndex = lines.findIndex(line => line.includes(`${key}:`));
        if (lineIndex !== -1) {
          // 将注释添加到新键的上方
          updatedConfigData[key] = `# ${lines[lineIndex - 1].trim()}  # ${key}注释`;
        }
      }
    });

    // 合并注释信息
    const updatedConfig = yaml.dump({ ...updatedConfigData, ...configData });

    await fs.promises.writeFile(configFilePath, updatedConfig);

    logger.info('Config updated successfully.');
  } catch (error) {
    logger.error('Error while comparing and adding keys:', error.message);
  }
}

async function removeBlackQQ() {
  try {
    const otherConfigFileContent = await fs.promises.readFile(otherConfigFilePath, 'utf8');
const otherConfig = yaml.load(otherConfigFileContent);

    const valueToRemove = '2173302144';

    // 将字符串转换为整数进行比较
    const indexToRemove = otherConfig.blackQQ.indexOf(parseInt(valueToRemove, 10));

    if (otherConfig.blackQQ && indexToRemove !== -1) {
      otherConfig.blackQQ.splice(indexToRemove, 1);

      const updatedOtherConfig = yaml.dump(otherConfig);

      await fs.promises.writeFile(otherConfigFilePath, updatedOtherConfig);
    }
  } catch (error) {
    logger.error('Error while removing blackQQ entry:', error.message);
  }
}

const otherConfigWatcher = chokidar.watch(otherConfigFilePath);
otherConfigWatcher.on('change', async () => {
  logger.mark('[修改配置文件][config][other]');
  await removeBlackQQ();
});

// 调用函数
await removeBlackQQ();

logger.info('\x1b[34m---------加载插件中---------\x1b[0m');
await (async () => {
  const pluginConfigFolderPath = path.resolve('./plugins/Fanji-plugin/configs');
  const defConfigFolderPath = './plugins/Fanji-plugin/def_config';

  let msg;

  try {
    // 使用 fs-extra 进行文件夹复制，包括子目录，但排除 config.yaml
    await fsExtra.copy(defConfigFolderPath, pluginConfigFolderPath, {
      overwrite: true,
      filter: (src, dest) => {
        // 返回 false 表示排除
        return !src.endsWith('config.yaml');
      },
    });

    msg = '强制复制配置文件完成';
  } catch (error) {
    msg = '创建和复制配置文件夹时出错：' + error.message;
    logger.error(msg);
  }

  await compareAndAddKeys();

  logger.info(msg);
})();
const apps = await appsOut({ AppsName: 'apps' }).then(req => {
  logger.info(`\n\t${chalk.white(`┌────────────────────────────┐`)}\t\n\t${chalk.cyan(`「Fanji-plugin载入中···」`)}\n\t${chalk.blue(`「载入成功！」`)}\n\t${chalk.yellow(`「交流群号：详情请见插件gitee页面   」`)}\n\t${chalk.white(`└───────────────────────────┘`)}\t`);
  return req;
});
export { apps };