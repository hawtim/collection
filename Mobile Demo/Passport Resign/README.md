<h2>此页面为仅为学习所做Demo</h2>
<h2>项目三  Ver1.1 2016.03.03</h2>
<h2>改进之处</h2>
<ul>
	<li>语意化html，减少标签嵌套，代码规范</li>
	<li>大幅度优化图片资源，提高页面打开速度</li>
	<li>完成js滑屏，添加箭头动画</li>
	<li>挂载腾讯云，Demo预览</li>
</ul>
<h2>Demo二维码，请用手机扫描</h2>
<p><img src= "https://raw.githubusercontent.com/hawtim/passport_resign/master/1458049271.png" width="200" height="200"><br>
	如果二维码无法加载，<a href="https://raw.githubusercontent.com/hawtim/passport_resign/master/1458049271.png">请点击这里</a></p>
<p>在PC端预览，<a href="http://119.29.158.242/thirdProgram/">请点击</a></p>


<h2>项目三 Ver1.0 2016.02.10</h2>
<h3>目录</h3>
[背景介绍](#背景介绍)<br>
[Demo介绍](#Demo介绍)<br>
[获取代码](#获取代码)<br>
[问题分析](#问题分析)<br>
[其他](#其他)
- - -
<a name="背景介绍"></a>
	<h3>背景介绍</h3>
	<p>Demo共有三个页面。一个pc，移动端为一套产品页面，一组滑屏页面，pc需要兼容IE7+。</p>
	<ul>
	    <li><a href="https://github.com/hawtim/rujiaHotel">活动宣传页Demo页面</a>，如家酒店活动页面</li>
	    <li><a href="https://github.com/hawtim/universityCard">校园卡充值Demo页面</a>，充值校园卡</li>
	    <li><a href="https://github.com/hawtim/passport_resign">EMS签注Demo页面</a>，通行证签注活动页面</li>
	</ul>
<a name="Demo介绍"></a>
	<h3>Demo介绍</h3>
	<ul>
	    <li>如家酒店活动Demo页用于学习PC端页面的兼容适配IE7+的开发经验，掌握页面性能优化，代码规范的相关知识</li>
	    <li>校园卡Demo页面用于学习移动端应用页面的开发，掌握模块化开发，表单默认样式消除，表单验证，js完成样式交互的技巧</li>
	    <li>EMS签注Demo页面用于提升移动端活动页面的开发经验，接触滑屏页面开发，掌握js框架，CSS3动画等知识</li>
	</ul>
<a name="获取代码"></a>
	<h3>获取代码</h3>
	<dt>githubDemo主页:</dt>
	<dd>如家酒店活动demo:<a href="https://github.com/hawtim/rujiaHotel">https://github.com/hawtim/rujiaHotel</dd>
	<dd>校园卡充值Demo:<a href="https://github.com/hawtim/universityCard">https://github.com/hawtim/universityCard</dd>
	<dd>EMS签注Demo:<a href="https://github.com/hawtim/passport_resign">https://github.com/hawtim/passport_resign</dd><br>

<a name="问题分析"></a>
	<h3>问题分析</h3>
<ol>
	<li>
		<h4>一开始在小屏幕下该框架不知如何适配，视觉上在chrome Dev中iphone4、5大小的屏幕只能显示局部内容。实际测试中，iphone5能够显示所有页面布局。但魅族浏览器不支持直接写transform：translateX/Y，在sass下需要写@include transform（translateX/Y（-50%））；（即需要补充前缀）。
</h4>
		<p class="answer">&nbsp;</p>
	</li>
	<li>
		<h4>
			<ul>
				<li>页面的结构比较简单，主要还是在js框架第一次接触问题不懂的地方比较多，套入框架模板之后，自动设置width：100%，height:100%;</li>
				<li>测试机型为魅蓝note和iphone5。CSS抽出公共样式实现代码复用。此页面主要在于图片多，而且普遍比较大，更多涉及图片的处理。</li>
				<li>主要问题在于图片的压缩，大小和视觉的权衡。这次png使用<a href="https://tinypng.com/">tinypng.com/</a>来处理，压缩之后小了很多，但是图片会有些模糊，使用PNGOUT压缩比图片大小减少不多。</li>
			</ul>
		</h4>
		<p class="answer">&nbsp;</p>
	</li>
</ol>

<a name="其他"></a>
****
欢迎指出该Demo的各种问题，也希望能对前端学习者有一点点的帮助。
****
Email:<hawtim_zhang@qq.com>
QQ:843823550
