<style lang="scss">
    .Link {

    }
</style>
<template>
    <component class="Link" :is="mode" :to="to" :href="href" :target="target" :download="download" :replace="replace" @click.native="Handle($event)">
        <slot></slot>
    </component >
</template>

<script>
    export default {
        name : 'Link',
        data(){
            return {

            }
        },
        props : {
            to : {
                type : [Object,String],
            },
            replace : {
                type : Boolean,
                default : false,
            },
            href : {
                type : String,
            },
            download : {
                type : String,
            },
            target : {                
                type : String,
                // default : '_self', // _blank _parent _self _top
            },
        },
        computed:{
            mode(){
                if(this.to){
                    if(true){
                        return 'n-link'
                    }
                    return 'router-link'
                }
                if(this.href){
                    return 'a'
                }
                return 'span'
            },
        },
        methods: {
            Handle(e){
                this.$emit('click',e)
            },
        },
        mounted(){
            
        },
    }
</script>