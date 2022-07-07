import Vue from 'vue'
import Config from '@/plugins/config.js'

import Ajax from '@/plugins/ajax'

import Big from 'big.js'
Big.prototype.toNumber = function(){
    return Number(this)
}
import Helper from '@/plugins/helper.js'

let data = {
    data(){
        return {
            Config,
        }
    },
    computed: {

    },
    methods : {


        Ajax,

        // 浮点计算： 加-add  减-sub  乘-mul  除-div  四舍五入-round(位数，模式)
        // 例子 (5 + 6) / 5 :  new Big(5).add(6).div(5).toNumber() 
        Big: Helper.Big,

        // 路由跳转
        Go(name,params={}){
            this.$router.push({name,params})
        },
        Rd(name,params={}) {
            this.$router.replace({name,params})
            // this.$router.replace({name,params})
        },
        Back(){
            this.$router.go(-1);
        },
        
        // VUEX 语法糖
        Dp(name,data){
            return this.$store.dispatch(name,data)
        },
        Cm(name,data){
            return this.$store.commit(name,data)
        },  

        // 弹窗
        Toast(message,type='error',duration=2000) {
            if(this.$message){
                return this.$message({message,type,duration})
            }
            return null            
        },      
        Notify(title,message,type="success",duration=2000){
            if(this.$notify){
                return this.$notify({title,message,type,duration})
            }
            return null             
        },
        Suc(message='',title='操作成功',duration=2000){
            return this.Notify(title,message,"success",duration)
        },
        Err(message='',title='操作失败',duration=2000){
            return this.Notify(title,message,"error",duration)
        },
        Wrong(message=''){
            this.Toast(message,'error',1500)
        },
        Warn(message=''){
            this.Toast(message,'warning',1500)
        },

        Extend: Helper.Extend,
        Origin: Helper.Origin,
        DataReset(key='Params') {
            if(this.$data[key]){
                return this.$set(this.$data,key,this.$options.data()[key])
            }
            return console.error('Fun-DataReset 错误的 key',key)
        },
        Token: Helper.Token,


        Cache: Helper.Cache,
        CacheGet: Helper.CacheGet,
        CacheSet: Helper.CacheSet,
        CacheClean: Helper.CacheClean,
        CacheCleanAll: Helper.CacheCleanAll,

        // 时间格式化
        Time: Helper.Time,
        Timestamp: Helper.Timestamp,
        UnTimestamp: Helper.UnTimestamp,


        Is(type="object",data) {
            if (typeof type !== 'string') {
                data = type
            }
            switch (type) {
                case 'int':
                    return typeof data === 'number' && data % 1 === 0;
                    break;
                case 'stringint':
                    return parseInt(data) == data
                    break;
                case 'object':
                    return (data && typeof data === 'object' && !isArray(data));
                    break;
                case 'array':
                    return Array.isArray(data);
                    break;
                case 'empty':
                    if (data == null) return true;
                    if (data.length > 0) return false;
                    if (data.length === 0) return true;
                    for (var key in data) {
                        if (Object.prototype.hasOwnProperty.call(data, key)) return false;
                    }
                    return true;
                case 'login':
                    if (this.Token()) {
                        return this.$store.state.base.login.info
                    }
                    return false
                default:
                    return false;
            }
        },
        IsEmpty(obj){
            return this.Is('empty',obj)
        },

        ArrayToObject(arr,key){
            let obj = {}
            if(Array.isArray(arr) && arr.length){
                arr.forEach((item,index)=>{
                    obj[item[key] ? item[key] : index] = this.Origin(item)
                })
            }
            return obj
        },

        // 输出备注
        Log(...obj){
            if(process.env.NODE_ENV === 'development' && process.client){
                console.log('\n',...obj,'\n')
            }
        },

        // 将数字转换为可以显示的格式
        Price(num,{float=2,mode=0,force=false,separate=3,format='string',unit=''}={}){
            try {
                if(!num && num != 0){
                    return ''
                }
                if(typeof mode === 'string'){
                    let floatdir = {
                        down : 0,
                        half_up : 1,
                        half_even : 2,
                        up : 3,
                    }
                    mode = floatdir[mode] ? floatdir[mode] : 0
                }
                if(num == 0){
                    num = 0
                }
                if(unit){
                    let divisor = 1
                    let units = ['个','十','百','千','万','十万','百万','千万','亿']
                    units.forEach((item,index)=>{
                        if(unit === item){
                            divisor = Math.pow(10,index)
                        }
                    })
                    num = this.Big(num).div(divisor).toNumber()
                }
                let origin = this.Big(num).round(float,mode).toNumber() + ''
                let ints = origin.split('.')[0].split('').reverse()
                let floats = origin.split('.')[1] ? origin.split('.')[1].split('') : []
                if(separate){
                    if(typeof separate !== 'number'){
                        separate = 3
                    }
                    let intr = []
                    let count = 0
                    while(ints.length){
                        count++
                        intr.push(ints.shift())
                        if(count === 3 && ints.length){
                            intr.push(',')
                            count = 0
                        }
                    }
                    ints = intr.reverse()
                }else{
                    ints = ints.reverse()
                }
                if(float && force){
                    while(floats.length < float){
                        floats.push('0')
                    }
                }
                if(format === 'string'){
                    let price = floats.length ? `${ints.join('')}.${floats.join('')}` : ints.join('')
                    if(unit){
                        price = price + unit
                    }
                    return price
                }
                if(format === 'array'){
                    let price = [ints.join(''),floats.join('')]
                    if(unit){
                        price.push(unit)
                    }
                    return price
                }
            }catch(err){
                console.log('Price : error num')
                return num
            }
        },

        // 生成随机数
        Uuid(len,radix=10,opt={}) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var uuid = [], i;
            radix = radix || chars.length;
            if (len) {
                for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
            } else {
                var r;
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }

            return uuid.join('');
        },

        // 保存 Buffer 文件（仅支持谷歌、火狐浏览器内核）
        SaveBufferFile(buffer,name,type='excel'){
            if(!name){
                name = this.Time(null,'yyyy-MM-dd hh:mm:ss')
            }
            let types = {
                //excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
                excel: 'application/vnd.ms-excel;charset=UTF-8',
                word: 'application/msword',
                pdf: 'application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
            }
            let task = document.createElement("a")
            task.href = URL.createObjectURL(new Blob([buffer],{
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
            }))
            task.setAttribute("download",name)
            document.body.appendChild(task)
            task.click()
        },
    },
}
Vue.mixin(data)