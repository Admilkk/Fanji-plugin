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
          fnc: "qf"
        }
      ]
    })
  }
  async qf(e){
	  if (e.isMaster || await cm.check(e.user_id)){
	  let msg = e.msg.match(/.*/)
	  if (!msg){
		  this.setContext('PICKGR')
		  await e.reply('请发送内容，或者发送‘取消’')
		  return false
	  }
	  msg = msg[0]
	  for (let group of Bot.gl.keys()){
		  Bot.pickGroup(group).sendMsg(msg)
	  }
  }else{
	  await e.reply('你没有权限')
	  return
  }
  }
  async hyqf(e){
	  	  if (e.isMaster || await cm.check(e.user_id)){
	  	  let msg = e.msg.match(/.*/)
		  	  if (!msg){
		  this.setContext('PICKFR')
		  await e.reply('请发送内容，或者发送‘取消’')
		  return false
	  }
	  msg = msg[0]
	  for (let friend of Bot.fl.keys()){
		  Bot.pickFriend(friend).sendMsg(msg)
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
	  }
  }
}