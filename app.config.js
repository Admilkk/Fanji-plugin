import path from 'path';
/**自定义全局插件名*/
export const AppName = 'Fanji-plugin';

// 导出ThePath常量，值为当前文件所在的路径
export const ThePath = `${path.resolve().replace(/\\/g, '/')}`;
/**自定义全局插件绝对路径*/
export const MyDirPath = `${ThePath}/plugins/${AppName}`;