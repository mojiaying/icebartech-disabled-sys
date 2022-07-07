<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterStatis {
    
}
</style>
<template>
    <div class="CenterStatis o-pt-l">
        <div class="block o-plr-l">
            <div class="">数据统计</div>
        </div>
        <div class="block o-p-l o-mt" v-loading="Main.loading" style="min-height:3rem;">
            <div class="l-flex-c" v-if="Main.item" style="min-width:840px; max-width:1440px; flex-wrap:wrap;">
                <template v-for="(pack,unit) in Main.keys">
                    <li class="c-text-c o-p" style="flex:0 0 30%;">
                        <div class="u-b o-ptb-l" style="border-radius:4px;">
                            <p class="c-line-1 c-line-12 c-text-7 c-color-g">{{ pack.title }}</p>
                            <p class="c-line-1 c-line-18 c-text-11"><b>{{ Main.item[pack.name] ? Main.item[pack.name] : 0 }}</b></p>
                        </div>
                    </li>
                </template>
            </div>
        </div>        
    </div>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.js'
export default {
    name: 'CenterStatis',
    mixins: [StoreMix],
    data() {
        return {
            store: 'main/statis',
            Filter: {},
        }
    },
    computed: {

    },
    methods: {
        init(){
            this.reload()
        },
        reload(){
            this.Get()
        },
    },
    components: {

    },
    mounted(){
        this.init()
    },
}
</script>