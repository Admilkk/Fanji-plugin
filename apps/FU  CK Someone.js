//import cm from '../lib/common/CM.js'
import common from '../lib/common/common.js'
import yaml from 'js-yaml';
import fs from 'fs'
const filepath = '../config/config.yaml'
////////////////////////////////////////////////////////////////////
//                          _ooOoo_                               //
//                         o8888888o                              //
//                         88" . "88                              //
//                         (| ^_^ |)                              //
//                         O\  =  /O                              //
//                      ____/`---'\____                           //
//                    .'  \\|     |//  `.                         //
//                   /  \\|||  :  |||//  \                        //
//                  /  _||||| -:- |||||-  \                       //
//                  |   | \\\  -  /// |   |                       //
//                  | \_|  ''\---/''  |   |                       //
//                  \  .-\__  `-`  ___/-. /                       //
//                ___`. .'  /--.--\  `. . ___                     //
//              ."" '<  `.___\_<|>_/___.'  >'"".                  //
//            | | :  `- \`.;`\ _ /`;.`/ - ` : | |                 //
//            \  \ `-.   \_ __\ /__ _/   .-` /  /                 //
//      ========`-.____`-.___\_____/___.-`____.-'========         //
//                           `=---='                              //
//      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^        //
//         佛祖保佑       永无BUG     永不修改                  //
////////////////////////////////////////////////////////////////////
export class fuck extends plugin {
  constructor() {
    super({
      name: '反击[骂]',
      dsc: '解禁',
      event: 'message',
      priority: -99999999991,
      rule: [
        {
          reg: /^#?骂(他|她|它|ta)?((\d+)(次))?$/i,
          fnc: 'fuck',
        },
        {
          reg: /^#?反击设置骂人(开启|关闭)$/i,
          fnc: 'fuckkg',
        }
      ],
    });
  }
  async fuckkg(e) {
    let aw = e.msg.includes('开启')
    if (!(e.isMaster || await cm.check(this.e.user_id))) return this.reply('你没有权限')
      cm.tj().catch()
    if (aw)
      redis.set('Fanji:maren', 'true')
    else
      redis.set('Fanji:maren', 'false')
  }
  async fuck(e) {
    let kg = await redis.get('Fanji:maren')
    kg = kg == 'true'
    if (!kg) {
      this.reply('骂人未开启，请发送#反击设置骂人开启')
      return true
    }
    cm.tj().catch()
    if (!await cm.checkBot(e))
      return false
    let css = e.msg.includes(`次`)
    let cs
    if (css) {
      cs = e.msg.match(/(\d+)/)
      cs = cs[0]
    }
    let targetid = e.at ? e.at : '123456';
    targetid = e.atall ? 'all' : targetid
    if (await cm.check(e.at ? e.at : '1')) {
      await e.reply('你tm还想骂他是吧');
      return false;
    }
    if (e.at === e.self_id) {
      await e.reply('你tm还想骂我是吧');
      return false;
    }
    if (!css) {
      let res = await fetch(`https://api.yunxiyuanyxy.xyz/fuck/?type=text`);
      res = await res.text();
      await this.e.reply([segment.at(targetid), res]);
    } else {
      let response = await fetch(`https://api.yunxiyuanyxy.xyz/fuck/?type=json&num=${cs}`);
      let data = await response.json();
      for (let phrase of data.text) {
        let trimmedPhrase = phrase.trim();
        await this.e.reply([segment.at(targetid), trimmedPhrase]);
      }
    }
  }
}