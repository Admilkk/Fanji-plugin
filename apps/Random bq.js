import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import cm from '../lib/common/CM.js';
import common from '../lib/common/common.js';
import { fileURLToPath } from 'url';
import https from 'https';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class apibq extends plugin {
  constructor() {
    super({
      name: '反击',
      dsc: '反击!!!!',
      event: 'message',
      priority: -9999999999999999999999999999999999999999999999991,
      rule: [
        {
          reg: /(#?(随机)?(塞西莉亚|宇佐纪|斗图|暹罗猫|猫猫|色|茧)表情|随机表情)/i,
          fnc: 'bq',
        }
      ],
    });
  }
  }

async bq(e) {
  const message = e.msg; // 获取消息文本

  
  // 使用正则表达式的match方法匹配消息文本
  const matchResult = message.match(/(#?(随机)?(塞西莉亚|宇佐纪|斗图|暹罗猫|猫猫|色|茧)表情|随机表情)/i);

  if (matchResult) {
    // matchResult[0] 匹配到的整个表情字符串
    // matchResult[3] 匹配到的表情名字
    const emojiName = matchResult[3];
    await e.reply(`您发送的表情名字是：${emojiName}`);
  } else {
    // 没有匹配到表情
    await e.reply('未识别到表情，请检查格式是否正确。');
  }
}
}


