(function(root, factory) {
    root.Vue = factory()
})(this, function() {
    function defineProperty(obj, key, value, def) {
        if (value == undefined) {
            obj[key] = def
        } else {
            obj[key] = value
        }
    }
    var Vue = function(options) {
        this.$options = options = options || {}
        var data = this._data = options.data
        var _this = this
        Object.keys(data).forEach(function(key) {
            _this._proxy(key)
        })
    }
    Vue.prototype._proxy = function(key) {
        Object.defineProperty(this, key, {
            get: function() {
                return this._data[key]
            },
            set: function(newVal) {
                this._data[key] = newVal
            }
        })
    }
    Vue.prototype.init = function() {
        var el = this.$options.el
        if (el !== undefined) {
            this.$mount(el)
        }
    }
    Vue.prototype.$mount = function(el) {
        this.$el = typeof el === 'string' ? document.querySelector(el) : document.body
        if (this.$el == null) {
            console.error(this.$el.options + 'not found')
        }
        // 检测某个对象的属性，初始化赋值
        defineProperty(this, 'template', this.$options.template, this.$el.outerHTML)
        console.log(this.template)
        if (this.render == noop) {
            this.render = Vue.compile(this.template)
        }
    }
    Vue.prototype.compile = function (template) {
        // 词法分析，语法分析, 编译函数
        console.log(template)
    }
    return Vue
})