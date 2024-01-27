import Redis from 'ioredis';

const redis = new Redis({
  port: 6379,
  host: '127.0.0.1',
  password: '',
});

export class chuo extends plugin {
  constructor() {
    super({
      name: '戳一111111',
      dsc: '戳一戳触发效果',
      event: 'notice.group.poke',
      priority: -999999999999991,
      rule: [
        {
          fnc: 'chuoyichu',
        },

      ],

    });
  }
//
async chuoyichu(e) {
  if (!e.isGroup) {
    e.reply('?');
    return true;
  }

  if (e.target_id != Bot.uin) {
    try {
      let key = 'true';
      let FKey = `${e.user_id}5AFE${e.target_id}`;
      
      // 判断这个FKey是否存在
      let ZT = await redis.exists(FKey);

      if (!ZT) {
        await redis.set(FKey, key, 'EX', 300);
        return false;
      } else {
        await redis.expire(FKey, 300);
		return false
      }
    } catch (error) {
      await e.reply('发生了亿点点小错误');
    }
  } else {
    return false;
  }
}


}