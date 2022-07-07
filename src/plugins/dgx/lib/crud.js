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
    //let MODEL = model.toUpperCase()
    
    // 数据添加
    options.mutations[`${store}_ADD`] = ( state, { base, key, position, value } )=> {
        //console.log(`${store}_ADD`,{ base, key, position, value })
    　  try {
            switch(options.position){
                case 0:
                    eval(`state.${base}.${key}.unshift(value)`)
                    break;
                case -1:
                    eval(`state.${base}.${key}.push(value)`)
                    break;
                default:                    
                    eval(`state.${base}.${key}.splice(position,0,value)`)
                break;
            }
    　　}catch(error) {
            console.info(`dgx error`,error)
    　　}
    }


    //
    // 数据更新
    // 
    options.mutations[`${store}_UPDATE`] = (state, { base, key, value, id, sn, extend, } )=> {
    　  try {
            if(id || sn){
                let list = eval(`state.${base}.${key}`)
                for(let i=0; i<list.length; i++){
                    if(list[i].id == id || list[i].sn == id){
                        if(extend){
                            Object.assign(state[base][key][i],value)
                        }else{
                            eval(`state.${base}.${key}.splice(i,1,value)`)
                        }
                        break;
                    }
                }
            }else{
                if(extend){
                    Object.assign(state[base][key][i],value)
                }else{
                    eval(`state.${base}.${key} = value`)
                }
            }
    　　} catch(error) {
            console.info(`dgx error`,error)
    　　}　
    }
    options.mutations[`ROW_ADD`] = (state,{model,data,position,relation})=> {
    　  try{
            switch(options.position){
                case 0:
                    state[model].list.unshift(data)
                    break;
                case -1:
                    state[model].list.push(data)
                    break;
                default:
                    state[model].list.splice(position,0,data)
                break;
            }
    　　}catch(error) {
            console.info(`dgx error`,error)
    　　}
    }
    options.mutations[`ROW_UPDATE`] = (state,{model,data,relation})=> {
    　  try {
            if(data.id || data.sn){
                for(let item of state[model].list){
                    if(relation && item[relation]){
                        for(let sub of item[relation]){
                            if((sub.id && sub.id === data.id) || (sub.sn && sub.sn === data.sn)){
                                Object.assign(sub,data)
                            }
                        }
                    }else if((item.id && item.id === data.id) || (item.sn && item.sn === data.sn)){
                        Object.assign(item,data)
                    }
                }
                if(state[model].item && !relation){
                    let item = state[model].item
                    if((item.id && item.id === data.id) || (item.sn && item.sn === data.sn)){
                         Object.assign(item,data)
                    }
                }
            }
    　　}catch(error) {
            console.info(`dgx error`,error)
    　　}　
    }
    //
    // 数据库
    // 
    // options.mutations[`${store}_DB`] = (state, { base, value, refresh, } )=> {
    // 　  try {
    //         if(value){
    //             if(refresh){
    //                 Vue.set(state[base],'db',{
    //                     list : [],
    //                     pages : {},
    //                     length:0,
    //                 })
    //             }
    //             let page = state[base].page
    //             if(!state[base].db.pages[page]){
    //                 state[base].db.pages[page] = []
    //             }
    //             for(let item of value){
    //                 let index = item.id || item.sn
    //                 if(!state[base].db[index]){
    //                     state[base].db.pages[page].push(index)
    //                     state[base].db.list.push(item)
    //                     Vue.set(state[base].db,'length',state[base].db.length + 1)
    //                 }
    //                 Vue.set(state[base].db,index,item)
    //             }
    //         }           
    // 　　} catch(error) {
    //         console.info(`dgx error`,error)
    // 　　}　
    // }

    //
    //  数据移除
    //    
    options.mutations[`${store}_REMOVE`] = ( state, { base, key, id, index } )=> {
        if(id){
            let list = eval(`state.${base}`)[key]
            for(let i=0; i<list.length; i++){
                if(list[i].id == id){
                    eval(`state.${base}`)[key].splice( i, 1)
                    break;
                }
            }
        }else if(index || index == 0){
            eval(`state.${base}`)[key].splice(index,1)
        }else{
            delete eval(`state.${base}`)[key]
        }
    }


    //
    //  数据清空
    //  
    options.mutations[`CLEAN`] = (state,{base,key})=> {
        Vue.set(state[base],key,new Array)
    }


    //
    //  重置模块
    //  
    options.mutations[`RESET`] = (state,model="")=> {
        if(model && state[model] && state[model].reset){
            let reset = deepCopy(state[model].reset)
            state[model] = deepCopy(reset)
            state[model].reset = deepCopy(reset)
        }
    }
}
