import chalk from 'chalk';
import { appsOut } from './robot/index.js';
import config from "./model/index.js";
@@ -7,44 +6,45 @@ import chokidar from 'chokidar';
import path from 'node:path';
import yaml from 'js-yaml';

const configFilePath = path.resolve('./config/config/other.yaml');


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
    const indexToRemove = otherConfig.blackQQ.indexOf(parseInt(valueToRemove, 10));

      // 输出一些信息以便调试
     // logger.info('Original config:', config);
      //logger.info('Updated config:', yaml.load(updatedConfig));
    if (otherConfig.blackQQ && indexToRemove !== -1) {
      otherConfig.blackQQ.splice(indexToRemove, 1);

      await fs.promises.writeFile(configFilePath, updatedConfig);
      const updatedOtherConfig = yaml.dump(otherConfig);

      // logger.info(`Removed blackQQ entry with value ${valueToRemove}`);
    } else {
      // logger.info(`No blackQQ entry with value ${valueToRemove} found`);
      await fs.promises.writeFile(otherConfigFilePath, updatedOtherConfig);
    }
  } catch (error) {
    logger.error('Error while removing blackQQ entry:', error.message);
  }
}

const watcher = chokidar.watch(configFilePath);
watcher.on('change', async () => {
const otherConfigWatcher = chokidar.watch(otherConfigFilePath);
otherConfigWatcher.on('change', async () => {
  logger.mark('[修改配置文件][config][other]');
  await removeBlackQQ();
});
 await removeBlackQQ();

logger.info('\x1b[34m---------加载插件中---------\x1b[0m');
await (async () => {
  const configFolderPath = path.resolve('./plugins/Fanji-plugin/configs');
  const pluginConfigFolderPath = path.resolve('./plugins/Fanji-plugin/configs');
  const defConfigFolderPath = './plugins/Fanji-plugin/def_config';

  let msg;

  try {
    // 检查 config 文件夹是否存在
    const configExists = await fs.promises.stat(configFolderPath).catch(() => null);
    // 检查 pluginConfig 文件夹是否存在
    const pluginConfigExists = await fs.promises.stat(pluginConfigFolderPath).catch(() => null);

    if (configExists) {
      // 配置文件夹已存在，强制复制 def_config 下的除了 config.yaml 之外的所有文件
    if (pluginConfigExists) {
      // pluginConfig 文件夹已存在，强制复制 def_config 下的除了 config.yaml 之外的所有文件
      const files = await fs.promises.readdir(defConfigFolderPath);

      // 遍历文件并强制复制到 config 文件夹
      // 遍历文件并强制复制到 pluginConfig 文件夹
      await Promise.all(files.map(async (file) => {
        // 排除 config.yaml 文件
        if (file !== 'config.yaml') {
          const sourcePath = path.join(defConfigFolderPath, file);
          const destPath = path.join(configFolderPath, file);
          const destPath = path.join(pluginConfigFolderPath, file);

          try {
            // 删除目标文件
    await (async () => {
      msg = '强制复制配置文件完成';
    } else {
      // 如果不存在则创建并复制所有文件
      await fs.promises.mkdir(configFolderPath, { recursive: true });
      await fs.promises.mkdir(pluginConfigFolderPath, { recursive: true });

      // 获取 def_config 文件夹下的所有文件
      const files = await fs.promises.readdir(defConfigFolderPath);

      // 遍历文件并复制到 config 文件夹
      // 遍历文件并复制到 pluginConfig 文件夹
      await Promise.all(files.map(async (file) => {
        const sourcePath = path.join(defConfigFolderPath, file);
        const destPath = path.join(configFolderPath, file);
        const destPath = path.join(pluginConfigFolderPath, file);

        // 复制文件
        await fs.promises.copyFile(sourcePath, destPath);
 await (async () => {
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