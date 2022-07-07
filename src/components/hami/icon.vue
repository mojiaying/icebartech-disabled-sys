<style lang="scss">
    .Icon {
       vertical-align: middle;
       fill: currentColor;
       overflow: hidden;
    }
</style>
<template>
    <svg class="Icon" aria-hidden="true" v-if="name" :style="iconStyle" @click="Click($event)">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
    name : 'Icon',
    data(){
        return {

        }
    },
    computed:{
        iconName(){
            if(this.name){
                return `#icon-${this.name}`
            }
            return ''
        },
        iconStyle(){
            let size = this.size
            if(typeof size === 'number' || ( size.indexOf('px') < 0 && size.indexOf('rem') < 0 && size.indexOf('%') < 0) ){
                size = size + 'rem'
            }
            let width = this.width
            if(!width){
                width = this.size
            }
            if(typeof width === 'number' || ( width.indexOf('px') < 0 && width.indexOf('rem') < 0 && width.indexOf('%') < 0) ){
                width = width + 'rem'
            }
            return `width:${width}; height:${width};`
        },
    },
    props : {
        name : { 
            type : String,
        }, 
        size : {
            type : [String,Number],
            default : '1.2rem',
        },
    },
    methods: {
        Click(e){
            this.$emit('click',e)
        },
    }
}
</script>