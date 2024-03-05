import fs from 'fs';
import path from 'path';
import cm from '../lib/common/CM.js';
import { fileURLToPath } from 'url';
import https from 'https';
import fetch from 'node-fetch';
import { dirname } from 'path';
import yaml from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filepath = path.join(__dirname, '../config/config.yaml');
let apiurl = 'https://api.yunxiyuanyxy.xyz/emoji/?list=';
const apiurl2 = 'https://api.yunxiyuanyxy.xyz/emoji/?list=';

// 读取配置文件
// const configContent = fs.readFileSync(filepath, 'utf8');
// let config = yaml.parse(configContent);

// 根据配置文件设置apiurl
// if (!config.hasOwnProperty('pixiv')) {
  // config.pixiv = false;
  // const updatedConfigContent = yaml.dump(config);
  // fs.writeFileSync(filepath, updatedConfigContent, 'utf8');
// }
// if (config.pixiv === true) {
  // apiurl = 'https://api.yunxiyuanyxy.xyz/emoji/?list=';
// }
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
          reg: '^#?((随机)?(.*)(表情)?|随机表情)$', 
          fnc: 'bq'
        },
        {
          reg: /^#?获取(随机)?(表情)?(正则|REG)$/i, 
          fnc: 'zz'
        },
      ], 
    });
	this.updateRegex()
  }
async zz(e) {
  if (e.isMaster || await cm.check(e.user_id)) {
    const lastUpdateTime = await redis.get('last_updatezz_time');
    const now = new Date().getTime();
    try {
      const response = await fetch(`${apiurl2}all`);
      const data = await response.json();
      const keys = Object.keys(data);
      this.keysString = keys.join('|');
      logger.mark('[反击][bq]获取正则');
      this.rule[1].reg = new RegExp(`#?((随机)?(${this.keysString})(表情)?|随机表情)`, 'i');

      // 保存当前时间为上次更新时间
      await redis.set('last_updatezz_time', now);

      // 保存正则表达式
      await redis.set('stored_regex', `#?((随机)?(${this.keysString})(表情)?|随机表情)`);
    } catch(error) {
      await e.reply('error connect to API');
      await e.reply(error.message);
    }
  }
}

async updateRegex() {
  // 获取上次更新时间
  const lastUpdateTime = await redis.get('last_updatezz_time');
  const now = new Date().getTime();
  try {
    if (!lastUpdateTime || now - lastUpdateTime > 1260000) {
      const response = await fetch(`${apiurl2}all`);
      const data = await response.json();
      const keys = Object.keys(data);
      this.keysString = keys.join('|');
      logger.mark('[反击][bq]获取正则');
      this.rule[1].reg = new RegExp(`#?((随机)?(${this.keysString})(表情)?|随机表情)`, 'i');

      // 保存当前时间为上次更新时间
      await redis.set('last_updatezz_time', now);

      // 保存正则表达式
      await redis.set('stored_regex', `#?((随机)?(${this.keysString})(表情)?|随机表情)`);
    } else {
      const storedRegex = await redis.get('stored_regex');
      if (storedRegex) {
        this.rule[1].reg = new RegExp(storedRegex, 'i');
      }
    }
  } catch(error) {
    const storedRegex = await redis.get('stored_regex');
    if (storedRegex) {
      this.rule[1].reg = new RegExp(storedRegex, 'i');
    }
  }
}




async bq(e) {
	try {
  const message = e.msg; 
  await this.updateRegex();

  const matchResult = message.match(this.rule[1].reg);
  
  if (!matchResult || !matchResult[3]) {
    return false;
  }

  let emojiName = matchResult[3].replace(/\s+/g, ''); 
  if (e.msg === '#随机表情' || e.msg === '随机表情') {
    emojiName = 'sj';
  }
logger.mark(emojiName)

  await e.reply([segment.image(`${apiurl}${emojiName}`)]);
  return false;
	}catch(error){
  return false;
	}
}





  async allbq(e) {
	  const messages = ['全部表情:']
      const response = await fetch(`${apiurl2}all`);
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
