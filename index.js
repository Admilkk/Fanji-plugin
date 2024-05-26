import fs from 'fs/promises';
import chokidar from 'chokidar';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Setting from './config/utils/setting.js';
import { AppName } from './app.config.js';
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
    const { apps: loadedApps, loadedFilesCount: count, loadedFilesCounterr: counterr } = await appsOut({ AppsName: 'apps' });
    apps = loadedApps;
    loadedFilesCount = count;
    loadedFilesCounterr = counterr;
    const endTime = Date.now();
    logger.info(logger.red(`[Fanji-plugin] 共加载了 ${loadedFilesCount} 个插件文件 ${loadedFilesCounterr} 个失败`));
    logger.info(`[Fanji-plugin] 插件加载完成，耗时 ${endTime - startTime} 毫秒`);
    logger.info('===========================================');
    logger.info(logger.green(('插件交流群: 792873018')));
    logger.info('===========================================\n');
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
  const jsFilePaths = await traverseDirectory(filepath);

  logger.info(`[Fanji-plugin] 开始加载插件`);

  const apps = {};

  await Promise.all(jsFilePaths.map(async (item) => {
    try {
      let allExport;
      if (moduleCache.has(item)) {
        allExport = moduleCache.get(item);
      } else {
        const address = new URL(`file://${item}`).href;
        allExport = await import(address);
        moduleCache.set(item, allExport);
      }
      for (const key of Object.keys(allExport)) {
        if (typeof allExport[key] === 'function' && allExport[key].prototype) {
          if (!apps.hasOwnProperty(key)) {
            apps[key] = allExport[key];
          } else {
            logger.info(`[Fanji-plugin] 已存在 class ${key} 同名导出: ${item}`);
          }
        }
      }
      loadedFilesCount++;
    } catch (error) {
      logger.error(`[Fanji-plugin] 加载 ${item} 文件失败: ${error.message}`);
      loadedFilesCounterr++;
    }
  }));

  return { apps, loadedFilesCount, loadedFilesCounterr };
};

async function traverseDirectory(dir) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    const paths = await Promise.all(files.map(async (file) => {
      const pathname = path.join(dir, file.name);
      if (file.isDirectory()) {
        return traverseDirectory(pathname);
      } else if (file.name.endsWith('.js')) {
        return pathname;
      }
      return null;
    }));
    return paths.flat().filter(Boolean);
  } catch (error) {
    logger.error('读取插件目录失败:', error.message);
    return [];
  }
}
