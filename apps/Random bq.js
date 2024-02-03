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
async function getEmojiNames() {
  try {
    const response = await fetch('https://api.yunxiyuanyxy.xyz/emoji/?list=all');
    const data = await response.json();
    return Object.keys(data);
  } catch (error) {
    console.error('Error fetching emoji data:', error.message);
    return [aw, az];
  }
}

// 构建正则表达式字符串
async function buildRegexString() {
  const emojiNames = await getEmojiNames();
  return `/#随机\\((${emojiNames.join('|')})\\)表情/i`;
}

// 主函数
async function main() {
  // 获取和构建正则表达式字符串
  const regexString = await buildRegexString();

  // 输出 regexString 字符串
  console.log(regexString);

  // 直接返回正则表达式字符串
  return regexString;
}

// 调用主函数并将返回值赋给 regs 变量
const regs = main();

export class apisetu extends plugin {
  constructor() {
    super({
      name: '反击',
      dsc: '反击!!!!',
      event: 'message',
      priority: -9999999999999999999999999999999999999999999999991,
      rule: [
        {
          reg: regs, // Use the result of buildRegex directly
          fnc: 'bq',
        }
      ],
    });
  }
  async bq(e) {
    await e.reply('aw');
  }
}

