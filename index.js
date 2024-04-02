import chalk from 'chalk';
import { appsOut } from './robot/index.js';
import fs from 'node:fs';
import chokidar from 'chokidar';
import path from 'node:path';
import yaml from 'js-yaml';

import Setting from './config/utils/setting.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
(async () => {
  try {
    Setting.initCfg();
  } catch (error) {
    logger.error('载入Setting失败', error);
  }
  let CM;
  let lj;
  const libPath = path.resolve(__dirname, '../../lib/common/CM.js');
  const pluginPath = path.resolve(__dirname, './lib/common/CM.js');

  // 检查文件是否存在
  if (fs.existsSync(libPath)) {
    lj = 'file://' + libPath;
  } else {
    lj = 'file://' + pluginPath;
  }
  try {
    CM = await import(lj);
    global.cm = CM.default;
  } catch (error) {
    logger.error('载入CM.js失败', error);
  }
})();

const configFilePath = path.resolve('./config/config/other.yaml');
const otherConfigFilePath = path.resolve('./plugins/Fanji-plugin/config');

logger.info('\x1b[34m---------加载插件中---------\x1b[0m');




const apps = await appsOut({ AppsName: 'apps' }).then(req => {
  logger.info(`\n\t${chalk.white(`┌────────────────────────────┐`)}\t\n\t${chalk.cyan(`「Fanji-plugin载入中···」`)}\n\t${chalk.blue(`「载入成功！」`)}\n\t${chalk.yellow(`「交流群号：792873018   」`)}\n\t${chalk.white(`└───────────────────────────┘`)}\t`);
  return req;
});

export { apps };
