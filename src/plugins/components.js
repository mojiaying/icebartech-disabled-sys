import Vue from 'vue'

// 分页控件
import Pagination from '@/components/hami/pagination.vue'
Vue.component('Pagination',Pagination)

import FormItem from '@/components/hami/form-item.vue'
Vue.component('FormItem',FormItem)

import Icon from '@/components/hami/icon.vue'
Vue.component('Icon',Icon)

import UploadImage from '@/components/upload-image.vue'
Vue.component('UploadImage',UploadImage)

import Upload from '@/components/upload.vue'
Vue.component('Upload',Upload)

import Avatar from '@/components/hami/avatar.vue'
Vue.component('Avatar',Avatar)

import Button from '@/components/hami/button.vue'
Vue.component('Button',Button)

import Loading from '@/components/hami/loading.vue'
Vue.component('Loading',Loading)

import Divider from '@/components/hami/divider.vue'
Vue.component('Divider',Divider)


Vue.component('Editor',function(resolve){
	require(['@/components/editor.vue'], resolve)
})


import waves from '@/plugins/directive/waves.js'
Vue.directive('waves',waves)

