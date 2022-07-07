<style lang="scss">
@import "@/assets/style/project/config.scss";
.Admin {
    height:100%; min-width:780px; box-sizing:border-box;
}
</style>
<template>
    <div class="Admin">
        <transition v-if="$build === 'admin'" name="fade" mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'Admin',
    data() {
        return {
            Filter: {},
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
}
</script>