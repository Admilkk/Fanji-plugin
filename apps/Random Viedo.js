import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
//import cm from '../lib/common/CM.js';
import common from '../lib/common/common.js';
import { fileURLToPath } from 'url';
import https from 'https';
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
export class apiviedo extends plugin {
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
        /* 		{
                  reg: `^#?(${originalValues.join('|')})$`,
                  fnc: 'jh'
                }, */
        {
          reg: '^#?随机慢摇视频$',
          fnc: 'manyao'
        },
        {
          reg: /^#?查看全部(随机)?视频(类型)?/,
          fnc: 'ck'
        }
      ],
    });
  }
  async manyao(e) {
    let aw = await this.ffmpeg()
    if (aw) { return }
    await this.viedo(e, 'http://api.yujn.cn/api/manyao.php', path.join(__dirname, '../resource/manyaoviedo'))
  }
  async ck(e) {
    e.reply(originalValues.join('\n'))
  }
  async hs(e) {
    let aw = await this.ffmpeg()
    if (aw) { return }
    await this.viedo(e, apiurl, path.join(__dirname, '../resource/hsviedo'))
  }
  async bs(e) {
    let aw = await this.ffmpeg()
    if (aw) { return }
    await this.viedo(e, apiurl2, path.join(__dirname, '../resource/bsviedo'))
  }
  async xjj(e) {
    let aw = await this.ffmpeg()
    if (aw) { return }
    await this.viedo(e, 'https://api.yunxiyuanyxy.xyz/plus/?type=302', path.join(__dirname, '../resource/xjjviedo'))
  }
  /* async jh (e) {
      let aw = await this.ffmpeg();
      if (!aw) { return; }
      try {
          let name = correspondingValues[originalValues.indexOf(e.msg.replace('#', ''))];
          let urls = `http://api.hanhanz.gq:4006?category=${name}`;
          let resp = await fetch(urls);
          console.log(resp.url);
          const absolutePath = path.join(__dirname, `../resource/${name}`);
          await this.viedo(e, urls, absolutePath);
      } catch (error) {
          e.reply('报错：' + error);
      }
  } */

  async viedo(e, apiUrl, defaultSavePath) {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch video from ${apiUrl}`);
      }

      const videoData = await response.buffer();
      const savePath = defaultSavePath || path.join(__dirname, '../resource/default');
      const timestamp = Date.now();
      const videoPath = path.join(savePath, `${timestamp}.mp4`);

      // Ensure the directory exists before writing the file
      await fs.promises.mkdir(savePath, { recursive: true });

      await fs.promises.writeFile(videoPath, videoData);
      await e.reply([segment.video(videoPath)]);
      await e.reply('From Fanji-plugin');
    } catch (error) {
      console.error(`Error in viedo function: ${error.message}`);
    }
  }

  async ffmpeg() {
    let ret = await execSync('git -h', { encoding: 'utf-8' })
    if (!ret || !ret.includes('version')) {
      await this.reply('请先安装ffmpeg')
      return true
    }
    return false
  }

}

