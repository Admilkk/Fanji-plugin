import cm from '../lib/common/CM.js'
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
export class jiejin extends plugin {
  constructor() {
    super({
      name: '反击[解禁]',
      dsc: '解禁',
      event: 'message',
      priority: -99999999991,
      rule: [
        {
          reg: /^#?解禁$/,
          fnc: 'jiejin',
        }
      ],
    });
  }

  async jiejin(e) {
    if (Bot.uin === 3768387398) { return false }
    const yamlData = fs.readFileSync(filepath, 'utf8');
    const data = yaml.safeLoad(yamlData)
    if (!data.jiejin) { e.reply('未开启解禁功能'); return true }
    if (!await cm.check(e.user_id) && !e.isMaster && Bot.uin != 3768387398) {
      let msg = ['无权限用户尝试解禁！:', e.user_id, e.nickname]
      e.reply(msg);
      //common.relpyPrivate(1773798610, msg)
      // common.relpyPrivate(2173302144, msg)
      return false;
    } else {
      logger.info(`解禁${e.user_id}`)
      await e.group.muteMember(e.at, 0);
    }
  }
}