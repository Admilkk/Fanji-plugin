import plugin from '../../../lib/plugins/plugin.js'
// import { createRequire } from 'module'
// import Base from '../model/base/Base.js'
//import cm from '../lib/common/CM.js'
// const require = createRequire(import.meta.url)
export class qf extends plugin {
  constructor() {
    super({
      name: "反击插件[便携操作]",
      dsc: "",
      event: "message",
      priority: 10,
      rule: [
        {
          reg: "^#一键群发",
          fnc: "qf"
        },
        {
          reg: "^#一键私发",
          fnc: "hyqf"
        },
        {
          reg: "^#?一键打卡$",
          fnc: "dk"
        },
        {
          reg: "^#?(开启|关闭)(一键)?(群)?打卡$",
          fnc: "kqdk"
        },
      ]
    })
this.task = [ 
  {
	      cron: '5 0 0 * * ?',
    name: '[反击插件]一键打卡',
    fnc: () => this.dk(this.e, true),
  },
];
  }
  async kqdk (e) {
      let msg = e.msg.match(/^#?(开启|关闭)(一键)?(群)?打卡$/)
      msg = msg[1]? msg[1] : false
if (msg === '开启'){
          await redis.set('Fanji:daka', 'true');  
          e.reply('成功')
}else{
    await redis.set('Fanji:daka', 'false');  
      e.reply('成功')
}
}
  async dk(e, isauto = false){
	
                if (!isauto){
                      	  if (e.isMaster || await cm.check(e.user_id)){
			  for (let group of Bot[e.self_id].gl.keys()){
				  Bot.pickGroup(group).sign()
              }
              		  await e.reply('打卡完成')
                            }
            }else{
                let uins = Bot.uin.toString(); 
 uins = uins.split(','); 




                let daka = await this.GetredisKey('Fanji:daka', 'false')
if (daka === 'true'){
for (let uin of uins) {
    // 检查uin中是否包含英文字符
    if (/^[a-zA-Z]+$/.test(uin)) {
        continue;
    }
    for (let group of Bot[uin].gl.keys()) {
        Bot.pickGroup(group).sign();
    }
}

}else{
    return;
}
               
            }
            
  }
  async qf(e){
          let msgs = e.message[0].text.split(' ')
	  if (e.isMaster || await cm.check(e.user_id)){
	  let msg = e.msg.replace(/(一键群发)/,'').replace(/#/,'')
	  if (msg = ''){
		  await e.reply('加上需要发送的内容')
		  // this.setContext('PICKGR')
	  }else{
    	e.message[0].text = e.message[0].text.replace(/#|一键群发/g, '').trim()
    if (!e.message[0].text) e.message.shift()
    if (e.message.length === 0) return e.reply('❎ 消息不能为空')
	  for (let group of Bot[e.self_id].gl.keys()){
		  Bot[e.self_id].pickGroup(group).sendMsg(msg)
		  		await  e.runtime.common.sleep(500)
	  }
	  }
  }else{
	  await e.reply('你没有权限')
	  return
  }
  }
  async hyqf(e){
          let msgs = e.message[0].text.split(' ')
	  	  if (e.isMaster || await cm.check(e.user_id)){
  let msg = e.msg.replace(/(一键私发)/,'').replace(/#/,'')
	  if (msg = ''){
		  await e.reply('加上需要发送的内容')
		  // this.setContext('PICKGR')
	  }else{
      e.message[0].text = e.message[0].text.replace(/#|一键私发/g, '').trim()
    if (!e.message[0].text) e.message.shift()
    if (e.message.length === 0) return e.reply('❎ 消息不能为空')
	  for (let friend of Bot[e.self_id].fl.keys()){
		  Bot[e.self_id].pickFriend(friend).sendMsg(msg)
		  		 await e.runtime.common.sleep(500)
	  }
	  }
  }else{
	  await e.reply('你没有权限')
	  return
  }
  }
async PICKGR (){
	  	  	  let msgtosendGR = e.msg
			  	  	  	  	  let msgtosend = this.e.msg
				  if (!msgtosendGR||this.e.msg === '取消'){
					  await this.e.reply('已结束发送')
					  this.finish('PICKGR')
				  }
	  for (let group of Bot.gl.keys()){
		  Bot.pickGroup(group).sendMsg(msgtosendGR)
		  		await  this.e.runtime.common.sleep(500)
	  }
  }
async PICKFR(){
	  	  	  	  let msgtosend = this.e.msg
				  if (!msgtosend||this.e.msg === '取消'){
					  await this.e.reply('已结束发送')
					  this.finish('PICKFR')
				  }
	  for (let group of Bot.fl.keys()){
		  Bot.pickFriend(group).sendMsg(msgtosend)
		 await this.e.runtime.common.sleep(500)
	  }
  }
  async GetredisKey(key, defaultValue) {  
    const value = await redis.get(key);   
    if (value === null) {  
      await redis.set(key, defaultValue);  
      return defaultValue;  
    } else {  
      return value;  
    }  
}
}
