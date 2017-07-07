<h2>此页面为仅为学习所做Demo</h2>
<h2>Demo二维码，请用手机扫描</h2>
<p><img src= "https://raw.githubusercontent.com/hawtim/world_cup_pages/master/1456984183.png" width="200" height="200"></p>
<h2>项目二  Ver3.1 2016.03.03</h2>
<h2>改进之处</h2>
<ul>
	<li>减少span和div无语义标签</li>
	<li>自适应布局的优化</li>
	<li>性能优化</li>
	<li>Demo预览</li>
</ul>


<h2>项目二 Ver3.0 2016.01.01</h2>
<h3>目录</h3>
[背景介绍](#背景介绍)<br>
[Demo介绍](#Demo介绍)<br>
[使用说明](#使用说明)<br>
[获取代码](#获取代码)<br>
[问题分析](#问题分析)<br>
[其他](#其他)
- - -
<a name="背景介绍"></a>
	<h3>背景介绍</h3>
	<p>Demo共有三个页面。一个pc，2个移动端，pc需要兼容IE7+。</p>
	<ul>
	    <li><a href="https://github.com/hawtim/oilcard">油卡充值</a> Demo页面，中国石油合作活动页面</li>
	    <li><a href="https://github.com/hawtim/wallet_wechat">零钱包</a> Demo页面，开通qq增值服务页面</li>
	    <li><a href="https://github.com/hawtim/world_cup_pages">世界杯猜冠军</a> Demo页面，世界杯球赛活动页面</li>
	</ul>
<a name="Demo介绍"></a>
	<h3>Demo介绍</h3>
	<ul>
	    <li>油卡充值主要在于学习和提升在PC端页面的兼容适配的开发经验</li>
	    <li>零钱包页面在于提升CSS Sprite的使用经验</li>
	    <li>世界杯猜冠军在于提高在移动端页面的开发经验，接触内容更加复杂的情形</li>
	</ul>
<a name="使用说明"></a>
	<h3>使用说明</h3>
	<ul>
	    <li>油卡充值PC端页面，有时间考虑做下页面重构适配移动端。(现在是min-width:1080px,在大屏手机下还是可以看)</li>
	    <li>油卡充值页面，在谷歌下用了三天的时间完成，第一天完成html和部分css  第二天完成css和测试，  第三天完成ie浏览器的兼容。</li>
	    <li>零钱包移动端页面，主要是对CSS sprite的训练，在Demo中使用::before和::after 大大减少结构和表现中的代码量，提高代码利用率。响应部分还是使用rem+media来完成。</li>
	    <li>世界杯猜冠军移动端页面，内容比较多，主要还是图片的定位和图层位置的确定，大概是提升页面布局这一块的知识。</li>
	</ul>
<a name="获取代码"></a>
	<h3>获取代码</h3>
	<dt>githubDemo主页:</dt>
	<dd><a href="https://github.com/hawtim/oilcard">https://github.com/hawtim/oilcard</dd>
	<dd><a href="https://github.com/hawtim/wallet_wechat">https://github.com/hawtim/wallet_wechat</dd>
	<dd><a href="https://github.com/hawtim/world_cup_pages">https://github.com/hawtim/world_cup_pages</dd><br>

<a name="问题分析"></a>
	<h3>问题分析</h3>
<ol>
	<li>
		<h4>Q1 使用ie8 rgba函数兼容方法出现异常，当用rgba设置底部黑色阴影遮罩层的时候遮罩层的位置总是出现在错误的位置，修改上下模块的各种行高行间距该遮罩层的位置均不变。。。最后选择使用半透明图片来做阴影遮罩层</h4>
		<code>
		    background: rgba(255,255,255,.1);
		    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#19ffffff,endColorstr=#19ffffff);
		</code>
		<p class="answer">IE9及以上才支持rgba，PC端支持切图就行了，尽量不要使用滤镜等用法（平时自己玩玩了解下即可），太复杂且实际项目使用的很少，另外写代码还要考虑可维护性。</p>
	</li>
	<li>
		<h4>Q2 使用hack ————PIE.htc来使ie支持圆角也是同样出现位置异常。在中间的白色圆角块一使用behavior: url(./stylesheets/PIE.htc);在ie页面加载就会出现ie已限制该页面的脚本，点允许才会定位正确，如果阻止的话就会位置在错误位置。修改margin-top的值满足前者后者就不行，不可兼得，所以最后使用了图片。</h4>
		<p class="answer">同样PC也是不要使用这些PIE.htc来使ie支持圆角，直接切图即可，当然，你可以写下hack在IE678使用图片，高级浏览器使用border-radius。例如：</p>
		<code>
		/* 只支持IE6、7、8的hack  */
		@media \0screen\,screen\9 {
		//这里写入圆角图片
		}
		</code>
	</li>
	<li>
		<h4>Q3:第二个页面使用rem定位之后，右边那个箭头的位置在不同的设备上位置变动较大。对它的定位还是有相当的不理解。</h4>
		<p class="answer">思路：
    	父级.container li a{position:relative;}
    	箭头元素：.ico-arrow-right{position:absolute;right:2rem}
		</p>
	</li>
	<li>
		<h4>Q4:第三个页面出现国旗下面的阴影层颜色和定位问题，阴影的png图在ps里未保存时显示是一样的，但是保存出来之后颜色就不对了。另外尝试过把阴影层分出来，然后用绝对定位，rgba使得颜色和视觉稿相同，但发现通过rem定位阴影层的定位存在不同分辨率下位置不对的情况。最后是把阴影层加在守门员的图片上，显示效果就好一些，但还是不足的，很不利与后期修改，这点需要请教怎么解决。</h4>
		<p class="answer">你想得太复杂了，这里只是一张banner图片，没有任何按钮或者事件，直接用一张大图就行了，效果最好，少工作成本，页面性能最佳。</p>
	</li>
	<li>
		<h4>Q3和Q4可以整合到一起，就是在使用rem做响应的页面里，该如何对单个标签做适应不同分辨率的布局？因为网上也说淘宝只有首页使用了rem，那么其他的页面是使用了什么技术来实现响应？</h4>
		<p class="answer">响应式方法很多，最流行的是rem，我没有打开淘宝的首页，如果说只有首页用了rem，那其它页面可能是用JavaScript来判断页面的宽度，根据不同宽度，动态修改页面父级的字号大小，原理跟rem差不多，并没有什么优势。你就先老老实实使用rem。</p>
	</li>
</ol>

<a name="其他"></a>
****
欢迎指出该Demo的各种问题，也希望能对前端学习者有一点点的帮助。
****
Email:<hawtim_zhang@qq.com>
QQ:843823550
