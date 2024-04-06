import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import getconfig from './model/cfg.js';
import fs from 'fs';
import yaml from 'yaml';
import lodash from 'lodash'
import cfg from "./model/index.js";
export function supportGuoba() {
  return {
    // 插件信息，将会显示在前端页面
    // 如果你的插件没有在插件库里，那么需要填上补充信息
    // 如果存在的话，那么填不填就无所谓了，填了就以你的信息为准
    pluginInfo: {
      name: 'Fanji-plugin',
      title: '反击插件',
      author: '@Admilk',
      authorLink: 'https://gitee.com/adrae',
      link: 'https://gitee.com/adrae/Fanji-plugin',
      isV3: true,
      isV2: false,
      description: '主要提供清凉图api功能',
      // 显示图标，此为个性化配置
      // 图标可在 https://icon-sets.iconify.design 这里进行搜索
      icon: 'mdi:stove',
      // 图标颜色，例：#FF0000 或 rgb(255, 0, 0)
      iconColor: '#d19f56',
      // 如果想要显示成图片，也可以填写图标路径（绝对路径）
      // iconPath: path.join(_paths.pluginRoot, 'resources/images/icon.png'),
    },
    // 配置项信息
    configInfo: {
      // 配置项 schemas
      schemas: [
        {
          field: 'pixiv',
          label: '是否开启pixiv代理',
          component: 'Switch'
        },
        {
          field: 'master',
          label: '主人QQ，必填',
          component: 'Input'
        },
      ],
      async getConfigData() {
        let { config } = getconfig(`config`, `config`)
        return config;
      },
      async setConfigData(data, { Result }) {
        // 1.读取现有配置文件
        const configFilePath = path.join(__dirname, 'config', 'config.yaml');
        let config = {};
        if (fs.existsSync(configFilePath)) {
          const configContent = fs.readFileSync(configFilePath, 'utf8');
          config = yaml.parse(configContent) || {};
        }
        // 2. 更新配置对象
        for (const [keyPath, value] of Object.entries(data)) {
          lodash.set(config, keyPath, value);
        }
        // 3. 将更新后的配置对象写回文件
        const updatedConfigYAML = yaml.stringify(config);
        fs.writeFileSync(configFilePath, updatedConfigYAML, 'utf8');
        logger.mark(`[Fanji:配置文件]配置文件更新`)
        return Result.ok({}, '保存成功~');
      }
    }
  }
}