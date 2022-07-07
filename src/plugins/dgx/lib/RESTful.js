import Vue from 'vue'
import { deepCopy, isObject, isArray } from '../helper.js'

    // 带有焦点属性
    // 传参 ：query or [query,dataBase]
    // query :
    //  undefined or null 重置焦点
    //  {key:val} 检索第一个匹配的字段
    //  -1 0 x 查找指定索引（-1代表最后一个索引）
    // 焦点变化 mutations 方法

export default function(options,model){
    
    let store = options.store.toUpperCase()
    let MODEL = model.toUpperCase()
    let paths = options.state[model].paths
    if(paths){        
        for(let _method of ['GET','POST','PUT','DELETE']){

            let path = paths
            let method = _method
            let row = null
            let row_method = method
            if(typeof paths === 'object'){
                if(paths[_method]){
                    if(paths[_method].url || paths[_method].row){
                        path = paths[_method].url
                        if(paths[_method].method){
                            method = paths[_method].method
                        }
                        if(paths[_method].row){
                            row = paths[_method].row
                            if(paths[_method].row_method){
                                row_method = paths[_method].row_method
                            }
                        }
                    }else if(typeof paths[_method] === 'string'){
                        path = paths[_method]
                    }else{
                        break
                    }
                }else{
                    break
                }
            }

            options.actions[`${_method}_${MODEL}`] = ({ state, dispatch, commit },data={})=> {

                let url = path
                let tmethod = method
                if(data.parent || data.id){
                    if(row){
                        url = row.replace(new RegExp('{id}','g'),`${data.id}`).replace(new RegExp('{parent}','g'),`${data.parent}`)
                        tmethod = row_method
                    }
                }
                let page = 1
                // 奇葩条件：条件筛选参数要放在 BODY 内，后端无法返回当前是第几页
                if(_method === 'GET' && tmethod != 'GET' && data.params){
                    let params = JSON.parse(JSON.stringify(data.params))
                    for(let key in params){
                        let value = params[key]
                        if(value != undefined && value != null){
                            if(typeof data.data != 'object'){
                                data.data = {}
                            }
                            data.data[key] = params[key]
                            if(key == 'pageIndex'){
                                page = params[key]
                            }
                        }
                    }
                }

                // 奇葩条件：IDS 参数要拼接到 URL 后面
                // if(method === 'POST' || method === 'PUT'){
                //     if(data.data && data.data.ids){
                //         if(url.substr(url.length-1,1) != '/'){
                //             url += '/'
                //         }
                //         url += data.data.ids
                //     }
                // }
                
                return dispatch(`${store}_AJAX`,{
                    method  : tmethod,
                    _method : _method,
                    url     : url,
                    data    : data.data || {},
                    params  : data.params,
                    model   : model,
                    only    : data.only !== undefined ? data.only : ( tmethod === 'GET'),
                    silence : data.silence ? true : false
                }).then( res=> {
                    if(res.data){
                        switch(_method){
                            case 'GET':                                
                                commit(`${store}_UPDATE`,{base:model,key:'filter',value:data.params?data.params:{}})
                                // 如果有 id 
                                if(data.id || res.data.id || res.data.sn){
                                    commit(`${store}_UPDATE`,{base:model,key:'item',value:res.data && res.data.bussData ? res.data.bussData : res.data})
                                    commit(`${store}_UPDATE`,{base:model,key:'id',value:data.id})
                                }else if(res.data && res.data.bussData && Array.isArray(res.data.bussData)){
                                    commit(`${store}_UPDATE`,{base:model,key:'list',value:res.data.bussData || res})
                                    commit(`${store}_UPDATE`,{base:model,key:'page',value:page})
                                    commit(`${store}_UPDATE`,{base:model,key:'total',value:res.data.pageCount})
                                    commit(`${store}_UPDATE`,{base:model,key:'empty',value:page==1 && !res.data.bussData.length ? true : false})
                                }else{
                                    commit(`${store}_UPDATE`,{base:model,key:'list',value:res.data && res.data.bussData ? res.data.bussData : res.data})
                                    commit(`${store}_UPDATE`,{base:model,key:'item',value:res.data && res.data.bussData ? res.data.bussData : res.data})
                                }
                                commit(`${store}_UPDATE`,{base:model,key:'update',value:Date.now()})                                
                                break;
                            case 'POST':

                                break;
                            case 'PUT':

                                break;
                            case 'DELETE':

                                break;
                        }
                    }
                    if(data.active || data.active == 0){
                        dispatch(`ACTIVE_${MODEL}`,data.active)
                    }
                    return res
                })
            }
        }
    }
}
