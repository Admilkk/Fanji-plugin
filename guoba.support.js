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
  }
}