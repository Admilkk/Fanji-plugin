import md5 from 'md5'
const operationsMap = {
  'md5': async (input) => md5(input),//32小
  'md5_up': async (input) => md5(input).toUpperCase(),//32大
  'md5_16': async (input) => md5(input).substr(8, 16),//16小
  'md5_16_up': async (input) => md5(input).substr(8, 16).toUpperCase(),//16大
  'base64': async (input) => Buffer.from(input).toString('base64'),
  '16base64': async (input) => Buffer.from(input,'hex').toString('base64'),
  'unbase64': async (input) => Buffer.from(input, 'base64').toString('utf-8'),
  '16unbase64': async (input) => Buffer.from(input, 'base64').toString('hex'),
};
const applyOperations = async (input, operations) => {
  for (const operation of operations) {
    const func = operationsMap[operation.toLowerCase()];
    if (func) {
      input = await func(input);
    }
  }
  return input;
};
export class example extends plugin {
  constructor() {
    super({
      name: '[Fanji-plugin]加解密',
      event: 'message',
      priority: -99,
      rule: [
        {
          reg: new RegExp(`^#?((?:\\s*(?:${Object.keys(operationsMap).join('|')})\\s*)+)(转换|加密|转化)`, 'i'),
          fnc: 'jm'
        },
        {
          reg: '^#?反击(加密|解密|转换)帮助$',
          fnc: 'help'
        }
      ]
    })
  }
  async help(e){
    let msg = ['可用操作:']
    let keys = Object.keys(operationsMap).forEach(key=>msg.push(key))
    msg.push('使用#操作名字 转换 文字 即可转换\n示例：#base64转换123\n#md5 base64转换123')
    msg.push('操作是从头开始按顺序执行的,如\n#md5 base64转换123的操作是\n先md5123然后把得到的值base64')
    await e.reply(await Bot.makeForwardMsg(msg))
  }
  async jm(e) {
    const commandPattern = new RegExp(`^#?((?:\\s*(?:${Object.keys(operationsMap).join('|')})\\s*)+)(转换|加密|转化)`, 'i');
    const match = e.msg.match(commandPattern);
    if (!match) {
      await e.reply('无效的命令格式\n发送#反击转换帮助 查看帮助');
      return;
    }
    const operations = match[1].trim().split(/\s+/);
    const input = e.msg.replace(commandPattern, '').trim();
    const transformedInput = await applyOperations(input, operations);
    await e.reply(`${transformedInput}`);
  }
}