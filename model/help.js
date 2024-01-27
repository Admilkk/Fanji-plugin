import base from './base.js'
import config from './index.js'
import cfg from '../../../lib/config/config.js'

export default class Help extends base {
    constructor(e) {
        super(e)
        this.model = 'help'
    }

    static async get(e) {
        let html = new Help(e)
        return await html.getData()
    }

    async getData() {
        // 获取帮助信息
        let helpData = config.getConfig('help')

        // 获取当前组信息
        let groupCfg = cfg.getGroup(this.group_id)

        // 如果当前组被禁用，则将帮助信息中的对应组设置为不可用
        if (groupCfg.disable && groupCfg.disable.length) {
            helpData.map((item) => {
                if (groupCfg.disable.includes(item.group)) {
                    item.disable = true
                }
                return item
            })
        }

        // 获取版本信息
        const versionData = config.getConfig('version')

        // 获取版本号
        const version =
            (versionData && versionData.length && versionData[0].version) || '1.0.0'

        // 返回帮助信息、版本号、保存id
        return {
            ...this.screenData,
            saveId: 'help',
            version,
            helpData
        }
    }
}