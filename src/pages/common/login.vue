<style lang="scss">
@import "@/assets/style/project/config.scss";
.Login {
    position:fixed; top:0; left:0; right:0; bottom:0; background-color:#F5F5F5;
    display:flex; flex-direction:column; justify-content:center; align-items:center;
    .core {
        width:320px; padding-bottom:10vh;
    }
    .form {
        background-color:#FFF; border-radius:6px; box-shadow:1px 2px 16px 1px rgba(0,0,0,.08);
    }
}
</style>
<template>
    <div class="Login">
        <div class="core">
            <div class="form" v-if="mode == 'login'">
                <div class="o-p-b">
                    <div>
                        <p class="c-text-65 c-line-14">用户名</p>
                        <el-input placeholder="请输入用户名" maxlength="32" v-model="Params.username" @keyup.13.native="submit()" clearable></el-input>
                    </div>
                    <div class="o-mt">
                        <p class="c-text-65 c-line-14">密码</p>
                        <el-input type="password" placeholder="请输入密码" maxlength="32" v-model="Params.password" @keyup.13.native="submit()"></el-input>
                    </div>
                    <div style="margin-top: 10px;">
                        <el-checkbox v-model="checked">记住密码</el-checkbox>
                    </div>
                    <div class="o-mt-l">
                        <Button size="big" @click="submit()" :loading="Main.editing" full>登录</Button>
                    </div>
                </div>
            </div>
            <div class="o-pt-l o-pb-h c-text-c c-color-g">{{ systemName }}</div>
        </div>
    </div>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.js'
 import CryptoJS from 'crypto-js' //加密js
export default {
    name: 'Login',
    mixins: [StoreMix],
    data() {
        return {
            checked:false,
            store: 'base/sign',
            mode: 'login',
            Params: {
                username: '',
                password: '',
                code: '',
            },
        }
    },
    computed: {
        systemName(){
            let name = '残联'
            if(this.$build == 'center'){
                name += '后台'
            }
            if(this.$build == 'admin'){
                name += '机构后台'
            }
            return `${name}管理系统 v${this.Config.version}`
        },
    },
    watch: {
        mode(val){
            this.reset()
        },
    },
    methods: {


       //读取cookie
            getCookie() {
                // debugger
                if (document.cookie.length > 0) {
                    // debugger
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //这里会切割出以mobile为第0项的数组、以password为第0项的数组，判断查找相对应的值
                        if (arr2[0] == 'username') {
                            this.Params.username = arr2[1]; //拿到账号
                             console.log(arr2[1])
                             if(this.Params.username){
                                this.checked = true;
                             }
                        } else if (arr2[0] == 'password') {
                            //拿到拿到加密后的密码arr2[1]并解密
                            var bytes = CryptoJS.AES.decrypt(arr2[1].toString(), 'secret key 123');
                            var plaintext = bytes.toString(CryptoJS.enc.Utf8); //拿到解密后的密码（登录时输入的密码）
                            this.Params.password = plaintext;
                        }
                    }
                }
            },
            //清除cookie
            clearCookie() {
                this.setCookie("", "", 0); //账号密码置空，天数置0
            },
            //设置cookie方法
            setCookie(username, password, days) {
                var text = CryptoJS.AES.encrypt(password, 'secret key 123');//使用CryptoJS方法加密
                var saveDays = new Date(); //获取时间
                saveDays.setTime(saveDays.getTime() + 24 * 60 * 60 * 1000 * days); //保存的天数
                //字符串拼接存入cookie
                window.document.cookie = "username" + "=" + username + ";path=/;saveDays=" + saveDays.toGMTString();
                window.document.cookie = "password" + "=" + text + ";path=/;saveDays=" + saveDays.toGMTString();
            },



        init(){
            this.reset()
            this.getCookie()
            
        },
        reset(){
            this.DataReset('Params')
        },
        submit(){
            let data = this.Origin(this.Params)
            const self = this;
            this.Dp("base/LOGIN_USER",{ ...data, build: this.$build }).then(res=>{
                if(!res.err){
                    
                    if (self.checked == true) {
                            //传入账号，密码，保存天数
                        self.setCookie(self.Params.username, self.Params.password, 7);
                    } else {
                        //清空Cookie
                        self.clearCookie();
                    }
                    this.Suc('登录成功')
                    this.Rd(this.$build)
                }
            })
        }
    },
    mounted(){
        this.init()
    },
    beforeRouteEnter(to, from, next) {
        next(vm=>{
            // 如果入口页是登录页，且检测到有 token 则自动登陆并返回首页
            if(!from.name){
                let token = vm.Token()
                if(token){
                    vm.Rd(vm.$build)
                }
            }
        })
    },
}
</script>