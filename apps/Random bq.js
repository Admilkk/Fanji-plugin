import fs from 'fs'
import path from 'path';
import cm from '../lib/common/CM.js';
import { fileURLToPath } from 'url';
import https from 'https';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const apiurl = 'https://api.yunxiyuanyxy.xyz/emoji/?type=302&list=';
const regs = '塞西莉亚|宇佐纪|斗图|暹罗猫|猫猫|色|茧';

export class apibq extends plugin {
  constructor() {
    super({
      name: '反击',
      dsc: '反击!!!!',
      event: 'message',
      priority: -9999999999999999999999999999999999999999999999991,
      rule: [
        {
          reg: '^#?查看全部随机表情$',
          fnc: 'allbq'
        },
        {
          reg: '^#?(随机)?(#|.*)表情', 
          fnc: 'bq'
        }
      ], 
    });
  }

  async bq(e) {
    const message = e.msg; 

    // 直接更新正则表达式
    const response = await fetch(`${apiurl}all`);
    const data = await response.json();
    const keys = Object.keys(data);
    this.keysString = keys.join('|');
    this.rule[1].reg = new RegExp(`#?((随机)?(${this.keysString})表情|随机表情)`, 'i');

    const matchResult = message.match(this.rule[1].reg);
    if (matchResult && matchResult[3]) {
      const emojiName = matchResult[3];
      await e.reply([segment.image(`${apiurl}${emojiName}`)]);
    } else {
      return false;
    }
    return false;
  }


  async allbq(e) {
	  const messages = ['全部表情:']
      const response = await fetch(`${apiurl}all`);
      const data = await response.json();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          messages.push(`${key}: ${data[key]}张`);
        }
      }
	  let forward = await common.makeForwardMsg(e, messages, '全部表情')
	  await e.reply(forward)
  }
}
