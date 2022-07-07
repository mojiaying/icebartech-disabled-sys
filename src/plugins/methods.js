import Ajax from './ajax'
import Config  from '~/plugins/config'
export default {
    Ajax,
    Token(token) {
        if (token === undefined) {
            return this.Cache('token')
        } else if (token === null) {
            return this.Cache('token', null)
        } else if (token) {
            return this.Cache('token', token)
        }
    },
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
            var cachetime = parseInt(window.localStorage.getItem(Config.prefix+'_cache_life_'+key));
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
            window.localStorage.setItem(Config.prefix+'_cache_life_'+key, timestamp);
            return window.localStorage[key] = JSON.stringify(val);
        }else{
            return null
        }
    },
    CacheClean(key){
        if(window.localStorage){
            window.localStorage.removeItem(key);
            window.localStorage.removeItem(Config.prefix+'_cache_life_'+key);
            return undefined;
        }
    },
    CacheCleanAll(key){
        if(window.localStorage){
            window.localStorage.clean();
            return undefined;
        }
    },
}