<style lang="scss">
@import "@/assets/style/project/config.scss";
.Center {
    height:100%; min-width:780px; box-sizing:border-box;
}
</style>
<template>
    <div class="Center">        
        <transition v-if="$build === 'center'" name="fade" mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>       
    </div>
</template>
<script>
export default {
    name: 'Center',
    data() {
        return {

        }
    },
    watch: {

    },
    computed: {

    },
    methods: {

    },
    
   
    created(){
        if(this.$build === 'center'){
            this.Dp('base/AUTH_USER')
        }
        // this.$router.beforeEach((to, from, next) => {
        //     let splitIndev = to.name.slice(7,).indexOf('/')
        //     let auth = false
        //     for(let item in this.Block.auth){
        //         if(to.meta.auth==item){
        //             auth=true
        //             next()
        //         }
        //     }
        //     if(!auth){
        //         this.$message.warning('该用户无此菜单权限')
        //     }
        // })
    },
}
</script>