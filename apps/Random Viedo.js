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
//以下内容防君子不防小人
let apiurl = '\u0020\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u0061\u0070\u0069\u002e\u0079\u0075\u006a\u006e\u002e\u0063\u006e\u002f\u0061\u0070\u0069\u002f\u0068\u0065\u0069\u0073\u0069\u0073\u002e\u0070\u0068\u0070\u003f\u0074\u0079\u0070\u0065\u003d\u0076\u0069\u0064\u0065\u006f';
let apiurl2 = '\u0020\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u0061\u0070\u0069\u002e\u0079\u0075\u006a\u006e\u002e\u0063\u006e\u002f\u0061\u0070\u0069\u002f\u0062\u0061\u0069\u0073\u0069\u0073\u002e\u0070\u0068\u0070\u003f\u0074\u0079\u0070\u0065\u003d\u0076\u0069\u0064\u0065\u006f';
const filepath = path.join(__dirname, '../config/config.yaml');
const configContent = fs.readFileSync(filepath, 'utf8');
let config = yaml.load(configContent);
const originalValues = [
  '抖音变装', '快手变装', '随机裙子', '甜妹视频', '随机小姐姐', '双倍快乐', 'loli', '玉足',
  '黑丝视频', '白丝视频', '慢摇视频', 'cos系列', '纯情女高', '吊带系列', '完美身材',
  '热舞视频', '穿搭系列', '学姐系列', '卡哇伊', '清纯系列', '汉服系列'
]
const correspondingValues = [
  'dybianzhuang', 'ksbianzhuang', 'qunzi', 'tianmei', 'yzxjj', 'shuangbei', 'loli', 'yuzu',
  'heisi', 'baisi', 'manyao', 'cos', 'nvgao', 'diaodai', 'shencai',
  'rewu', 'chuanda', 'xuejie', 'kawayi', 'qingchun', 'hanfu'

]
export class apivideo extends plugin {
  constructor() {
    super({
      name: '反击API',
      dsc: '反击API',
      event: 'message',
      priority: -9999999999999999999999999999999999999999999999991,
      rule: [
        {
          reg: /^#?随机(bs|白丝)(视频)$/i,
          fnc: 'bs',
        },
        {
          reg: /^#?随机(黑丝|hｓ)(视频)?$/i,
          fnc: 'hs',
        },
        {
          reg: /^#?随机(小姐姐)(视频)?$/i,
          fnc: 'xjj',
        },
        {
          reg: '^#?随机慢摇视频$',
          fnc: 'manyao'
        }
      ],
    });
  }

  async manyao(e) {
    await this.requestVideo(e, 'http://api.yujn.cn/api/manyao.php', path.join(__dirname, '../resource/manyaovideo'));
  }
  async hs(e) {
    await this.requestVideo(e, apiurl, path.join(__dirname, '../resource/hsvideo'));
  }

  async bs(e) {
    await this.requestVideo(e, apiurl2, path.join(__dirname, '../resource/bsvideo'));
  }

  async xjj(e) {
    await this.requestVideo(e, 'https://api.yunxiyuanyxy.xyz/plus/?type=302', path.join(__dirname, '../resource/xjjvideo'));
  }

  /**
   * 请求视频数据，并处理保存和发送
   * @param {Object} e - e
   * @param {string} apiUrl - 视频URL
   * @param {string} defaultSavePath - 默认保存路径
   * @param {boolean} deleteAfterSend - 发送后是否删除文件
   */
  async requestVideo(e, apiUrl, defaultSavePath, deleteAfterSend = false) {
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
      logger.info(`[Fanji-plugin][api视频类]成功从 ${apiUrl} 获取并发送视频`);
    } catch (error) {
      logger.error(`[Fanji-plugin][api视频类] requestVideo 函数出错: ${error.message}`);
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