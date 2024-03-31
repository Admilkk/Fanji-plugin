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
        group: '群消息互通',
        list: [
            {
                icon: 25,
                title: '#开启/关闭群消息互通',
                desc: '开启或者关闭'
            }
        ]
    }, {
        group: '实用工具',
        list: [
            {
                "icon": 28,
                "title": "#反击安装插件",
                "desc": "字面意思。"
            },
            {
                "icon": 28,
                "title": "#开启/关闭本群防全体",
                "desc": "用于开启或关闭本群的防止at全体功能。"
            },
            {
                "icon": 28,
                "title": "#开启/关闭防at全体",
                "desc": "用于开启或关闭全局的防止at全体功能。"
            },
            {
                "icon": 28,
                "title": "#设置本群防全体时间",
                "desc": "用于设置本群防止at全体功能的时间，单位为秒"
            },
            {
                "icon": 28,
                "title": "#设置防全体时间",
                "desc": "用于设置全局防止at全体功能的时间，单位为秒"
            },
            {
                icon: 28,
                title: '#一键禁言@xxx 123',
                desc: '可以不带@，改成#一键禁言123 123'
            },
            {
                icon: 28,
                title: '#一键打卡',
                desc: '在Bot在的全部群打卡'
            },
            {
                icon: 28,
                title: '#开启一键打卡',
                desc: '凌晨在Bot在的全部群打卡'
            },
            {
                icon: 28,
                title: '#关闭一键打卡',
                desc: '关闭凌晨在Bot在的全部群打卡'
            },
            {
                icon: 28,
                title: '#骂@xxx',
                desc: '字面意思，但是千万别忘了at哦~'
            },
            {
                icon: 28,
                title: '补充说明',
                desc: '第二个123指的是时间单位为秒可以不带'
            },
            {
                icon: 28,
                title: '#一键群发',
                desc: '一键给所有群发送内容'
            },
            {
                icon: 28,
                title: '#一键私发',
                desc: '一键给所有人发送内容'
            }
        ]
    }, {
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
                title: '#随机小姐姐视频',
                desc: '字面意思'
            },
            {
                icon: 29,
                title: '#随机loli图',
                desc: '字面意思'
            },
            {
                icon: 29,
                title: '#来n张随机loli图',
                desc: '可以在后面接上tag，如#随机loli图原神 黑丝'
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
                title: '随机[表情名字]表情',
                desc: '字面意思'
            },
            {
                icon: 29,
                title: '#查看全部随机表情',
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
                title: '#反击设置后门开启/关闭',
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
    },
    {
        group: '一键跑路功能',
        list: [
            {
                icon: 30,
                title: '#获取群员名单',
                desc: '字面意思'
            },
            {
                icon: 30,
                title: '#保存群员名单',
                desc: '保存于插件目录/data/groupmember/'
            },
            {
                icon: 30,
                title: '#本地群员名单',
                desc: '读取名单'
            }
        ]
    }
]

export const isSys = true
