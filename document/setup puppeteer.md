## 部署 puppeteer 到 centos 上的常见问题

### cnpm 安装 puppeteer

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm i puppeteer
```
安装puppeteer后，检查puppeteer依赖是否全部安装，执行：

`ldd node_modules/puppeteer/.local-chromium/linux-555668/chrome-linux/chrome`

发现未安装依赖，执行命令查看其依赖包：`repoquery --nvr --whatprovides xxx.xxx.xx`

安装此依赖： `yum install yyy.xxx.zz`

### Chrome headless doesn't launch

需要安装[对应的依赖](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md) （更多运行上的问题也可以查看此链接）才能让 puppeteer 在centos 上运行

```shell
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc
```
再设置
```js
const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
})
```
即可运行

### The only Chrome revision guaranteed to work is r555668

运行时报错： `UnhandledPromiseRejectionWarning: Error: Timed out after 30000 ms while trying to connect to Chrome! The only Chrome revision guaranteed to work is r555668`

如果是用 cnpm 安装的 puppeteer，先 cnpm remove puppeteer 再 install。或者手动下载 555668 版本到本地，代码指定执行的路径即可。

### Centos7 安装Chromium浏览器

在这里[下载Chromium](https://pkgs.org/download/chromium)

安装chromium浏览器

`[root@localhost hawtim]# yum localinstall chromium-58.0.3029.110-2.el7.x86_64.rpm`

### 下载 Chromium 失败解决办法

更换国内Chromium源

```shell
PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org
npm i puppeteer
```

或者用 cnpm 安装

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm i puppeteer
```