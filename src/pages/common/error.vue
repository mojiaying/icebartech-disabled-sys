<style lang="scss">
@import "@/assets/style/project/config.scss";
.Error {
    position:fixed; top:0; left:0; right:0; bottom:0;
    display:flex; flex-direction:column; justify-content:center; align-items:center;
    .core {
        padding-bottom:15vh;
        .title {
            font-size:2.6rem; color:#666;
        }
        .explain {
            font-size:.8rem; color:#999;
        }
        .tips {
            font-size:.85rem;
        }
    }
}
</style>
<template>
    <div class="Error">
        <div class="core c-text-c">
            <h2 class="title o-ptb"><b>404</b></h2>
            <p class="explain c-line-12">not found.</p>
            <p class="tips c-line-14">当前页面未找到</p>
            <Button class="o-mt" @click="Rd('index')">返回首页</Button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Error',
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {

    },
    components: {

    },
    mounted(){

    },
    created() {

    },
}
</script>