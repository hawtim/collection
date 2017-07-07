# 基地商城 Demo

# 分享要点

## CSS RESET

>>>
>>>base.css 有详尽注释，开箱即用

PS:交付时别忘了把自己没用到的CSS RESET去掉
>>>

## 循环列表HTML结构尽量简单

 > 列表为什么非要套ul>li？为什么非要在div定义class？很多时候直接定义标签就能实现需求，html结构要灵活，在语意允许的情况下结构有多简单做多简单，能省即省，尤其有循环的情况下

```html
 <!-- bad -->
 <ul>
   <li>
     <div class="pic">
       <a href="javascript:;"><img src="//images.apple.com/cn/iphone/compare/images/tech_specs_iphone7_large.jpg" alt=""></a>
       <span class="auction">竞拍</span>
     </div>
     <div class="info">
         <div><a href="javascript:;">爱疯手机</a></div>
         <span>¥8000/部</span>
     </div>
   </li>
   ...
 </ul>
```

```html
 <!-- best -->
 <dl>
     <dt>
       <a href="javascript:;"><img src="//images.apple.com/cn/iphone/compare/images/tech_specs_iphone7_large.jpg" alt=""></a>
       <span class="auction">竞拍</span>
     </dt>
     <dd>
         <div><a href="javascript:;">爱疯手机</a></div>
         <span>¥8000/部</span>
     </dd>
 </dl>
 ...
```

## 循环列表间距父元素用负值清除

 > 不要在第一个和最后一个列表元素加class清除间距

## 雪碧图玩法

 > 不规则图形png8毛边问题，图与图之间的间距，background-position的运用

## inline-block布局玩法

 > inline-block 排版的运用，具体参考源码

## 使用HTML tag

```html
 <!-- bad -->
 <div class="nav"><span>全部商品</span> > 我的购买</div>
```

```html
 <!-- good -->
 <div class="nav"><span>全部商品</span> &gt; <span>我的购买</span></div>
```

`我的购买`文字尽量用标签包裹，避免像Safari这样的高级浏览器出现错位

# 浏览器兼容
- IE 6+
- Firefox (latest)
- Chrome (latest)
- Safari (latest)
- Opera (latest)

>>>
>>>PS:

1.分页是按程序给出的HTML结构要求兼容的，不过也支持到ie6+，可参考

2.由于项目简单样式命名基本没有层级，例如table

3.需求关系只做了PC端固定布局，没有实现响应式
>>>


