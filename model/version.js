import base from './base.js'

export default class Version extends base {
   constructor (e) {
        // 调用父类构造函数
        super(e)
        // 设置model属性
        this.model = 'version'
    }

    /** 生成版本信息图片 */
   async getData (versionData) {
        // 获取版本号
        const version =
            (versionData && versionData.length && versionData[0].version) || '1.0.0'
        // 获取数据
        let data = {
            ...this.screenData,
            userId: version,
            quality: 100,
            saveId: version,
            versionData
        }
        // 返回数据
        return data
    }
}
