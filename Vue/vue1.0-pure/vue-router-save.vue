<template>
	

</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods:{
			  /**
			   * 获取路由
			   * @param router
			   * @param query
			   * @returns {{name: *}}
			   */
			  getRoute : function (router, query) {
			    var route    = {name: router.name};
			    route.params = $.extend(true, {}, router.params);
			    route.query  = $.extend(true, {}, router.query, query);
			    return route;
			  },
			  /**
			   * 刷新路由
			   * @param router
			   * @param query
			   */
			  goRoute: function (router, query) {
			    var query_time = query ? $.extend(true, {}, query, {t: new Date().getTime()}) : $.extend(true, {}, {t: new Date().getTime()});
			    var route = this.getRoute(router, query_time);
			    router.router.go(route);
			  },
			  /**
		         * 刷新路由
		         * @param query
		         */
		        initRoute: function (query) {
		          query && (query = $.extend({}, query, {page: 1}))
		          utils.goRoute(this.$route, query);
		        },

		},
		route: {
		      data: function () {
		        //更新查询对象
		        var query = this.$route.query;
		        for (var a in this.queryBody) {
		          if (query.hasOwnProperty(a)) {
		            this.queryBody[a] = query[a];
		          }
		        }
		        //刷新数据项
		        this.searchList(this.queryBody);
		      }
		    }
	}
	
</script>