import fetch from 'node-fetch';
import { plugin } from 'qiankun';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class apibq extends plugin {
  constructor() {
    super({
      name: '反击',
      dsc: '反击!!!!',
      event: 'message',
      priority: -9999999999999999999999999999999999999999999999991,
      rule: [
        {
          reg: null,
          fnc: 'bq',
        }
      ],
    });

    this.initialize();
  }

  async initialize() {
    const regexString = await this.buildRegexString();
    this.rules = [
      {
        reg: new RegExp(regexString),
        fnc: 'bq',
      }
    ];
  }

  async buildRegexString() {
    const emojiNames = await this.getEmojiNames();
    return `/#?随机(${emojiNames.join('|')})表情/i`;
  }

  async getEmojiNames() {
    try {
      const response = await fetch('https://api.yunxiyuanyxy.xyz/emoji/?list=all');
      const data = await response.json();
      return Object.keys(data);
    } catch (error) {
      console.error('Error fetching emoji data:', error.message);
      return ['aw', 'az'];
    }
  }

  async bq(e) {
    await e.reply('aw');
  }
}
