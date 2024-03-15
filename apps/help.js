import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import config from "../model/index.js";
// import Version from "../model/version.js";
import { Common, Data } from '../components/index.js'
import lodash from 'lodash'
import Theme from '../config/system/theme.js'
export class help extends plugin {
    constructor(e) {
        super({
            name: "Fanji插件帮助",
            dsc: "插件帮助插件帮助",
            event: "message",
            priority: 500,
            rule: [
                {
                    reg: /^#?((FANJI)|反击)(命令|帮助|菜单)$/gi,
                    fnc: "help",
                },
                {
                    reg: "^#*反击(插件)?版本$",
                    fnc: "version",
                }
            ],
        });
        // this.versionData = config.getConfig("version");
    }

    // 异步版本函数
    async version() {
        // 调用Version类，获取版本信息
        const data = await new Version(this.e).getData(this.versionData.slice(0, 3));
        // 调用puppeteer，获取图片
        let img = await puppeteer.screenshot("version", data);
        // 返回图片
        this.e.reply(img);
    }

    // 异步帮助函数
    async help(e) {
        let custom = {}
        let help = {}

        let { diyCfg, sysCfg } = await Data.importCfg('help')

        custom = help

        let helpConfig = lodash.defaults(diyCfg.helpCfg || {}, custom.helpCfg, sysCfg.helpCfg)
        let helpList = diyCfg.helpList || custom.helpList || sysCfg.helpList
        let helpGroup = []

        lodash.forEach(helpList, (group) => {
            if (group.auth && group.auth === 'master' && !e.isMaster) {
                return true
            }

            lodash.forEach(group.list, (help) => {
                let icon = help.icon * 1
                if (!icon) {
                    help.css = 'display:none'
                } else {
                    let x = (icon - 1) % 10
                    let y = (icon - x - 1) / 10
                    help.css = `background-position:-${x * 50}px -${y * 50}px`
                }
            })

            helpGroup.push(group)
        })
        let themeData = await Theme.getThemeData(diyCfg.helpCfg || {}, sysCfg.helpCfg || {})

        return await Common.render('help/index', {
            helpCfg: helpConfig,
            helpGroup,
            ...themeData,
            element: 'default'
        }, { e, scale: 1 })
    }


}
