import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'
import YAML from 'yaml'

import { json } from "sequelize";

export class baga extends plugin {
  constructor() {
    super({
      name: '出丑',
      dsc: '出丑',
      event: 'message',
      priority: 300,
      rule: [{
        reg: "^#?出丑图(.*)$",
        fnc: 'baga'
      },
      ]
    });
  }
  async baga(e) {
   // console.log(e.msg)
    let res = await fetch('https://gitee.com/yunxiyuan_admin/gaffe/raw/master/alias.json');
    let obj = await res.json()
    let jsonStr = obj;
   let ressname = checkText(e.msg, jsonStr)
  // console.log(ressname)
    if(ressname !== ''){
      console.log('已匹配到'+ressname)
      e.reply(segment.image('https://api.yunxiyuanyxy.xyz/gaffe/?list='+ressname))
     // e.reply(ressname)
    }else{
      return true
    }
    return true
  }
}

function checkText(txt, jsonObj) {
  for (let key in jsonObj) {
    if (Array.isArray(jsonObj[key])) {
      for (let item of jsonObj[key]) {
        if (txt.indexOf(item) !== -1) {
          return key;
        }
      }
    }
  }
  return '';
}