
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
    	base: require('@/store/base.js').default, // 基础
    	main: require('@/store/modules/main.js').default,
    	admin: require('@/store/modules/admin.js').default,
    },
	// strict: process.env.NODE_ENV !== 'production' //严格模式
})