<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterPowerAccountId {
    
}
</style>
<template>
    <section class="CenterPowerAccountId o-pt-l">
        <div class="block-n">
            <div class="o-p-l">
                <el-page-header @back="Rd($route.meta.rollback)" :content="Title"></el-page-header>
            </div>
        </div>
        <div class="block o-mt">
            <el-form class="o-pt" ref="form" :model="Params" label-width="100px" style="width:100%; max-width:460px;">
                <el-form-item label="登录名">
                    <el-input v-model="Params.userName" placeholder="请输入登录名" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="Params.mobile" placeholder="请输入手机号" clearable></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="Params.roleId" placeholder="请选择角色">
                        <el-option v-for="item in Role.list" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="初始密码">
                    <el-input type="password" v-model="Params.password" placeholder="请输入初始密码" clearable></el-input>
                </el-form-item>
                <el-form-item label="重复密码">
                    <el-input type="password" v-model="Params.confirmPassword" placeholder="请重复输入密码" clearable></el-input>
                </el-form-item>                
                <el-form-item label="真实姓名">
                    <el-input v-model="Params.trueName" placeholder="请输入真实姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="用户头像">
                    <UploadImage v-model="Params.avatar" :preview="Params.avatarUrl" width="6rem" height="6rem"></UploadImage>
                </el-form-item>
                <el-form-item>
                    <Button @click="FormSubmit()" long>提交</Button>
                    <Button @click="Rd($route.meta.rollback)" plain>取消</Button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.page.js'
export default {
    name: 'CenterPowerAccountId',
    mixins: [StoreMix],
    data() {
        return {
            store: 'main/power_account',
            Filter: {},
            Params: {},
            Rules: {},
        }
    },
    computed: {
        Role(){
            return this.$store.state['main'].role
        },
    },
    methods: {
        init(){
            this.GetInit('role')
            this.reload()
        },
        reload(){

        },
    },
    components: {

    },
    mounted(){
        this.init()
    },
}
</script>