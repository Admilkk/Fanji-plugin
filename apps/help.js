import Help from "../model/help.js";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import md5 from "md5";
import config from "../model/index.js";
import Version from "../model/version.js";

const _path = process.cwd();
export class help extends plugin {
    constructor(e) {
        super({
            name: "Fanji插件帮助",
            dsc: "插件帮助插件帮助",
            event: "message",
            priority: 500,
            rule: [
                {
                    reg: /^#?((FANJI)|反击)(命令|帮助|菜单)$/gi,
                    fnc: "help",
                },
                {
                    reg: "^#*反击(插件)?版本$",
                    fnc: "version",
                }
            ],
        });
        this.versionData = config.getConfig("version");
    }

// 异步版本函数
    async version() {
        // 调用Version类，获取版本信息
        const data = await new Version(this.e).getData(this.versionData.slice(0, 3));
        // 调用puppeteer，获取图片
        let img = await puppeteer.screenshot("version", data);
        // 返回图片
        this.e.reply(img);
    }
    // 异步帮助函数
    async help() {
        // 调用Help类，获取帮助信息
        let data = await Help.get(this.e);
        // 如果没有帮助信息，则返回
        if (!data) {
            return;
        }
        // 调用cache函数，获取图片
        let img = await this.cache(data);
        // 返回图片
        await this.reply(img);
    }

// 异步缓存函数，用于缓存数据
    async cache(data) {
        // 获取data的md5值
        let tmp = md5(JSON.stringify(data));
        // 如果help.helpData.md5的值等于tmp，则直接返回help.helpData.img
        if (help.helpData.md5 === tmp) {
            return help.helpData.img;
        }

        // 调用puppeteer.screenshot函数，获取help.helpData.img的值
        help.helpData.img = await puppeteer.screenshot("help", data);
        // 将tmp的值赋值给help.helpData.md5
        help.helpData.md5 = tmp;

        // 返回help.helpData.img
        return help.helpData.img;
    }

   static helpData = {
        md5: "",
        img: "",
    };
}