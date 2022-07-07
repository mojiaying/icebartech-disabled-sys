<style lang="scss">
@import "@/assets/style/project/config.scss";
.Index {
     width:100%; height:100%; position:absolute; top:0; left:0; right:0; bottom:0; overflow:auto; background-color:#fff;
    .center {
        width:100%; max-width:1180px; min-width:640px; padding-left:.8rem; padding-right:.8rem; margin:0 auto; box-sizing:border-box; position:relative;
    }
    // 右侧主体
    .main{
        flex:1; height:100%; position:relative; background-color:#eff0f0;
        // 主体核心
        .frame {
            flex:1; padding:0 1.4rem .7rem 1.4rem; position:relative; overflow:auto;
            section {
                height:100%; box-sizing:border-box;
                .block, .block-table, .block-n {
                    min-width:768px;
                    width:100%; box-sizing:border-box; background:#fff; box-sizing:border-box; border-radius:.25rem;                    
                }
                .block, .block-table {
                    padding:.7rem;
                }
                .block-table {
                    padding:0; border-radius:0;
                    table.table {
                        tr {
                            td:first-child {
                                padding-left:1rem;
                            }
                            td:last-child {
                                padding-right:1rem;
                            }
                        }
                        thead {
                            tr {
                                background-color:#e5e5e5; border-top:1px solid #e0e0e0; border-bottom:1px solid #e0e0e0; color:#858585;
                            }
                        }
                    }
                }
                .layout-fixed {
                    position:absolute; top:0; left:0; right:0; bottom:0; overflow:auto;
                }
                &.full {
                    overflow:visible; height:100%; position:relative; display:flex; flex-flow:column; box-sizing:border-box;
                    aside {
                        height:100%;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="Index l-flex">
        <Navigation></Navigation>
        <div class="main l-flex-v">
            <Header></Header>
            <div class="frame">
                <router-view></router-view>
            </div>       
        </div>
    </div>
</template>
<script>
import Navigation from '@/components/layout/navigation'
import Header from '@/components/layout/header'
export default {
    name: 'Index',
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {
        init(){
            this.Login().then(res=>{
                if(!res){
                    this.Rd('login')
                }
            })
        },
        LoadIcon(){
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = this.Config.icon.common
            document.getElementsByTagName('body')[0].appendChild(script)
        },
    },
    components: {
        Navigation, Header,
    },
    created() {
        this.LoadIcon() // 异步加载图标字体
        if(this.$build == 'index'){
            this.Rd('dictionary')
        }else{
            this.init()
        }
    },
}
</script>