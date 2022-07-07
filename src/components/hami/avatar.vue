<style lang="scss">    
    @import "./avatar.scss";
</style>
<template>
    <a class="Avatar" :style="SizeStyle">
        <img :src="Resource">
        <div class="slot">
            <slot></slot>
        </div>
    </a>
</template>

<script>
    export default {
        name : 'Avatar',
        data(){
            return {
                next : null,
                page : 1,
            }
        },
        props : {
            src : { 

            },
            size : {
                default : '2.4rem'
            },
            scale : {
                default : '1',
            },
        },
        computed:{
            Resource(){
                if(this.src){
                    return this.src
                }
                return 'http://bpu.baojia-yjz.com/project/image/bo/base/avatar_light.jpg'
            },
            SizeStyle(){
                let size = this.size
                for(let item of ['px','em','rem','vw','vh','%']){
                    if(size.indexOf(item) > 0){
                        return `width:${size};height:${size};`
                    }
                }
                return `width:${size}rem;height:${size}rem;`
            },
        },
        methods: {

        }
    }
</script>