import plugin from '../../../lib/plugins/plugin.js'
// import { createRequire } from 'module'
import cm from '../lib/common/CM.js'
// const require = createRequire(import.meta.url)
export class qf extends plugin {
  constructor() {
    super({
      name: "",
      dsc: "",
      event: "message",
      priority: 10,
      rule: [
        {
          reg: "^#一键群发(.*)?$",
          fnc: "qf"
        },
        {
          reg: "^#一键私发(.*)?$",
          fnc: "hyqf"
        }
      ]
    })
  }
  async qf(e){
	  if (e.isMaster || await cm.check(e.user_id)){
	  let msg = e.msg.match(/^#一键群发(.*)?$/)
	  if (!msg[1]){
		  await e.reply('请发送内容，或者发送‘取消’')
		  this.setContext('PICKGR')
	  }else{
	  msg = msg[1]
	  for (let group of Bot.gl.keys()){
		  Bot.pickGroup(group).sendMsg(msg)
		  		await  e.runtime.common.sleep(500)
	  }
	  }
  }else{
	  await e.reply('你没有权限')
	  return
  }
  }
  async hyqf(e){
	  	  if (e.isMaster || await cm.check(e.user_id)){
	  	  let msg = e.msg.match(/^#一键私发(.*)?$/)
		  	  if (!msg[1]){
				  await e.reply('请发送内容，或者发送‘取消’')
		 this.setContext('PICKFR')
	  }else{
	  msg = msg[1]
	  for (let friend of Bot.fl.keys()){
		  Bot.pickFriend(friend).sendMsg(msg)
		  		 await e.runtime.common.sleep(500)
	  }
	  }
  }else{
	  await e.reply('你没有权限')
	  return
  }
  }
async PICKGR (e){
	  	  	  let msgtosendGR = e.msg
			  	  	  	  	  let msgtosend = e.msg
				  if (!msgtosendGR||e.msg === '取消'){
					  await e.reply('已结束发送')
					  this.finish('PICKGR')
				  }
	  for (let group of Bot.gl.keys()){
		  Bot.pickGroup(group).sendMsg(msgtosendGR)
		  		await  e.runtime.common.sleep(500)
	  }
  }
async PICKFR(e){
	  	  	  	  let msgtosend = e.msg
				  if (!msgtosend||e.msg === '取消'){
					  await e.reply('已结束发送')
					  this.finish('PICKFR')
				  }
	  for (let group of Bot.fl.keys()){
		  Bot.pickFriend(group).sendMsg(msgtosend)
		 await e.runtime.common.sleep(500)
	  }
  }
}