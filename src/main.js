import Vue from 'vue'
Vue.prototype.$build = 'index'

import './assets/style/project/main.scss' // 基础样式
import '@/plugins/mixin/common.js' // 全局混合
import '@/plugins/mixin/project.js'
import Element from 'element-ui'
Vue.use(Element)
import '@/plugins/components.js' // 加载通用组件

import Router from './plugins/router'

// commit('UPDATE_BLOCK',['auth',pack.menuUrl,pack])
console.log(Router.client)
window.App = new Vue({
    router: Router.client,
    store: require('@/store/index').default,
}).$mount('#app')