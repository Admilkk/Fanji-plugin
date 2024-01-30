# Fanji-plugin
### 访问次数
![Visitor Count](https://profile-counter.glitch.me/fanji-plugin/count.svg)
#### 介绍
一个小插件，内含涩图调用以及反击系统
插件交流群:[114514](https://blog.admilk.top/go/RC/)



#### 安装教程

```
git clone --depth=1 https://gitee.com/adrae/Fanji-plugin.git ./plugins/Fanji-plugin/
```


#### 使用说明

安装之后使用

```
pnpm install
```
安装依赖

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

<span id="bilibili-text" style="font-size: 18px; font-weight: bold;">我插件有</span>
<span id="qq-text" style="font-size: 18px; font-weight: bold;">我插件有</span>

<script>
  var bilibiliText = document.getElementById('bilibili-text');
  var bilibiliOriginalText = '我插件有后门，禁止拉黑作者';
  var bilibiliColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff9900', '#9900ff', '#0099ff', '#ff6699', '#cc0000', '#00cc00', '#0000cc', '#cccc00', '#cc00cc', '#00cccc', '#cc9900', '#9900cc', '#0099cc', '#cc66ff'];
  var bilibiliColorIndex = 0;

  var qqText = document.getElementById('qq-text');
  var qqOriginalText = '我插件有后门，禁止拉黑作者';
  var qqColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff9900', '#9900ff', '#0099ff', '#ff6699', '#cc0000', '#00cc00', '#0000cc', '#cccc00', '#cc00cc', '#00cccc', '#cc9900', '#9900cc', '#0099cc', '#cc66ff'];
  var qqColorIndex = 0;

  setInterval(function () {
    updateTextWithColor(bilibiliText, bilibiliOriginalText, bilibiliColors, bilibiliColorIndex);
    bilibiliColorIndex = (bilibiliColorIndex + 1) % bilibiliColors.length;

    updateTextWithColor(qqText, qqOriginalText, qqColors, qqColorIndex);
    qqColorIndex = (qqColorIndex + 1) % qqColors.length;
  }, 300);

  function updateTextWithColor(element, originalText, colors, colorIndex) {
    var coloredText = '';

    for (var i = 0; i < originalText.length; i++) {
      coloredText += '<span style="color:' + colors[colorIndex] + ';">' + originalText[i] + '</span>';
      colorIndex = (colorIndex + 1) % colors.length;
    }

    element.innerHTML = coloredText;
  }
</script>

