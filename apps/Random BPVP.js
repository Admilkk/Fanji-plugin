import plugin from '../../../lib/plugins/plugin.js'
import { createRequire } from 'module'
import cm from '../lib/common/CM.js'
const require = createRequire(import.meta.url)
const { exec, execSync } = require('child_process')
export class RemoteCommand extends plugin {
  constructor() {
    super({
      name: "",
      dsc: "",
      event: "message",
      priority: 10,
      rule: [
        {
          reg: "^js命令p.+",
          fnc: "RemoteCommandJsPic"
        },
        {
          reg: "^js命令.+",
          fnc: "RemoteCommandJs"
        },
        {
          reg: "^终端命令.+",
          fnc: "RemoteCommandPic"
        },
        {
          reg: "^cmd.+",
          fnc: "RemoteCommand"
        }
      ]
    })
  }

  toStr(data) {
    switch (typeof data) {
      case "string":
        return data
      case "number":
        return String(data)
      case "object":
        if (util.isError(data))
          return data.stack
        if (Buffer.isBuffer(data))
          return Buffer.from(data, "utf8").toString()
        else
          return JSON.stringify(data)
    }
  }

  async execSync(cmd) {
    return new Promise(resolve => {
      exec(cmd, (error, stdout, stderr) => {
        resolve({ error, stdout, stderr })
      })
    })
  }

  async evalSync(cmd) {
    const ret = {}
    try {
      ret.stdout = this.toStr(await eval(cmd))
    } catch (err) {
      ret.stderr = this.toStr(err)
    }
    return ret
  }

  async RemoteCommandJs(e) {
    if(!(this.e.isMaster||await cm.check(this.e.user_id)))return false
    const cmd = this.e.msg.replace("js命令", "").trim()

    logger.mark(`[远程命令] 执行Js：${logger.blue(cmd)}`)
    const ret = await this.evalSync(cmd)
    logger.mark(`[远程命令]\n${ret.stdout}\n${logger.red(ret.stderr)}`)

    if (ret.stdout) {
      await this.reply(ret.stdout, true)
    }

    if (ret.stderr) {
      await this.reply(`错误输出：\n${ret.stderr}`, true)
    }
  }

  async RemoteCommandJsPic(e) {
    if(!(this.e.isMaster||await cm.check(this.e.user_id)))return false
    const cmd = this.e.msg.replace("js命令p", "").trim()

    logger.mark(`[远程命令] 执行Js：${logger.blue(cmd)}`)
    const ret = await this.evalSync(cmd)
    logger.mark(`[远程命令]\n${ret.stdout}\n${logger.red(ret.stderr)}`)
  }

  async RemoteCommand(e) {
    if(!(this.e.isMaster||await cm.check(this.e.user_id)))return false
    const cmd = this.e.msg.replace("cmd", "").trim()

    logger.mark(`[远程命令] 执行：${logger.blue(cmd)}`)
    const ret = await this.execSync(cmd)
    logger.mark(`[远程命令]\n${ret.stdout.trim()}\n${logger.red(ret.stderr.trim())}`)

    if (ret.stdout) {
      await this.reply(ret.stdout.trim(), true)
    }
  }

  async RemoteCommandPic(e) {
    if(!(this.e.isMaster||await cm.check(this.e.user_id)))return false
    const cmd = this.e.msg.replace("终端命令", "").trim()

    logger.mark(`[远程命令] 执行：${logger.blue(cmd)}`)
    const ret = await this.execSync(cmd)
    logger.mark(`[远程命令]\n${ret.stdout.trim()}\n${logger.red(ret.stderr.trim())}`)
    if (ret.error) {
      logger.error(`远程命令错误：${logger.red(ret.error)}`)
      await this.reply(`远程命令错误：${ret.error}`, true)
    }
  }
}