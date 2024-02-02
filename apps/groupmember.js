import fs from 'fs'
import path from 'path';
import cm from '../lib/common/CM.js';
import { fileURLToPath } from 'url';
import https from 'https';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/*
*作者：时先思
*传播请标注作者
*/
//我稍微改了亿点
export class example2 extends plugin {
  constructor () {
    super({
      name: '获取群员',
      dsc: '获取群员',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      priority: 5000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^#获取群员名单$',
          /** 执行方法 */
          fnc: 'getmember'
        },
        {
             /** 命令正则匹配 */
          reg: '^#保存群员名单$',
          /** 执行方法 */
          fnc: 'savemember'
        },
         {
             /** 命令正则匹配 */
          reg: '^#本地群员名单$',
          /** 执行方法 */
          fnc: 'getsavelist'
        }
      ]
    })
  }

  /** 获取群员消息 */
  async getmember (e) {
	  if (!await cm.check(e.user_id) || e.isMaster){e.reply('你没有权限啊');return false}
    this.reply(await e.runtime.common.makeForwardMsg(e,await this.getmemberlist(e, false),"当前群员名单"))
  }

   async getmemberlist(e, bcorck) {
	   if (bcorck) {
		     let member = await e.group.getMemberMap();
  let groupmember = [];

  member.forEach(item => {
    groupmember.push([`QQ号: ${item.user_id}, 昵称: ${item.nickname}头像：`,`https://q.qlogo.cn/headimg_dl?dst_uin=${item.user_id}&spec=640&img_type=jpg`]);
  });

  return groupmember;
}else{
  let member = await e.group.getMemberMap();
  let groupmember = [];

  member.forEach(item => {
    groupmember.push([`QQ号: ${item.user_id}, 昵称: ${item.nickname}头像：`,segment.image(`https://q.qlogo.cn/headimg_dl?dst_uin=${item.user_id}&spec=640&img_type=jpg`)]);
  });

  return groupmember;
	}
}

  async savemember(e) {
	  	  if (!await cm.check(e.user_id) || e.isMaster){e.reply('你没有权限啊');return false}
    let savepath = path.join(__dirname, '../data/groupmember');
    if (!fs.existsSync(savepath)) {
      fs.mkdirSync(savepath);
    }
    fs.writeFileSync(path.join(savepath, `${e.group_id}.json`), JSON.stringify(await this.getmemberlist(e, true)));
    this.reply("群名单保存成功！");
  }

  async getsavelist(e) {
	  	  if (!await cm.check(e.user_id) || !e.isMaster){e.reply('你没有权限啊');return false}
    if (!e.isGroup) return;

    let savepath = path.join(__dirname, '../data/groupmember', `${e.group_id}.json`);

    if (!fs.existsSync(savepath)) {
      return this.reply("本地群员名单不存在");
    }

    let grouplist = JSON.parse(fs.readFileSync(savepath, { encoding: 'utf8' }) || null);
    let formattedList = grouplist.map(item => [item[0], segment.image(item[1])]);

    this.reply(await e.runtime.common.makeForwardMsg(e, formattedList, "本地群员名单"));
  }
}
