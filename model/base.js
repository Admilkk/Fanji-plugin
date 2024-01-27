// 导出base类，用于继承
export default class base {
    // 构造函数，传入参数e，默认为空对象
    constructor (e = {}) {
      this.e = e
      // 获取user_id
      this.userId = e?.user_id
        // 模型
        this.model = 'Fanji-plugin'
      // 获取当前工作目录
      this._path = process.cwd().replace(/\\/g, '/')
    }
  
    // 获取前缀
    get prefix () {
        return `Yz:btc-memz-plugin:${this.model}:`
    }
  
    /**
     * 截图默认数据
     * @param saveId html保存id
     * @param tplFile 模板html路径
     * @param pluResPath 插件资源路径
     */
   get screenData () {
      return {
        saveId: this.userId,
          tplFile: `./plugins/Fanji-plugin/resource/html/${this.model}/${this.model}.html`,
        /** 绝对路径 */
          pluResPath: `${this._path}/plugins/Fanji-plugin/resource/`
      }
    }
  }