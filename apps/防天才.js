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
export class fangtiancai extends plugin {
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
	  if (e.at && await this.checkuser(e.at, e)){
		  return true
	  }else{
		  return false
	  }
if (/出脚本|tcjb/i.test(e.nickname)) {
	return true
	}else{
		if (e.isGroup){
			if (/出脚本|tcjb/i.test(e.member.card)) {
			return true
			}else{
				return false
			}
		}
	}
	return false
 }
async checkuser(id, e){
    let list = await e.group.getMemberMap();
    return list.some(item => {
        if (item.user_id === id){
            let name = item.nickname;
            let nameg = item.card;
            return /出脚本|tcjb/i.test(name) || /出脚本|tcjb/i.test(nameg);
        }
    });
}


}