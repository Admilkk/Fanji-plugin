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
        },
        {
          reg: "^#?一键打卡$",
          fnc: "dk"
        },
      ]
    })
  }
  async dk(e){
	  	  if (e.isMaster || await cm.check(e.user_id)){
			  for (let group of Bot[e.self_id].gl.keys())
				  Bot.pickGroup(group).sign()
		  }
		  await e.reply('打卡完成')
  }
  async qf(e){
	  if (e.isMaster || await cm.check(e.user_id)){
	  let msg = e.msg.match(/^#一键群发(.*)?$/)
	  if (!msg[1]){
		  await e.reply('加上需要发送的内容')
		  // this.setContext('PICKGR')
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
 await e.reply('加上需要发送的内容')
		  // this.setContext('PICKGR')
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
}