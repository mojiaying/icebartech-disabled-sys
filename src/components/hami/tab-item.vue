<style lang="scss">
    .TabsItem {
        cursor:pointer; position:relative;
    }
</style>
<template>
    <li class="TabsItem" :class="{'active':$parent.value === label}" @click="Handle()">
        <slot></slot>
        <template v-if="IsEmpty($slots)">
            <span>{{ label }}</span>
        </template>
    </li>
</template>

<script>
    export default {
        name : 'TabsItem',
        data(){
            return {

            }
        },
        props : {
            label : {
                type : [Number,String,Boolean],
                default : undefined,
            },
            disabled  : {
                type : Boolean,
                default : false,
            },
        },
        computed:{
            
        },
        methods: {
            Handle(){
                if(!this.disabled &&this.$parent && this.$parent.Handle){
                    this.$parent.Handle(this.label)
                }                
            },
        },
        mounted(){
            this.$parent.TabRegister(this)
        },
    }
</script>