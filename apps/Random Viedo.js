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
let apiurl = '\u0020\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u0061\u0070\u0069\u002e\u0079\u0075\u006a\u006e\u002e\u0063\u006e\u002f\u0061\u0070\u0069\u002f\u0068\u0065\u0069\u0073\u0069\u0073\u002e\u0070\u0068\u0070\u003f\u0074\u0079\u0070\u0065\u003d\u0076\u0069\u0064\u0065\u006f';
let apiurl2 = '\u0020\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u0061\u0070\u0069\u002e\u0079\u0075\u006a\u006e\u002e\u0063\u006e\u002f\u0061\u0070\u0069\u002f\u0062\u0061\u0069\u0073\u0069\u0073\u002e\u0070\u0068\u0070\u003f\u0074\u0079\u0070\u0065\u003d\u0076\u0069\u0064\u0065\u006f';
const filepath = path.join(__dirname, '../config/config.yaml');
const configContent = fs.readFileSync(filepath, 'utf8');
let config = yaml.load(configContent);

export class apisetu extends plugin {
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
          reg: /^#?随机(黑丝|hｓ)?(视频)?$/i,
          fnc: 'hs',
        }
      ],
    });
  }
async hs(e) {
	await this.viedo(e, apiurl, '../resource/hsviedo')
}
async bs(e) {
	await this.viedo(e, apiurl2, '../resource/bsviedo')
}
async function viedo(e, apiUrl, defaultSavePath) {
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch video from ${apiUrl}`);
        }

        const videoData = await response.buffer();
        const timestamp = Date.now();
        const savePath = defaultSavePath || '../resource/default';
        const videoPath = path.join(savePath, `${timestamp}.mp4`);

        await fs.writeFile(videoPath, videoData);
        await e.reply([segment.video(videoPath)]);
    } catch (error) {
        console.error(`Error in hs function: ${error.message}`);
    }
}

}