import Vue from 'vue'
import axios from 'axios'

import { deepCopy, isObject, isArray } from '@/plugins/dgx/helper.js'

import fnAttr    from './lib/attr'
import fnActive  from './lib/active'
import fnLoad  from './lib/load'
import fnRESTful from './lib/RESTful'

import fnAjax    from './lib/ajax'
import fnCrud    from './lib/crud'

const CancelToken = axios.CancelToken

export default (config={},ajax,num)=>{
    let options = Object.assign({
        state     : {},
        actions   : {},
        mutations : {},
        getters   : {},
    },config)
    let store = options.store.toUpperCase()
    // 赋值全局变量
    options.state.ajax = []
    options.state.models = []
    options.state.loading = false
    options.state.common = {
        ajax: [],
        options : {},
    }
    // 遍历所有 state 查找 dgx 模块并创建方法
    for(let model in options.state){
        if(isObject(options.state[model]) && options.state[model].paths){
            options.state.ajax[model] = 0
            options.state.models.push(model)
            fnAttr(options,model)
            fnActive(options,model)
            fnLoad(options,model)
            options.state[model].reset = deepCopy(options.state[model])
            fnRESTful(options,model)
        }
    }
    // 发起请求 ${store}_AJAX`
    // 结束请求 ${store}_AJAX_FINISH
    // 取消请求 ${store}_AJAX_CANCEL
    // 数据更新 ${store}_AJAX_UPDATE
    fnAjax(options,ajax);
    
    // 数据添加 ${store}_ADD
    // 数据更新 ${store}_UPDATE
    // 数据移除 ${store}_REMOVE
    // 数据清空 ${store}_CLEAN
    // 重置模块 ${store}_RESET
    fnCrud(options);

    return {
        namespaced: true,
        ...options
    }
}
