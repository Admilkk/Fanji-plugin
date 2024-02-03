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

export class apisetu extends plugin {
  constructor() {
    super({
      name: '反击',
      dsc: '反击!!!!',
      event: 'message',
      priority: -9999999999999999999999999999999999999999999999991,
      rule: [],
    });

    // Call the async initialize function after constructing the instance
    this.initialize();
  }

  async initialize() {
    // 获取和构建正则表达式字符串
    const regexString = await buildRegexString();

    // 输出 regexString 字符串
    console.log(regexString);

    // 将正则表达式字符串设置为规则
    this.rules = [
      {
        reg: new RegExp(regexString),
        fnc: 'bq',
      }
    ];
  }

  async bq(e) {
    await e.reply('aw');
  }
}

// 获取表情名字
async function getEmojiNames() {
  try {
    const response = await fetch('https://api.yunxiyuanyxy.xyz/emoji/?list=all');
    const data = await response.json();
    return Object.keys(data);
  } catch (error) {
    console.error('Error fetching emoji data:', error.message);
    return [];
  }
}

// 构建正则表达式字符串
async function buildRegexString() {
  const emojiNames = await getEmojiNames();
  return `/#随机\\((${emojiNames.join('|')})\\)表情/i`;
}
