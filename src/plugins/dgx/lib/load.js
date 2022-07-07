import Vue from 'vue'
import { deepCopy, isObject, isArray } from '../helper.js'


export default function(options,model){
    
    let store = options.store.toUpperCase()
    let MODEL = model.toUpperCase()

    options.actions[`LOAD_${MODEL}`] = ({state, dispatch, commit},data)=>{
        let main = state[model]
        if( !main.error ){
            if(!main.init && !main.loading){
                return Promise.resolve(
                    dispatch(`GET_${MODEL}`,data)
                )
            }else{
                return Promise.resolve({code:1})
            }
        }else{
            return Promise.resolve({code:0})
        }
    }

    options.actions[`MORE_${MODEL}`] = ({state, dispatch, commit},data={})=>{
        let main = state[model]
        if( !main.error && !main.loading){               
                if(!data || !data.params){
                    data = {params:{}}
                }
                if(data.refresh){
                    data.params.page = 1
                }else{
                    data.params.page = state[model].page
                }
                //data.params.size = 8
                return Promise.resolve(
                    dispatch(`GET_${MODEL}`,data)
                )

        }else{
            return Promise.resolve({code:0})
        }
    }
}
