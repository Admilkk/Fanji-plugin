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
async function getEmojiData() {
  try {
    const response = await fetch('https://api.yunxiyuanyxy.xyz/emoji/?list=all');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching emoji data:', error.message);
    return {};
  }
}

// 构建正则表达式字符串的异步函数
async function buildRegexString() {
  try {
    // 获取表情数据对象
    const emojiData = await getEmojiData();

    // 提取所有键（表情名称）为数组
    const emojiNames = Object.keys(emojiData);

    // 将数组转换为字符串
    const emojiNamesString = emojiNames.join('|');

    // 构建正则表达式字符串
    const regexString = `/#随机\\((${emojiNamesString})\\)表情/i`;

    return new RegExp(regexString);
  } catch (error) {
    console.error('Error building regex string:', error.message);
    throw error; // 将错误传递给调用者
  }
}

export class apibq extends plugin {
  constructor() {
    super({
      name: '反击',
      dsc: '反击!!!!',
      event: 'message',
      priority: -9999999999999999999999999999999999999999999999991,
    });

    this.initialize();
  }

  async initialize() {
    try {
      // Build the regex once during initialization
      const regex = await buildRegexString();

      this.rules = [
        {
          reg: regex,
          fnc: 'bq',
        }
      ];
    } catch (error) {
      console.error('Initialization error:', error.message);
    }
  }

  async bq(e) {
    await e.reply('aw');
  }
}