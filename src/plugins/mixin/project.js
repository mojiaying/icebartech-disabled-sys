import Vue from 'vue'
Vue.mixin({
    data(){
        return {

        }
    },
    computed: {
        Block(){
            return this.$store.state.base.block
        },
        User(){
            return this.Block.user
        },
    },
    methods : {        
        Login(type,trial){
            if(this.User && this.User.id){
                return Promise.resolve(this.User)
            }else{
                return this.Dp('base/BASE_USER',this.$build)
            }
        },
        Logout(){
            return this.$confirm('即将退出当前帐号, 是否继续?', '退出登录', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(confirm=>{
                return this.$store.dispatch('base/LOGOUT_USER',this.$build).then(res=>{
                    this.Token(null)
                    this.Go('login')
                    window.location.reload()
                    this.Suc('操作成功')
                    return res
                })
            },err=>{})
        },
        Confirm(callback = new Function, msg = '您确定要操作选定的数据么？', title = '操作数据', ) {
            return this.$confirm(msg, title, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                confirmButtonClass: 'pj-alert-confirm',
                cancelButtonClass: 'pj-alert-cancel',
                type: 'warning',
                center: true
            }).then(() => {
                callback()
            }).catch(() => {})
        },
        DelConfirm(callback = new Function, msg = '您确定要删除当前选定的数据么？', title = '删除数据', ) {
            return this.$confirm(msg, title, {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                confirmButtonClass: 'pj-alert-del',
                cancelButtonClass: 'pj-alert-cancel',
                type: 'error',
                center: true
            }).then(() => {
                callback()
            }).catch(() => {})
        },
    },
})