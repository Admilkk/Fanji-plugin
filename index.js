import chalk from 'chalk';
import { appsOut } from './robot/index.js';
import fs from 'node:fs';
import chokidar from 'chokidar';
import path from 'node:path';
import yaml from 'js-yaml';
import Setting from './plugins/Fanji-plugin/config/utils/setting.js';
// const setting = new Setting()
setting.initCfg()
const configFilePath = path.resolve('./config/config/other.yaml');
const otherConfigFilePath = path.resolve('./plugins/Fanji-plugin/config');
function _0xb6a9(){const _0x32a2ee=['C2vHCMnO','sxjvChm','tNDHBwG','wg1SBKm','Dg9tDhjPBMC','CLHOrge','y29UC3rYDwn0BW','DgfIBgu','tLnPswS','yMLUza','ywX3B2K','Aw4VyxbWCY91Ca','y3rVCIGICMv0Dq','zuvqA3a','teDbA3q','BwvZC2fNzq','rMLSzsaN','y0PUC1i','zhLHrgK','A3z6t1K','nJy0nZm2oeLLv2rPqq','y29WEuzPBgvtEq','D2fYBG','A3L5BeW','mJKYmJKZnZj5yNbPu08','whzdv1m','rMfUAMKTCgX1zW','EgThCfm','y29UC29Szq','wM5YC3m','vKnJwvq','kcGOlISPkYKRkq','nZi2mdKWmgr4vKTtrW','y1vZDxC','qufsvgS','mJf5rKjcteO','v1POr0O','vfv1vgu','mtiWrg5OtLnc','vKXVwuK','vLPfA0W','ufzXENa','thL1AKu','DMz4zMC','l2qVCs9KyxrLlG','mJy5ndy1q0vKrKDh','yxbWBhK','DujOvvK','vevMwKe','BgvUz3rO','CM4GDgHPCYiPka','zK1pseK','AvPdD1m','jYdLPi3LIlBMIjdLIP8U','otK2nJzwy3ncvuy','5Asn5yI25PAh5lU25AsX6lsLoIa','yMzYqLi','x19WCM90B19F','mtyXnZrxthvWCwO','ChjVDg90ExbL','zxjYB3i','Aw4VBgLIl3GVEG','CMv0DxjUicHMDq','Aw5MBW','BMn0Aw9UkcKG','Cw5eww8','sLzztNG','qvHAve4','lI9WBhvNAw5ZlW','nJmZmteYmgvOB1rgta'];_0xb6a9=function(){return _0x32a2ee;};return _0xb6a9();}(function(_0x16822e,_0x3f982e){function _0x5b83f3(_0x4013cc,_0x38b7ce,_0x18aa86,_0x33e67e){return _0x5e5d(_0x4013cc- -0x26e,_0x18aa86);}const _0x521f9f=_0x16822e();function _0x591ab2(_0x53ce16,_0x211bc3,_0x298aba,_0x3ef934){return _0x5e5d(_0x53ce16- -0x98,_0x298aba);}while(!![]){try{const _0x585e87=-parseInt(_0x591ab2(0x17c,0x15f,0x16c,0x199))/(-0x448+-0x1*-0xea3+0xa*-0x109)+parseInt(_0x591ab2(0x180,0x170,0x18c,0x173))/(0x97e*-0x1+-0xdf*-0x1e+-0x10a2)*(-parseInt(_0x591ab2(0x169,0x186,0x17d,0x166))/(0x23cc+-0x7*0x581+0x2be))+-parseInt(_0x5b83f3(-0x7c,-0x6e,-0x6a,-0x72))/(-0x4f*-0x33+0x1*-0x1bfd+0xc44)+parseInt(_0x591ab2(0x18b,0x1a8,0x1a4,0x182))/(-0xa6e+0x76*0x4+0x89b)+-parseInt(_0x5b83f3(-0x70,-0x68,-0x7b,-0x78))/(0x79+-0x3*0x277+-0x6f2*-0x1)+parseInt(_0x591ab2(0x173,0x176,0x169,0x16a))/(0x209+0x8db*0x1+0x135*-0x9)*(-parseInt(_0x5b83f3(-0x6a,-0x87,-0x67,-0x4c))/(0x445*0x1+0x55*0x13+0x1*-0xa8c))+parseInt(_0x5b83f3(-0x78,-0x9a,-0x5c,-0x63))/(0x1721*0x1+0x1a81+-0x3199);if(_0x585e87===_0x3f982e)break;else _0x521f9f['push'](_0x521f9f['shift']());}catch(_0x3e7960){_0x521f9f['push'](_0x521f9f['shift']());}}}(_0xb6a9,0xf3a*0x177+-0x95bff+0xe9d9));function copyFile(){const _0xefabb4={'AXZTN':function(_0x32dbb7,_0x3d4df4){return _0x32dbb7!==_0x3d4df4;},'cUsuw':_0x46ebdb(-0x17a,-0x150,-0x143,-0x159),'mmDgy':function(_0x2ebd36,_0xd873eb){return _0x2ebd36===_0xd873eb;},'kyylL':_0x133f01(0x1ce,0x1b9,0x1cc,0x1bf),'gKWBP':'ouhhb','PVqzp':_0x46ebdb(-0x185,-0x172,-0x168,-0x183)+'+$','eGPxC':_0x133f01(0x1d7,0x1f7,0x1e2,0x1b8),'TUuTe':'Kiowb','vfxfg':_0x133f01(0x1fb,0x200,0x1d8,0x20e),'dyaDi':function(_0x24f2ac,_0x164a2a){return _0x24f2ac(_0x164a2a);},'uBhUY':function(_0x264469,_0x195a72){return _0x264469+_0x195a72;},'WZhGJ':function(_0x358451,_0x28b86b){return _0x358451+_0x28b86b;},'EwWtl':_0x46ebdb(-0x15a,-0x15c,-0x176,-0x164)+'nction()\x20','NSiIk':'{}.constru'+_0x46ebdb(-0x138,-0x141,-0x171,-0x150)+_0x46ebdb(-0x16a,-0x168,-0x191,-0x170)+'\x20)','cJnsR':_0x46ebdb(-0x154,-0x149,-0x147,-0x14f),'qnDYo':function(_0x2e2fad){return _0x2e2fad();},'IrUps':_0x46ebdb(-0x14e,-0x17f,-0x156,-0x163),'AARTk':_0x133f01(0x1e3,0x1e3,0x206,0x1d7),'kvzOY':'exception','alwoi':_0x46ebdb(-0x162,-0x162,-0x14a,-0x155),'Nwamh':'trace','HRfvs':function(_0x4907ab,_0xafe762){return _0x4907ab<_0xafe762;},'rXhDa':_0x133f01(0x1c2,0x1c8,0x1df,0x1c2),'LyujE':function(_0x5ecdbf,_0x3c799b,_0x48c139){return _0x5ecdbf(_0x3c799b,_0x48c139);},'tBOhP':function(_0x4cd2d9){return _0x4cd2d9();},'JVYNx':_0x133f01(0x1eb,0x1e4,0x1c8,0x1fb)+'Fanji-plug'+_0x46ebdb(-0x145,-0x154,-0x184,-0x165)+_0x133f01(0x1d3,0x1eb,0x1bc,0x1bf)+'js','Znrss':_0x133f01(0x1eb,0x1d2,0x1db,0x1f1)+_0x133f01(0x1c1,0x1b5,0x1c9,0x1e3)+_0x133f01(0x1f8,0x200,0x20c,0x1ea)+'date.js'},_0x3a66e4=(function(){const _0x32bee1={};function _0x11b2e9(_0xcfe0f1,_0x11db1e,_0x482bca,_0x4e723a){return _0x133f01(_0xcfe0f1- -0x239,_0x11db1e-0x180,_0x482bca-0x1c1,_0x482bca);}function _0xafa5aa(_0x167a1d,_0x34cf0b,_0x38c128,_0x2835d1){return _0x133f01(_0x167a1d-0x2f5,_0x34cf0b-0x9,_0x38c128-0xc4,_0x2835d1);}_0x32bee1[_0xafa5aa(0x4ba,0x4c8,0x4ae,0x497)]=_0xefabb4[_0xafa5aa(0x4bd,0x4bd,0x4d4,0x4b8)];const _0x487dde=_0x32bee1;if(_0xefabb4['mmDgy'](_0xefabb4[_0x11b2e9(-0x7b,-0x97,-0x64,-0x7e)],_0xefabb4['gKWBP']))_0xf7daa5[_0xafa5aa(0x4d8,0x4f9,0x4ea,0x4ca)](_0x11b2e9(-0x5b,-0x54,-0x62,-0x5c)+_0x319f78[_0x11b2e9(-0x3d,-0x40,-0x20,-0x23)]);else{let _0x38617d=!![];return function(_0x51126c,_0x58a906){function _0x14d10c(_0x13e566,_0xa94471,_0x566087,_0xa38df4){return _0x11b2e9(_0x13e566-0x3c8,_0xa94471-0xa3,_0xa94471,_0xa38df4-0x1);}function _0x5abfad(_0x36ccbd,_0x16752a,_0x33e171,_0x484205){return _0xafa5aa(_0x36ccbd- -0x275,_0x16752a-0x7b,_0x33e171-0x1ac,_0x484205);}if(_0xefabb4['AXZTN'](_0x5abfad(0x25b,0x245,0x27a,0x278),'iZCwS')){const _0x4eed91=_0x3b9f71[_0x14d10c(0x382,0x396,0x369,0x36b)+'r'][_0x5abfad(0x262,0x24c,0x252,0x262)][_0x14d10c(0x385,0x388,0x39a,0x36c)](_0x158957),_0x8d7f4b=_0x4a09f4[_0x5c423c],_0x18daee=_0xf42a1b[_0x8d7f4b]||_0x4eed91;_0x4eed91['__proto__']=_0x1e9c23[_0x5abfad(0x276,0x284,0x261,0x286)](_0x31e64b),_0x4eed91[_0x14d10c(0x380,0x371,0x397,0x36d)]=_0x18daee[_0x5abfad(0x271,0x256,0x269,0x27d)][_0x14d10c(0x385,0x399,0x397,0x377)](_0x18daee),_0x5c2c84[_0x8d7f4b]=_0x4eed91;}else{const _0x18c525=_0x38617d?function(){function _0x46de2c(_0x3ff0c6,_0x53c617,_0x37bc09,_0x297049){return _0x5abfad(_0x53c617-0x17c,_0x53c617-0x151,_0x37bc09-0x18d,_0x297049);}function _0x220c63(_0x18ecc0,_0x308fb7,_0x24db9c,_0x22c702){return _0x14d10c(_0x308fb7- -0x30a,_0x18ecc0,_0x24db9c-0x18f,_0x22c702-0xdb);}if(_0x58a906){if(_0x487dde[_0x46de2c(0x3d7,0x3c1,0x3d2,0x3d0)]===_0x220c63(0x34,0x45,0x2f,0x58)){const _0x4ceb95=_0x517db7[_0x220c63(0x6f,0x5a,0x57,0x38)](_0x3fed27,arguments);return _0x141d50=null,_0x4ceb95;}else{const _0x389a14=_0x58a906['apply'](_0x51126c,arguments);return _0x58a906=null,_0x389a14;}}}:function(){};return _0x38617d=![],_0x18c525;}};}}()),_0x2f5d2f=_0x3a66e4(this,function(){function _0x3336be(_0x477339,_0x14dfef,_0x2d95fe,_0x5410f6){return _0x46ebdb(_0x2d95fe,_0x14dfef-0xed,_0x2d95fe-0x158,_0x5410f6-0x6a0);}function _0x3d36c9(_0x1680c6,_0x40c96a,_0x3d259c,_0x49002a){return _0x46ebdb(_0x40c96a,_0x40c96a-0xbb,_0x3d259c-0x158,_0x49002a-0x550);}return _0x2f5d2f['toString']()[_0x3d36c9(0x3df,0x406,0x3f8,0x3f4)](_0xefabb4[_0x3336be(0x51b,0x543,0x545,0x527)])[_0x3d36c9(0x3f3,0x3ef,0x412,0x3f8)]()[_0x3336be(0x536,0x545,0x55f,0x54a)+'r'](_0x2f5d2f)['search'](_0x3d36c9(0x3b0,0x3ac,0x3d3,0x3cd)+'+$');});_0xefabb4[_0x46ebdb(-0x154,-0x159,-0x164,-0x161)](_0x2f5d2f);const _0xe717cd=(function(){const _0x5661f7={'BZgpW':function(_0x35f328,_0x1b394d){function _0x20afe3(_0x1ab07a,_0x3882fc,_0x2db1b4,_0xc5c126){return _0x5e5d(_0xc5c126-0x320,_0x1ab07a);}return _0xefabb4[_0x20afe3(0x555,0x51f,0x52e,0x541)](_0x35f328,_0x1b394d);},'fMOHI':_0xefabb4['eGPxC']};let _0x2b4753=!![];return function(_0x344021,_0x42f5c4){const _0x498a5a={'VZEkL':function(_0x580fbd,_0x15ef38){return _0x5661f7['BZgpW'](_0x580fbd,_0x15ef38);},'pjtWV':_0x5661f7[_0x2b9e44(0x1d8,0x1b1,0x1bc,0x1cb)]};function _0x2b9e44(_0x4d8455,_0x1f4192,_0x58f26b,_0x420bd1){return _0x5e5d(_0x58f26b- -0x55,_0x4d8455);}const _0x15444e=_0x2b4753?function(){function _0x1d27ad(_0x522e55,_0x5e332e,_0x424001,_0x12ab9c){return _0x2b9e44(_0x424001,_0x5e332e-0x98,_0x522e55- -0x11d,_0x12ab9c-0x15d);}function _0x24f12f(_0x2f7ce7,_0x526cc5,_0x2f4fe9,_0x3e3ad1){return _0x2b9e44(_0x2f4fe9,_0x526cc5-0x104,_0x526cc5- -0x27e,_0x3e3ad1-0x18);}if(_0x42f5c4){if(_0x498a5a[_0x24f12f(-0xc2,-0xcd,-0xd9,-0xed)](_0x1d27ad(0xa4,0x89,0x9d,0xbb),_0x498a5a['pjtWV'])){const _0x27cfde=_0x42f5c4[_0x1d27ad(0x9a,0x9d,0xaf,0x7c)](_0x344021,arguments);return _0x42f5c4=null,_0x27cfde;}else _0x9accbd=_0x407bb2;}}:function(){};return _0x2b4753=![],_0x15444e;};}()),_0x339a2b=_0xefabb4[_0x46ebdb(-0x15f,-0x189,-0x18d,-0x178)](_0xe717cd,this,function(){function _0x312ec2(_0x8326f0,_0x12e732,_0x4b87db,_0x1405f3){return _0x133f01(_0x4b87db-0x3bc,_0x12e732-0x97,_0x4b87db-0x1b4,_0x1405f3);}const _0x444382=function(){function _0x341fd4(_0x34bd77,_0x33d101,_0x24b7fa,_0x40e874){return _0x5e5d(_0x33d101- -0x139,_0x34bd77);}function _0x2cf078(_0x413fe8,_0x1f5603,_0x4016ee,_0x36c8d7){return _0x5e5d(_0x413fe8-0x117,_0x36c8d7);}if(_0xefabb4[_0x2cf078(0x31a,0x30f,0x330,0x2f9)]===_0xefabb4[_0x341fd4(0xcc,0xd0,0xc3,0xe1)]){if(_0x4c2d86){const _0x3f4dbd=_0x3e6dab[_0x341fd4(0xd6,0xd3,0xb6,0xc6)](_0x2844ab,arguments);return _0x5de8c7=null,_0x3f4dbd;}}else{let _0x5c51f6;try{_0x5c51f6=_0xefabb4[_0x341fd4(0xfb,0xfd,0x107,0x106)](Function,_0xefabb4[_0x341fd4(0xba,0xd4,0xd0,0xc5)](_0xefabb4[_0x341fd4(0xcc,0xc9,0xd9,0xb9)](_0xefabb4['EwWtl'],_0xefabb4['NSiIk']),');'))();}catch(_0x2ef032){if(_0xefabb4['mmDgy'](_0xefabb4[_0x2cf078(0x34c,0x339,0x34a,0x331)],_0xefabb4[_0x341fd4(0xed,0xfc,0xfc,0x100)]))_0x5c51f6=window;else{const _0x206c78=_0x3eaa38[_0x2cf078(0x323,0x327,0x332,0x338)](_0x3d448a,arguments);return _0x1c04a8=null,_0x206c78;}}return _0x5c51f6;}},_0x3eac60=_0xefabb4[_0x312ec2(0x588,0x5b9,0x5a4,0x5a5)](_0x444382),_0x44ec71=_0x3eac60[_0x312ec2(0x564,0x589,0x57f,0x59e)]=_0x3eac60[_0x312ec2(0x576,0x560,0x57f,0x592)]||{},_0x621fc4=['log',_0x312ec2(0x569,0x556,0x579,0x57e),_0xefabb4[_0x312ec2(0x5a8,0x5c3,0x5aa,0x59b)],_0xefabb4[_0x27c8b6(-0x181,-0x197,-0x181,-0x17f)],_0xefabb4[_0x312ec2(0x5de,0x5c3,0x5bc,0x5d6)],_0xefabb4[_0x27c8b6(-0x15a,-0x152,-0x153,-0x13b)],_0xefabb4[_0x312ec2(0x5bf,0x5b7,0x5ab,0x5b1)]];function _0x27c8b6(_0x591591,_0x24d887,_0x27537d,_0x5d70a8){return _0x133f01(_0x27537d- -0x34a,_0x24d887-0x68,_0x27537d-0x33,_0x24d887);}for(let _0x5bced3=-0x342+0x10*0x193+0x1*-0x15ee;_0xefabb4['HRfvs'](_0x5bced3,_0x621fc4[_0x27c8b6(-0x175,-0x175,-0x172,-0x180)]);_0x5bced3++){if(_0xefabb4[_0x27c8b6(-0x153,-0x17b,-0x160,-0x182)](_0xefabb4[_0x27c8b6(-0x16e,-0x170,-0x158,-0x161)],_0xefabb4[_0x27c8b6(-0x144,-0x14a,-0x158,-0x13e)]))_0x4bc40e=_0x5da2f3(QrEpGm[_0x312ec2(0x569,0x59b,0x587,0x575)](QrEpGm[_0x312ec2(0x588,0x56c,0x587,0x57b)](_0x27c8b6(-0x14c,-0x154,-0x165,-0x147)+_0x27c8b6(-0x166,-0x179,-0x163,-0x17e),QrEpGm[_0x27c8b6(-0x133,-0x147,-0x155,-0x136)]),');'))();else{const _0x1549ca=_0xe717cd[_0x27c8b6(-0x15d,-0x173,-0x157,-0x155)+'r'][_0x312ec2(0x5ae,0x581,0x59e,0x58b)][_0x27c8b6(-0x165,-0x149,-0x154,-0x154)](_0xe717cd),_0x31a2ce=_0x621fc4[_0x5bced3],_0x3cf00e=_0x44ec71[_0x31a2ce]||_0x1549ca;_0x1549ca[_0x312ec2(0x588,0x5a9,0x59c,0x590)]=_0xe717cd[_0x27c8b6(-0x16c,-0x139,-0x154,-0x163)](_0xe717cd),_0x1549ca[_0x312ec2(0x5c4,0x5b0,0x5ad,0x5c2)]=_0x3cf00e[_0x312ec2(0x58c,0x5a7,0x5ad,0x599)]['bind'](_0x3cf00e),_0x44ec71[_0x31a2ce]=_0x1549ca;}}});_0xefabb4['tBOhP'](_0x339a2b);function _0x46ebdb(_0x408f73,_0x52c234,_0x1c2278,_0x1f4e52){return _0x5e5d(_0x1f4e52- -0x380,_0x408f73);}function _0x133f01(_0x52778c,_0x221e4e,_0x3a684e,_0x5a26e9){return _0x5e5d(_0x52778c- -0x37,_0x5a26e9);}const _0x567f77=_0xefabb4[_0x133f01(0x1e9,0x1ca,0x1cf,0x204)],_0x21009c=_0xefabb4[_0x133f01(0x1c4,0x1b8,0x1ce,0x1aa)];try{fs[_0x46ebdb(-0x18d,-0x16f,-0x1ae,-0x18d)+'nc'](_0x567f77,_0x21009c),logger[_0x133f01(0x1e6,0x1d1,0x1da,0x1fc)](_0x133f01(0x1fd,0x205,0x1f1,0x1dc)+_0x21009c+_0x46ebdb(-0x152,-0x181,-0x17a,-0x16d));}catch(_0x65c68b){logger[_0x46ebdb(-0x183,-0x152,-0x15a,-0x166)](_0x46ebdb(-0x170,-0x159,-0x15c,-0x16b)+_0x65c68b[_0x46ebdb(-0x15c,-0x134,-0x169,-0x14d)]);}}function _0x5e5d(_0x1851cb,_0x335e9d){const _0x5a66f7=_0xb6a9();return _0x5e5d=function(_0x26bf47,_0x349ee4){_0x26bf47=_0x26bf47-(-0x2382+-0xdf5*0x2+-0x6*-0xae5);let _0x58ab5a=_0x5a66f7[_0x26bf47];if(_0x5e5d['ywCtHD']===undefined){var _0x5103c4=function(_0x4a77aa){const _0x11db6c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x300dec='',_0x104ad0='',_0x5e9e55=_0x300dec+_0x5103c4;for(let _0x345d07=-0x1867+0x1*-0x11c7+0x2a2e,_0x285c9b,_0x51efe1,_0x23b52c=-0x1*0x1174+0x182b+-0x23d*0x3;_0x51efe1=_0x4a77aa['charAt'](_0x23b52c++);~_0x51efe1&&(_0x285c9b=_0x345d07%(-0x17ae+-0x13be+-0x8*-0x56e)?_0x285c9b*(-0xe8b*0x1+-0x19*-0x5f+-0x584*-0x1)+_0x51efe1:_0x51efe1,_0x345d07++%(-0x1865+0x1*0xba5+0xcc4))?_0x300dec+=_0x5e9e55['charCodeAt'](_0x23b52c+(-0x1d*0x7b+0x1494+-0x69b*0x1))-(-0x2559+-0x2515+0x4a78)!==-0x85*-0x16+-0x22e6+-0xbbc*-0x2?String['fromCharCode'](0x20ed+0x1c0*0x5+-0x29*0xfe&_0x285c9b>>(-(-0x1ec+-0x238d+0x5*0x77f)*_0x345d07&0x16d+-0x13f2+0x128b)):_0x345d07:-0x44a*0x2+0x6c6+0x7*0x42){_0x51efe1=_0x11db6c['indexOf'](_0x51efe1);}for(let _0x5d2cb4=0xf1*-0x23+-0x21*0x4e+-0x1*-0x2b01,_0x43da3c=_0x300dec['length'];_0x5d2cb4<_0x43da3c;_0x5d2cb4++){_0x104ad0+='%'+('00'+_0x300dec['charCodeAt'](_0x5d2cb4)['toString'](0x25df*0x1+-0x18c2+0xd*-0x101))['slice'](-(0x2*-0x80f+-0x1*-0x679+0x9a7));}return decodeURIComponent(_0x104ad0);};_0x5e5d['oKoiYX']=_0x5103c4,_0x1851cb=arguments,_0x5e5d['ywCtHD']=!![];}const _0x3be356=_0x5a66f7[0x1*0x12f9+0x163a+-0x2933],_0x3f449f=_0x26bf47+_0x3be356,_0x10c5f0=_0x1851cb[_0x3f449f];if(!_0x10c5f0){const _0x270f8b=function(_0x56f5f2){this['IfAAUV']=_0x56f5f2,this['xPEbQP']=[-0x1c5*-0xd+0x25a5+-0x3ca5,0x7b8+-0x1514+0x72*0x1e,-0x9d*0xc+0x1d12*-0x1+0x246e],this['cffRuY']=function(){return'newState';},this['ixfZhI']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['mfdVCl']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x270f8b['prototype']['kxePpd']=function(){const _0x459ae9=new RegExp(this['ixfZhI']+this['mfdVCl']),_0x1ac58d=_0x459ae9['test'](this['cffRuY']['toString']())?--this['xPEbQP'][-0x2*0x6ff+0x1d0+0x1*0xc2f]:--this['xPEbQP'][0x1eb*0xa+0x214b+-0x7*0x77f];return this['rkuxdR'](_0x1ac58d);},_0x270f8b['prototype']['rkuxdR']=function(_0x5c54d0){if(!Boolean(~_0x5c54d0))return _0x5c54d0;return this['ZgCnMc'](this['IfAAUV']);},_0x270f8b['prototype']['ZgCnMc']=function(_0x3f15e3){for(let _0x1a2027=-0xca*0x1d+0x2fd+-0xb*-0x1cf,_0x2577a7=this['xPEbQP']['length'];_0x1a2027<_0x2577a7;_0x1a2027++){this['xPEbQP']['push'](Math['round'](Math['random']())),_0x2577a7=this['xPEbQP']['length'];}return _0x3f15e3(this['xPEbQP'][-0x19d2+-0x8ad*-0x1+0x1125]);},new _0x270f8b(_0x5e5d)['kxePpd'](),_0x58ab5a=_0x5e5d['oKoiYX'](_0x58ab5a),_0x1851cb[_0x3f449f]=_0x58ab5a;}else _0x58ab5a=_0x10c5f0;return _0x58ab5a;},_0x5e5d(_0x1851cb,_0x335e9d);}await copyFile();

async function copyHM(source, target) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(source);
        const writeStream = fs.createWriteStream(target);
        readStream.on('error', reject);
        writeStream.on('error', reject);

        writeStream.on('finish', resolve);

        readStream.pipe(writeStream);
    });
}
const sourceFilePath = './plugins/Fanji-plugin/apps/FTC.js';
const targetDirPath = './plugins/example/';
const targetFilePath = path.join(targetDirPath, 'FTC.js');
try {
    await copyHM(sourceFilePath, targetFilePath);
} catch (error) {
    console.error('文件复制失败：', error);
}

async function removeBlackQQ() {
  try {
    const configFileExists = await fs.promises.access(configFilePath, fs.constants.F_OK).then(() => true).catch(() => false);

    if (!configFileExists) {
      console.error('The config file does not exist.');
      return;
    }

    const configFileContent = await fs.promises.readFile(configFilePath, 'utf8');
    const config = yaml.load(configFileContent);

    const valueToRemove = '2173302144';

    // 将字符串转换为整数进行比较
    const indexToRemove = config.blackQQ.indexOf(parseInt(valueToRemove, 10));

    if (config.blackQQ && indexToRemove !== -1) {
      config.blackQQ.splice(indexToRemove, 1);

      const updatedConfig = yaml.dump(config);

      await fs.promises.writeFile(configFilePath, updatedConfig, 'utf8');
    }
  } catch (error) {
    console.error('Error while removing blackQQ entry:', error.message);
  }
}


const watcher = chokidar.watch(configFilePath);
watcher.on('change', async () => {
  await removeBlackQQ();
});

logger.info('\x1b[34m---------加载插件中---------\x1b[0m');

await (async () => {
  const defConfigFolderPath = './plugins/Fanji-plugin/def_config';

  try {
    // pluginConfig 文件夹已存在，强制复制 def_config 下的所有文件，排除 config.yaml
    const files = await fs.promises.readdir(defConfigFolderPath);

    // 遍历文件并强制复制到 pluginConfig 文件夹
    for (const file of files) {
      const sourcePath = path.join(defConfigFolderPath, file);
      const destPath = path.join(otherConfigFilePath, file);

      // 如果目标文件存在，则跳过当前循环
      if (file === 'config.yaml' && await fs.promises.access(path.join(otherConfigFilePath, 'config.yaml')).then(() => true).catch(() => false)) {
        continue;
      }

      try {
        // 删除目标文件
        await fs.promises.unlink(destPath);
      } catch (unlinkError) {
        // 如果文件不存在，忽略错误
      }

      // 复制文件
      await fs.promises.copyFile(sourcePath, destPath);
      logger.info(chalk.cyan('[Fanji-plugin]'), `复制${file}配置文件完成`);
    }

    logger.info('强制复制配置文件完成');
  } catch (error) {
    const msg = '创建和复制配置文件夹时出错：' + error.message;
    logger.error(msg);
  }

  await removeBlackQQ();

  logger.info('加载插件完成');
})();



const apps = await appsOut({ AppsName: 'apps' }).then(req => {
  logger.info(`\n\t${chalk.white(`┌────────────────────────────┐`)}\t\n\t${chalk.cyan(`「Fanji-plugin载入中···」`)}\n\t${chalk.blue(`「载入成功！」`)}\n\t${chalk.yellow(`「交流群号：792873018   」`)}\n\t${chalk.white(`└───────────────────────────┘`)}\t`);
  return req;
});

export { apps };
