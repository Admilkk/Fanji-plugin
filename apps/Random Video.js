import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { execSync } = require('child_process');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const apiUrls = {
  白丝视频: 'http://api.yujn.cn/api/baisis.php',
  黑丝视频: 'http://api.yujn.cn/api/heisis.php',
  漫展视频: 'https://api.yujn.cn/api/manzhan.php',
  穿搭视频: 'http://api.yujn.cn/api/chuanda.php',
  跳舞视频: 'http://api.yujn.cn/api/jjy.php',
  动漫视频: 'http://api.yujn.cn/api/dmsp.php',
  萝莉视频: 'http://api.yujn.cn/api/luoli.php',
  完美身材视频: 'http://api.yujn.cn/api/wmsc.php',
  欲梦视频: 'http://api.yujn.cn/api/ndym.php',
  慢摇视频: 'http://api.yujn.cn/api/manyao.php',
  随机视频: 'https://jx.iqfk.top/api/sjsp.php',
  小姐姐视频: 'https://api.yunxiyuanyxy.xyz/plus/?type=302',
  甜妹视频: 'https://v2.api-m.com/api/meinv?return=302',
  扭胯视频: 'http://newbotai.cn/API/nkxl.php',
  甩裙视频: 'http://newbotai.cn/API/sqxl.php',
  纯欲视频: 'http://newbotai.cn/API/ycyy.php',
  美女视频: 'http://newbotai.cn/API/mnsp.php',
  汉服视频: 'http://newbotai.cn/API/gfhf.php',
  和服视频: 'http://newbotai.cn/API/rxhf.php',
  渔网视频: 'http://newbotai.cn/API/xgyw.php',
  洛丽塔视频: 'http://newbotai.cn/API/lltx.php',
  帅哥视频: 'http://newbotai.cn/API/sgsp.php',
  兔女郎视频: 'http://newbotai.cn/API/tnl.php',
  海王视频: 'http://newbotai.cn/API/hwxl.php',
  瑜伽视频: 'http://newbotai.cn/API/yjxl.php',
  双马尾视频: 'http://newbotai.cn/API/smwx.php',
  斩男视频: 'http://newbotai.cn/API/zncd.php',
  软妹视频: 'http://newbotai.cn/API/rmxd.php',
  甜妹变装视频: 'http://newbotai.cn/API/tmbz.php'
};
const baseRegex = '^#?(随机)?';
//自定义正则
const customRules = {};
const apiRegex = new RegExp(Object.entries(apiUrls).map(([key, url]) => {
  return customRules[key] ? customRules[key] : `${baseRegex}(${key})`;
}).join('|'), 'i');
export class apivideo extends plugin {
  constructor() {
    super({
      name: '反击API',
      dsc: '反击API',
      event: 'message',
      priority: -9999999999999999999999999999999999999999999999991,
      rule: [
        {
          reg: apiRegex,
          fnc: 'handleVideoRequest'
        },
        {
          reg: '^#?反击视频(列表|帮助|名单)?',
          fnc: 'apis'
        }
      ]
    });
  }

  async apis(e) {
    cm.tj().catch()
    let msg = [];
    Object.keys(apiUrls).forEach(key => {
      if (customRules[key]) {
        msg.push(`${customRules[key]}`)
      } else {
        msg.push(`#${key}`)
      }
    });
    msg = await this.e.runtime.common.makeForwardMsg(this.e, msg, '视频列表:\n下面的每条都是视频名字，可以使用#视频名字 来获取视频');
    await this.reply(msg);
    return;
  }


  async handleVideoRequest(e) {
    cm.tj().catch()
    const msg = e.msg.replace(/#|\s|随机/g, '').toLowerCase();
    let videoType = '';
    //匹配自定义正则
    for (const key in customRules) {
      const customRegex = new RegExp(customRules[key], 'i');
      if (msg.match(customRegex)) {
        videoType = key;
        break;
      }
    }
    if (!videoType) {
      for (const key in apiUrls) {
        if (msg.includes(key.toLowerCase())) {
          videoType = key;
          break;
        }
      }
    }
    if (!videoType) {
      logger.error(`[Fanji-plugin][api视频类] 无法找到匹配的视频类型: ${msg}`);
      return false;
    } else {
      logger.info(`[Fanji-plugin][api视频类]  视频类型: ${videoType}`);
    }
    const apiUrl = apiUrls[videoType];
    await this.requestVideo(e, apiUrl, path.join(__dirname, `../resource/${videoType}video`), 'mp4', true);
    return false;
  }



  /**
   * 请求视频数据，并处理保存和发送
   * @param {Object} e - e
   * @param {string} apiUrl - 视频URL
   * @param {string} defaultSavePath - 默认保存路径
   * @param {string} hz - 后缀名
   * @param {boolean} deleteAfterSend - 发送后是否删除文件
   */
  async requestVideo(e, apiUrl, defaultSavePath, hz = 'mp4', deleteAfterSend = false) {
    let haveffmpeg = await this.ffmpeg(); // 检查是否安装ffmpeg
    if (!haveffmpeg) {
      logger.error('[Fanji-plugin][api视频类] 未安装ffmpeg，无法发送视频');
      return;
    }

    try {
      const savePath = defaultSavePath || path.join(__dirname, '../resource/default');
      const timestamp = Date.now();
      let videoPath = path.join(savePath, `${timestamp}.${hz}`);

      await fs.promises.mkdir(savePath, { recursive: true });

      if (hz === 'm3u8') {
        const m3u8Response = await fetch(apiUrl);
        if (!m3u8Response.ok) {
          throw new Error(`[Fanji-plugin][api视频类] 从 ${apiUrl} 获取 m3u8 文件失败`);
        }
        const m3u8Data = await m3u8Response.text();
        const m3u8FilePath = path.join(savePath, `${timestamp}.m3u8`);
        await fs.promises.writeFile(m3u8FilePath, m3u8Data);
        const baseUrl = new URL(apiUrl).origin;
        const updatedM3u8Data = m3u8Data.replace(/(.*\.ts)/g, `${baseUrl}/$1`);
        await fs.promises.writeFile(m3u8FilePath, updatedM3u8Data);
        const convertedVideoPath = path.join(savePath, `${timestamp}.mp4`);
        await new Promise((resolve, reject) => {
          ffmpeg(m3u8FilePath)
            .outputOptions('-c:v copy', '-c:a copy', '-bsf:a aac_adtstoasc')
            .output(convertedVideoPath)
            .on('end', () => {
              logger.info(`[Fanji-plugin][api视频类] 视频转换成功: ${convertedVideoPath}`);
              resolve();
            })
            .on('error', (err) => {
              logger.error(`[Fanji-plugin][api视频类] 视频转换出错: ${err}`);
              reject(err);
            })
            .run();
        });
        videoPath = convertedVideoPath;
      } else {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`[Fanji-plugin][api视频类] 从 ${apiUrl} 获取视频失败`);
        }
        const videoData = await response.buffer();
        await fs.promises.writeFile(videoPath, videoData);
      }

      let a = await e.reply([segment.video(videoPath)]);
      if (!a) throw `发送失败\n${a}`;

      if (deleteAfterSend) {
        await fs.promises.unlink(videoPath);
      }

      logger.info(`[Fanji-plugin][api视频类] 成功获取并发送视频`);
    } catch (error) {
      logger.error(`[Fanji-plugin][api视频类] 视频发送函数出错: ${error}`);
    }
  }

  /**
   * 检查是否安装了 ffmpeg
   * @returns {boolean} - 返回 true 为安装 ffmpeg 否则返回 false
   */
  async ffmpeg() {
    try {
      const ret = execSync('ffmpeg -version').toString();
      if (!ret.includes('version')) {
        throw new Error('未安装 ffmpeg');
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
