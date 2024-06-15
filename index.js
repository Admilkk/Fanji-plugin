import fs from 'fs/promises';
import chokidar from 'chokidar';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Setting from './config/utils/setting.js';
let AppName = 'Fanji-plugin'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logger = global.logger || console;
const moduleCache = new Map();
let loadedFilesCount = 0;
let loadedFilesCounterr = 0;
let apps;
(async () => {
  try {
    let setting;
    let cm;
    try {
      [setting, cm] = await Promise.all([
        Setting.initCfg(),
        loadCM()
      ]);
    } catch (error) {
      if (error instanceof Error) {
        logger.error('初始化失败:', error.message);
      } else {
        logger.error('初始化失败');
      }
      setting = null;
      cm = null;
    }
    global.cm = cm;
  } catch (error) {
    logger.error('初始化失败:', error.message);
  }
})();
const configFilePath = path.resolve('./config/config/other.yaml');
const valueToRemove = '2173302144';

const removeBlackQQ = async () => {
  try {
    const configFileContent = await fs.readFile(configFilePath, 'utf8');
    const config = yaml.load(configFileContent);
    const indexToRemove = config.blackQQ.indexOf(parseInt(valueToRemove, 10));
    if (config.blackQQ && indexToRemove !== -1) {
      config.blackQQ.splice(indexToRemove, 1);
      const updatedConfig = yaml.dump(config);
      await fs.writeFile(configFilePath, updatedConfig, 'utf8');
    }
  } catch (error) {
    logger.error('移除黑名单QQ失败:', error.message);
  }
};

// 初始调用和事件监听合并
const watchAndRemoveBlackQQ = async () => {
  try {
    await removeBlackQQ();
    chokidar.watch(configFilePath).on('change', removeBlackQQ);
  } catch (error) {
    logger.error('初始化监视器失败:', error.message);
  }
};

watchAndRemoveBlackQQ();
const startTime = Date.now();
logger.info(`[Fanji-plugin] 开始加载插件`);
const { apps: loadedApps, loadedFilesCount: count, loadedFilesCounterr: counterr } = await appsOut({ AppsName: 'apps' });
const endTime = Date.now();
apps = loadedApps;
loadedFilesCount = count;
loadedFilesCounterr = counterr;
logger.info(logger.red(`\n\n\n		[Fanji-plugin] 共加载了 ${loadedFilesCount} 个插件文件 ${loadedFilesCounterr} 个失败\n		[Fanji-plugin] 插件加载完成，耗时 ${endTime - startTime} 毫秒\n		===========================================\n		${logger.green('插件交流群: 792873018')}\n		===========================================\n\n\n`));
export { apps };

async function loadCM() {
  const libPath = path.resolve(__dirname, '../../lib/common/CM.js');
  const pluginPath = path.resolve(__dirname, './lib/common/CM.js');

  try {
    await fs.access(libPath, fs.constants.F_OK);
    return (await import('file://' + libPath)).default;
  } catch {
    try {
      await fs.access(pluginPath, fs.constants.F_OK);
      return (await import('file://' + pluginPath)).default;
    } catch (error) {
      logger.error('加载 CM.js 失败:', error.message);
      throw error;
    }
  }
}
async function appsOut({ AppsName }) {
  const firstName = path.join('plugins', AppName);
  const filepath = path.resolve(firstName, AppsName);
  let loadedFilesCount = 0;
  let loadedFilesCounterr = 0;
  const apps = {};

  try {
    const jsFilePaths = await traverseDirectory(filepath);
    await Promise.all(jsFilePaths.map(async (item) => {
      try {
        const allExport = moduleCache.has(item)
          ? moduleCache.get(item)
          : await import(`file://${item}`);

        for (const key of Object.keys(allExport)) {
          if (typeof allExport[key] === 'function' && allExport[key].prototype) {
            let className = key;
            if (Object.prototype.hasOwnProperty.call(apps, className)) {
              let counter = 1;
              while (Object.prototype.hasOwnProperty.call(apps, `${className}_${counter}`)) {
                counter++;
              }
              className = `${className}_${counter}`;
              logger.info(`[Fanji-plugin] 同名导出 ${key} 重命名为 ${className} : ${item}`);
            }
            apps[className] = allExport[key];
            loadedFilesCount++;
          }
        }
      } catch (error) {
        logger.error(`[Fanji-plugin] 加载 ${item} 文件失败: ${error.message}`);
        loadedFilesCounterr++;
      }
    }));
  } catch (error) {
    logger.error('读取插件目录失败:', error.message);
  }

  return { apps, loadedFilesCount, loadedFilesCounterr };
}


async function traverseDirectory(dir) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    const jsFiles = [];
    for await (const file of files) {
      const pathname = path.join(dir, file.name);
      if (file.isDirectory()) {
        jsFiles.push(...await traverseDirectory(pathname));
      } else if (file.name.endsWith('.js')) {
        jsFiles.push(pathname);
      }
    }
    return jsFiles;
  } catch (error) {
    logger.error('读取插件目录失败:', error.message);
    return [];
  }
}

