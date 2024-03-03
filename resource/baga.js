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
    //获取到原名别名对照json

   let ressname = checkText(e.msg, jsonStr)  //通过函数获取判断后的内容（如果匹配，则返回对应原名，不匹配则返回空内容）
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


/**
* 匹配json内容v1.1   支持原名别名
* @param txt 需要判断的文本
* @param jsonObj 传入的json
* @return key 返回匹配到的原名；如果未匹配到，则返空内容
*/
function checkText(txt, jsonObj) {
  for (let key in jsonObj) {
    if (txt.includes(key)) {
      return key;
    }
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