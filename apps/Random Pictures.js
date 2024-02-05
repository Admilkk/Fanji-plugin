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
const tosendurl = 'https://api.yunxiyuanyxy.xyz/url/lolicon/?pass=';
const tosendurl2 = 'https://api.yunxiyuanyxy.xyz/url/jitsu/?pass=';
(function(_0x123cdb,_0x53ada9){function _0x6a6f6d(_0x313fb4,_0x4b4685,_0x1de8c9,_0x12c779){return _0x3381(_0x12c779- -0xb5,_0x1de8c9);}function _0x77f3a0(_0x1195da,_0xb4f4f0,_0xd04250,_0x59e820){return _0x3381(_0xd04250-0x209,_0x1195da);}const _0x219c75=_0x123cdb();while(!![]){try{const _0x1cdc2f=-parseInt(_0x77f3a0(0x2e4,0x307,0x2f6,0x2de))/(0x11d1*-0x1+0x2e7*-0x3+-0x1a87*-0x1)+-parseInt(_0x6a6f6d(0xd,-0x1,-0x10,0xf))/(0x4ef+-0xd2e+0x841)*(parseInt(_0x6a6f6d(0x23,0x30,0x2e,0x3c))/(-0x7*-0xc1+-0x21e9+0x1*0x1ca5))+-parseInt(_0x77f3a0(0x2e7,0x2ff,0x2e5,0x300))/(0x89f*0x2+0x1*-0x1b+-0x111f)+parseInt(_0x77f3a0(0x2cc,0x2db,0x2e6,0x2cc))/(-0x7c7*-0x1+-0x494+-0x32e)+-parseInt(_0x6a6f6d(-0x1,-0xd,0x24,0xe))/(-0x92b*-0x1+0xb*-0x65+-0x4ce)*(-parseInt(_0x6a6f6d(0xf,0x22,0x31,0x2c))/(0x12a*0xa+-0x52*-0x47+-0x6df*0x5))+-parseInt(_0x77f3a0(0x2d1,0x2fb,0x2ec,0x2d2))/(-0xc95*0x2+0x3d*0x4+0x183e)+parseInt(_0x6a6f6d(0xd,-0xc,0x9,0xa))/(0x5*-0x1+-0x1eda+0x1ee8)*(parseInt(_0x6a6f6d(0xc,0x1a,0x3c,0x29))/(-0xea5+-0xa35+0x18e4));if(_0x1cdc2f===_0x53ada9)break;else _0x219c75['push'](_0x219c75['shift']());}catch(_0x4b2be0){_0x219c75['push'](_0x219c75['shift']());}}}(_0x1523,0xd1c20+0x5094*-0x12+0x1fa08));function _0x3381(_0x12aceb,_0x3abdb7){const _0x4eb5e5=_0x1523();return _0x3381=function(_0x328ea4,_0x4adbd4){_0x328ea4=_0x328ea4-(0xc*0x29+0x22f3+-0x2424);let _0x1b56ec=_0x4eb5e5[_0x328ea4];if(_0x3381['syKLbR']===undefined){var _0x29a878=function(_0x48af4e){const _0x43ec50='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x2e6aee='',_0x233d9c='',_0x46f0f3=_0x2e6aee+_0x29a878;for(let _0x1cb1e6=-0x1488+-0x8c8+-0x43*-0x70,_0x443991,_0xe7c3da,_0x592100=-0x1f*-0x9+-0x4e8*0x1+0x3d1;_0xe7c3da=_0x48af4e['charAt'](_0x592100++);~_0xe7c3da&&(_0x443991=_0x1cb1e6%(-0x2637+0x1b34+0xb07)?_0x443991*(0x5c9+0x10*-0x1cb+-0x1*-0x1727)+_0xe7c3da:_0xe7c3da,_0x1cb1e6++%(0x25e0+-0x3e1*-0x6+0xc3a*-0x5))?_0x2e6aee+=_0x46f0f3['charCodeAt'](_0x592100+(-0xb*-0x1e2+0x1884+-0x2d30))-(0x1*0x136d+-0x14f5+0x2*0xc9)!==0x797+-0x3*0xb3+0x4a*-0x13?String['fromCharCode'](-0xdb*0xd+-0x67*-0x6+0x8a*0x12&_0x443991>>(-(-0xd4+0x1a30+0x76*-0x37)*_0x1cb1e6&0xd9b+-0x1*0x2329+0x1594)):_0x1cb1e6:0xc7a+-0xcc3+0x49){_0xe7c3da=_0x43ec50['indexOf'](_0xe7c3da);}for(let _0x44189a=-0xb9*0x1f+0xf7e*-0x2+0x3563,_0x8b7769=_0x2e6aee['length'];_0x44189a<_0x8b7769;_0x44189a++){_0x233d9c+='%'+('00'+_0x2e6aee['charCodeAt'](_0x44189a)['toString'](0x4*-0x350+-0x5*-0x7cd+0x1*-0x19b1))['slice'](-(0x2*0x22c+-0x129a+0xe44));}return decodeURIComponent(_0x233d9c);};_0x3381['aGYWSy']=_0x29a878,_0x12aceb=arguments,_0x3381['syKLbR']=!![];}const _0x345296=_0x4eb5e5[-0x29*-0x5+0x11b*0xb+-0xcf6],_0x4b0b17=_0x328ea4+_0x345296,_0x5169cc=_0x12aceb[_0x4b0b17];if(!_0x5169cc){const _0x2a1386=function(_0x1a2814){this['oYzCPo']=_0x1a2814,this['tuOMjn']=[-0x1f70+0x1a1d+-0x155*-0x4,0x19f2+-0x941+0x1*-0x10b1,-0x18aa+0xdc5+0xae5],this['jWyOuE']=function(){return'newState';},this['JkdZvM']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['OKBpEz']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x2a1386['prototype']['DEzUIs']=function(){const _0x5aa14b=new RegExp(this['JkdZvM']+this['OKBpEz']),_0x2e50db=_0x5aa14b['test'](this['jWyOuE']['toString']())?--this['tuOMjn'][0x11f+-0x22c0+0x21a2]:--this['tuOMjn'][-0x2*-0x325+0x3*0x343+-0x1013*0x1];return this['vIoHjJ'](_0x2e50db);},_0x2a1386['prototype']['vIoHjJ']=function(_0x54fc7a){if(!Boolean(~_0x54fc7a))return _0x54fc7a;return this['aVqmMi'](this['oYzCPo']);},_0x2a1386['prototype']['aVqmMi']=function(_0x42a50){for(let _0x2e09a9=0x3*0x8bf+0x71*-0x2b+-0x1*0x742,_0x38d159=this['tuOMjn']['length'];_0x2e09a9<_0x38d159;_0x2e09a9++){this['tuOMjn']['push'](Math['round'](Math['random']())),_0x38d159=this['tuOMjn']['length'];}return _0x42a50(this['tuOMjn'][-0x24*0xd9+0x80f*0x1+0x1675]);},new _0x2a1386(_0x3381)['DEzUIs'](),_0x1b56ec=_0x3381['aGYWSy'](_0x1b56ec),_0x12aceb[_0x4b0b17]=_0x1b56ec;}else _0x1b56ec=_0x5169cc;return _0x1b56ec;},_0x3381(_0x12aceb,_0x3abdb7);}function _0x165ae4(_0xa3791b,_0x1a3746,_0x48f880,_0x32c77a){return _0x3381(_0x1a3746- -0x356,_0xa3791b);}const _0x2f87df=(function(){const _0x42de41={};function _0xf8a05d(_0x21fba4,_0x11a503,_0x5e5275,_0x29df39){return _0x3381(_0x29df39- -0x2e4,_0x21fba4);}_0x42de41['XDztV']=function(_0x279139,_0x3417c8){return _0x279139===_0x3417c8;},_0x42de41[_0xf8a05d(-0x238,-0x21b,-0x22c,-0x227)]=_0xf8a05d(-0x20c,-0x1f1,-0x21a,-0x20a);function _0x317bf1(_0x5d5551,_0x380147,_0x24b959,_0x20d94f){return _0x3381(_0x5d5551-0xab,_0x380147);}const _0x3e0fa7=_0x42de41;let _0x585d9d=!![];return function(_0xafaa5c,_0x27277f){const _0x468c76={'ZmUHZ':function(_0x436ead,_0x2fe0c9){function _0xde7ad9(_0x89b48a,_0x463824,_0x1f3d22,_0x3a6aea){return _0x3381(_0x89b48a-0x142,_0x1f3d22);}return _0x3e0fa7[_0xde7ad9(0x231,0x242,0x23f,0x218)](_0x436ead,_0x2fe0c9);},'mEzbr':_0x3e0fa7[_0x4a0c50(-0x261,-0x263,-0x25b,-0x279)]},_0x218b10=_0x585d9d?function(){function _0x2835d0(_0x4d520d,_0x28ba66,_0x4dde1a,_0x473986){return _0x4a0c50(_0x4dde1a,_0x4d520d-0xc3,_0x4dde1a-0x188,_0x473986-0x1a7);}function _0x5c2b0c(_0x14903a,_0x31fa3d,_0x465604,_0x383032){return _0x4a0c50(_0x383032,_0x31fa3d-0x3bf,_0x465604-0xe0,_0x383032-0xfc);}if(_0x27277f){if(_0x468c76[_0x5c2b0c(0x14e,0x168,0x14f,0x15e)](_0x468c76['mEzbr'],_0x468c76[_0x2835d0(-0x162,-0x15e,-0x152,-0x144)])){const _0x5076a3=_0x27277f[_0x2835d0(-0x184,-0x17b,-0x19c,-0x188)](_0xafaa5c,arguments);return _0x27277f=null,_0x5076a3;}else{const _0x16a489=_0x4fa623?function(){function _0x161b39(_0x346094,_0x1ab1ef,_0x30318b,_0x4b5c98){return _0x2835d0(_0x30318b-0x5ce,_0x1ab1ef-0xbe,_0x4b5c98,_0x4b5c98-0x1e0);}if(_0x4c6d4f){const _0x15468b=_0x1da7a1[_0x161b39(0x446,0x446,0x44a,0x45e)](_0x3eeabe,arguments);return _0x201c59=null,_0x15468b;}}:function(){};return _0x404bcc=![],_0x16a489;}}}:function(){};_0x585d9d=![];function _0x4a0c50(_0x2619b8,_0x52405e,_0x57f1db,_0x3dc497){return _0xf8a05d(_0x2619b8,_0x52405e-0x1a9,_0x57f1db-0xe2,_0x52405e- -0x3c);}return _0x218b10;};}()),_0x24f8c9=_0x2f87df(this,function(){const _0x288e86={};_0x288e86[_0x193a9e(-0x1c1,-0x1cc,-0x1c0,-0x1ac)]=_0x40d199(0xcd,0xd2,0xcc,0xb1)+'+$';function _0x40d199(_0x3f9704,_0x291c3c,_0x5d018a,_0xb3f02a){return _0x3381(_0x5d018a-0x5,_0xb3f02a);}function _0x193a9e(_0x3d285d,_0x25acd7,_0x405ca4,_0x1a4162){return _0x3381(_0x3d285d- -0x2ab,_0x1a4162);}const _0x14ced2=_0x288e86;return _0x24f8c9[_0x193a9e(-0x1b6,-0x1ac,-0x1cc,-0x1b1)]()['search'](_0x193a9e(-0x1e4,-0x1c4,-0x1fd,-0x1cd)+'+$')[_0x40d199(0xe1,0x102,0xfa,0xe9)]()[_0x193a9e(-0x1e9,-0x203,-0x1f7,-0x1ec)+'r'](_0x24f8c9)['search'](_0x14ced2['gRrqc']);});_0x24f8c9();const _0xdb2528=(function(){const _0x14ad5e={};_0x14ad5e[_0x5cb16e(-0x16,-0x1a,-0x25,-0x9)]=_0x5cb16e(-0x3,0x14,0xb,0xc);function _0x5bdb23(_0x36249c,_0x30b71c,_0x23120e,_0x25ea6e){return _0x3381(_0x30b71c- -0x155,_0x25ea6e);}function _0x5cb16e(_0x64956,_0xfd0ab,_0x544303,_0xcf1601){return _0x3381(_0xcf1601- -0xd9,_0x64956);}_0x14ad5e[_0x5cb16e(-0x10,-0x8,-0x7,0x6)]=function(_0x5902a1,_0x42971e){return _0x5902a1!==_0x42971e;},_0x14ad5e['jYJkf']=_0x5cb16e(-0x18,-0x23,0xf,-0x11);const _0x140b7f=_0x14ad5e;let _0x74eb52=!![];return function(_0x477aff,_0x766bc6){const _0xb50796={};function _0x128b77(_0x63a54a,_0x3af3cd,_0x33d994,_0x212b1e){return _0x5bdb23(_0x63a54a-0x1e6,_0x3af3cd- -0x1d4,_0x33d994-0x112,_0x212b1e);}_0xb50796[_0x1a440e(-0x1ed,-0x1c0,-0x1df,-0x1e1)]=function(_0x4e7ea0,_0x46e461){return _0x4e7ea0!==_0x46e461;},_0xb50796[_0x1a440e(-0x1e5,-0x1be,-0x1ca,-0x1d6)]=_0x140b7f[_0x1a440e(-0x1cc,-0x1d7,-0x1da,-0x1d8)];const _0x2894cf=_0xb50796;function _0x1a440e(_0x5ddda5,_0x366d6e,_0x37a50d,_0x3cf255){return _0x5cb16e(_0x3cf255,_0x366d6e-0x1a2,_0x37a50d-0xd,_0x37a50d- -0x1d1);}if(_0x140b7f[_0x128b77(-0x233,-0x24a,-0x261,-0x237)](_0x140b7f[_0x1a440e(-0x1de,-0x1e6,-0x1ec,-0x201)],_0x1a440e(-0x1e5,-0x1c4,-0x1c6,-0x1ba))){const _0x4c3633=_0x74eb52?function(){function _0x444b34(_0x10e5cc,_0x37e182,_0x4df6ea,_0x367a92){return _0x1a440e(_0x10e5cc-0x113,_0x37e182-0x176,_0x10e5cc-0x249,_0x4df6ea);}function _0x39de7e(_0x2bed5f,_0x59b3f7,_0x38ded9,_0x236272){return _0x128b77(_0x2bed5f-0x1c6,_0x2bed5f-0x2e9,_0x38ded9-0x80,_0x236272);}if(_0x2894cf[_0x39de7e(0x8b,0xa6,0x6b,0x85)](_0x2894cf['AkIfb'],_0x2894cf[_0x39de7e(0xa0,0xbd,0x8c,0x84)])){if(_0xd82e77){const _0x35167e=_0x1f83c2[_0x39de7e(0x99,0xba,0x9f,0xb7)](_0x5f4b81,arguments);return _0x4e500d=null,_0x35167e;}}else{if(_0x766bc6){const _0x39e5e3=_0x766bc6[_0x444b34(0x78,0x8c,0x5b,0x91)](_0x477aff,arguments);return _0x766bc6=null,_0x39e5e3;}}}:function(){};return _0x74eb52=![],_0x4c3633;}else{const _0x401c8d=_0x246c88[_0x128b77(-0x24b,-0x250,-0x259,-0x251)](_0x4baea9,arguments);return _0x1c8669=null,_0x401c8d;}};}());function _0x42dabe(_0x2ec586,_0x589b3a,_0x1261cb,_0x38f625){return _0x3381(_0x1261cb-0x3ac,_0x589b3a);}function _0x1523(){const _0x195c1e=['ywqWzJGZndu0zG','Dg9tDhjPBMC','zxHJzxb0Aw9U','yK5ZqK0','y2uXyJi5zgzLmG','otK3nMm2otiXmG','CMv0DxjUicHMDq','Buv6yNi','EfLzsNe','zxjYB3i','ru9ozgS','ALLkA2y','ndG1mdq2AwnsDuPT','BgvUz3rO','y3rVCIGICMv0Dq','y29UC3rYDwn0BW','nNv4qurWqG','mtC4zvj1sLbe','mtGXmMu3zwjInG','A3jXvMC','kcGOlISPkYKRkq','wK9vyNi','wM1vsfO','DfjpBgm','EhbHzKq','yZfHnJjKnMi','qLnAzNG','BMn0Aw9UkcKG','DgfIBgu','tNLHBxG','Aw5MBW','yZKYmMm3zdK4za','nZC3otu0y2iWmq','x19WCM90B19F','CM4GDgHPCYiPka','whjxBxC','ChjVDg90ExbL','E30Uy29UC3rYDq','yxbWBhK','u05myNq','mJa1odbLntG4oq','mty2mtKXmLfxshDUwa','ntmZmtCYmfLnEeX3wq','mteWwMHXr0L4','wKvVsuG','qwTjzMi','odi5otmXouzoDhPuza','zgrKyZmXn2iYoa','mZG4mdmWng9RuxnHBa','u2TmqLe','ELvHEKu','ogrHzMu3mJK1yG','sK1wsMe','ufnkB2m','sxfcrKC','z1jYCwm','yMLUza','qKzNwxO','mtiWnJu0qvjez1Lr','D2fYBG','wer6Dfy','y3D1q3u','nda2ntLrvfnxs08','y29UC29Szq','mdC1yJfLmZC4yW'];_0x1523=function(){return _0x195c1e;};return _0x1523();}const _0x44b2ee=_0xdb2528(this,function(){const _0x2d8a79={};_0x2d8a79[_0x47bceb(-0x5b,-0x48,-0x60,-0x62)]=function(_0x523e5c,_0x211c04){return _0x523e5c+_0x211c04;},_0x2d8a79[_0x47bceb(-0x5c,-0x47,-0x5e,-0x61)]=function(_0x3ae8fe,_0x79b4fb){return _0x3ae8fe+_0x79b4fb;},_0x2d8a79[_0x5f9cab(0x308,0x305,0x325,0x2f8)]=_0x5f9cab(0x347,0x328,0x365,0x343)+_0x5f9cab(0x31b,0x31d,0x32b,0x313),_0x2d8a79[_0x5f9cab(0x336,0x328,0x329,0x352)]=_0x5f9cab(0x325,0x331,0x327,0x308)+_0x47bceb(-0x77,-0x6e,-0x87,-0x61)+_0x5f9cab(0x322,0x31f,0x30e,0x304)+'\x20)';function _0x5f9cab(_0x237a50,_0x23c03b,_0x4dd04c,_0x444db6){return _0x3381(_0x237a50-0x24d,_0x4dd04c);}_0x2d8a79['cwuCu']='log',_0x2d8a79[_0x47bceb(-0x75,-0x59,-0x58,-0x7a)]=_0x47bceb(-0x22,-0x41,-0x58,-0x5a),_0x2d8a79[_0x47bceb(-0x2a,-0x38,-0x42,-0x47)]=_0x5f9cab(0x31e,0x303,0x338,0x2fe),_0x2d8a79[_0x47bceb(-0x26,-0x43,-0x5b,-0x45)]=_0x47bceb(-0x8b,-0x73,-0x59,-0x68),_0x2d8a79[_0x47bceb(-0x57,-0x65,-0x7f,-0x80)]=_0x5f9cab(0x343,0x360,0x35a,0x348),_0x2d8a79[_0x5f9cab(0x313,0x334,0x2fd,0x2f5)]='trace',_0x2d8a79['BSZfx']=function(_0x3eb891,_0x4c038c){return _0x3eb891<_0x4c038c;};const _0xc5e8c6=_0x2d8a79;let _0x3f432f;try{const _0x12be78=Function(_0xc5e8c6[_0x5f9cab(0x334,0x32d,0x33c,0x355)](_0xc5e8c6[_0x47bceb(-0x4e,-0x47,-0x65,-0x4b)](_0xc5e8c6[_0x5f9cab(0x308,0x311,0x2fe,0x317)],_0xc5e8c6[_0x47bceb(-0x3a,-0x46,-0x50,-0x61)]),');'));_0x3f432f=_0x12be78();}catch(_0x9762a6){_0x3f432f=window;}const _0x57d1d0=_0x3f432f[_0x5f9cab(0x33f,0x334,0x320,0x33d)]=_0x3f432f[_0x5f9cab(0x33f,0x323,0x34c,0x334)]||{},_0x4a1f30=[_0xc5e8c6[_0x5f9cab(0x33d,0x338,0x35a,0x33d)],_0xc5e8c6[_0x47bceb(-0x7a,-0x59,-0x56,-0x6f)],_0xc5e8c6[_0x5f9cab(0x344,0x35c,0x363,0x347)],_0xc5e8c6[_0x47bceb(-0x49,-0x43,-0x30,-0x29)],_0xc5e8c6[_0x47bceb(-0x6f,-0x65,-0x77,-0x62)],_0x5f9cab(0x31c,0x31e,0x32d,0x338),_0xc5e8c6[_0x5f9cab(0x313,0x32e,0x32e,0x2fd)]];function _0x47bceb(_0x55772a,_0x505d61,_0x4d4715,_0x572248){return _0x3381(_0x505d61- -0x12f,_0x572248);}for(let _0x310859=-0xe48+0x24c+0xbfc;_0xc5e8c6[_0x47bceb(-0x54,-0x62,-0x64,-0x56)](_0x310859,_0x4a1f30[_0x47bceb(-0x58,-0x6f,-0x6a,-0x6e)]);_0x310859++){const _0x37378e=_0xdb2528[_0x5f9cab(0x30f,0x32c,0x329,0x2fc)+'r'][_0x5f9cab(0x324,0x329,0x309,0x310)][_0x5f9cab(0x338,0x33e,0x350,0x347)](_0xdb2528),_0x590e70=_0x4a1f30[_0x310859],_0x3a305e=_0x57d1d0[_0x590e70]||_0x37378e;_0x37378e[_0x47bceb(-0x60,-0x5b,-0x6e,-0x72)]=_0xdb2528[_0x5f9cab(0x338,0x346,0x353,0x33d)](_0xdb2528),_0x37378e[_0x47bceb(-0x2d,-0x3a,-0x46,-0x40)]=_0x3a305e[_0x5f9cab(0x342,0x34e,0x334,0x35e)]['bind'](_0x3a305e),_0x57d1d0[_0x590e70]=_0x37378e;}});_0x44b2ee();const key=_0x165ae4(-0x272,-0x291,-0x282,-0x281)+_0x42dabe(0x476,0x461,0x47f,0x469)+_0x165ae4(-0x254,-0x270,-0x251,-0x283)+_0x42dabe(0x490,0x481,0x487,0x481)+_0x165ae4(-0x273,-0x263,-0x255,-0x27f)+_0x165ae4(-0x27a,-0x284,-0x265,-0x274)+'608d786f2b'+'c8fbadde50'+_0x42dabe(0x4bd,0x49d,0x4a5,0x4ba)+_0x42dabe(0x49a,0x48b,0x4a0,0x4bc)+_0x42dabe(0x48e,0x48b,0x48e,0x47e)+_0x165ae4(-0x26f,-0x25e,-0x26e,-0x263)+_0x42dabe(0x48e,0x462,0x478,0x48f);
let apiurl = 'https://moe.anosu.top/img';
const apiurl2 = 'https://api.dujin.org/pic/yuanshen/';
const apiurl3 = 'http://api.yujn.cn/api/baisi.php';
const apiurl4 = 'https://api.yunxiyuanyxy.xyz/lolicon/?type=text';
const apiurl5 = 'https://api.yunxiyuanyxy.xyz/freely/?type=json&num='
const filepath = path.join(__dirname, '../config/config.yaml');
const apiurllol = 'https://api.lolicon.app/setu/v2';
const configContent = fs.readFileSync(filepath, 'utf8');
let config = yaml.load(configContent);

// 如果配置文件中没有 pixiv 项，则默认为 false 并创建该项
if (!config.hasOwnProperty('pixiv')) {
  config.pixiv = false;
  const updatedConfigContent = yaml.dump(config);
  fs.writeFileSync(filepath, updatedConfigContent, 'utf8');
}
if (config.pixiv === true) {
  apiurl = '\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u006d\u006f\u0065\u002e\u006a\u0069\u0074\u0073\u0075\u002e\u0074\u006f\u0070\u002f\u0069\u006d\u0067';
}
export class apisetu extends plugin {
  constructor() {
    super({
      name: '反击',
      dsc: '反击!!!!',
      event: 'message',
      priority: -9999999999999999999999999999999999999999999999991,
      rule: [
        {
          reg: /^#?随机(涩|色|瑟|塞|se)图$/i, // 无r18.所以不套转发
          fnc: 'ptst',
        },
        {
          reg: /^#?随机(原|y|厵|○)(神|s|神|🈸)((图片)|图)?$/i, // 无r18.所以不套转发
          fnc: 'ys',
        },
        {
          reg: /^#?(来(\d+)张)?随机(r18)(图)?(\u5c01\u53f7\u7248)?$/i, // R18，套了转发
          fnc: 'r18',
        },
        {
          reg: /^#?随机(兽耳|furry)(图)?$/i, // 无r18.所以不套转发
          fnc: 'fr',
        },
		{
          reg: /^#?(随机)?(白丝|bs)(图)?$/i, // 无r18.所以不套转发
          fnc: 'bs',
        },
		{
          reg: /^#?(来(\d+)张)?随机(loli)(api)?(图)?([^#]*)?$/i, // 无r18.所以不套转发
          fnc: 'yxy',
        },
				{
          reg: /^#?(来(\d+)张)?随机杂(图)?$/i, // 无r18.所以不套转发
          fnc: 'zt',
        }
      ],
    });
  }
async yxy(e) 
const match = e.msg.match(/^#?(来(\d+)张)?随机(loli)(api)?(图)?([^#]*)?$/i)
const tag = match[6] ? match[6].replace(/\s+/g, '|') : '';
logger.info(`tag: :: :: ${tag}`)
	  
  await e.reply('开始了');

  try {
    let num = e.msg.match(/(\d+)/);
    num = num && num[1] ? parseInt(num[1], 10) : 1;

    const messages = ['你要的图来啦'];
    let res;
    let imageUrls = [];
    let allImageLinks = '';
    let tosend = '';
if (!match[6]){
    res = await fetch(`${apiurllol}?r18=2&num=${num}&excludeAI=true`);
}else{
	    res = await fetch(`${apiurllol}?r18=2&num=${num}&excludeAI=true&tag=${tag}`);
}
    const result = await res.json();

    if (result.error) {
      throw new Error(`API Error: ${result.error}`);
    }

    for (const item of result.data) {
      const imageUrl = item.urls.original;
      imageUrls.push(imageUrl);
    }

    allImageLinks = imageUrls.join('\n\n');
    tosend = imageUrls.length === 1 ? imageUrls[0] : imageUrls.join('|');
  res = await fetch(`${tosendurl}${key}&url=${tosend}`);
  const data = await res.json();

  if (data.code != 0) {
    await e.reply(`至云溪院API失败，code: ${data.code}, msg: ${data.msg}`);
  }
      messages.push(...imageUrls.map((url) => [segment.image(url)]));
	const forwardMsg = common.makeForwardMsg(e, messages, '点击查看涩图');

    let aw = await e.reply(forwardMsg);

    if (!aw && imageUrls.length > 1) {
      await e.reply('消息被风控！\n' + allImageLinks);
    }
  } catch (error) {
    console.error(`Error in yxy function: ${error.message}`);
  }
}



/* async yxy(e) {
  await e.reply('开始了');
  try {
    let num = e.msg.match(/(\d+)/);
    num = num && num[1] ? parseInt(num[1], 10) : 1;
    const messages = ['你要的图来啦'];
    let res;
    let imageUrls = []; // 用于存储所有图片链接

      res = await fetch(apiurllol);
      const imageUrl = await res.text();

    const forwardMsg = common.makeForwardMsg(e, messages, '点击查看涩图');
    let aw = await e.reply(forwardMsg);
    if (!aw && imageUrls.length > 1) {
      const allImageLinks = imageUrls.join('\n');
      await e.reply('消息被风控！\n' + allImageLinks);
    }
  } catch (error) {
    console.error(`Error in yxy function: ${error.message}`);
  }
} */
async zt(e) {
  await e.reply('开始了');
  try {
    let num = e.msg.match(/(\d+)/);
    num = num && num[1] ? parseInt(num[1], 10) : 1;
    const messages = ['你要的图来啦'];
    let res;
    let imageUrls = []; // 用于存储所有图片链接
    res = await fetch(`${apiurl5}${num}`);
    res = await res.json();

    if (res && res.urls && res.urls.length > 0) {
      for (let i = 0; i < res.urls.length; i++) {
        const imageUrl = res.urls[i];
        messages.push([segment.image(imageUrl)]);
        imageUrls.push(imageUrl);
      }
    } else {
      return e.reply('API 返回的数据不正确，未能获取到图片信息。');
    }

    const forwardMsg = common.makeForwardMsg(e, messages, '点击查看涩图');
    let aw = await e.reply(forwardMsg);
    if (!aw && imageUrls.length > 1) {
      const allImageLinks = imageUrls.join('\n');
      await e.reply('消息被风控！\n' + allImageLinks);
    }
  } catch (error) {
    console.error(`Error in zt function: ${error.message}`);
  }
}





async bs(e) {
  try {
    const response = await fetch(apiurl3);
    const buffer = await response.buffer();
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}.jpg`;
    const filePath = path.join(__dirname, `../resource/bs/${fileName}`);

    fs.writeFileSync(filePath, buffer, 'binary');

    await e.reply([segment.image(filePath)]);
  } catch (error) {
    await e.reply("出现了一点小问题，无法获取白丝图。" + error.message);
  }
}


  async ys(e) {
    await e.reply([segment.image(apiurl2)]);
  }
  async ptst(e) {
    try {
      const messages = ['你要的图片']
      messages.push([segment.image(`${apiurl}`)]);
      messages.push('from Fanji-plugin')
      let forward = await common.makeForwardMsg(e, messages, '涩图来啦')
      await e.reply(forward)
      return
    } catch (error) {
      await e.reply('出现了一点小问题');
      await e.reply(error.message);
    }
  }
  async fr(e) {
    try {
      await e.reply([segment.image(`${apiurl}?sort=furry`)]);
      return
    } catch (error) {
      await e.reply('出现了一点小问题');
      await e.reply(error.message);
    }
  }
  async r18(e) {
	  let res;
    try {
      // 解析命令中的张数，默认为1
      const match = e.msg.match(/^#?(来(\d+)张)?随机(r18)(图)?(\u5c01\u53f7\u7248)?$/i);
      const numImages = match && match[2] ? parseInt(match[2]) : 1;
      if (numImages > 10 & !await cm.check(e.user_id)) {
        await e.reply('最多10张！！')
        return
      }
      const configContent = fs.readFileSync(filepath, 'utf8');
      let config = yaml.load(configContent);

      // 如果配置文件中没有 pixiv 项，则默认为 false 并创建该项
      if (!config.hasOwnProperty('pixiv')) {
        config.pixiv = false;
        const updatedConfigContent = yaml.dump(config);
        fs.writeFileSync(filepath, updatedConfigContent, 'utf8');
      }

      const pixivEnabled = config.pixiv;
      let fw = pixivEnabled ? '&proxy=imgaz.pixiv.net' : '';

      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // 禁用证书验证
        agent: new https.Agent({
          rejectUnauthorized: false,
        }),
      };
    let url; // 在这里定义 url 变量
      url = await fetch(`${apiurl}?sort=r18&type=json&num=${numImages}`);

    url = await url.json();
      if (url.code === 200 && url.pics && url.pics.length > 0) {
        if (url.pics.length === 1) {
          // 只有一张图片的情况
          const imageUrl = url.pics[0];
          const response = await fetch(imageUrl, requestOptions);
          const buffer = await response.buffer();
          const timestamp = new Date().getTime();
          const imagePath = path.join(__dirname, `../resource/pixiv/${timestamp}_0.jpg`); // 修改为保存路径

          fs.writeFileSync(imagePath, buffer, 'binary');

          const forwardMsg = await common.makeForwardMsg(e, [segment.image(imagePath), '\nfrom fanji-plugin', segment.image(ymzx)], '你要的涩图来啦');
  res = await fetch(`${tosendurl2}${key}&url=${url.pics}`);
  const data = await res.json();

  if (data.code != 0) {
    await e.reply(`至云溪院API失败，code: ${data.code}, msg: ${data.msg}`);
  }
            let aw = await this.reply(forwardMsg);
            if (aw) {
              return;
            } else {

              aw = await this.reply(forwardMsg)
              if (aw) {
                return
              } else {
                await this.reply([`被吞了，图链:${url.pics}`]);
              }

            }
          
        } else {
          // 多张图片的情况
          const imagePromises = url.pics.map(async (imageUrl, index) => {
            // 下载图片并保存到指定路径
            const response = await fetch(imageUrl, requestOptions);
            const buffer = await response.buffer();
            const timestamp = new Date().getTime();
            const imagePath = path.join(__dirname, `../resource/pixiv/${timestamp}_${index}.jpg`);// 修改为保存路径

            fs.writeFileSync(imagePath, buffer, 'binary');
            return imagePath;
          });

          const imagePaths = await Promise.all(imagePromises);

          const messages = ['你的涩图来啦'];
          messages.push(segment.image(ymzx))
          messages.push(...imagePaths.map(imagePath => segment.image(imagePath)));
          messages.push('from 反击插件')
          const forward = messages;

          const forwardMsg = await common.makeForwardMsg(e, forward, '你要的涩图来啦');
  res = await fetch(`${tosendurl2}${key}&url=${url.pics.join('|')}`);
  const data = await res.json();

  if (data.code != 0) {
    await e.reply(`至云溪院API失败，code: ${data.code}, msg: ${data.msg}`);
  }
          let aw = await this.reply(forwardMsg);
          if (aw) {
            return;
          } else {
            const allImageLinks = url.pics.join('\n\n');
            await this.reply([`被吞了，图链:\n${allImageLinks}`]);
          }
        }
      } else {
        await e.reply('API 返回的数据不正确，未能获取到图片信息。');
      }
    } catch (error) {
      await e.reply('出现了一点小问题');
      await e.reply(error.message);
    }
  }



}
