import { pipeline } from 'stream'
import { promisify } from 'util'
import fetch from 'node-fetch'
import fs from 'node:fs'
import path from 'node:path'
import common from './common.js';
import _ from 'lodash';
const token = '5201314';
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
async function check (userQQ) {
        const apiUrl = 'https://api.admilk.top/api.php';
        const response = await fetch(apiUrl);
        const data = await response.json();
        const userQQString = String(userQQ);
        return data.msqq.includes(userQQString);
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
	async function add(e) {
		        const match = e.msg.match(/^#加(ms|bt|black)(\d+)$/);
			let chek = this.check(e.user_id)
			if (!chek){
				e.reply('你没有权限')
				return
			}
        if (match) {
            const type = match[1];
            const qq = match[2];

            const apiUrl = `https://api.admilk.top/api.php?token=${token}&operate=add&qq=${qq}&type=${type}`;
            const response = await fetch(apiUrl);

            if (response.ok) {
                e.reply(`已添加 ${qq} 到 ${type} 数据。`);
            } else {
                e.reply('数据添加失败。');
            }
        } else {
            e.reply('无效的命令格式。');
        }
	}
	async function del (e) {
		       const match = e.msg.match(/^#删(ms|bt|black)(\d+)$/);
			 let chek = this.check(e.user_id)
			if (!chek){
				e.reply('你没有权限')
				return
			}			
        if (match) {
            const type = match[1];
            const qq = match[2];

            const apiUrl = 'https://api.admilk.top/api.php';
            const apiUrlWithParams = `${apiUrl}?token=${token}&operate=delete&qq=${qq}&type=${type}`;

            const response = await fetch(apiUrlWithParams);

            if (response.ok) {
                e.reply(`已删除 ${qq} 从 ${type} 数据中。`);
            } else {
                e.reply('数据删除失败。');
            }
        } else {
            e.reply('无效的命令格式。');
        }
	}
	async function changetime (e) {
		        const match = e.msg.match(/^#更改禁言时间(\d+)$/);
			let chek = this.check(e.user_id)
			if (!chek){
				e.reply('你没有权限')
				return
			}
        if (match) {
            const newTime = match[1];

            const apiUrl = `https://api.admilk.top/api.php?token=${token}&operate=gg&time=${newTime}&type=time`;
            const response = await fetch(apiUrl);  // 使用 GET 方法

            if (response.ok) {
                e.reply(`已更改禁言时间为 ${newTime} 秒。`);
            } else {
                e.reply('禁言时间更改失败。');
            }
        } else {
            e.reply('无效的命令格式。');
        }
    }
	




async function jiejin (e, tojiejin) {
	if (tojiejin === e.at) { 
				let chek = this.check(e.user_id)
			if (!chek){
				e.reply('你没有权限')
				return
			}
	}
   const apiUrl = 'https://api.admilk.top/api.php';

    // 获取原始时间
    const ysurl = await fetch(apiUrl);
    const ysjson = await ysurl.json();
    const ystime = ysjson.time;
if (ysjson.random) {
	await fetch(`https://api.admilk.top/api.php?token=${token}&operate=set&type=random&israndom=false`);

}
    // 发送更改时间的请求
    const apiUrlWithParams = `${apiUrl}?token=${token}&operate=gg&time=0&type=time`;
    const zeroApiResponse = await fetch(apiUrlWithParams);

    if (zeroApiResponse.ok) {
        e.reply(['#反击', segment.at(tojiejin)]);
    } else {
        e.reply('改变 API 时间失败。');
        return false;
    }

    // 等待一段时间（例如 2 秒）
    await common.sleep(2000);
	if (ysjson.random) {
await fetch(`https://api.admilk.top/api.php?token=${token}&operate=set&type=random&israndom=true`);
	}
    // 将 API 中的时间改回原来的值
    const revertApiUrlWithParams = `${apiUrl}?token=${token}&operate=gg&time=${ystime}&type=time`;
    const revertApiResponse = await fetch(revertApiUrlWithParams);

    if (revertApiResponse.ok) {
        logger.info(['API 时间已恢复。time:', ystime]);
    } else {
        e.reply('还原 API 时间失败。');
    }

    return true;
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
export default { eto, check, ck, add, del, jiejin, changetime, jiejin, mfm }
//, changetime, randomset, jiejin