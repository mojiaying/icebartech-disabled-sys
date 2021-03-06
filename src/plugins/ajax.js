import Vue from 'vue'
import axios from 'axios'
import config from '@/plugins/config.js'
import Helper from '@/plugins/helper.js'

var CancelToken = axios.CancelToken

const ajax = axios.create({
    baseURL :'/api/',
    timeout : 500000,
    // withCredentials: true,
    // 转换为 from-data 格式
    // transformRequest: [function (data) {
    //     let ret = ''
    //     for (let it in data) {
    //       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //     }
    //     return ret
    // }],
})


// 添加请求拦截器
ajax.interceptors.request.use( config=> {
    if(!config.data){
        config.data = {}
    }
    let token = Helper.Token()
    if(token){
        config.headers['sessionId'] = token
    }
    return config
}, error=> {
    console.warn('请求拦截器：请求错误',error)
    return Promise.reject(error);
})

// 添加响应拦截器
ajax.interceptors.response.use(res=>{
    if(res && res.status == 200){
        res.data.err = res.data.code == 200 ? 0 : res.data.code
        if(res.data.err && !res.config.trial){
            switch(res.data.err){
                case 401:
                    Helper.Token(null)
                    Helper.Cache('BASE_USER',null)
                    window.App.Toast('请重新登录')
                    window.App.Rd('login')
                    break;
                default:
                    if(!res.config.silence){
                        try{
                            window.App.Err(res.data.data.errMsg)
                        }catch(err){
                            window.App.Err('数据访问失败')
                        }
                        
                    }
            }
        }else{
            return res
        }        
    }
    console.warn(res,'响应拦截器：服务端错误');
    return Promise.reject(res)
}, error=> {
    console.warn('响应拦截器：本地网络错误，或服务器无响应',error)
    return Promise.reject({
        data : {
            err  : 500,
            data : null,
            msg  : `${error.name ? error.name + ':' : ''}${error.message}`
        }
    })
})

var count = 0
export default function(config={}){

    // 计数器
    count ++
    
    // 取消令牌
    let cancel
    let cancelToken = new CancelToken( fun=> {
        cancel = fun
        if(config.getCancel){
            config.getCancel(count,cancel)
        }
    })
    // 返回封装后的 ajax 对象
    return ajax({
        validateStatus : status=> {
            return status >= 200 && status < 600
        },
        id:count,
        cancelToken,
        cancel,
        ...config
    })
}