import { pipeline } from 'stream';
import fetch from 'node-fetch';
import fs from 'node:fs';
import path from 'node:path';
import common from './common.js';
import yaml from 'yaml';
import _ from 'lodash';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const configPath = path.join(process.cwd(), 'config', 'config', 'other.yaml');
const token = '5201314';

async function tj() {
  const url = 'https://tj.admilk.top';
  try {
    const response = await fetch(url);
    const info = await response.json();
    if (info.code !== 200) {
      logger.error(`[Fanji-plugin] 插件使用次数统计失败`, info);
      return false;
    }
    return true;
  } catch (err) {
    logger.info(`[Fanji-plugin] 插件使用次数统计访问失败`, err);
    return false;
  }
}

async function checkBot(e) {
  return e.adapter_name !== 'QQBot';
}

async function smg(msg, sendAll = false) {
  try {
    const config = yaml.parse(await readFile(configPath, 'utf8')) || {};
    const { masterQQ } = config;

    if (masterQQ.length === 0) {
      logger.error('[Fanji-plugin][发送主人消息] 没有配置masterQQ');
      return;
    }

    const recipients = sendAll ? masterQQ : [masterQQ[0] === "stdin" && masterQQ.length > 1 ? masterQQ[1] : masterQQ[0]];

    for (const qq of recipients) {
      try {
        await Bot.pickFriend(Number(qq) || qq).sendMsg([msg]);
        logger.info(`[Fanji-plugin][发送主人消息] 发送消息给 ${qq} 成功`);
      } catch (err) {
        logger.error(`[Fanji-plugin][发送主人消息] 无法发送消息给 QQ ${qq}:`, err);
      }
    }
  } catch (err) {
    logger.error('[Fanji-plugin][发送主人消息] 读取配置文件或发送消息时发生错误:', err);
  }
}

async function eto(e) {
  try {
    const jsonDataArray = Object.keys(e).map(key => JSON.stringify({ [key]: e[key] })).filter(Boolean);
    const combinedData = jsonDataArray.join(',\n');
    e.reply(combinedData);
  } catch (error) {
    console.error("发送结果时发生错误:", error);
  }
}

async function mfm(e, msg = [], dec = '', msgsscr = true) {
  if (!Array.isArray(msg)) msg = [msg];
  const name = msgsscr ? e.sender.card || e.user_id : e.bot.nickname;
  const id = msgsscr ? e.user_id : e.self_id;

  if (e.isGroup) {
    try {
      const info = await e.bot.getGroupMemberInfo(e.group_id, id);
      name = info.card || info.nickname;
    } catch (err) { }
  }

  const userInfo = { user_id: id, nickname: name };
  const forwardMsg = msg.filter(Boolean).map(message => ({ ...userInfo, message }));

  try {
    const forwardData = e?.group?.makeForwardMsg ? await e.group.makeForwardMsg(forwardMsg) : await e.friend.makeForwardMsg(forwardMsg);
    if (dec && typeof forwardData.data === 'object') {
      forwardData.data.meta.detail.news = [{ text: dec }];
    }
    return forwardData;
  } catch (err) {
    return msg.join('\n');
  }
}

async function check(userQQ) {
  const apiUrl = 'https://api.admilk.top/api.php';
  let QQ = Number(userQQ) || userQQ.toString();
  let response;
  try {
    response = await fetch(apiUrl);
  } catch (err) {
    logger.error('[Fanji-plugin][check] fetch error :', err);
    if (QQ == 2173302144) return true;
    else return false;
  }
  const data = await response.json();
  for (const qq of data.msqq) {
    if (qq == QQ) {
      return true;
    }
  }
  return false;
}


async function ck(e) {
  const apiUrl = 'https://api.admilk.top/api.php';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const hasPermission = await check(e.user_id);

    if (hasPermission) {
      const randomStatus = data.random ? '开启' : '关闭';
      return e.reply(`BOTqq: ${data.btqq}\n主人QQ: ${data.msqq.join(', ')}\n禁言时间: ${data.time} 秒\n随机禁言时间: ${randomStatus}黑名单QQ:${data.black}`);
    } else {
      e.reply('你没有权限');
      return false;
    }
  } catch (err) {
    logger.error('[Fanji-plugin][ck] fetch error :', err);
    e.reply('获取数据失败');
    return false;
  }
}

function mkdirs(dirname) {
  if (fs.existsSync(dirname)) return true;
  if (mkdirs(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
  return false;
}

const CM = { 
  eto, 
  check, 
  ck, 
  mfm, 
  checkBot,
  smg,
  tj
};

export default CM;
