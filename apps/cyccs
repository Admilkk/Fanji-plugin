export class chuo extends plugin {
  constructor() {
    super({
      name: '戳一111111',
      dsc: '戳一戳触发效果',
      event: 'notice.group.poke',
      priority: -Infinity,
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
    if (e.target_id !== e.self_id && e.operator_id !== e.self_id) {
      try {
        const FKey = `${e.operator_id}5AFE${e.target_id}`;
        // logger.info(Fkey)
        // 判断这个 FKey 是否存在
        const exists = await redis.exists(FKey);

        if (!exists) {
          await redis.set(FKey, '1', 'EX', 300);
          return false;
        } else {
          await redis.expire(FKey, 300);
          return false;
        }
      } catch (error) {
        await e.reply(['发生了亿点点小错误' + error.message]);
      }
    } else {
      return false;
    }
    return false
  }


}