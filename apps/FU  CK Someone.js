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
      name: '反击[骂]',
      dsc: '解禁',
      event: 'message',
      priority: -99999999991,
      rule: [
        {
          reg: /^#?骂(他|她|它|ta)?((\d+)(次))?$/i,
          fnc: 'fuck',
        }
      ],
    });
  }

async fuck(e) {
if (e.self_id === 3889013854){return}



let css = e.msg.includes(`次`)
let cs
if (css){
cs = e.msg.match(/(\d+)/)
cs = cs[0]
}
    let targetid = e.at ? e.at : '123456';
    targetid = e.atall? 'all' : targetid
    if (await cm.check(e.at ? e.at : '1')) {
        await e.reply('你tm还想骂他是吧');
        return false;
    }
    if (e.at === e.self_id) {
        await e.reply('你tm还想骂我是吧');
        return false;
    }
    if (!css){
        let res = await fetch(`https://api.yunxiyuanyxy.xyz/fuck/?type=text`);
        res = await res.text();
        await this.e.reply([segment.at(targetid), res]);
    }else{
let response = await fetch('https://api.yunxiyuanyxy.xyz/fuck/?type=json&num=cs');
let data = await response.json();
let phrases = data.text.join('').split(',');
for (let phrase of phrases) {
    await this.e.reply([segment.at(targetid), phrase.trim()]);
}

    }
}

}