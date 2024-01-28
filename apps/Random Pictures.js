import fetch from 'node-fetch';
import Redis from 'ioredis';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import cm from '../lib/common/CM.js';
import common from '../lib/common/common.js';

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath = path.join(__dirname, '../configs/config.yaml');
 */
const redis = new Redis({
  port: 6379,
  host: '127.0.0.1',
  password: '',
  //wa
});

export class apisetu extends plugin {
  constructor() {
    super({
      name: '反击',
      dsc: '反击!!!!',
      event: 'message',
      priority: -99999999991,
      rule: [
        {
          reg: /^#?随机(涩|色|瑟|塞|se)图$/i, // 无r18.所以不套转发
          fnc: 'ptst',
        },
        {
          reg: /^#?随机(r18)(图)?$/i, // R18，套了转发
          fnc: 'r18',
        },
        {
          reg: /^#?随机(兽耳|furry)(图)?$/i, // 无r18.所以不套转发
          fnc: 'fr',
        }
      ],
    });
  }

  async ptst(e) {
    try {
      await e.rely([segment.image('https://moe.jitsu.top/img')]);
    } catch (error) {
      await e.reply('出现了一点小问题');
    }
    return false;
  }

  async r18(e) {
    const keys = await redis.keys('*:cyctimes');
    const messages = ['你的涩图来啦'];

    messages.push(segment.image('https://moe.jitsu.top/img/?sort=r18'));
    const forward = messages;
    const forwardMsg = await common.makeForwardMsg(e, forward, '你要的色图来啦');

    await this.reply(forwardMsg);
  }

  async fr(e) {
    const messages = ['你的涩图来啦'];

    messages.push(segment.image('https://moe.jitsu.top/img/?sort=furry'));
    const forward = messages;
    const forwardMsg = await common.makeForwardMsg(e, forward, '你要的色图来啦');

    await this.reply(forwardMsg);
  }
}
