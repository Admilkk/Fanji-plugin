/*
* 此配置文件为系统使用，请勿修改，否则可能无法正常使用
*
* 如需自定义配置请复制修改上一级help_default.js
*
* */
import fs from 'fs';
let data = JSON.parse(fs.readFileSync('./package.json'));
export const helpCfg = {
  title: '反击帮助',
  subTitle: data.name + ' && Fanji-plugin',
  columnCount: 3,
  colWidth: 265,
  theme: 'all',
  themeExclude: ['default'],
  style: {
    fontColor: '#ceb78b',
    descColor: '#eee',
    contBgColor: 'rgba(6, 21, 31, .5)',
    contBgBlur: 4,
    headerBgColor: 'rgba(6, 21, 31, .4)',
    rowBgColor1: 'rgba(6, 21, 31, .2)',
    rowBgColor2: 'rgba(6, 21, 31, .35)'
  },
  bgBlur: false
}

export const helpList = [
  {
    group: '反击相关',
    list: [
      {
        icon: 28,
        title: '#反击',
        desc: '被戳一戳之后很生气？那就反击回去！'
      },
      {
        icon: 28,
        title: '#反击更新',
        desc: '更新你的反击插件'
      }
    ]
  }, {
    group: 'API类',
    list: [
      {
        icon: 29,
        title: '#随机涩图',
        desc: '字面意思'
      },
      {
        icon: 29,
        title: '#随机r18图',
        desc: '字面意思'
      },
      {
        icon: 29,
        title: '#来1张随机r18图',
        desc: '超级加倍!数字可替换'
      },
      {
        icon: 29,
        title: '#随机furry图',
        desc: '字面意思'
      },
	  {
        icon: 29,
        title: '#随机白丝',
        desc: '字面意思'
      },
	  {
        icon: 29,
        title: '#随机黑丝视频',
        desc: '字面意思'
      },
	  {
        icon: 29,
        title: '#随机白丝视频',
        desc: '字面意思'
      },
	  {
        icon: 29,
        title: '#随机云溪院图',
        desc: '字面意思'
      },
	  {
        icon: 29,
        title: '#来n张随机云溪院图',
        desc: '字面意思'
      },
	  {
        icon: 29,
        title: '#随机杂图',
        desc: '字面意思'
      },
	  {
        icon: 29,
        title: '#来n张随机杂图',
        desc: '字面意思'
      },
      {
        icon: 29,
        title: '#随机原神',
        desc: '字面意思'
      }
    ]
  },
  {
    group: '管理员命令',
    list: [
      {
        icon: 29,
        title: '#开启反击',
        desc: '字面意思'
      },
	  {
        icon: 29,
        title: '#开启反击',
        desc: '字面意思'
      },
      {
        icon: 29,
        title: '#关闭反击',
        desc: '字面意思'
      }
    ]
  }
]

export const isSys = true
