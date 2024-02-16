import plugin from '../../../lib/plugins/plugin.js'
import { createRequire } from 'module'
import _ from 'lodash'
import { Restart } from '../../other/restart.js'
import common from "../../../lib/common/common.js"
import cm from "../lib/common/CM.js"
const require = createRequire(import.meta.url)
const { exec, execSync } = require('child_process')
////////////////////////////////////////////////////////////////////
//                          _ooOoo_                               //
//                         o8888888o                              //
//                         88" . "88                              //
//                         (| ^_^ |)                              //
//                         O\  =  /O                              //
//                      ____/`---'\____                           //
//                    .'  \\|     |//  `.                         //
//                   /  \\|||  :  |||//  \                        //
//                  /  _||||| -:- |||||-  \                       //
//                  |   | \\\  -  /// |   |                       //
//                  | \_|  ''\---/''  |   |                       //
//                  \  .-\__  `-`  ___/-. /                       //
//                ___`. .'  /--.--\  `. . ___                     //
//              ."" '<  `.___\_<|>_/___.'  >'"".                  //
//            | | :  `- \`.;`\ _ /`;.`/ - ` : | |                 //
//            \  \ `-.   \_ __\ /__ _/   .-` /  /                 //
//      ========`-.____`-.___\_____/___.-`____.-'========         //
//                           `=---='                              //
//      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^        //
//         佛祖保佑       永无BUG     永不修改                  //
////////////////////////////////////////////////////////////////////
// 是否在更新中
let uping = false
/**
 * 处理插件更新
 */
export class Update extends plugin {
    constructor() {
        super({
            name: '更新Fanji插件',
            dsc: '更新插件',
            event: 'message',
            priority: -10,
            rule: [
                {
                    reg: '^#*(MS)?(反击|(H|h)(I|i)(T|t))(插件)?(强制|強制)?更新$',
                    fnc: 'update'
                },
                {
                    reg: /^#*(fanji|反击)(插件)?更新日志$/i,
                    fnc: 'uplog'
                  }
            ]
        })
    }
    /**
     * rule - 更新Fanji插件
     * @returns
     */
    async update() {
        if (!(this.e.isMaster || await cm.check(this.e.user_id))) { return true }
        /** 检查是否正在更新中 */
        if (uping) {
            await this.reply('已有命令更新中..请勿重复操作')
            return
        }
        /** 检查git安装 */
        if (!(await this.checkGit())) return
        const isForce = this.e.msg.includes('强制')
        /** 执行更新 */
        await this.runUpdate(isForce)
        /** 是否需要重启 */
        if (this.isUp) {
            // await this.reply("更新完毕，请重启云崽后生效")
            setTimeout(() => this.restart(), 2000)
        }
    }
    restart() {
        new Restart(this.e).restart()
    }
    /**
     * 饼干插件更新函数
     * @param {boolean} isForce 是否为强制更新
     * @returns
     */
    async runUpdate(isForce) {
        const _path = './plugins/Fanji-plugin/'
        let command = `git -C ${_path} pull --no-rebase`
        if (isForce) {
            command = `git -C ${_path} reset --hard origin && ${command}`
            this.e.reply('正在执行强制更新操作，请稍等')
        } else {
            this.e.reply('正在执行更新操作，请稍等')
        }
        /** 获取上次提交的commitId，用于获取日志时判断新增的更新日志 */
        this.oldCommitId = await this.getcommitId('Fanji-plugin')
        uping = true
        let ret = await this.execSync(command)
        uping = false

        if (ret.error) {
            logger.mark(`${this.e.logFnc} 更新失败：Fanji插件`)
            this.gitErr(ret.error, ret.stdout)
            return false
        }
        /** 获取插件提交的最新时间 */
        let time = await this.getTime('Fanji-plugin')

        if (/(Already up[ -]to[ -]date|已经是最新的)/.test(ret.stdout)) {
            await this.reply(`Fanji插件已经是最新版本\n最后更新时间：${time}`)
        } else {
            await this.reply(`Fanji插件\n最后更新时间：${time}`)
            this.isUp = true
            /** 获取Fanji组件的更新日志 */
            let logg = await this.getLog('Fanji-plugin')
            await this.e.reply(logg)
        }
        logger.mark(`${this.e.logFnc} 最后更新时间：${time}`)
        return true
    }
    /**
     * 获取插件的更新日志
     * @param {string} plugin 插件名称
     * @returns
     */
    async getLog(plugin = '') {
        // 执行命令，获取插件日志
        let cm = `cd ./plugins/${plugin}/ && git log  -20 --oneline --pretty=format:"%h||[%cd]  %s" --date=format:"%F %T"`
        let logAll
        try {
            logAll = await execSync(cm, { encoding: 'utf-8' })
        } catch (error) {
            logger.error(error.toString())
            this.reply(error.toString())
        }
        // 如果没有获取到日志，返回false
        if (!logAll) return false
        // 将日志按行分割
        logAll = logAll.split('\n')
        let log = []
        // 遍历日志，如果当前行不是上一次提交的id，则添加到log数组中
        for (let str of logAll) {
            str = str.split('||')
            if (str[0] == this.oldCommitId) break
            if (str[1].includes('Merge branch')) continue
            log.push(str[1])
        }
        // 获取日志行数
        let line = log.length
        // 将日志数组拼接成字符串
        log = log.join('\n\n')
        // 如果日志为空，返回空字符串
        if (log.length <= 0) return ''
        // 拼接结束信息
        let end = '更多详细信息，请前往gitee查看\nhttps://gitee.com/adrae/Fanji-plugin'
        // 调用common.makeForwardMsg函数，生成消息
        log = await common.makeForwardMsg(this.e, [log, end], `${plugin}更新日志，共${line}条`)
        return log
    }
    /**
     * 获取上次提交的commitId
     * @param {string} plugin 插件名称
     * @returns
     */
    async getcommitId(plugin = '') {
        let cm = `git -C ./plugins/${plugin}/ rev-parse --short HEAD`
        let commitId = await execSync(cm, { encoding: 'utf-8' })
        commitId = _.trim(commitId)
        return commitId
    }
    /**
     * 获取本次更新插件的最后一次提交时间
     * @param {string} plugin 插件名称
     * @returns
     */
    async getTime(plugin = '') {
        let cm = `cd ./plugins/${plugin}/ && git log -1 --oneline --pretty=format:"%cd" --date=format:"%m-%d %H:%M"`
        let time = ''
        try {
            time = await execSync(cm, { encoding: 'utf-8' })
            time = _.trim(time)
        } catch (error) {
            logger.error(error.toString())
            time = '获取时间失败'
        }
        return time
    }
    /**
     * 处理更新失败的相关函数
     * @param {string} err
     * @param {string} stdout
     * @returns
     */
    async gitErr(err, stdout) {
        let msg = '更新失败！'
        let errMsg = err.toString()
        stdout = stdout.toString()
        if (errMsg.includes('Timed out')) {
            let remote = errMsg.match(/'(.+?)'/g)[0].replace(/'/g, '')
            await this.reply(msg + `\n连接超时：${remote}`)
            return
        }
        if (/Failed to connect|unable to access/g.test(errMsg)) {
            let remote = errMsg.match(/'(.+?)'/g)[0].replace(/'/g, '')
            await this.reply(msg + `\n连接失败：${remote}`)
            return
        }
        if (errMsg.includes('be overwritten by merge')) {
            await this.reply(
                msg +
                `存在冲突：\n${errMsg}\n` +
                '请解决冲突后再更新，或者执行#强制更新，放弃本地修改'
            )
            return
        }
        if (stdout.includes('CONFLICT')) {
            await this.reply([
                msg + '存在冲突\n',
                errMsg,
                stdout,
                '\n请解决冲突后再更新，或者执行#强制更新，放弃本地修改'
            ])
            return
        }
        await this.reply([errMsg, stdout])
    }
    /**
     * 异步执行git相关命令
     * @param {string} cmd git命令
     * @returns
     */
    async execSync(cmd) {
        return new Promise((resolve, reject) => {
            exec(cmd, { windowsHide: true }, (error, stdout, stderr) => {
                resolve({ error, stdout, stderr })
            })
        })
    }
    /**
     * 检查git是否安装
     * @returns
     */
    async checkGit() {
        let ret = await execSync('git --version', { encoding: 'utf-8' })
        if (!ret || !ret.includes('git version')) {
            await this.reply('请先安装git')
            return false
        }
        return true
    }
    async getLog(plugin = '') {
        let cm = `cd ./plugins/Fanji-plugin/ && git log  -20 --oneline --pretty=format:"%h||[%cd]  %s" --date=format:"%F %T"`
        let logAll
        try {
          logAll = await execSync(cm, { encoding: 'utf-8', windowsHide: true })
        } catch (error) {
          logger.error(error.toString())
          this.reply(error.toString())
        }
        if (!logAll) return false
        logAll = logAll.split('\n')
        let log = []
        for (let str of logAll) {
          str = str.split('||')
          if (str[0] == this.oldCommitId) break
          if (str[1].includes('Merge branch')) continue
          log.push(str[1])
        }
        let line = log.length
        log = log.join('\n')
        if (log.length <= 0) return ''
        let end = '更多详细信息，请前往gitee查看\nhttps://gitee.com/chinese-cabbage-xzy/Mini-world-plugin'
        log = await common.makeForwardMsg(this.e, [log, end], `${plugin}更新日志，共${line}条`)
        return log
      }
async uplog() {
    let cm = `cd ./plugins/Fanji-plugin/ && git log  --oneline --pretty=format:"%h||[%cd]  %s" --date=format:"%F %T"`
    let logAll;
    try {
        logAll = await execSync(cm, { encoding: 'utf-8' });
    } catch (error) {
        logger.error(error.toString());
        this.reply(error.toString());
        return;
    }

    if (!logAll) {
        this.reply('获取日志失败');
        return;
    }

    logAll = logAll.split('\n');

    let batchSize = 100; // 每批100条日志
    let batchedLogs = [];
    let batch = [];
    for (let str of logAll) {
        let log = str.split('||')[1];
        if (!log.includes('Merge branch')) {
            batch.push(log);
            if (batch.length === batchSize) {
                batchedLogs.push(batch);
                batch = [];
            }
        }
    }
    if (batch.length > 0) {
        batchedLogs.push(batch);
    }

    for (let batchedLog of batchedLogs) {
        await this.sendBatchedMessages(batchedLog, this.e);
    }
}

// 辅助函数，发送批量消息
async sendBatchedMessages(messages, e) {
    let formattedMessage = messages.join('\n');
    await e.reply(await e.runtime.common.makeForwardMsg(e, formattedMessage, '反击插件更新日志'));
}




}