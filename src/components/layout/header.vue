<style lang="scss">
	@import "@/assets/style/project/config.scss";
	.LayoutHeader {
        $height:2.1rem;
		padding-top:.8rem; padding-bottom:.8rem; height:$height; line-height:$height;
        background-color:#FFF; border-bottom:1px solid #EEE;
        li {
            height:$height; line-height:$height;
        }
    }
</style>
<template>
    <header class="LayoutHeader">
    	<div class="layout l-flex-c">
            <li class="o-plr-h l-flex-1">欢迎进入宝安助残小程序<span v-if="this.$build == 'admin'">机构</span>管理平台！</li>
            <span v-if="$build === 'admin'" class="o-plr">{{ User.organName }}</span>
            <li class="o-pr-h">
                <el-dropdown placement="top-end">
                    <Avatar :src="User.avatarUrl" size="2.1rem"></Avatar>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="PasswordView()" :disabled="!User.id">重置密码</el-dropdown-item>
                        <el-dropdown-item @click.native="Logout()" :disabled="!User.id">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>                
            </li>
            <Password v-model="Password.view"></Password>
    	</div>
    </Header>
</template>

<script>
import Password from '@/components/model/password'
export default {
	name : 'LayoutHeader',
    data(){
        return {
            Password: {
                view:false,
            },
        }
    },
    computed: {

    },
    methods:{
        PasswordView(){
            if(this.User && this.User.id){
                this.Password.view = true
            }
        },
    },
    components: {
        Password,
    },
    mounted(){
        
    }
}
</script>