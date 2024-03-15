import lodash from 'lodash'
import cfg from "./model/index.js";
export function supportGuoba() {
  return {
    // 插件信息，将会显示在前端页面
    // 如果你的插件没有在插件库里，那么需要填上补充信息
    // 如果存在的话，那么填不填就无所谓了，填了就以你的信息为准
    pluginInfo: {
      name: '炸崽插件',
      title: 'Fanji-plugin',
      author: '@Admilk',
      authorLink: 'https://gitee.com/adrae',
      link: 'https://gitee.com/adrae/Fanji-plugin',
      isV3: true,
      isV2: false,
      description: '主要提供后台管理界面',
      // 显示图标，此为个性化配置
      // 图标可在 https://icon-sets.iconify.design 这里进行搜索
      icon: 'mdi:stove',
      // 图标颜色，例：#FF0000 或 rgb(255, 0, 0)
      iconColor: '#d19f56',
      // 如果想要显示成图片，也可以填写图标路径（绝对路径）
      // iconPath: path.join(_paths.pluginRoot, 'resources/images/icon.png'),
    },
    // 配置项信息
    /*
    configInfo: {
      // 配置项 schemas
      schemas: [
        {
          field: 'hasten',
          label: '插件加速',
          bottomHelpMessage: '是否需要启用插件加速(让您的崽快人一等)',
          component: 'Switch',
        },
      ],
      // 设置配置的方法（前端点确定后调用的方法）
      setConfigData(data, {Result}) {
        let config = {}
        for (let [keyPath, value] of Object.entries(data)) {
          lodash.set(config, keyPath, value)
        }
        config = lodash.merge({}, cfg.merged, config)
        cfg.config.reader.setData(config)
        return Result.ok({}, '保存成功~')
      },
    },*/
  }
}