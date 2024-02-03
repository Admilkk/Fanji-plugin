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
          reg: new RegExp(`#?((随机)?(${regs})表情|随机表情)`, 'i'),
          fnc: 'bq'
        }
      ], 
    });
  }

  async bq(e) {
    const message = e.msg; 
    const matchResult = message.match(this.rule[0].reg);
    if (matchResult) {
      const emojiName = matchResult[3] ? matchResult[3] : 'sj';
      await e.reply([segment.image(`${apiurl}${emojiName}`)])
    } else {
      return false;
    }
	return false
  }
  async allbq(e) {
	  const messages = ['全部表情:']
    try {
      const response = await fetch(apiurl);
      const data = await response.json();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          messages.push(`${key}: ${data[key]}张`);
        }
      }
	  let forward = await common.makeForwardMsg(e, messages, '全部表情')
	  await e.reply(forward)
    } catch (error) {
      await e.reply('API爆炸了');
    }
  }
}
