/*
 * easyGame 游戏引擎
 * Copyright 2014.5~~ weiyang
 *
 * 采用矩形碰撞
 */

(function (window) {
    var easyGame = function () {
        //游戏对象
        var game = {},
            target = arguments[0],
            canvas = target.canvas,
            canvas_w = canvas.width,
            canvas_h = canvas.height,
            ctx = canvas.getContext("2d");

        if (easyGame.versions.android || easyGame.versions.iPhone) {
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            /*
                  document.getElementById("game").style.width = window.innerWidth+"px";
                  document.getElementById("game").style.height = window.innerHeight+"px";*/
        }

        game = {
            objList: [],
            imgList: {},
            //通过图片id获取图片
            getImg: function (id) {
                return this.imgList[id];
            },

            //获得canvas对象
            canvas: canvas,
            //游戏帧数
            fps: target.fps,
            //游戏时间轴
            timeline: 0,
            ctx: canvas.getContext("2d"),
            canWidth: canvas_w,
            canHeight: canvas_h,
            //移动端拉伸系数
            p_x: 1,
            p_y: 1,
            //loading资源
            loading: function (imglist, loadfuc) {
                this.l_t = 0;
                //图片初始化
                this.imgList.length = 0;
                for (var i = 0; i < imglist.length; i++) {
                    var img = imglist[i];
                    this.imgList[img.id] = new Image();
                    this.imgList[img.id].src = img.url;
                    this.imgList.length++;
                }

                this.loadfuc = loadfuc;
                this.loadTimer = setInterval(function () {
                    this.drawLoading();
                }.bind(this), 30);

            },
            setEmpty: function () {
                this.objList = [];
                this.offtimefuc();
                easyGame.eventList = {};
            },
            //设置精灵层级关系
            createLayer: function (index) {
                var layer = [];
                if (!index || index >= this.objList.length - 1) {
                    this.objList.push(layer);
                } else if (index <= 0) {
                    this.objList.unshift(layer);
                } else {
                    this.objList.splice(index, 0, layer)
                }
                return layer;
            },

            //内置loading绘制
            drawLoading: function () {
                var leg = 0,
                    ctx = this.ctx,
                    canWidth = this.canWidth,
                    canHeight = this.canHeight,
                    imgLeg = this.imgList.length;
                for (i in this.imgList) {
                    if (i != "length") {
                        if (this.imgList[i].complete) {
                            leg++;
                        }
                    }
                }
                ctx.beginPath();
                ctx.clearRect(0, 0, canWidth, canHeight);
                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, canWidth, canHeight);
                ctx.beginPath();
                var gradient = ctx.createLinearGradient(50, 0, canWidth, 0);
                gradient.addColorStop(0, "#777");
                gradient.addColorStop(Math.sin(this.l_t++ % 71 * Math.PI / 140), "#fff");
                gradient.addColorStop(1, "#777");
                ctx.fillStyle = gradient;
                ctx.fillRect(50, canHeight / 2 - 10, (canWidth - 100) / imgLeg * leg, 14);
                ctx.fill();
                ctx.beginPath();
                ctx.lineWidth = "1";
                ctx.strokeStyle = "#fff";
                ctx.rect(46, canHeight / 2 - 13, (canWidth - 92), 20);
                ctx.stroke();
                ctx.beginPath();
                ctx.fillStyle = "#eee";
                ctx.font = "14px Arial bold";
                ctx.fillText("LOADING...", canWidth / 2 - 100, canHeight / 2 + 36);
                ctx.fillText(leg + "/" + imgLeg, canWidth / 2, canHeight / 2 + 36);
                ctx.fill();
                if (leg == imgLeg) {
                    clearInterval(this.loadTimer);
                    ctx.clearRect(0, 0, canWidth, canHeight);
                    this.init();
                    this.loadfuc();

                }
            },

            //游戏开始方法
            gameStart: function () {
                this.stimer = this.requestAnimFrame(function () {
                    this.gameStart();
                }.bind(this));

                //通过时间轴管理游戏
                if (this.timeline) {
                    this.tlinefuc(this.timeline);
                    this.timeline++;
                }
                //精灵状态更新
                this.__update();
                //精灵效果重绘
                this.__render();
                //输出fps信息
                this.__drawFPS(new Date().getTime());

            },

            gameOver: function () {
                this.cancelAFrame(this.stimer);
            },

            //管理时间轴函数
            ontimefuc: function (fuc) {
                this.timeline = 1;
                this.tlinefuc = fuc;
            },

            offtimefuc: function () {
                this.timeline = 0;
            },

            //通过碰撞检测模拟精灵事件
            addEventListener: function (type) {
                this.canvas.addEventListener(type, fuc);
                var __self = this;

                function fuc(e) {
                    if (eG.eventList[type]) {
                        var _x = e.pageX * __self.p_x,
                            _y = e.pageY * __self.p_y,
                            eventlist = eG.eventList[type],
                            i = 0,
                            len = eventlist.length;
                        for (; i < len; i++) {
                            var eventObj = eventlist[i];
                            if (eG.OBBvsOBB(new easyGame.OBB(new eG.Vector2(_x, _y), 0, 0, 0), eventObj.testObb())) {
                                for (var j = 0; j < eventObj.eventFuc[type].length; j++) {
                                    eventObj.eventFuc[type][j](e);
                                }
                            }
                        }
                    }
                }

            },

            //绘制帧数
            __drawFPS: function (now) {
                var fps = 1000 / (now - this.lastAnimationFrameTime);
                this.lastAnimationFrameTime = now;
                if (now - this.lastFpsUpdateTime > 2000) {
                    this.lastFpsUpdateTime = now;
                    this.fps = fps;
                }
                this.ctx.font = "18px Arial bold";
                this.ctx.fillText(Math.round(this.fps) + 'FPS', 10, 26);
            },

            //绘制精灵
            __render: function () {
                //清空canvas
                this.ctx.clearRect(0, 0, this.canWidth, this.canHeight);
                var i = 0,
                    len = this.objList.length;
                for (; i < len; i++) {
                    var j = 0,
                        obj = this.objList[i],
                        len2 = obj.length;
                    for (; j < len2; j++) {
                        var o = obj[j];
                        if (!o.static) {
                            o.x += this.__viewport.speed_x;
                            o.y += this.__viewport.speed_y;
                        }
                        o.update();
                        o.render();
                    }
                }
            },

            //视口对象
            __viewport: {
                speed_x: 0,
                speed_y: 0
            },

            //设置视口速度，一般使角色跟随屏幕
            setviewPort: function (x, y) {
                this.__viewport.speed_x = x || 0;
                this.__viewport.speed_y = y || 0;
            },

            //精灵状态更新
            __update: function () {
                var i = 0,
                    len = this.objList.length;
                for (; i < len; i++) {
                    var j = 0,
                        obj = this.objList[i];
                    for (; j < obj.length; j++) {
                        if (obj[j].die) {
                            obj.splice(j, 1);
                        }
                    }
                }
            },

            //游戏组件初始化
            init: function () {
                this.lastAnimationFrameTime = 0; //计算fps
                this.lastFpsUpdateTime = 0;

                if (easyGame.versions.android || easyGame.versions.iPhone) {
                    this.p_x = this.canWidth / window.innerWidth;
                    this.p_y = this.canHeight / window.innerHeight;
                }

                this.requestAnimFrame = (function () {
                    var raf, fps = target.fps;
                    if (!fps) {
                        raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                            function (callback, element) {
                                window.setTimeout(callback, 1000 / 60);
                            }
                    } else {
                        raf = function (callback, element) {
                            window.setTimeout(callback, 1000 / fps);
                        }
                    }
                    return raf;
                })().bind();

                this.cancelAFrame = (function () {
                    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame ||
                        function (id) {
                            window.clearTimeout(id);
                        };
                })().bind();

            }
        };

        //对game对象进行拓展
        game.extend = function () {
            var options, name, src, copy, target = this;
            if ((options = arguments[0]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name]; //存储对象的值
                    if (target === copy) {
                        continue;
                    }
                    target[name] = copy;
                }
            }

            return target;
        };
        return game;
    };

    //浏览器判断
    easyGame.versions = function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1,
            //IE内核
            presto: u.indexOf('Presto') > -1,
            //opera内核
            webKit: u.indexOf('AppleWebKit') > -1,
            //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            //火狐内核
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1,
            //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1,
            //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }()

    //继承实现
    easyGame.inherit = function (childClass, parentClass) {
        var Constructor = new Function();
        Constructor.prototype = parentClass.prototype;
        childClass.prototype = new Constructor();
        childClass.prototype.constructor = childClass;
        childClass.superclass = parentClass.prototype;

        if (childClass.prototype.constructor == Object.prototype.constructor) {
            childClass.prototype.constructor = parentClass;
        }
    };

    //构造函数属性继承
    easyGame.extend = function (obj, newProperties) {
        var key;
        for (key in newProperties) {
            if (newProperties.hasOwnProperty(key)) {
                obj[key] = newProperties[key];
            }
        }
        return obj;
    };

    //构造继承Sprite类的类型
    easyGame.createSprite = function (arg) {
        var newclass = function (_arg) {
            easyGame.extend(this, arg);
            easyGame.Sprite.call(this, _arg);
        }
        easyGame.inherit(newclass, easyGame.Sprite);
        return newclass;
    };

    //构造继承Bitmap类的类型
    easyGame.createBitmap = function (arg) {
        var newclass = function (_arg) {
            easyGame.extend(this, arg);
            easyGame.Bitmap.call(this, _arg);
        }
        easyGame.inherit(newclass, easyGame.Bitmap);
        return newclass;
    };

    //事件监听对象
    easyGame.eventList = {};

    //可视化元素基类
    easyGame.DisplayObject = function (arg) {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        //透明度
        this.alpha = 1;
        //是否删除此元素
        this.die = 0;
        //旋转角度
        this.rotation = 0;
        this.visible = 0;
        //水平缩放
        this.scaleX = 1;
        //垂直缩放
        this.scaleY = 1;
        this.ctx = null;
        //碰撞坐标
        this.obb = [];
        //事件执行函数列表
        this.eventFuc = {};
        //判断是否为静态，不随视口移动而移动
        this.static = 0;
        this.timeline = 0;
        this.onBuffer = 0;
        easyGame.extend(this, arg);
        this.__init();
    }

    easyGame.DisplayObject.prototype = {

        //矩阵变换
        __transform: function (ctx) {
            ctx.translate(this.x, this.y);
            if (this.alpha < 1) {
                ctx.globalAlpha = this.alpha;
            }
            if (this.rotation) {
                ctx.rotate(this.rotation);
            }

            if (this.scaleX != 1 || this.scaleY != 1) {
                ctx.scale(this.scaleX, this.scaleY);
            }
        },

        //绘制
        render: function () {

            if (this.onBuffer) {
                if (this.bufferTimer < this.duration) {
                    for (i in this.bufferObj) {
                        this[i] += this.bufferObj[i];
                        this.bufferTimer++;
                    }
                } else {
                    this.onBuffer = 0;
                }
            }

            this.timeline++;
            if (!this.visible) {
                var ctx = this.ctx;
                ctx.save();
                this.__transform(ctx);
                this.draw(ctx);
                ctx.restore();
            }
        },

        //添加监听的事件
        addEventListener: function (type, fuc) {
            if (!easyGame.eventList[type]) {
                easyGame.eventList[type] = [];
            }
            if (!this.eventFuc[type]) {
                this.eventFuc[type] = [];
            }
            easyGame.eventList[type].push(this);
            this.eventFuc[type].push(fuc.bind(this));
        },

        //删除监听的事件
        removeEventListener: function (type) {
            easyGame.eventList[type].splice(easyGame.eventList[type].indexOf(this), 1);
            this.eventFuc[type] = [];
        },

        //obb矩形碰撞
        testObb: function () {
            //求碰撞中心点
            return new easyGame.OBB(new easyGame.Vector2(this.x - this.__obb_x, this.y - this.__obb_y), this.__w, this.__h, this.rotation);
        },

        //初始化
        __init: function () {
            this.__w = this.obb[2] - this.obb[0];
            this.__h = this.obb[3] - this.obb[1];
            this.__obb_x = this.width / 2 - this.obb[0] - this.__w / 2;
            this.__obb_y = this.height / 2 - this.obb[1] - this.__h / 2;
        },

        //设置碰撞区域矩阵
        setObb: function (obb) {
            this.obb = obb;
        },

        //检测是否移出了canvas
        checkBorder: function () {
            return easyGame.OBBvsOBB(this.testObb(), new OBB(new easyGame.Vector2(canvas_w / 2, canvas_h / 2), canvas_w, canvas_h, 0));
        },

        //移除此游戏精灵
        remove: function () {
            this.die = 1;
        },

        //缓动
        to: function (obj, timer) {
            this.onBuffer = 1;
            this.bufferTimer = 0;
            this.duration = timer;
            this.bufferObj = {};
            for (i in obj) {
                this.bufferObj[i] = (obj[i] - this[i]) / timer;
            }
        }

    };

    //图片基类
    easyGame.Bitmap = function (arg) {
        easyGame.DisplayObject.call(this, arg);
    }
    //继承自可视化类
    easyGame.inherit(easyGame.Bitmap, easyGame.DisplayObject);
    easyGame.Bitmap.prototype.draw = function (ctx) {
        ctx.drawImage(this.img, 0, 0, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);
    };
    easyGame.Bitmap.prototype.update = function () {

    }

    //游戏元素精灵类
    easyGame.Sprite = function (arg) {
        //动画对象
        this.anim = null;
        easyGame.DisplayObject.call(this, arg);

    };
    //继承自可视化类
    easyGame.inherit(easyGame.Sprite, easyGame.DisplayObject);
    easyGame.Sprite.prototype.draw = function (ctx) {
        ctx.drawImage(this.anim.img, this.anim.x, this.anim.y, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);

    };
    easyGame.Sprite.prototype.setAnim = function (anim) {
        this.anim = anim;
    };

    //计算动画帧数数组
    easyGame.Animdata = function (img, i, j) {
        var datalist = [],
            h = img.height / i,
            w = img.width / j,
            m = 0;
        for (; m < i; m++) {
            for (var n = 0; n < j; n++) {
                datalist.push([n * w, h * m]);
            }
        }
        return datalist;
    }

    //游戏动画控制类
    easyGame.Animation = function (arg) {
        this.ctx = null;
        this.img = null;
        //帧数坐标数组
        this.frames = [];
        //判断动画是否循环
        this.loop = 0;
        //动画速度
        this.speed = 1;
        //当前帧数
        this.speedList = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50];
        this.frameIndex = 0;
        easyGame.extend(this, arg);
    }
    easyGame.Animation.prototype = {
        //动画状态更新
        update: function () {
            if (this.loop) { //循环播放动画
                this.frameIndex += this.speedList[this.speed] / 20;
                //toFixed(2)解决js加法小数不准问题
                this.frameIndex = parseFloat(this.frameIndex.toFixed(3));
                //如果循环，播放完返回第一帧
                if (this.frameIndex == this.frames.length) {
                    this.frameIndex = 0;
                }
            } else {
                if (this.frameIndex + this.speedList[this.speed] / 20 < this.frames.length) {
                    this.frameIndex += this.speedList[this.speed] / 20;
                    this.frameIndex = parseFloat(this.frameIndex.toFixed(3));
                } else if (this.endfuc) {
                    this.endfuc();
                }
            }
            this.x = this.frames[Math.floor(this.frameIndex)][0];
            this.y = this.frames[Math.floor(this.frameIndex)][1];
        },

        //设置动画结束函数
        setEndfuc: function (endfuc) {
            this.endfuc = endfuc;
        },

        setSpeed: function (s) {
            this.speed = (s <= 14) ? s : 14;
        },

        //第index帧动画
        goframe: function (index) {
            this.frameIndex = index;
        }
    };

    easyGame.TextField = function (arg) {
        this.x = 0;
        this.y = 0;
        this.type = "text";
        this.color = "#000";
        this.size = "12px";
        this.family = "Arial";
        this.text = "";
        this.weight = "normal";
        this.die = 0;
        this.ctx = null;
        this.t = 0;
        easyGame.extend(this, arg);
    }
    easyGame.TextField.prototype = {
        render: function () {
            var ctx = this.ctx;
            ctx.save();
            ctx.beginPath();
            /*var grt = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.size);
            grt.addColorStop(0, "#777");
            grt.addColorStop(Math.sin(this.t % 50 * Math.PI / 50), "#fff");
            grt.addColorStop(1, "#777");*/
            ctx.fillStyle = "#fff";
            ctx.font = this.size + "px " + this.family + " " + this.weight;
            ctx.fillText(this.text, this.x, this.y + this.size);
            ctx.fill();
            ctx.restore();
            this.t++;
        },
        update: function () {

        }
    };

    easyGame.Math = {
        //取随机数
        random: function (n, m) {
            return Math.floor(Math.random() * (m - n + 1) + n);
        },

        //获得坐标旋转后坐标
        coordinate: function (x, y, cen_x, cen_y, arc) {
            var m = (x - cen_x) * Math.cos(arc),
                n = (y - cen_y) * Math.sin(arc);
            return [Math.round(m - n + cen_x), Math.round(m + n + cen_x)];
        }

    };

    //检测矩形碰撞
    easyGame.OBB = function (centerPoint, width, height, rotation) {
        this.centerPoint = centerPoint;
        this.extents = [width / 2, height / 2];
        this.axes = [new easyGame.Vector2(Math.cos(rotation), Math.sin(rotation)), new easyGame.Vector2(-Math.sin(rotation), Math.cos(rotation))];
        this._width = width;
        this._height = height;
        this._rotation = rotation;
    }
    easyGame.OBB.prototype.getRadius = function (axis) {
        return this.extents[0] * Math.abs(axis.dot(this.axes[0])) + this.extents[1] * Math.abs(axis.dot(this.axes[1]));
    }

    //中心点
    easyGame.Vector2 = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };

    easyGame.Vector2.prototype = {
        sub: function (v) {
            return new easyGame.Vector2(this.x - v.x, this.y - v.y)
        },
        dot: function (v) {
            return this.x * v.x + this.y * v.y;
        }
    };

    //矩形碰撞检测函数
    easyGame.OBBvsOBB = function (OBB1, OBB2) {
        var nv = OBB1.centerPoint.sub(OBB2.centerPoint),
            axisA1 = OBB1.axes[0],
            axisA2 = OBB1.axes[1],
            axisB1 = OBB2.axes[0],
            axisB2 = OBB2.axes[1];
        if ((OBB1.getRadius(axisB2) + OBB2.getRadius(axisB2) <= Math.abs(nv.dot(axisB2))) || (OBB1.getRadius(axisB1) + OBB2.getRadius(axisB1) <= Math.abs(nv.dot(axisB1))) || (OBB1.getRadius(axisA2) + OBB2.getRadius(axisA2) <= Math.abs(nv.dot(axisA2))) || (OBB1.getRadius(axisA1) + OBB2.getRadius(axisA1) <= Math.abs(nv.dot(axisA1)))) {
            return 0;
        }
        return 1;
    }

    window.eG = window.easyGame = easyGame;
})(window)
