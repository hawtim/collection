function addLoadEvent(func){
  var oldonload = window.onload;
  //把现有的window.onload事件处理函数的值存入局部变量oldonload中
  if(typeof window.onload !='function'){
    window.onload = func;
    //如果没有绑定任何函数，就像平时一样添加新函数
  }else{
    window.onload = function(){
    //如果已经绑定，就把新函数追加到现有指令的末尾
      oldonload();
      func();
    }
  }
}

function insertAfter(newElement,targetElement) {
  var parent = targetElement.parentNode;
  if(parent.lastChild == targetElement){
    parent.appendChild(newElement);
  }else{
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}


// 抽象
function addClass(element,value){
  if(!element.className){//如果元素的className不存在，则把当前的value赋值给元素的className
    element.className = value;
  }else{
    newClassName = element.className;//新的classname等于旧的className
    newClassName += " ";//newClassName = newClassName + " "
    newClassName += value;//newClassName = newClassName + value;
    //其实可以写成一句，newClassName += " " + value
    element.className = newClassName;
  }
}

// highlightPage

function highlightPage() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  var headers = document.getElementsByTagName('header');
  if (headers.length == 0) return false;
  var navs = headers[0].getElementsByTagName('nav');
  if (navs.length == 0) return false;

  var links = navs[0].getElementsByTagName('a');
  var linkurl;

  for (var i = 0; i < links.length; i++) {
    linkurl = links[i].getAttribute("href");
    if (window.location.href.indexOf(linkurl) != -1) {
      links[i].className = "here";
      var linktext = links[i].lastChild.nodeValue.toLowerCase();
      document.body.setAttribute("id",linktext);
    }
  }
}
addLoadEvent(highlightPage);
// 

function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for (var i = 0 ;i < sections.length; i++) {
		if (sections[i].getAttribute("id") != id) {
			sections[i].style.display = "none";
		} else {
			sections[i].style.display = "block";
		}
	}
}

function prepareInternalnav() {
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName('nav');
	if (navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		links[i].onclick = function () {
			showSection(this.destination);
			return false;
		}
	}
}

addLoadEvent(prepareInternalnav);




function showPic(whichpic){
  if(!document.getElementById("placeholder")) return  false;
  //检查placeholder是否存在，如果不存在该区域则不做切换
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  if(placeholder.nodeName != "IMG") return false;
  placeholder.setAttribute("src",source);
  if(document.getElementById("des")){
  //检查是否存在图片说明文字，如果不存在则不修改
  var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
  var description = document.getElementById("des");
  if(des.firstChild.nodeType == 3)
  description.firstChild.nodeValue = text;
  }
  return true;
  // 将href作为参数传递给getAttribute，再把路径传入变量source
  // 获取id为placeholder的占位图图片
  // 并将它的来源路径改为在source里保存的路径
}

function prepareGallery(){
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  if(!document.getElementById("imagegallery")) return false;
  var gallery = document.getElementById("imagegallery");
  var links = gallery.getElementsByTagName("a");
  for(var i = 0; i < links.length; i++){
    links[i].onclick = function(){
      return showPic(this)? false : true;
    }
    // links[i].onkeypress = links[i].onclick;
    // onkeypress带来的问题很多。onclick其实可以实现它的效果
  }
}

function preparePlaceholder(){
  if(!document.createElement) return false;
  if(!document.createTextNode) return false;
  if(!document.getElementById) return false;
  if(!document.getElementById("imagegallery")) return false;
// 测试浏览器是否支持
  var placeholder = document.createElement("img");
  placeholder.setAttribute("id","placeholder");
  placeholder.setAttribute("src","../img/pic-ep1.jpg");
  placeholder.setAttribute("alt","my image gallery");
  var description = document.createElement("p");
  description.setAttribute("id","des");
  var destext = document.createTextNode("选择图片");
  description.appendChild(destext);
  var gallery = document.getElementById("imagegallery");
  insertAfter(description,gallery);
  insertAfter(placeholder,description);
  //======以下为在galley前面插入placeholder和description========
  // document.getElementsByTagName("body")[0].appendChild(placeholder);
  // document.getElementsByTagName("body")[0].appendChild(description);
  // var gallery = document.getElementById("imagegallery");
  // gallery.parentNode.insertBefore(placeholder,gallery);
  // gallery.parentNode.insertBefore(description,gallery);
}


function insertAfter(newElement,targetElement){
  var parent = targetElement.parentNode;
  //把目标元素的parentNode属性保存到变量parent里
  if(parent.lastChild == targetElement){
  //检查目标元素是不是parent的最后一个子元素
    parent.appendChild(newElement);
    // 如果是，就用appendChild方法将新元素追加到parent上，
    // 这样新元素就恰好被插入到目标元素之后
  }else{
    // 如果不是，把新元素插入到目标元素和目标元素的下一个兄弟元素之间
    // 目标元素的下一兄弟元素即目标元素的nextSibling属性
    // 使用parent.insertBefore方法把新元素插入到目标元素的
    // 下一个兄弟元素之前
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}


addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);





/**
 * [displayAbbreviations description]
 * @return {[type]} [description]
 */
function displayAbbreviations(){
  if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  var abbreviations = document.getElementsByTagName("abbr");
  // 判断文档里是否有abbr标签,
  if(abbreviations.length < 1) return false;
  //
  var defs = new Array();
  //遍历这些缩略词
  for(var i = 0;i<abbreviations.length;i++){
    current_abbr = abbreviations[i]
    // 如果当前的current_abbr的没有子节点，则跳出当前循环开始下一次循环
    if(current_abbr.childNodes.length < 1) continue;
    //definition 的值为当前缩略语的title属性的值
    var definition = current_abbr.getAttribute("title");
    //key 的值为当前缩略语的最后一个节点的节点值，也就是内容节点的值
    var key = current_abbr.lastChild.nodeValue;
    // 现在有两个变量了，所以用一对键值对来讲键和值保存到defs数组中
    defs[key] = definition;
    console.log(defs[key] = definition);
    // 通过把其中之一用做数组元素的下标（键）。另一个用做数组元素的值的方式来同时保存这两个值
  }
  // 理论上讲可以这样写，只是比较难读懂
  // for(var i = 0;i<abbreviations.length;i++){
  // defs[abbreviations[i].lastChild.nodeValue] = abbreviations[i].getAttribute("title");
  // 创建定义列表dl   diallist
  var dlist = document.createElement("dl");
  // 遍历定义
  for(key in defs){
    // 对于关联数组里的每个键，把它的值赋给变量key
    var definition = defs[key];
    // 和上面那句defs[key] = definition
    // 两个definition都是局部变量,不互相影响
    // 创建定义标题
    var dtitle = document.createElement("dt");
    //创建内容节点的值为key
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    // 创建定义描述
    var ddesc = document.createElement("dd");
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    // 把它们添加到定义列表
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if (dlist.childNodes.length < 1) return false;
  // 违背了结构化程序设计的原则，这相当于在函数中间增加了一个出口点
  // 如果不能识别abbr标签的浏览器就会生成一个空的def数组，所以将不会创建出任何dt和dd元素，
  // 如果对应于“缩略表列表”的那个dl元素没有任何子节点，则立即退出displayAbbreivations函数
  // 创建标题
  var header = document.createElement("h3");
  var header_text = document.createTextNode("Abbreviations");
  // 以下两者默认添加到页面尾部
  header.appendChild(header_text);
  var articles = document.getElementsByTagName("article");
  if (articles.length == 0) return false;
  var container = articles[0];
  container.appendChild(header);
  // 把标题添加到页面的article中
  container.appendChild(dlist);
  // window.onload = displayAbbreviations;
}
addLoadEvent(displayAbbreviations);


function highlightRows(){//强调被hover 的行数
  if(!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName("tr");
  for(var i = 0;i < rows.length; i ++){
   
      rows[i].oldClassName = rows[i].className
      rows[i].onmouseover = function(){
        addClass(this,"highlight");
    }
    rows[i].onmouseout = function(){
      this.className = this.oldClassName
    }
  }
}
addLoadEvent(highlightRows);



function stripeTables(){
  if(!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName("table");
  var odd ,rows;//odd为奇数，even为偶数，rows为行数
  for(var i = 0; i <tables.length;i++ ){//遍历所有的table
    odd = false;//如果odd为false.  odd=false  ==> odd = 0;
    rows = tables[i].getElementsByTagName("tr");//get table 的tr标签
    for (var j = 0 ;j < rows.length;j++){//遍历table 的tr标签，j从0开始，也就是下角标从0开始
      if(odd == true){//如果odd的值是true，设置样式并把odd变量修改为false
        addClass(rows[j],"odd");
        odd = false;
      }else{//如果odd的值是false，不设置样式，但把odd变量修改为true
        odd = true;
      }
    }
  }
}
addLoadEvent(stripeTables);


function focusLabels() {
  if (!document.getElementsByTagName) return false;
  var labels = document.getElementsByTagName("label");
  for (var i = 0;i < labels.length; i++) {
    if (!labels[i].getAttribute("for")) continue;
    labels[i].onclick = function () {
      var id = this.getAttribute("for");
      if (!document.getElementById(id)) return false;
      var element = document.getElementById(id);
      element.focus();
    }
  }
}
addLoadEvent(focusLabels);




function resetFields(whichform) {
    if (Modernizr.input.placeholder) return;
    for (var i = 0; i < whichform.elements.length; i++) {
      var element = whichform.elements[i];
      if (element.type == "submit") continue;
      //鉴于不同的浏览器对未知属性的实现方式有所不同，这里同时使用了HTML DOM 的 placeholder 属性和 DOM 的getAttribute('placeholder')方法
      var check = element.placeholder || element.getAttribute("placeholder");
      if (!check) continue;
      // 元素获得焦点时添加一个处理函数，如果字段的值等于占位符，则将字段的值设置为空
      element.onfocus = function () {
        var text = this.placeholder || this.getAttribute('placeholder');
        if (this.value == text) {
          this.className = "";
          this.value = "";
        }
      }
      //再为元素失去焦点的事件添加一个处理函数。如果字段的值为空，则为其添加占位符值

      element.onblur = function () {
        if (this.value == "") {
          this.className = 'placeholder';
          this.value = this.placeholder || this.getAttribute('placeholder');
        }
      }
      element.onblur();
    }
 }




 function validateForm(whichform) {
  for (var i = 0; i < whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.required == 'required') {
      if (!isFilled(element)) {
        alert("Please fill in the " + element.name + " field.")
        return false;
      }
    }
    if (element.type == 'email') {
      if (!isEmail(element)) {
        alert("The " + element.name + " field must be a valid email address.")
        return false;
      }
    }
  }
  return true;
 }

 function prepareForms(){
  for (var i = 0; i < document.forms.length; i++) {
    var thisform = document.forms[i];
    resetFields(thisform);
    thisform.onsubmit = function () {
      if(!validateForm(this)) return false;
      var article =document.getElementsByTagName('article')[0];
      if (submitFormWithAjax(this, article)) return false;
      return false;
    }
  }
}

addLoadEvent(prepareForms);


function getHTTPObject(){
  if(typeof XMLHttpRequest == "undefined")
    XMLHttpRequest = function(){
      try{ return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
      catch(e){}
      try{ return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
      catch(e){}
      try{ return new ActiveXObject("Msxml2.XMLHTTP");}
      catch(e){}
      return false;
    }
    return new XMLHttpRequest();
}


function displayAjaxLoading(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
  var content = document.createElement("img");
  content.setAttribute("src", "../img/loading.gif");
  content.setAttribute("alt", "loading...");
  element.appendChild(content);
}


function submitFormWithAjax(whichform, thetarget) {
  var request = getHTTPObject();
  if (!request) {return false;}
  displayAjaxLoading(thetarget);
  var dataParts = [];
  var element;
  for(var i = 0; i < whichform.elements.length; i++) {
    element = whichform.elements[i];
    dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
  }
  var data = dataParts.join('&');
  request.open('POST',whichform.getAttribute("action"), true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200 || request.status == 0) {
        var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
        if (matches.length > 0) {
          thetarget.innerHTML = matches[1];
        } else {
          thetarget.innerHTML = '<p>' + request.statusText + '</p>';
        }
      }
    };
    request.send(data);
    return true;
  }
}