<style lang="scss">
    .mPassword {

    }
</style>
<template>
    <el-dialog class="mPassword" title="修改密码" size="small" :visible.sync="view" top="10vh" :close-on-click-modal="false" :destroy-on-close="true">
        <FormItem title="旧密码">
            <el-input type="password" placeholder="请输入旧密码" size="medium" v-model="Params.oldPWD"></el-input>
        </FormItem>
        <FormItem title="新密码">
            <el-input type="password" placeholder="请输入新密码" size="medium" v-model="Params.newPWD"></el-input>
        </FormItem>
        <FormItem title="确认密码">
            <el-input type="password" placeholder="请重复确认密码" size="medium" v-model="Params.confirmNewPWD"></el-input>
        </FormItem>
        <el-row class="o-mt-h c-text-r" tag="div" :gutter="10">
            <el-col :span="12"><el-button type="info" @click="view=false" full>取消</el-button></el-col>
            <el-col :span="12"><el-button type="primary" @click="Submit()" full>提交</el-button></el-col>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
import StoreMix from '@/plugins/mixin/store.modul.js'
export default {
    name : 'mPassword',
    mixins : [StoreMix],
    data(){
        return {
            view: false,
            Params : {
                oldPWD: null,
                newPWD: null,
                confirmNewPWD: null,
                loading: false,
            },
        }
    },
    watch:{
        value(val){
            if(val){
                this.view = true
                this.init()
            }
        },
        view(val){
            if(!val){
                this.$emit('input',false)
            }
        },
    },
    methods:{
        init(){
            this.DataReset('Params')
        },
        Submit(){
            if(!this.Params.oldPWD) return this.Err('请输入旧密码')
            if(!this.Params.newPWD) return this.Err('请输入新密码')
            if(!this.Params.confirmNewPWD) return this.Err('请输重复输入密码')
            if(this.Params.newPWD != this.Params.confirmNewPWD) return this.Err('两次密码不相同')
            
            let key = 'base/CHANGE_PASSWORD'
            let data = this.Origin(this.Params)
            this.Params.loading = true

            // 机构账号修改密码
            if(this.$build == 'admin'){
                key = "base/CHANGE_PASSWORD_ADMIN"
                data.id = this.User.id
                data.organPwd = btoa(data.oldPWD)
                data.organPwd1 = btoa(data.newPWD)
                data.organPwd2 = btoa(data.confirmNewPWD)
            }

            this.Dp(key,data).then(res=>{
                if(!res.err){
                    this.Suc('操作成功，请重新登录')
                    this.Rd('login')
                    this.view = false
                }
                this.init()
            })
        },
    },
}
</script>
