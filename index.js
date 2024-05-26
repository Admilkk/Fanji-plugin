import fs from 'fs/promises';
import chokidar from 'chokidar';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Setting from './config/utils/setting.js';
import { AppName } from './app.config.js';
let loadedFilesCount
let loadedFilesCounterr
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logger = global.logger || console;
const moduleCache = new Map();
let apps;

(async () => {
  try {
    // 并行加载 Setting 和 CM
    const [setting, cm] = await Promise.all([
      (async () => {
        try {
          return await Setting.initCfg();
        } catch (error) {
          logger.error('Setting 初始化失败:', error.message);
          return null;
        }
      })(),
      (async () => {
        try {
          return await loadCM();
        } catch (error) {
          logger.error('加载 CM.js 失败:', error.message);
          return null;
        }
      })()
    ]);
    global.cm = cm;

    const startTime = Date.now();
    apps = await appsOut({ AppsName: 'apps' }).then(req => req);
    const endTime = Date.now();
	logger.info(`[Fanji-plugin] 共加载了 ${loadedFilesCount} 个插件文件 ${loadedFilesCounterr} 个失败`);
    logger.info(`[Fanji-plugin] 插件加载完成，耗时 ${endTime - startTime} 毫秒`);
    logger.info('===========================================');
    logger.info('插件交流群: 792873018');
    logger.info('===========================================\n');
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

export { apps, loadCM, appsOut };

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

  const jsFilePaths = await traverseDirectory(filepath);

  logger.info(`[Fanji-plugin] 开始加载插件`);
  logger.info('===========================================');

  const apps = {};
 loadedFilesCount = 0;
 loadedFilesCounterr = 0;

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
      logger.info(`[Fanji-plugin] 加载 ${item} 文件失败: ${error.message}`);
	  loadedFilesCounterr++
    }
  }));

  return apps;
}

async function traverseDirectory(dir) {
  return fs.readdir(dir, { withFileTypes: true })
    .then(files => Promise.all(files.map(file => {
      const pathname = path.join(dir, file.name);
      if (file.isDirectory()) {
        return traverseDirectory(pathname);
      } else if (file.name.endsWith('.js')) {
        return Promise.resolve(pathname);
      }
      return Promise.resolve(null);
    })))
    .then(paths => paths.flat().filter(Boolean))
    .catch(error => {
      logger.error('读取插件目录失败:', error.message);
      return [];
    });
}
