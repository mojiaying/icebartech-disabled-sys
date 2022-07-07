import dgx from '@/plugins/dgx/index.js'
import ajax from '@/plugins/ajax.js'
import Helper from '@/plugins/helper.js'
import Vue from 'vue'

const store = 'base';
const STORE = store.toUpperCase();

export default dgx({
    store,
    state: {
        sign: {
            paths: true,
        },
        block: {
            user: {}, // 用户
            auth: {},
            district: {},
        },
    },
    actions: {

        // 获取用户信息
        BASE_USER({ state, dispatch, commit },build){
            let cache = Helper.Cache(`BASE_USER:${build}`)
            if(cache){
                commit('UPDATE_BLOCK',['user',cache])
                return cache
            }else{
                commit('CLEAN_BLOCK')
                return null
            }
        },
        // 用户权限
        AUTH_USER({ state, dispatch, commit }){
            return dispatch(`${STORE}_AJAX`,{
                method  : 'GET',
                url     : `admin/menu/listByUser`,
            }).then(res=>{
                if(!res.err && res.data.bussData){
                    for(let pack of res.data.bussData){
                        commit('UPDATE_BLOCK',['auth',pack.menuUrl,pack])
                        if(pack.childMenus && pack.childMenus.length > 0){
                            for(let item of pack.childMenus){
                                commit('UPDATE_BLOCK',['auth',item.menuUrl,item])
                            }
                        }
                    }
                }
            })
        },
        // 用户登陆
        LOGIN_USER({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method  : 'POST',
                url     : data.build === 'center' ? `admin/user/login` : `admin/organ/user/login?policyAccount=${data.username}&policyPwd=${btoa(data.password)}`,
                model   : 'sign',
                data    : data.build === 'center' ?{
                    userName: btoa(data.username),
                    password: btoa(data.password),
                } : {
                    policyAccount: data.username,
                    policyPwd: btoa(data.password),
                },
                headers: {
                    'Content-Type' : 'application/json'
                    // 'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).then(res=>{
                if(!res.err){
                    commit('UPDATE_BLOCK',['user',res.data.bussData])
                    Helper.Token(res.data.bussData.sessionId)
                    Helper.Cache(`BASE_USER:${data.build}`,res.data.bussData)
                }
                return res
            },err=>{
                return err
            })
        },
        

        // 用户登出
        LOGOUT_USER({ state, dispatch, commit },build){
            let url = "admin/user/logout"
            if(build === 'admin'){
                url = "admin/organ/user/logout"
            }
            return dispatch(`${STORE}_AJAX`,{
                method  : 'POST',
                url     : `admin/user/logout`,
                model   : 'sign',
            }).then(res=>{
                if(!res.err){
                    commit('CLEAN_BLOCK')
                    Helper.Token(null)
                    Helper.Cache(`BASE_USER:${build}`,null)
                }
                return res
            },err=>{
                return err
            })
        },

        // 修改密码
        CHANGE_PASSWORD({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/user/updUserPWD`,
                model: 'sign',
                data,
            }).then(res=>{
                if(!res.err){
                    commit('CLEAN_BLOCK')
                    Helper.Token(null)
                    Helper.Cache('BASE_USER',null)
                }
                return res
            })
        },
        // 修改密码 (机构)
        CHANGE_PASSWORD_ADMIN({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/organ/user/updatePwd`,
                model: 'sign',
                data,
            }).then(res=>{
                if(!res.err){
                    commit('CLEAN_BLOCK')
                    Helper.Token(null)
                    Helper.Cache('BASE_USER',null)
                }
                return res
            })
        },

        // 图片上传
        UPLOAD_TOKEN({ state, dispatch, commit },{ suffix="disabled", type='image/*' }={}){
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `base/admin/getOSSUploadUrl/${suffix}?contentType=${type}`,
            })
        },
        DISABLED_TYPE({ state, dispatch, commit }){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `/admin/serve/list`,
            })
        },

        // 区域选择器列表
        INIT_DISTRICT({ state, dispatch, commit }){
            let cache = Helper.Cache('INIT_DISTRICT')
            if(cache){
                commit('UPDATE_BLOCK',['district','selector',cache])
                return cache
            }
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `base/admin/loadDictionary/province`,
            }).then(res=>{
                if(!res.err){                    
                    const deepFormat = function(target){
                        let arr = []
                        for(let item of target){
                            let obj = {
                                value: item.value,
                                label: item.value,
                                code: item.key,
                            }
                            if(item.childs && item.childs.length > 0){
                                obj.children = deepFormat(item.childs)
                            }
                            arr.push(obj)
                        }
                        return arr
                    }
                    let list = deepFormat(res.data.bussData)
                    Helper.Cache('INIT_DISTRICT',list)
                    commit('UPDATE_BLOCK',['district','selector',list])
                    return list
                }else{
                    return []
                }
            },err=>{
                return []
            })
        },
    },
    mutations : {
        // 更新 BLOCK 数据块
        UPDATE_BLOCK(state,data=[]){
            if(data[0]){
                let name = data[0]
                if(!state.block[name]){
                    Vue.set(state.block,name,{})
                }
                if(!data[1]){
                    Vue.set(state.block,name,{})
                }else if(typeof data[1] === 'string'){
                    Vue.set(state.block[name],data[1],data[2])
                }else if(typeof data[1] === 'object'){
                    for(let key in data[1]){
                        Vue.set(state.block[name],key,data[1][key])
                    }
                }
            }
        },
        // 块清理
        CLEAN_BLOCK(state,target){
            let Hander = (name)=>{
                Vue.set(state.block,name,{})
            }
            if(target){
                Hander(target)
            }else{
                for(let name of ['user','auth']){
                    Hander(name)
                }
            }
        },
        UPDATE(state,{key,val}){
            Vue.set(state,key,val)
        },
    },
},ajax)