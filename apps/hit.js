import fetch from 'node-fetch';
import Redis from 'ioredis';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import cm from '../lib/common/CM.js';
import common from '../lib/common/common.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath = path.join(__dirname, '../configs/config.yaml');


const redis = new Redis({
  port: 6379,
  host: '127.0.0.1',
  password: '',
  //wa
});

export class hitsomeone extends plugin {
  constructor() {
    super({
      name: '反击',
      dsc: '反击!!!!',
      event: 'message',
      priority: -99999999991,
      rule: [
        {
          reg: /^#反击$/,
          fnc: 'hit',
        },
        {
          reg: /^#开启反击$/,
          fnc: 'enableHit',
        },
        {
          reg: /^#关闭反击$/,
          fnc: 'disableHit',
        },
        {
          reg: /^#清除反击缓存$/,
          fnc: 'clearTimes',
        },
      ],
    });
  }

  async clearTimes(e) {
    if (e.isMaster || (await cm.check(e.user_id))) {
      try {
        // 获取所有键
        const keys = await redis.keys('*5AFE*');

        // 遍历所有键并删除
        const promises = keys.map(async (key) => {
          await redis.del(key);
        });

        await Promise.all(promises);

        await e.reply('已清除所有键');
      } catch (error) {
        logger.error('清除键时发生错误');
        await e.reply('发生了亿点点小错误');
      }
    }
  }

 async hit(e) {
  const yamlData = fs.readFileSync(filepath, 'utf8');
  const data = yaml.load(yamlData);
  const msg2 = ['无权限用户尝试反击! ', e.user_id, e.nickname];
  const isHitEnabled = await redis.get('hitset') === 'true';

  if (!isHitEnabled) {
    e.reply('反击未开启，请发送"#反击帮助"查看相关内容');
    return false; // 如果反击功能未开启，直接返回
  }

  // 为了方便阅读和修改，将 FKey 的生成移动到外部
  const FKey = `${e.at}5AFE${e.user_id}`;

  // 判断这个 FKey 是否存在
  const ZT = await redis.exists(FKey);

  if (ZT) {
    try {
      const totalSeconds = await getRandomTime();
      await e.group.muteMember(e.at, totalSeconds);
      await redis.del(FKey);
      return true;
    } catch (error) {
      console.error('反击时发生错误:', error.message);
      return false;
    }
  } else {
    e.reply('6');
    return false;
  }
}


  async enableHit(e) {
    const yamlData = fs.readFileSync(filepath, 'utf8');
    const data = yaml.load(yamlData);

    const msg = ['无权限用户尝试开启反击！', e.user_id, e.nickname];
    if (!(await cm.check(e.user_id) || e.isMaster || e.member.is_admin || e.member.is_owner)) {
      logger.info('无权限用户尝试开启反击！:', e.user_id, e.nickname);
      common.relpyPrivate(data.master, msg);
      e.reply('6');
      return false;
    }

    await redis.set('hitset', 'true');
    await e.reply('已开启反击！');
    return false;
  }

  async disableHit(e) {
    const yamlData = fs.readFileSync(filepath, 'utf8');
    const data = yaml.load(yamlData);
    const msg = ['无权限用户尝试开启反击！', e.user_id, e.nickname];
    if (!(await cm.check(e.user_id) || e.isMaster || e.member.is_admin || e.member.is_owner)) {
      logger.info('无权限用户尝试开启反击！:', e.user_id, e.nickname);
      common.relpyPrivate(data.master, msg);
      e.reply('6');
      return false;
    }

    await redis.set('hitset', 'false');
    await e.reply('已关闭反击！');
    return false;
  }

  async getRandomTime() {
    try {
      const apiUrl = 'https://api.admilk.top/math.php';
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        return data.time;
      } else {
        // 如果请求失败，返回默认的随机时间，也可以根据需要进行处理
        return Math.floor(Math.random() * 90 + 10);
      }
    } catch (error) {
      // 捕获异常，返回默认的随机时间
      console.error('Error fetching random time:', error);
      return Math.floor(Math.random() * 90 + 10);
    }
  }
}
