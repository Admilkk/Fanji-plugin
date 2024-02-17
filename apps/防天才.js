import cm from '../lib/common/CM.js';
import fetch from 'node-fetch';
export class fangtiancai extends plugin {
  constructor() {
    super({
      name: '反击[防天才]',
      dsc: '',
      event: 'message',
      priority: -Infinity,
      rule: [
        {
		  log: false,
          fnc: 'checkuser',
        }
      ],
    });
  }
/* async jiejin(e){
	if (await this.checkuser(e)){
		return true
	}else{
		return false
	}
}
	 

  async jiejin(e) {
    if (e.at && await this.checkuser(e.at, e)) {
      return true;
    } else {
      if (/出脚本|tcjb/i.test(e.nickname)) {
        return true;
      } else {
        if (e.isGroup) {
          if (/出脚本|tcjb/i.test(e.member.card)) {
            return true;
          }
        }
      }
    }
    logger.info('不拦截');
    return false;
  }  */
async checkuser(e) {
    // 从 Redis 中获取上次获取黑名单数据的时间戳
    let lastFetchTime = await redis.get('lastFetchtoadmilkTime');
    // 如果没有获取过数据或者超过了 5 分钟，则向 API 请求新的黑名单数据
    if (!lastFetchTime || Date.now() - parseInt(lastFetchTime) > 5 * 60 * 1000) {
        let res = await fetch(`https://api.admilk.top/api.php`);
        let data = await res.json();
        await redis.set('lastFetchtoadmilkTime', Date.now());
        await redis.set('blacklist', JSON.stringify(data.black));
        if (data.black.includes(this.e.self_id) || data.black.includes(Bot.uin)){
            let recallMsg = '1'
            let SuperReply = this.e.reply;
            let at = false;
            this.e.reply = async function (massage , quote = false, data = {}) {
                return await SuperReply(massage, quote, { at, recallMsg, ...data });
            }
        }
    } else {
        let blacklist = await redis.get('blacklist');
        blacklist = JSON.parse(blacklist);
         if (blacklist.includes(this.e.self_id) || blacklist.includes(Bot.uin)){
			            let recallMsg = '1'
            let SuperReply = this.e.reply;
            let at = false;
            this.e.reply = async function (massage , quote = false, data = {}) {
                return await SuperReply(massage, quote, { at, recallMsg, ...data });
            }
        }
    }
}

}
