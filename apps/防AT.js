import cm from '../lib/common/CM.js';
export default class FanjiUNatAll extends plugin {
    constructor() {
        super({
            name: '反击[防at全体]',
            priority: -Infinity,
            rule: [
				{
					reg: /^#?(开启|关闭)(本群)?防(at|召唤|艾特)?全体$/i,
					fnc: 'q'
				},
                {
					reg: /^#?设置(本群)?防(at|召唤|艾特)?全体时间\s*(\d+)?$/i,
					fnc: 'q2'
				},
                {
					reg: '',
					log: false,
                    fnc: 'fd',
                }
            ],
    });
	}
    async q2(e){
                if (!e.isMaster) return false
        let isGroup = e.msg.includes('本群')
        let time = e.msg.match(/(\d+)/)
        if (time){
        time = time[0]
        }else{
            time = 600
        }
            if (isGroup){
                await redis.set(`Fanji:AT:${this.e.group_id}:time`, time)
                await e.reply(`本群防at时间已设置为${time}`)
                return
            }
            await redis.set(`Fanji:AT:time`, time)
            await e.reply(`全局防at时间设置为${time}`)
        }
    async q(e){
        if (!e.isMaster) return false
        let operate = e.msg.includes('开启')
        let isGroup = e.msg.includes('本群')
        if (operate){
            if (isGroup){
                await redis.set(`Fanji:AT:kq:${this.e.group_id}`, 'true')
                await e.reply(`开启本群防at成功`)
                return
            }
            await redis.set(`Fanji:AT:kq`, 'true')
            await e.reply(`开启全局防at成功`)
        }else{
            if (isGroup){
                await redis.set(`Fanji:AT:kq:${this.e.group_id}`, 'false')
                await e.reply(`关闭本群防at成功`)
                return
            }
            await redis.set(`Fanji:AT:kq`, 'false')
            await e.reply(`关闭全局防at成功`)
        }

    }
    async fd(e){
        	if (e.atall){
             if (redis.get(`Fanji:AT:kq`) == null) return false;
             if (redis.get(`Fanji:AT:kq`) == 'false' && redis.get(`Fanji:AT:kq:${this.e.group_id}`) != 'true') return false
             if (redis.get(`Fanji:AT:kq:${this.e.group_id}`) == 'false') return false
			if (!e.member.is_admin){
			if (e.group.is_admin){
			await e.reply('检测到无权限at全体！开始禁言操作')
            let time = redis.get(`Fanji:AT:${this.e.group_id}:time`) || redis.get(`Fanji:AT:time`) || 600
			await e.group.recallMsg(e.message_id)
			await e.group.muteMember(e.user_id, time)
			}else{
				await this.reply(segment.at(this.e.group.info.owner_id))
				await this.reply(segment.at(this.e.group.info.owner_id))
				await this.reply([`这个坏人无权限@全体！！！`,segment.at(e.user_id)])
				await this.reply([`这个坏人无权限@全体！！！`,segment.at(e.user_id)])
			}
			}
		}
        return false
    }
}