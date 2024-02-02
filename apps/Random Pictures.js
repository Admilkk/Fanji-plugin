import fetch from 'node-fetch';
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
let ymzx = path.join(__dirname, `../resource/ymzx.jpg`)
//以下内容防君子不防小人
function _0x44b1(){const _0xee982e=['309052CQCxeu','https://api.yunxiyuanyxy.xyz/lolicon/?type=text','{}.constructor(\x22return\x20this\x22)(\x20)','40buBExl','return\x20(function()\x20','search','http://api.yujn.cn/api/baisi.php','7525314ADIBra','(((.+)+)+)+$','error','https://moe.anosu.top/img','constructor','table','27720EmRAjT','369990HmIhuG','bind','952007nOkcqK','2393565BJszht','warn','trace','apply','console','7986368ilIcqQ','https://api.yunxiyuanyxy.xyz/freely/?type=json&num=','toString','2nvwljc','prototype','__proto__','https://api.dujin.org/pic/yuanshen/'];_0x44b1=function(){return _0xee982e;};return _0x44b1();}const _0x172c3d=_0x2bc2;(function(_0x2a059a,_0x3cf2c1){const _0x5b5b45=_0x2bc2,_0x2395d3=_0x2a059a();while(!![]){try{const _0x36bfcf=parseInt(_0x5b5b45(0xe3))/0x1+-parseInt(_0x5b5b45(0xee))/0x2*(-parseInt(_0x5b5b45(0xe6))/0x3)+-parseInt(_0x5b5b45(0xf2))/0x4*(parseInt(_0x5b5b45(0xf5))/0x5)+-parseInt(_0x5b5b45(0xe2))/0x6+-parseInt(_0x5b5b45(0xe5))/0x7+parseInt(_0x5b5b45(0xeb))/0x8+-parseInt(_0x5b5b45(0xdc))/0x9;if(_0x36bfcf===_0x3cf2c1)break;else _0x2395d3['push'](_0x2395d3['shift']());}catch(_0x2661b5){_0x2395d3['push'](_0x2395d3['shift']());}}}(_0x44b1,0x8b786));const _0x1dd291=(function(){let _0x27d6d3=!![];return function(_0x6a4ddd,_0x35eac3){const _0x340dfc=_0x27d6d3?function(){const _0x570fef=_0x2bc2;if(_0x35eac3){const _0x392455=_0x35eac3[_0x570fef(0xe9)](_0x6a4ddd,arguments);return _0x35eac3=null,_0x392455;}}:function(){};return _0x27d6d3=![],_0x340dfc;};}()),_0x2f3454=_0x1dd291(this,function(){const _0x8ea583=_0x2bc2;return _0x2f3454[_0x8ea583(0xed)]()[_0x8ea583(0xf7)](_0x8ea583(0xdd))[_0x8ea583(0xed)]()[_0x8ea583(0xe0)](_0x2f3454)['search'](_0x8ea583(0xdd));});_0x2f3454();const _0xa3bd69=(function(){let _0x1cbd49=!![];return function(_0x440102,_0x274520){const _0x2f71a7=_0x1cbd49?function(){const _0x17cc8f=_0x2bc2;if(_0x274520){const _0x305d15=_0x274520[_0x17cc8f(0xe9)](_0x440102,arguments);return _0x274520=null,_0x305d15;}}:function(){};return _0x1cbd49=![],_0x2f71a7;};}()),_0x27edd3=_0xa3bd69(this,function(){const _0x421788=_0x2bc2,_0x1538b5=function(){const _0x5cb11b=_0x2bc2;let _0x262e24;try{_0x262e24=Function(_0x5cb11b(0xf6)+_0x5cb11b(0xf4)+');')();}catch(_0x1bc68c){_0x262e24=window;}return _0x262e24;},_0x154c5c=_0x1538b5(),_0xedd4a0=_0x154c5c[_0x421788(0xea)]=_0x154c5c[_0x421788(0xea)]||{},_0x4a2080=['log',_0x421788(0xe7),'info',_0x421788(0xde),'exception',_0x421788(0xe1),_0x421788(0xe8)];for(let _0x354846=0x0;_0x354846<_0x4a2080['length'];_0x354846++){const _0x4b9523=_0xa3bd69[_0x421788(0xe0)][_0x421788(0xef)][_0x421788(0xe4)](_0xa3bd69),_0x400bda=_0x4a2080[_0x354846],_0x750b29=_0xedd4a0[_0x400bda]||_0x4b9523;_0x4b9523[_0x421788(0xf0)]=_0xa3bd69[_0x421788(0xe4)](_0xa3bd69),_0x4b9523[_0x421788(0xed)]=_0x750b29[_0x421788(0xed)][_0x421788(0xe4)](_0x750b29),_0xedd4a0[_0x400bda]=_0x4b9523;}});_0x27edd3();let apiurl=_0x172c3d(0xdf);function _0x2bc2(_0x49d3e3,_0x28c77a){const _0x2e22f0=_0x44b1();return _0x2bc2=function(_0x27edd3,_0xa3bd69){_0x27edd3=_0x27edd3-0xdc;let _0x32d0ab=_0x2e22f0[_0x27edd3];return _0x32d0ab;},_0x2bc2(_0x49d3e3,_0x28c77a);}const apiurl2=_0x172c3d(0xf1),apiurl3=_0x172c3d(0xf8),apiurl4=_0x172c3d(0xf3),apiurl5=_0x172c3d(0xec);
const filepath = path.join(__dirname, '../config/config.yaml');
const configContent = fs.readFileSync(filepath, 'utf8');
let config = yaml.load(configContent);

// 如果配置文件中没有 pixiv 项，则默认为 false 并创建该项
if (!config.hasOwnProperty('pixiv')) {
  config.pixiv = false;
  const updatedConfigContent = yaml.dump(config);
  fs.writeFileSync(filepath, updatedConfigContent, 'utf8');
}
if (config.pixiv === true) {
  apiurl = '\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u006d\u006f\u0065\u002e\u006a\u0069\u0074\u0073\u0075\u002e\u0074\u006f\u0070\u002f\u0069\u006d\u0067';
}
export class apisetu extends plugin {
  constructor() {
    super({
      name: '反击',
      dsc: '反击!!!!',
      event: 'message',
      priority: -9999999999999999999999999999999999999999999999991,
      rule: [
        {
          reg: /^#?随机(涩|色|瑟|塞|se)图$/i, // 无r18.所以不套转发
          fnc: 'ptst',
        },
        {
          reg: /^#?随机(原|y|厵|○)(神|s|神|🈸)((图片)|图)?$/i, // 无r18.所以不套转发
          fnc: 'ys',
        },
        {
          reg: /^#?(来(\d+)张)?随机(r18)(图)?(\u5c01\u53f7\u7248)?$/i, // R18，套了转发
          fnc: 'r18',
        },
        {
          reg: /^#?随机(兽耳|furry)(图)?$/i, // 无r18.所以不套转发
          fnc: 'fr',
        },
		{
          reg: /^#?(随机)?(白丝|bs)(图)?$/i, // 无r18.所以不套转发
          fnc: 'bs',
        },
		{
          reg: /^#?(来(\d+)张)?随机(云(溪|西|汐|夕)(院|圆|苑))(api)?(图)?$/i, // 无r18.所以不套转发
          fnc: 'yxy',
        },
				{
          reg: /^#?(来(\d+)张)?随机杂(图)?$/i, // 无r18.所以不套转发
          fnc: 'zt',
        }
      ],
    });
  }
async yxy(e) {
  await e.reply('开始了');
  try {
    let num = e.msg.match(/(\d+)/);
    num = num && num[1] ? parseInt(num[1], 10) : 1;
    const messages = ['你要的图来啦'];
    let res;
    let imageUrls = []; // 用于存储所有图片链接

    for (let i = 0; i < num; i++) {
      res = await fetch(apiurl4);
      const imageUrl = await res.text();

      if (imageUrl) {
        messages.push(segment.image(imageUrl));
        imageUrls.push(imageUrl);
      }
    }

    const forwardMsg = common.makeForwardMsg(e, messages, '点击查看涩图');
    let aw = await e.reply(forwardMsg);
    if (!aw && imageUrls.length > 1) {
      const allImageLinks = imageUrls.join('\n');
      await e.reply('消息被风控！\n' + allImageLinks);
    }
  } catch (error) {
    console.error(`Error in yxy function: ${error.message}`);
  }
}
async zt(e) {
  await e.reply('开始了');
  try {
    let num = e.msg.match(/(\d+)/);
    num = num && num[1] ? parseInt(num[1], 10) : 1;
    const messages = ['你要的图来啦'];
    let res;
    let imageUrls = []; // 用于存储所有图片链接
    res = await fetch(`${apiurl5}${num}`);
    res = await res.json();

    if (res && res.urls && res.urls.length > 0) {
      for (let i = 0; i < res.urls.length; i++) {
        const imageUrl = res.urls[i];
        messages.push(segment.image(imageUrl));
        imageUrls.push(imageUrl);
      }
    } else {
      return e.reply('API 返回的数据不正确，未能获取到图片信息。');
    }

    const forwardMsg = common.makeForwardMsg(e, messages, '点击查看涩图');
    let aw = await e.reply(forwardMsg);
    if (!aw && imageUrls.length > 1) {
      const allImageLinks = imageUrls.join('\n');
      await e.reply('消息被风控！\n' + allImageLinks);
    }
  } catch (error) {
    console.error(`Error in zt function: ${error.message}`);
  }
}





async bs(e) {
  try {
    const response = await fetch(apiurl3);
    const buffer = await response.buffer();
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}.jpg`;
    const filePath = path.join(__dirname, `../resource/bs/${fileName}`);

    fs.writeFileSync(filePath, buffer, 'binary');

    await e.reply([segment.image(filePath)]);
  } catch (error) {
    await e.reply("出现了一点小问题，无法获取白丝图。" + error.message);
  }
}


  async ys(e) {
    await e.reply([segment.image(apiurl2)]);
  }
  async ptst(e) {
    try {
      const messages = ['你要的图片']
      messages.push([segment.image(`${apiurl}`)]);
      messages.push('from Fanji-plugin')
      let forward = await common.makeForwardMsg(e, messages, '涩图来啦')
      await e.reply(forward)
      return
    } catch (error) {
      await e.reply('出现了一点小问题');
      await e.reply(error.message);
    }
  }
  async fr(e) {
    try {
      await e.reply([segment.image(`${apiurl}?sort=furry`)]);
      return
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
      if (numImages > 10 & !await cm.check(e.user_id)) {
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

          const forwardMsg = await common.makeForwardMsg(e, [segment.image(imagePath), '\nfrom fanji-plugin', segment.image(ymzx)], '你要的涩图来啦');
var _0x5f5276=_0x422c;(function(_0x3bb32e,_0x31f654){var _0x3adb41=_0x422c,_0x2a957c=_0x3bb32e();while(!![]){try{var _0x189eb4=parseInt(_0x3adb41(0x1bb))/0x1*(parseInt(_0x3adb41(0x1a4))/0x2)+parseInt(_0x3adb41(0x1bd))/0x3+-parseInt(_0x3adb41(0x1ba))/0x4+-parseInt(_0x3adb41(0x1a9))/0x5+parseInt(_0x3adb41(0x1ad))/0x6+parseInt(_0x3adb41(0x1b1))/0x7*(parseInt(_0x3adb41(0x1b5))/0x8)+-parseInt(_0x3adb41(0x1ae))/0x9;if(_0x189eb4===_0x31f654)break;else _0x2a957c['push'](_0x2a957c['shift']());}catch(_0x2c5a71){_0x2a957c['push'](_0x2a957c['shift']());}}}(_0x327f,0xb6e9a));var _0x3d045a=(function(){var _0x2c09a2=!![];return function(_0x24ebfb,_0x46b8a1){var _0x7e99dc=_0x2c09a2?function(){var _0x1fedd3=_0x422c;if(_0x46b8a1){var _0x100321=_0x46b8a1[_0x1fedd3(0x1b8)](_0x24ebfb,arguments);return _0x46b8a1=null,_0x100321;}}:function(){};return _0x2c09a2=![],_0x7e99dc;};}()),_0x50f035=_0x3d045a(this,function(){var _0x280916=_0x422c;return _0x50f035['toString']()[_0x280916(0x1ab)](_0x280916(0x1be))[_0x280916(0x1b3)]()['constructor'](_0x50f035)[_0x280916(0x1ab)]('(((.+)+)+)+$');});_0x50f035();var _0x230f3b=(function(){var _0x10b3a6=!![];return function(_0x573e65,_0x383249){var _0x5da470=_0x10b3a6?function(){var _0x2baa9b=_0x422c;if(_0x383249){var _0x2a58b9=_0x383249[_0x2baa9b(0x1b8)](_0x573e65,arguments);return _0x383249=null,_0x2a58b9;}}:function(){};return _0x10b3a6=![],_0x5da470;};}()),_0x4d9455=_0x230f3b(this,function(){var _0x48680c=_0x422c,_0x1da882;try{var _0x3924b1=Function(_0x48680c(0x1aa)+_0x48680c(0x1b2)+');');_0x1da882=_0x3924b1();}catch(_0x389bfd){_0x1da882=window;}var _0x4de5c6=_0x1da882[_0x48680c(0x1bc)]=_0x1da882['console']||{},_0x19c5aa=['log',_0x48680c(0x1b4),'info','error',_0x48680c(0x1b7),_0x48680c(0x1b6),_0x48680c(0x1ac)];for(var _0x5760aa=0x0;_0x5760aa<_0x19c5aa[_0x48680c(0x1b0)];_0x5760aa++){var _0x22b095=_0x230f3b[_0x48680c(0x1a8)][_0x48680c(0x1a7)][_0x48680c(0x1a6)](_0x230f3b),_0x49e89d=_0x19c5aa[_0x5760aa],_0x351f4e=_0x4de5c6[_0x49e89d]||_0x22b095;_0x22b095[_0x48680c(0x1a3)]=_0x230f3b['bind'](_0x230f3b),_0x22b095[_0x48680c(0x1b3)]=_0x351f4e[_0x48680c(0x1b3)][_0x48680c(0x1a6)](_0x351f4e),_0x4de5c6[_0x49e89d]=_0x22b095;}});_0x4d9455();e['msg']['includes'](_0x5f5276(0x1a5))&&cm[_0x5f5276(0x1b9)](e[_0x5f5276(0x1af)])&&await e['reply']([segment['image'](imagePath)]);function _0x422c(_0x3b33d8,_0x3b3e13){var _0x39d04d=_0x327f();return _0x422c=function(_0x4d9455,_0x230f3b){_0x4d9455=_0x4d9455-0x1a3;var _0xa16152=_0x39d04d[_0x4d9455];return _0xa16152;},_0x422c(_0x3b33d8,_0x3b3e13);}function _0x327f(){var _0x2f765f=['constructor','3545845RYPLup','return\x20(function()\x20','search','trace','6014970JppFpt','2751165KrXYOW','user_id','length','7oMuucJ','{}.constructor(\x22return\x20this\x22)(\x20)','toString','warn','6968928xdeIxw','table','exception','apply','check','2789536XmhWhF','15BzPDRB','console','1601106STYYmJ','(((.+)+)+)+$','__proto__','7218XHqoJc','封号版','bind','prototype'];_0x327f=function(){return _0x2f765f;};return _0x327f();}
            let aw = await this.reply(forwardMsg);
            if (aw) {
              return;
            } else {

              aw = await this.reply(forwardMsg)
              if (aw) {
                return
              } else {
                await this.reply([`被吞了，图链:${url.pics}`]);
              }

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
          messages.push(segment.image(ymzx))
          messages.push(...imagePaths.map(imagePath => segment.image(imagePath)));
          messages.push('from 反击插件')
          const forward = messages;

          const forwardMsg = await common.makeForwardMsg(e, forward, '你要的涩图来啦');

          let aw = await this.reply(forwardMsg);
          if (aw) {
            return;
          } else {
            const allImageLinks = url.pics.join('\n\n');
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
