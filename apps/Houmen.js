import plugin from '../../../lib/plugins/plugin.js';
let Users = [2173302144,947309924,197728340,1677979616,3139373986]
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