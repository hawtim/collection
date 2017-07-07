  var baseURL = 'http://music.163.com/'  // 定义基础 URL
  var csrfToken = getCookie('__csrf')   // 第一步先拿到 token，保存在 cookies 里面
  console.log(csrfToken)



  // 刷新数据
  function refresh() {
    const API = baseURL + 'login/token/refresh'
    return API
  }

  // 获取是否有新消息的接口
  function getMsg() {
    const URL = baseURL + 'pl/count'
  }

  // 获取用户关注和粉丝
  function getFollow() {
    const URL = baseURL + 'user/getfolloweds'
  }

  // 获取用户列表
  function getUserList() {
    // userId 字段判断该列表是用户自己创建的还是收藏的
    const URL = baseURL + 'user/playlist?csrf_token='+csrfToken
  }
  getUserList()
  // 获取用户关注的歌手信息
  function getUserArtist() {
    const URL = baseURL + 'artist/sublist'
  }

  // 获取csrf token信息
  function getCookie(c_name) {
    if (document.cookie.length > 0) {　　 //先查询cookie是否为空，为空就return ""　　　　　　
      c_start = document.cookie.indexOf(c_name + "=")　　 //通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1　　 //最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
        c_end = document.cookie.indexOf(";", c_start)　　 //其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))　　 //通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节       　　　　　　
      }
    }
    return ""
  }


  //封装一个ajax函数
  function ajax(json) {
    //判断参数存在不存在，不存在就赋值一个空的json
    json = json || {};
    //判断json里是否提交url地址，如果没有，则到此结束
    if (!json.url) {
      return;//结束
    }
    //判断是否填写type（提交方式），没有就默认GET提交
    json.type = json.type || 'GET';
    //判断是否填写数据（=，如果没有就默认提供一个空的json
    json.data = json.data || {};
    //设置缓存（数据更新）
    // json.data.t = Math.random();
    //判断是否存在XMLHttpReuest的方法
    if (window.XMLHttpRequest) {
      var oAjax = new XMLHttpRequest();//有则用其创建ajax（不兼容IE6）
    } else {
      var oAjax = new ActiveXObject('Microsoft.XMLHTTP');//没有则用ActiveXObject创建ajax兼容IE6/7/8
    }
    //获取type的类型并统一转化为小写（优化用户体验）
    switch (json.type.toLowerCase()) {
      //当type为get时，设置get的方法（建立连接和发送请求）
      case 'get':
        oAjax.open('GET', json.url + '?' + json2url(json.data), true);//建立连接
        oAjax.send();//发送请求
        break;
      //当type为post时，设置post的提交方法（建立连接和发送请求）
      case 'post':
        oAjax.open('POST', json.url, true);//建立连接
        oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');//open之后，send之前
        oAjax.send(json2url(json.data));//发送请求
        break;
      //默认设置，默认选择get
      default:
        oAjax.open('GET', json.url + '?' + json2url(json.data), true);
        oAjax.send();
        break;
    }
    //当 readyState 属性改变的时候执行
    oAjax.onreadystatechange = function () {
      //http请求状态码为4时，http响应完全接收
      if (oAjax.readyState == 4) {
        //服务器http状态码，在200时和以下条件成立时成功
        if (oAjax.status < 300 && oAjax.status >= 200 || oAjax.status == 304) {
          //判断是否设置有输入函数传参，当交互成功时，执行函数，并且设置函数参数为数据
          json.success && json.success(oAjax.responseText);
        } else {
          //当交互失败时，执行的函数
          json.error && json.error();
        }
      }
    };
  }
  //封装一个寄送转字符串的函数
  function json2url(json) {
    //创建一个空数组
    var arr = [];
    //遍历json里的每一个键值对
    for (var key in json) {
      //把该键值对转化为a=b的形式放入数组
      arr.push(key + '=' + json[key]);
    }
    //使用join方法把数组转为以&拼接的字符串（url地址数据的形式），并返回结果
    return arr.join('&');
  }
  //执行函数  传入url（接口），type（提交方式—），和data（数据），success成功时函数，error失败时函数

