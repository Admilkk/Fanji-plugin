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
      name: '反击[防天才]',
      dsc: '',
      event: 'message',
      priority: -Infinity,
      rule: [
        {
          fnc: 'jiejin',
        }
      ],
    });
  }

  async jiejin(e) {
if (e.nickname.includes('出脚本')|| e.member.card.includes('出脚本')){return true}
}