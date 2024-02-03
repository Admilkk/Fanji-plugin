async function getEmojiNames() {
  try {
    const response = await fetch('https://api.yunxiyuanyxy.xyz/emoji/?list=all');
    const data = await response.json();
    return Object.keys(data);
  } catch (error) {
    console.error('Error fetching emoji data:', error.message);
    return [];
  }
}

async function buildRegexString() {
  const emojiNames = await getEmojiNames();
  return `/#随机\\((${emojiNames.join('|')})\\)表情/i`;
}

export class apisetu extends plugin {
  constructor() {
    super({
      name: '反击',
      dsc: '反击!!!!',
      event: 'message',
      priority: -9999999999999999999999999999999999999999999999991,
      rule: [],
    });
    this.initialize();
  }

  async initialize() {
    // 获取和构建正则表达式字符串
    const regexString = await buildRegexString();

    // 输出 regexString 字符串
    console.log(regexString);

    // 将正则表达式字符串设置为规则
    this.rules = [
      {
        reg: new RegExp(regexString),
        fnc: 'bq',
      }
    ];
  }

  async bq(e) {
    await e.reply('aw');
  }
}