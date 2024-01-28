import fetch from 'node-fetch';
import Redis from 'ioredis';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import cm from '../lib/common/CM.js';
import common from '../lib/common/common.js';
import { fileURLToPath } from 'url';
import https from 'https';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//以下内容防君子不防小人
const apiurl = 'https://\x6d\x6f\x65.\x6a\x69\x74\x73\x75.\x74\x6f\x70/img';
const filepath = path.join(__dirname, '../configs/config.yaml');

const redis = new Redis({
  port: 6379,
  host: '127.0.0.1',
  password: '',
  //wa
});

export class apisetu extends plugin {
  constructor() {
    super({
      name: '反击',
      dsc: '反击!!!!',
      event: 'message',
      priority: -99999999999999999991,
      rule: [
        {
          reg: /^#?随机(涩|色|瑟|塞|se)图$/i, // 无r18.所以不套转发
          fnc: 'ptst',
        },
        {
          reg: /^#?(来(\d+)张)?随机(r18)(图)?$/i, // R18，套了转发
          fnc: 'r18',
        },
        {
          reg: /^#?随机(兽耳|furry)(图)?$/i, // 无r18.所以不套转发
          fnc: 'fr',
        }
      ],
    });
  }

  async ptst(e) {
    try {
      await e.reply([segment.image('${apiurl}')]);
    } catch (error) {
      await e.reply('出现了一点小问题');
      await e.reply(error.message);
    }
  }

async r18(e) {
  try {
    // 解析命令中的张数，默认为1
    const match = e.msg.match(/^#?(来(\d+)张)?随机(r18)(图)?$/i);
    const numImages = match && match[2] ? parseInt(match[2]) : 1;
if (numImages > 10 & !await cm.check(e.user_id)){
	await e.reply('最多10张！！')
	return
}
    const configContent = fs.readFileSync(filepath, 'utf8');
    let config = yaml.load(configContent);

    // 如果配置文件中没有 pixiv 项，则默认为 false 并创建该项
    if (!config.hasOwnProperty('pixiv')) {
      config.pixiv = false;
      const updatedConfigContent = yaml.dump(config);
      fs.writeFileSync(filepath, updatedConfigContent, 'utf8');
    }

    const pixivEnabled = config.pixiv;
    let fw = pixivEnabled ? '&proxy=imgaz.pixiv.net' : '';

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // 禁用证书验证
      agent: new https.Agent({  
        rejectUnauthorized: false,
      }),
    };

    let url = await fetch(`${apiurl}?sort=r18&type=json&num=${numImages}`);
    url = await url.json();
    if (url.code === 200 && url.pics && url.pics.length > 0) {
      if (url.pics.length === 1) {
        // 只有一张图片的情况
        const imageUrl = url.pics[0];
        const response = await fetch(imageUrl, requestOptions);
        const buffer = await response.buffer();
        const timestamp = new Date().getTime();
        const imagePath = path.join(__dirname, `../resource/pixiv/${timestamp}_0.jpg`); // 修改为保存路径

        fs.writeFileSync(imagePath, buffer, 'binary');

        const forwardMsg = await common.makeForwardMsg(e, [segment.image(imagePath)], '你要的色图来啦');
		forward.push('from 反击插件')
        let aw = await this.reply(forwardMsg);
        if (aw) {
          return;
        } else {
          await this.reply([`被吞了，图链:${url.pics}`]);
        }
      } else {
        // 多张图片的情况
        const imagePromises = url.pics.map(async (imageUrl, index) => {
          // 下载图片并保存到指定路径
          const response = await fetch(imageUrl, requestOptions);
          const buffer = await response.buffer();
          const timestamp = new Date().getTime();
          const imagePath = path.join(__dirname, `../resource/pixiv/${timestamp}_${index}.jpg`);// 修改为保存路径

          fs.writeFileSync(imagePath, buffer, 'binary');
          return imagePath;
        });

        const imagePaths = await Promise.all(imagePromises);

        const messages = ['你的涩图来啦'];
        messages.push(...imagePaths.map(imagePath => segment.image(imagePath)));
        const forward = messages;
		forward.push('from 反击插件')
        const forwardMsg = await common.makeForwardMsg(e, forward, '你要的色图来啦');

        let aw = await this.reply(forwardMsg);
        if (aw) {
          return;
        } else {
          const allImageLinks = url.pics.join('\n');
          await this.reply([`被吞了，图链:\n${allImageLinks}`]);
        }
      }
    } else {
      await e.reply('API 返回的数据不正确，未能获取到图片信息。');
    }
  } catch (error) {
    await e.reply('出现了一点小问题');
    await e.reply(error.message);
  }
}



}
