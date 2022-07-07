<style lang="scss">
    @import "./input.scss";
    .Input {

    }
</style>
<template>
    <div class="Input">
        <div class="l-flex-c">
            <template v-if="title">
                <div>{{ title }}</div>
                <Divider></Divider>
            </template>
            <el-input v-model="Value" :placeholder="placeholder"></el-input>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'Input',
        data(){
            return {
                Value : null,
            }
        },
        props : {
            value : { 
                type : [Number,String],
                default : undefined,
            },
            placeholder : {
                type : String,
                default : '请输入',
            },
            size : {

            },
            title : {
                type : String,
                default : null,
            }
        },
        watch : {
            Value(val){
                this.$emit('input',val)
            },
        },
        computed:{

        },
        methods: {
            // Handle(label){
            //     if(!this.disabled){
            //         this.$emit('input',label)
            //     }                
            // },
            // TabRegister(tab){
            //     this.$set(this.child,tab._uid,{
            //         id : tab._uid,
            //         width : tab.$el.clientWidth,
            //         left : tab.$el.offsetLeft,
            //         label : tab.label,
            //     })
            // },
        },
        mounted(){
            this.$data.Value = this.value
        },
    }
</script>