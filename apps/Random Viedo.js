import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import common from '../lib/common/common.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { exec, execSync } = require('child_process')
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let ymzx = path.join(__dirname, `../resource/ymzx.jpg`)

let apiurl = 'http://api.yujn.cn/api/baisis.php';
let apiurl2 = 'http://api.yujn.cn/api/heisis.php';
let apiurl3 = 'https://api.yujn.cn/api/manzhan.php';
let apiurl4 = 'https://api.yujn.cn/api/sese_video.php';
let apiurl5 = 'http://api.yujn.cn/api/chuanda.php';
let apiurl6 = 'http://api.yujn.cn/api/jjy.php';
let apiurl7 = 'http://api.yujn.cn/api/wmsc.php';

const filepath = path.join(__dirname, '../config/config.yaml');
const configContent = fs.readFileSync(filepath, 'utf8');
let config = yaml.load(configContent);
const originalValues = [
  '抖音变装', '快手变装', '随机裙子', '甜妹视频', '随机小姐姐', '双倍快乐', 'loli', '玉足',
  '黑丝视频', '白丝视频', '慢摇视频', 'cos系列', '纯情女高', '吊带系列', '完美身材',
  '热舞视频', '穿搭系列', '学姐系列', '卡哇伊', '清纯系列', '汉服系列'
];
const correspondingValues = [
  'dybianzhuang', 'ksbianzhuang', 'qunzi', 'tianmei', 'yzxjj', 'shuangbei', 'loli', 'yuzu',
  'heisi', 'baisi', 'manyao', 'cos', 'nvgao', 'diaodai', 'shencai',
  'rewu', 'chuanda', 'xuejie', 'kawayi', 'qingchun', 'hanfu'
];

export class apivideo extends plugin {
  constructor() {
    super({
      name: '反击API',
      dsc: '反击API',
      event: 'message',
      priority: -9999999999999999999999999999999999999999999999991,
      rule: [
        {
          reg: /^#?(随机)?白丝(视频)?$/i,
          fnc: 'bs',
        },
        {
          reg: /^#?(随机)?黑丝(视频)?$/i,
          fnc: 'hs',
        },
        {
          reg: /^#?漫展视频$/i,
          fnc: 'manzhan',
        },
        {
          reg: /^#?福利视频$/i,
          fnc: 'welfare',
        },
        {
          reg: /^#?穿搭视频$/i,
          fnc: 'chuanda',
        },
        {
          reg: /^#?跳舞视频$/i,
          fnc: 'dance',
        },
        {
          reg: /^#?完美身材视频$/i,
          fnc: 'perfectBody',
        },
        {
          reg: /^#?(随机)?(小姐姐)(视频)?$/i,
          fnc: 'xjj',
        },
        {
          reg: '^#?(随机)?慢摇视频$',
          fnc: 'manyao'
        }
      ],
    });
  }
  async manyao(e) {
    await this.requestVideo(e, 'http://api.yujn.cn/api/manyao.php', path.join(__dirname, '../resource/manyaovideo'));
    return false
  }
  async xjj(e) {
    await this.requestVideo(e, 'https://api.yunxiyuanyxy.xyz/plus/?type=302', path.join(__dirname, '../resource/xjjvideo'));
    return false
  }
  async bs(e) {
    await this.requestVideo(e, apiurl, path.join(__dirname, '../resource/bsvideo'));
    return false
  }

  async hs(e) {
    await this.requestVideo(e, apiurl2, path.join(__dirname, '../resource/hsvideo'));
    return false
  }

  async manzhan(e) {
    await this.requestVideo(e, apiurl3, path.join(__dirname, '../resource/manzhanvideo'));
    return false
  }

  async welfare(e) {
    let url = await fetch(apiurl4)
    if (!url.ok) return false
    url = await url.json()
    url = url.data?.video_mp4
    await this.requestVideo(e, url, path.join(__dirname, '../resource/welfarevideo'));
    return false
  }

  async chuanda(e) {
    await this.requestVideo(e, apiurl5, path.join(__dirname, '../resource/chuandavideo'));
    return false
  }

  async dance(e) {
    await this.requestVideo(e, apiurl6, path.join(__dirname, '../resource/dancevideo'));
    return false
  }

  async perfectBody(e) {
    await this.requestVideo(e, apiurl7, path.join(__dirname, '../resource/perfectbodyvideo'));
    return false
  }

  /**
   * 请求视频数据，并处理保存和发送
   * @param {Object} e - e
   * @param {string} apiUrl - 视频URL
   * @param {string} defaultSavePath - 默认保存路径
   * @param {boolean} deleteAfterSend - 发送后是否删除文件
   */
  async requestVideo(e, apiUrl, defaultSavePath, deleteAfterSend = false) {
    const ffmpeg = ffmpeg()
    if (ffmpeg) {
      logger.error('[Fanji-plugin][api视频类] 未安装ffmpeg，无法发送视频')
      return
    }
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`[Fanji-plugin][api视频类] 从 ${apiUrl} 获取视频失败`);
      }
      const videoData = await response.buffer();
      const savePath = defaultSavePath || path.join(__dirname, '../resource/default');
      const timestamp = Date.now();
      const videoPath = path.join(savePath, `${timestamp}.mp4`);
      await fs.promises.mkdir(savePath, { recursive: true });
      await fs.promises.writeFile(videoPath, videoData);
      await e.reply([segment.video(videoPath)]);
      if (deleteAfterSend) {
        await fs.promises.unlink(videoPath);
      }
      logger.info(`[Fanji-plugin][api视频类]成功获取并发送视频`);
    } catch (error) {
      logger.error(`[Fanji-plugin][api视频类] 视频发送函数出错: ${error}`);
    }
  }

  /**
   * 检查是否安装了 ffmpeg
   * @returns {boolean} - 返回 true为未安装 ffmpeg 否则返回 false
   */
  async ffmpeg() {
    try {
      const ret = execSync('ffmpeg -version').toString();
      if (!ret.includes('version')) {
        throw new Error('未安装 ffmpeg');
      }
      return false;
    } catch (error) {
      return true;
    }
  }
}