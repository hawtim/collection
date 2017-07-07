var baseURL = 'http://music.163.com'  // 定义基础 URL 
var csrfToken = getCookie('__csrf')  // 第一步先拿到 token，保存在 cookies 里面





// 刷新数据
refresh() {
    const API = baseURL + 'login/token/refresh'
}
// 获取是否有新消息的接口
getMsg() {
    const API = baseURL + 'pl/count'
}
// 获取用户关注和粉丝
getFollow() {
    const API = baseURL + 'user/getfolloweds'
}
// 获取用户列表
getUserList() {
    // userId 字段判断该列表是用户自己创建的还是收藏的
    const API = baseURL + 'user/playlist'
    $.ajax({

    })
}



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
