import Config from './config.js'

import Big from 'big.js'
Big.prototype.toNumber = function(){
    return Number(this)
}

export default {

    Big(opt) {
        // 浮点计算： 加-add  减-sub  乘-mul  除-div  四舍五入-round(位数，模式)
        return new Big(opt)
    },

    Extend(old,...obj){
        return Object.assign(old,...obj)
    },
    Origin(obj){
        try{
            return JSON.parse(JSON.stringify(obj))
        }catch(err){
            console.err('Fun-Origin 错误的对象格式',obj)
            return obj
        }            
    },
    Token(token){
        let key = window.App && window.App.$build ? `token_${window.App.$build}` : 'token'
        if(token === undefined) {
            return this.Cache(key)
        } else if (token === null) {
            return this.Cache(key, null)
        } else if (token) {
            return this.Cache(key, token)
        }
    },
    // 缓存
    Cache(key,val,time){
        if(key){
            if(val===undefined && time===undefined){
                return this.CacheGet(key)
            }else if( val===null || time===0 ){
                return this.CacheClean(key)
            }else{
                return this.CacheSet(key,val,time)
            }
        }
    },
    CacheGet(key){
        if(window.localStorage){
            var cache = window.localStorage[key];
            var cachetime = parseInt(window.localStorage.getItem('cache_life_'+key));
            var timestamp = new Date().getTime();
            if(cachetime == 0 || cachetime > timestamp){
                try{
                    return JSON.parse(window.localStorage[key]);  
                }catch(err){
                    return window.localStorage[key];  
                }
            }else{
                this.CacheClean(key);
                return undefined;
            }
        }else{
            return null
        }
    },
    CacheSet(key,val,time){
        if(window.localStorage){
            var timestamp = time>0 && this.isInt(time) ? time * 1000 + new Date().getTime() : 0;
            window.localStorage.setItem('cache_life_'+key, timestamp);
            return window.localStorage[key] = JSON.stringify(val);
        }else{
            return null
        }
    },
    CacheClean(key){
        if(window.localStorage){
            window.localStorage.removeItem(key);
            window.localStorage.removeItem('cache_life_'+key);
            return undefined;
        }
    },
    CacheCleanAll(key){
        if(window.localStorage){
            window.localStorage.clean();
            return undefined;
        }
    },


    Time(data,format="yyyy-MM-dd hh:mm"){
        return this.UnTimestamp(data,format)
    },
    Timestamp(date){
        let time = date ? new Date(date) : new Date()
        return Date.parse(time) / 1000
    },
    UnTimestamp(time=new Date(),format="yyyy-MM-dd hh:mm:ss") {
        if(typeof time === 'string' || typeof time === 'number'){
            if(time % 1 === 0 && time < 10000000000){
                time = new Date(time*1000)
            }else{
                time = new Date(time)
            }
        }
        if(time===null || time === '0000-00-00 00:00:00' || time==''){
            time = new Date(0)
        }
        let date = {
           "M+" : time.getMonth() + 1,
           "d+" : time.getDate(),
           "h+" : time.getHours(),
           "m+" : time.getMinutes(),
           "s+" : time.getSeconds(),
           "q+" : Math.floor((time.getMonth() + 3) / 3),
           "S+" : time.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (let k in date) {
           if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
           }
        }
        return format
    },


    //
    // 调试
    //
    Log(...obj){
        console.log('\n',...obj,'\n')
    },

    // 填充 0
    PrefixZero(num, n) {
        return (Array(n).join(0) + num).slice(-n)
    },
}