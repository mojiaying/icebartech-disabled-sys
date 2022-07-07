<style lang="scss">
    .Image {
        display:inline-block; position:relative;
        .placeholder {
            width:100%; height:100%;
            position:absolute; top:0; left:0; right:0; bottom:0; z-index:0;
        }
        &.Image-fill {
            img {object-fit:fill;}
        }
    }
</style>
<template>
    <a class="Image" :class="[FitStyle,LayoutStyle]">
        <img :src="Img(src)" :alt="alt">
        <div class="placeholder">
            <slot></slot>
        </div>
    </a>
</template>

<script>
export default {
    name : 'Image2',
    data(){
        return {

        }
    },
    props : {
        src : {
            type : String,
            default : '',
        },
        fit : {
            type : String,
            default : 'normal',
        },
        alt : {
            type : String,
        },
        lazy : {
            type : Boolean,
            default : false,
        },
        width : {
            default : '10rem'
        },
        height : {
            default : '7rem'
        },
        size : {
            type : String,
            default : 'normal'
        },
    },
    computed:{
        FitStyle(){
            return `Image-${this.fit}`
        },
        LayoutStyle(){
            return `width:${this.width};height:${this.height};`
        },
    },
    methods: {
        Handle(e){

        }
    },
    mounted(){
        
    },
}
</script>