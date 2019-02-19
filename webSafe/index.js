var xss = require('xss')
var content = `<strong style="color: rgb(192, 0, 0); background-color: rgb(255, 255, 255); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px;"><span style="font-family: 微软雅黑; letter-spacing: 0px; font-size: 16px;">活动主题</span></strong>
</p>
<p style="padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
    <span style="font-family: 微软雅黑; color: rgb(34, 34, 34); letter-spacing: 0px; font-size: 16px;">&nbsp; &nbsp; &nbsp; 第十届科技人员联谊会（开发区独角兽系列活动）&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
</p>
<p style="padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
    <span style="font-family: 微软雅黑; color: rgb(34, 34, 34); letter-spacing: 0px; font-size: 16px;"><br></span>
</p>
<p style="padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
    <span style="color: rgb(192, 0, 0);"><strong><span style="font-family: 微软雅黑; letter-spacing: 0px; font-size: 16px;">活动时间<span style="color: rgb(34, 34, 34); font-family: 微软雅黑; font-size: 16px; background-color: rgb(255, 255, 255);">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></span></strong></span>
</p>
<p style="padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
    <span style="font-family: 微软雅黑; letter-spacing: 0px; font-size: 16px;"><strong>&nbsp; &nbsp; &nbsp;&nbsp;</strong>1月13日（本周六）下午14：00~17：00<span style="color: rgb(34, 34, 34); font-family: 微软雅黑; font-size: 16px; background-color: rgb(255, 255, 255);">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></span>
</p>
<p style="padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
    <span style="font-family: 微软雅黑; letter-spacing: 0px; font-size: 16px;"><br></span>
</p>
<p style="padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
    <span style="color: rgb(192, 0, 0);"><strong><span style="font-family: 微软雅黑; letter-spacing: 0px; font-size: 16px;">活动地点</span></strong></span>
</p>
<p style="padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
    <span style="font-family: 微软雅黑; letter-spacing: 0px; font-size: 16px;"><strong>&nbsp; &nbsp; &nbsp;&nbsp;</strong>开发区科学城科学大道182号创新大厦C2栋副楼首层缘创咖啡<span style="color: rgb(34, 34, 34); font-family: 微软雅黑; font-size: 16px; background-color: rgb(255, 255, 255);">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></span>
</p>
<p style="font-size: 14px; white-space: normal; padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);">
    <span style="font-family: 微软雅黑; letter-spacing: 0px; font-size: 16px;"><br></span>
</p>
<p style="padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
    <span style="color: rgb(192, 0, 0);"><strong><span style="font-family: 微软雅黑; letter-spacing: 0px; font-size: 16px;">活动流程</span></strong></span><br>
</p>
<p style="padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
    <span style="font-family: 微软雅黑; letter-spacing: 0px; font-size: 16px;">&nbsp; &nbsp; &nbsp; ①14:00~14:30签到；</span>
</p>
<p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; white-space: normal; background: rgb(255, 255, 255);">
    <span style="font-family: 微软雅黑; color: rgb(34, 34, 34); letter-spacing: 0px; font-size: 16px;">&nbsp; &nbsp; <span style="font-family: 微软雅黑; color: rgb(34, 34, 34); letter-spacing: 0px; font-size: 16px;">&nbsp; ②14:30~17:00联谊活动，包括：开场秀、寻同心声、身影时刻、互动交流；</span></span>
</p>
<p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; white-space: normal; background: rgb(255, 255, 255);">
    <span style="font-family: 微软雅黑; color: rgb(34, 34, 34); letter-spacing: 0px; font-size: 16px;">&nbsp; &nbsp; &nbsp; <span style="font-family: 微软雅黑; color: rgb(34, 34, 34); letter-spacing: 0px; font-size: 16px;">③17:00活动结束</span></span>
</p>
<p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; white-space: normal; background: rgb(255, 255, 255);">
    <br>
</p>
<p style="font-size: 14px; white-space: normal; padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);">
    <span style="color: rgb(192, 0, 0);"><strong><span style="font-family: 微软雅黑; letter-spacing: 0px; font-size: 16px;">活动背景</span></strong></span>
</p>
<p style="font-size: 14px; white-space: normal; padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);">
    <span style="font-family: 微软雅黑; letter-spacing: 0px; font-size: 16px;"><strong>&nbsp; &nbsp; &nbsp;&nbsp;</strong>为促进科技人员交流、开发区举办第十届科技人员联谊会，为区内科技企业、金融机构、专业服务机构的人士搭建一个平台</span>
</p>
<p style="font-size: 14px; white-space: normal; padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);">
    <span style="font-family: 微软雅黑; letter-spacing: 0px; font-size: 16px;"><br></span>
</p>
<p style="font-size: 14px; white-space: normal; padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);">
    <span style="font-family: 微软雅黑; letter-spacing: 0px; font-size: 16px;"></span>
</p>
<p style="font-size: 14px; white-space: normal; padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);">
    <span style="color: rgb(192, 0, 0);"><strong><span style="font-family: 微软雅黑; letter-spacing: 0px; font-size: 16px;">邀请的单位</span></strong></span>
</p>
<p style="font-size: 14px; white-space: normal; padding: 0px; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255);">
    <span style="font-family: 微软雅黑; letter-spacing: 0px; font-size: 16px;"><strong>&nbsp; &nbsp; &nbsp;&nbsp;</strong>2018开发区独角兽企业及区内科技、金融、服务机构等</span>
</p><script>alert("xss");</script><button onclick="alert(1)"></button>'`
var html = xss(content)
console.log(html)
