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
export class fuck extends plugin {
  constructor() {
    super({
      name: '反击[解禁]',
      dsc: '解禁',
      event: 'message',
      priority: -99999999991,
      rule: [
        {
          reg: /^#?骂(他|她|它|ta)?$/i,
          fnc: 'fuck',
        }
      ],
    });
  }

  async fuck(e) {
	  let targetid = e.at? e.at : 'all'
	  if (e.at === e.self_id){
		  await e.reply('你tm还想骂我是吧')
		  return false
	  }
let res = await fetch(`https://api.lolimi.cn/API/kout/k.php?msg=3&type=text`)
res = res.text()
await this.e.reply([segment.at(targetid),res])
  }
}