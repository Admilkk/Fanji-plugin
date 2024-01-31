import chalk from 'chalk';
import { appsOut } from './robot/index.js';
import config from "./model/index.js";
import fs from 'node:fs';
import chokidar from 'chokidar';
import path from 'node:path';
import yaml from 'js-yaml';

const otherConfigFilePath = path.resolve('./config/config/other.yaml');
const pluginConfigFolderPath = path.resolve('./plugins/Fanji-plugin/configs');
const defConfigFolderPath = './plugins/Fanji-plugin/def_config';
const pluginConfigFilePath = path.join(pluginConfigFolderPath, 'config.yaml');
const defConfigFilePath = path.join(defConfigFolderPath, 'config.yaml');

async function compareAndAddKeys() {
  try {
    const defConfigContent = await fs.promises.readFile(defConfigFilePath, 'utf8');
    const pluginConfigContent = await fs.promises.readFile(pluginConfigFilePath, 'utf8');

    const defConfig = yaml.load(defConfigContent);
    let pluginConfigData = yaml.load(pluginConfigContent);

    const lines = pluginConfigContent.split('\n');

    // 遍历 defConfig，检查是否在 pluginConfig 中存在，如果不存在就添加
    Object.keys(defConfig).forEach((key) => {
      if (!(key in pluginConfigData)) {
        // 添加新键
        pluginConfigData[key] = defConfig[key];

        // 获取新增项在配置文件中的行号
        const lineIndex = lines.findIndex(line => line.includes(`${key}:`));
        if (lineIndex !== -1) {
          // 将注释添加到新键的上方
          pluginConfigData = {
            ...pluginConfigData,
            [key]: `# ${lines[lineIndex - 1].trim()}  # ${key}注释`,
          };
        }
      }
    });

    const updatedPluginConfig = yaml.dump(pluginConfigData);

    await fs.promises.writeFile(pluginConfigFilePath, updatedPluginConfig);

    logger.info('Plugin Config updated successfully.');
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
    // 检查 pluginConfig 文件夹是否存在
    const pluginConfigExists = await fs.promises.stat(pluginConfigFolderPath).catch(() => null);

    if (pluginConfigExists) {
      // pluginConfig 文件夹已存在，强制复制 def_config 下的除了 config.yaml 之外的所有文件
      const files = await fs.promises.readdir(defConfigFolderPath);

      // 遍历文件并强制复制到 pluginConfig 文件夹
      await Promise.all(files.map(async (file) => {
        // 排除 config.yaml 文件
        if (file !== 'config.yaml') {
          const sourcePath = path.join(defConfigFolderPath, file);
          const destPath = path.join(pluginConfigFolderPath, file);

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
      await fs.promises.mkdir(pluginConfigFolderPath, { recursive: true });

      // 获取 def_config 文件夹下的所有文件
      const files = await fs.promises.readdir(defConfigFolderPath);

      // 遍历文件并复制到 pluginConfig 文件夹
      await Promise.all(files.map(async (file) => {
        const sourcePath = path.join(defConfigFolderPath, file);
        const destPath = path.join(pluginConfigFolderPath, file);

        // 复制文件
        await fs.promises.copyFile(sourcePath, destPath);
      }));

      msg = '复制配置文件完成';
    }
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