// 创建路由器实例
	var router = new VueRouter()
// 创建路由映射
	router.map({
	    '/home': {
	        component: Home,
	        // 定义子路由
	        subRoutes: {
	            '/news': {
	            	name:'news',
	                component: News,
	                subRoutes: {
                    'detail/:id': {
                        name: 'detail',
                        component: NewsDetail
                    }
                }
	            },
	            '/message': {
	                component: Message
	            }
	        }
	    },
	    '/about': {
	        component: About
	    }
	})

	router.beforeEach(function(transition) {
		well.setColor()
		well.setTitle('跳转路径<span class="text-danger">[from = ' + transition.from.path + '], [to = ' + transition.to.path + ']</span>')
		well.setColoredMessage('执行router的全局函数:beforeEach')
		transition.next()
	})
	router.afterEach(function(transition) {
		well.setColoredMessage('执行router的全局函数:afterEach')
	})


	var App = Vue.extend({})
	router.start(App, '#app')
	router.redirect({
    '/': '/home'