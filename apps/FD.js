import cm from '../lib/common/CM.js';
export default class cte extends plugin {
    constructor() {
        super({
            name: '聊群消息传递',
            priority: -Infinity,
            rule: [
							{
					reg: `#?(开启|关闭)本群消息传递$`,
					fnc: 'q'
				},
                {
					reg: '',
					log: false,
                    fnc: 'fd',
                },
                {
					reg: '',
					 log: false,
                    fnc: 'hf',
                },
            ],
    });
	}

async fd(e) {  
    // if (!this.e.isGroup) return false;  
    let isRedisTrue = await redis.get(`Fanji:ql:${e.group_id}`)
    if (isRedisTrue == 'true') {
		// logger.info('LJL')		
        let gr = await redis.get(`Fanji:ql:${e.group_id}:target`);  
        await Bot[e.self_id].pickGroup(gr).sendMsg([`群聊${e.group_id}(${e.group_name}):\n发送人:${e.member.card}\nQQ:${e.user_id}\n`, e.message, '\n引用该条消息以回复', this.e.message_id]);  
		return false
    }else{
		// logger.info('11111111111111111')
return false		
}
}
async q(e) {  
    if (!e.isMaster && !await cm.check(this.e.user_id)) return await this.reply('你没有权限');  
      
    const msgMatch = e.msg.match(/(\\d+)/);  
  if (!msgMatch && e.msg.includes('开启')) {    
        await this.reply('请发送对应群号');
		this.setContext('awa')
        return;  
    }  
  
    const targetGroupId = msgMatch; // 获取群号  
if (e.msg.includes('开启')) {  
    await redis.set(`Fanji:ql:${e.group_id}`, 'true');  
    await redis.set(`Fanji:ql:${e.group_id}:target`, targetGroupId);  
	await redis.set(`Fanji:ql:gt:${targetGroupId}`, e.group_id);  
    await this.reply(`开启完成，对应群号${targetGroupId}`);  
} else if (e.msg.includes('关闭')) {  
	await redis.del(`Fanji:ql:gt:${redis.get(`Fanji:ql:${e.group_id}:target`)}`)
await redis.del(`Fanji:ql:${this.e.group_id}:target`);
    await redis.del(`Fanji:ql:${this.e.group_id}`)
    await this.reply(`关闭完成`);  
}  
}

async awa(e){
	if (this.e.msg === '取消'){
		this.finish('awa')
		await e.reply('取消成功')
	}
		await redis.set(`Fanji:ql:${e.group_id}`, 'true')
				await redis.set(`Fanji:ql:${e.group_id}:target`, this.e.msg)
		await redis.set(`Fanji:ql:gt:${this.e.msg}`, this.e.group_id);  
				await redis.set(`Fanji:ql:gt:${this.e.msg}`, this.e.group_id)
		await e.reply(`开启完成，对应群号${this.e.msg}`)
		this.finish('awa')
}  
/**
 * 椰奶插件的回复函数
 * 椰奶插件：
 * https://gitee.com/yeyang52/yenai-plugin
 * 对应函数位置：
 * https://gitee.com/yeyang52/yenai-plugin/blob/master/apps/handle.js
 * Cv人：Admilk
 */
async hf(e){
	if (!e.source){return false}
    let qq = ''
    let group = ''
    let msgs = e.message[0].text.split(' ')
    if (e.source) {
      let source = (await e.group.getChatHistory(e.source.seq, 1)).pop()
      let res
      // try {
        res = source.raw_message.split('\n')
      // } catch {
        // return e.reply('❎ 消息可能已过期')
      // }
	   if (/群/.test(res[0]) && /发送人/.test(res[1])) {
        qq = res[2].match(/[1-9]\d*/g)
		group = await redis.get(`Fanji:ql:gt:${this.e.group_id}`)
		// e.message[0].text = e.message[0].text.replace(/#|回复/g, '').trim()
      } else {
       return false
      }
	  if (/\d/.test(msgs[0])) {
        e.message[0].text = msgs.slice(1).join(' ')
      } else {
        qq = msgs[1]
        e.message[0].text = msgs.slice(2).join(' ')
      }
    
    if (!e.message[0].text) e.message.shift()

    if (e.message.length === 0) return e.reply('❎ 消息不能为空')
const regex = /以回复(.*)/;  
// 使用map方法遍历res数组，并使用match方法提取匹配的值  
const matches = res.map(str => {  
  const match = str.match(regex);  
  return match ? match[1] : null; // 如果匹配到，返回匹配的值；否则返回null  
}); 
	  try{
		  let msg = [segment.reply(matches),segment.at(qq),`群聊${e.group_id}(${e.group_name})\n回复人:${e.member.card}(${e.user_id})\n`, e.message, `\n\n此消息不支持引用回复`]
	        Bot[e.self_id].pickGroup(group).sendMsg(msg/* , true, false */);
	  		   await e.reply('✅ 已把消息发给它了哦~')
	  }catch(error){
this.reply(`❎ 发送失败\n错误信息为:${error}`)
	  }
}else{
	return false
}
}
}







