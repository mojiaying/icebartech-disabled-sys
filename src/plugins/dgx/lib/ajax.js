import Vue from 'vue'
import { deepCopy, isObject, isArray } from '../helper.js'

    // 带有焦点属性
    // 传参 ：query or [query,dataBase]
    // query :
    //  undefined or null 重置焦点
    //  {key:val} 检索第一个匹配的字段
    //  -1 0 x 查找指定索引（-1代表最后一个索引）
    // 焦点变化 mutations 方法

export default function(options,ajax){
    
    let store = options.store.toUpperCase()

    options.actions[`${store}_AJAX`] = ({ state, dispatch, commit },config={})=> {

        let model = config.model || 'common'

        // 检测是否重复，如果重复则取消之前相同的方法
        if(config.only){
            //console.warn('dgx 请求重复，自动取消前一个请求。',config)
            commit(`${store}_AJAX_CANCEL`,{
                model   : config.model || 'common',
                only    : config.only,
            })
        }

        if(!config.headers){
            config.headers = {}
        }
        // 返回 ajax 方法
        return new Promise((resolve, reject)=>{
            ajax({
                getCancel : (id,cancel) => {
                    commit(`${store}_ADD`,{
                        base : config.model || 'common',
                        key :'ajax',
                        value : {
                            id      : id,
                            model   : config.model || 'common',
                            only    : config.only || null,
                            method  : config._method,
                            cancel  : cancel,
                            silence : config.silence ? true : false,
                        },
                    })
                    commit(`${store}_AJAX_UPDATE`)
                },
                ...config,
            }).then( res=> {
                // if(config.responseType === 'arraybuffer'){
                //     console.log('arraybuffer',res)
                // }
                if(res && res.data.page == 1 && res.data.list && res.data.list.length === 0){
                    commit(`${store}_UPDATE`,{
                        base  : config.model || 'common',
                        key   : 'empty',
                        value : true,
                    })   
                }
                commit(`${store}_UPDATE`,{
                    base  : config.model || 'common',
                    key   : 'init',
                    value : true,
                })
                commit(`${store}_UPDATE`,{
                    base  : config.model || 'common',
                    key   : 'error',
                    value : false,
                })        
                dispatch(`${store}_AJAX_FINISH`,{
                    id    : res.config.id,
                    model : config.model || 'common'
                })
                resolve(res.data)
            },err=>{
                //console.log(err)
                if(err && err.config && err.config.id){
                    dispatch(`${store}_AJAX_FINISH`,{
                        id    : err.config.id,
                        model : config.model || 'common'
                    })
                }
                commit(`${store}_UPDATE`,{
                    base  : config.model || 'common',
                    key   : 'error',
                    value : true
                })
                reject(err.data)
            })
        })
    }

    // Ajax 结束请求
    options.actions[`${store}_AJAX_FINISH`] = ({ state, dispatch, commit },config={})=> {
        let options = Object.assign({
            id       : 0,
        }, isObject(config) ? config : {id:config})
        // 查询符合条件的 ajax 请求
        finish:
        for(let m of state.models){
            for(let i=0; i<state[m].ajax.length; i++){
                if(state[m].ajax[i].id==options.id){
                    commit(`${store}_REMOVE`,{index:i,base:m,key:'ajax'}) 
                    //state[m]._ajax.splice(i,1)
                    break finish
                }
            }
        }
        commit(`${store}_AJAX_UPDATE`)
    }

    // Ajax 取消请求
    options.mutations[`${store}_AJAX_CANCEL`] = (state,config={})=> {
        let options = Object.assign({
            model     : undefined,
            only      : undefined,
            id        : undefined,
        },config)

        // 计算需要查询的 models
        let models = options.model ? options.model : state.models
        if(typeof models != 'object'){
            models = [models]
        }
        //
        finish:
        for(let m of models){
            //console.log(112,m,state)
            for(let i=0;i<state[m].ajax.length;i++){                
                // 当存在 only 条件时且不满足 only 条件时候进行 break 操作
                if(options.only !== undefined && options.only != state[m].ajax[i].only){
                    break
                }
                // 当存在 id 条件时且不满足 id 条件时候进行 break 操作
                if(options.id !== undefined && options.id != state[m].ajax[i].id){
                    break
                }

                // 剩余为满足取消条件
                state[m].ajax[i].cancel()
                state[m].ajax.splice(i,1)
                break finish
            }
        }
    }

    // Ajax 数据更新
    options.mutations[`${store}_AJAX_UPDATE`] = (state)=> {
        let models = state.models
        state.ajax = []
        for(let i=0;i<models.length;i++){
            // 每个模块的请求队列长度
            let length = state[models[i]].ajax.length
            // 每个模块的请求列表
            state.ajax.push(...state[models[i]].ajax)
            // 每个模块是否在请求中
            let total = {
                loading : 0,
                editing : 0,
            }            
            for(let req of state[models[i]].ajax){
                if(req.method){
                    if(req.method.toUpperCase() === 'GET'){
                        total.loading++
                    }else if(req.method.toUpperCase() === 'POST' || req.method.toUpperCase() === 'PUT' || req.method.toUpperCase() === 'DELETE'){
                        total.editing++
                    }
                }
            }
            state[models[i]].loading = total.loading ? true : false
            state[models[i]].editing = total.editing ? true : false
            state.loading = state.ajax.length > 0 ? true : false
        }
    }
}
