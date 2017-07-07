<h2>项目三 校园卡充值  2016.03.03</h2>
<h2>Demo二维码，请用手机扫描</h2>
<p><img src= "https://raw.githubusercontent.com/hawtim/universityCard/master/1456991042.png" width="200" height="200"><br>
	如果二维码无法加载，<a href="https://raw.githubusercontent.com/hawtim/universityCard/master/1456991042.png">请点击这里</a></p>
<p>在PC端预览，<a href="http://htmlpreview.github.io/?https://github.com/hawtim/universityCard/blob/master/index.html">请点击</a></p>
<h2>此页面为仅为学习所做Demo</h2>
<h2>改进之处</h2>
<ul>
	<li>修复界面布局错误</li>
	<li>优化CSS结构，注重模块化开发</li>
	<li>DOM完成页面验证交互功能</li>
	<li>Demo预览</li>
</ul>

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
		<h4>
			在校园卡demo中，select框默认是以下的样式。自己的实现思路如下：
			<ul>
				<li>无法设置select单个option的字体颜色，</li>
				<li>使用了一个span标签实现该字体颜色，</li>
				<li>使用z-index：999；使span位置处在最上层，</li>
				<li>通过js实现点击span隐藏元素，跳出select框</li>
				<li>第一个option  使用selected disabled 和占位符实现隐藏span后显示默认选中占位符的选择框，并无法再次选中该选项</li>
				<li>再次点击可选择金额</li>
			</ul>
			但总觉得这样的处理方式并不是特别好，有没有办法点击span跳出select？
			因为现在设定了z-index，而且自己也写了选择后的值写入到span的innerHTML中
			感觉如果可以那样的实现交互会更好。
		</h4>
		<p class="answer">&nbsp;</p>
	</li>
	<li>
		<h4>关于信息错误提示，自己使用了以下代码使其在页面节点中隐藏
		通过js dom实现两个input输入表单的值和select的值的是否空白的验证，如果均不为空可以进行页面跳转
		经过今晚的一番调试，终于是能够通过。
		但在功能上还是欠缺的，比如后退到原来这个页面时，充值金额的span标签又显示出来了，导致看起来就像没有选择金额的时候照样可以通过。（当然实际还是选中了刚刚的金额）
		觉得代码上还是不够过关的，所以我详细注释了js代码文件，main.js文件，还望求教。</h4>
		<p class="answer">&nbsp;</p>
	</li>
</ol>

<a name="其他"></a>
****
欢迎指出该Demo的各种问题，也希望能对前端学习者有一点点的帮助。
****
Email:<hawtim_zhang@qq.com>
QQ:843823550
