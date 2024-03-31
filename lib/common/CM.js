import { pipeline } from 'stream'
import { promisify } from 'util'
import fetch from 'node-fetch'
import fs from 'node:fs'
import path from 'node:path'
import common from './common.js';
import _ from 'lodash';
const token = '5201314';
async function checkBot(e){
    if (e.adapter_name == 'QQBot')
    return false 
    else return true
}
async function eto(e) {
    var jsonDataArray = [];

    // 遍历对象的每个分支
    for (var key in e) {
        if (e.hasOwnProperty(key)) {
            try {
                // 尝试将每个分支的值转换为 JSON 格式的字符串
                var jsonData = JSON.stringify({ [key]: e[key] });
                jsonDataArray.push(jsonData);
            } catch (error) {
                console.error("转换为JSON时发生错误:", error);
            }
        }
    }

    // 将结果一次性发送
    try {
        // 将数组合并为一个字符串，使用逗号或其他分隔符分隔
        var combinedData = jsonDataArray.join(',\n');

        // 发送整个字符串
        e.reply(combinedData);
    } catch (error) {
        console.error("发送结果时发生错误:", error);
    }
}  

async function mfm (e, msg = [], dec = '', msgsscr = true) {
  
  if (!Array.isArray(msg)) {msg = [msg]}
  let name = msgsscr ? e.sender.card || e.user_id : e.bot.nickname
  let id = msgsscr ? e.user_id : e.self_id
  if (e.isGroup) {
    try {
      let info = await e.bot.getGroupMemberInfo(e.group_id, id)
      name = info.card || info.nickname
    } catch (err) { }
  }
  let userInfo = {
    user_id: id,
    nickname: name
  }
  let forwardMsg = []
  for (const message of msg) {
    if (!message) { continue }
    forwardMsg.push({...userInfo,message: message})
  }
  /** 制作转发内容 */
  try {
    if (e?.group?.makeForwardMsg) {
      forwardMsg = await e.group.makeForwardMsg(forwardMsg)
    } else if (e?.friend?.makeForwardMsg) {
      forwardMsg = await e.friend.makeForwardMsg(forwardMsg)
    } else {
      return msg.join('\n')
    }
    if (dec) {
      /** 处理描述 */
      if (typeof (forwardMsg.data) === 'object') {
        let detail = forwardMsg.data?.meta?.detail
        if (detail) {
          detail.news = [{ text: dec }]
        }
      } else {
        forwardMsg.data = forwardMsg.data
                .replace('<?xml version="1.0" encoding="utf-8"?>', '<?xml version="1.0" encoding="utf-8" ?>')
          .replace(/\n/g, '')
          .replace(/<title color="#777777" size="26">(.+?)<\/title>/g, '___')
          .replace(/___+/, `<title color="#777777" size="26">${dec}</title>`)
      }
    }
  } catch (err) { }
  return forwardMsg
}
async function check(userQQ) {
    const apiUrl = 'https://api.admilk.top/api.php';
    const response = await fetch(apiUrl);
    const data = await response.json();
    const userQQString = userQQ.toString();
    for (const qq of data.msqq) {
        if (qq === userQQString) {
            return true;
        }
    }
    return false;
}

	async function ck(e){
		    const apiUrl = 'https://api.admilk.top/api.php';
    const response = await fetch(apiUrl);
    const data = await response.json();
//
    // 检查用户是否在 msqq 数组中
    const hasPermission = await this.check(e.user_id);

    if (hasPermission) {
        // 检查 data.msqq 是否存在并且是一个数组
        if (data.msqq && Array.isArray(data.msqq)) {
            // 获取随机禁言时间的状态
            const randomStatus = data.random ? '开启' : '关闭';

            return e.reply(`BOTqq: ${data.btqq}\n主人QQ: ${data.msqq.join(', ')}\n禁言时间: ${data.time} 秒\n随机禁言时间: ${randomStatus}黑名单QQ:${data.black}`);
        } else {
            return e.reply('无效的数据格式。');
        }
    } else {
        
		e.reply('你没有权限')
		return false
		
    }
	}


function mkdirs (dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirs(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}
const CM = { 
    eto, 
    check, 
    ck, 
    mfm, 
    checkBot 
    }
export default CM
//, changetime, randomset, jiejin