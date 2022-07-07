<style lang="scss">
@import "@/assets/style/project/config.scss";
.Dictionary {
    width:100%; height:100%; position:fixed; top:0; left:0; right:0; bottom:0; z-index:1;
    background-color:#FFF;
    .link {
        padding:.6rem; margin:.4rem auto;
        .index {
            width:1.7rem; height:1.7rem; line-height:1.7rem; background-color:#EEE; color:#666; font-size:.85rem; font-weight:bold; border-radius:99px; text-align:center;
        }
        .content {
            padding-left:.8rem; transition:color,padding .2s,.5s;
        }
        &:hover {
            .content {
                color:$color-t; padding-left:1.2rem;
            }
        }
    }
}
</style>
<template>
    <div class="Dictionary">
        <div style="width:100%; max-width:540px; min-height:380px; margin:0 auto; padding-top:150px; padding-top:10vh;">
            <div class="o-plr">
                <a v-for="(item,index) in projects" class="link l-flex-c" :href="'/' + item.name + '.html'">
                    <div class="index">{{ index + 1 }}</div>
                    <div class="l-flex-1 content">
                        <div class="title c-line-1 c-line-10 c-text-8">{{ item.title }}</div>
                        <div class="c-line-1 c-line-10 c-text-75">/{{ item.name }}.html</div>
                    </div>
                    <Icon name="right" size=".9" style="color:#C5C5C5;"></Icon>
                </a>
            </div>
        </div>        
    </div>
</template>
<script>
export default {
    name: 'Dictionary',
    data() {
        return {
            projects: [
                { name: 'center', title: '平台管理系统' },
                { name: 'admin', title: '机构管理系统' },
            ]
        }
    },
    computed: {

    },
    methods: {
        init(){

        },
    },
    components: {

    },
    mounted(){

    },
    created() {        
        this.init()
    },
}
</script>