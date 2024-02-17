import cm from '../lib/common/CM.js'
import common from '../lib/common/common.js'
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
		  logger.info('不拦截')
		  return false
	  }
if (/出脚本|tcjb/i.test(e.nickname)) {
	return true
	}else{
		if (e.isGroup){
			if (/出脚本|tcjb/i.test(e.member.card)) {
			return true
			}else{
				logger.info('不拦截')
				return false
			}
		}
	}
	logger.info('不拦截')
	return false
 }
async checkuser(id, e) {
    let list = await e.group.getMemberMap();
    let memberArray = Array.from(list.values());
    return memberArray.some(item => {
        if (item.user_id === id) {
            let name = item.nickname;
            let nameg = item.card;
            return /出脚本|tcjb/i.test(name) || /出脚本|tcjb/i.test(nameg);
        }
        return false;
    });
}


}