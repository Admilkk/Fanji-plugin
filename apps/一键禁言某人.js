
import plugin from '../../../lib/plugins/plugin.js';
//import cm from '../lib/common/CM.js';
export class GetUser extends plugin {
  constructor(e = {}) {
    super({
      name: '反击管理',
      dsc: '实用工具',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#一键(封杀|禁言)(\\d+)?( )?(\\d+)?$',
          fnc: 'Kill',
        },
      ],
    });

    this.e = e;
  }


  async Kill() {
    if (await cm.check(this.e.user_id) || this.e.isMaster) {
      cm.tj().catch()
      let match = this.e.msg.match(/#一键(封杀|禁言)(\d+)( )?(\d+)?/);
      await this.e.reply('开始禁言操作');
      let aw = this.e.at ? this.e.at : match[2];

      let time;
      if (this.e.at) {
        if (match !== null) {
          time = match[2] ? match[2] : 600;
        } else {
          time = 600;
        }
      } else {
        if (match !== null) {
          time = match[4] ? match[4] : 600;
        } else {
          time = 600; // 默认值
        }
      }
      const message = [];
      const groupList = Array.from(await Bot[this.e.self_id].gl.values());
      for (const group of groupList) {
        let success = Bot[this.e.self_id].pickGroup(group.group_id).muteMember(aw, time);
        let is_admin = group.admin_flag
        if (is_admin) {
          message.push(`在群 ${group.group_id} 禁言 ${aw} ${time}秒成功`);
        } else {
          message.push(`在群 ${group.group_id} ${is_admin ? '是管理员，但是为什么会来到不是管理员的判定呢' : '不是管理员，'}`);
        }
      }
      let send = this.e.runtime.common.makeForwardMsg(this.e, message, '操作完成');
      this.e.reply(send);
    } else {
      await this.e.reply('你没有权限')
      return false
    }
  }

}
