<style lang="scss">
    @import "./tab.scss";
</style>
<template>
    <nav class="Tabs c-text-n" :class="[TabTypeStyle]" :style="TabStyle" ref="tabs">
        <div class="TabsCore" style="z-index:3; position:relative;">
            <slot></slot>
        </div>
        <a class="active-block" :style="TabActiveBarStyle">
            <span class="active-bar"></span>
        </a>
        <div class="bottom-bar"></div>
    </nav>
</template>

<script>
    export default {
        name : 'Tabs',
        data(){
            return {
                child : {},
            }
        },
        props : {
            value : { 
                type : [Number,String,Boolean],
                default : undefined,
            },
            type : {
                type : String,
                default : undefined,
            },
            size : {
                type : String,
            },
            disabled  : {
                type : Boolean,
                default : false,
            },
            align : {
                type: String,
                default : 'left'
            },
        },
        watch : {
            // align(){

            // },
        },
        computed:{
            TabsWidthList(){
                let list = []
                for(let id in this.child){
                    list.push(this.child[id].width)
                }
                return list
            },
            TabActive(){
                let label = this.value
                for(let id in this.child){
                    if(this.child[id].label === label){
                        return this.child[id]
                    }
                }
                return undefined
            },
            TabActiveBarStyle(){
                let target = this.TabActive
                let tabs = this.$refs.tabs           
                if(target){                    
                    let deviation = 0
                    return `width:${target.width}px; transform:translateX(${target.left}px);`
                }
                return ''
            },
            // 主体类型
            TabType(){
                let dir = ['default','card','slider']
                let active = dir.indexOf(this.type)
                return active > -1 ? dir[active] : 'default'
            },
            // 主体类型样式
            TabTypeStyle(){
                return `Tabs-${this.TabType} Tabs-${this.size}`
            },
            TabStyle(){
                return `justify-content:${this.align};`
            },
        },
        methods: {
            Handle(label){
                if(!this.disabled){
                    this.$emit('input',label)                    
                    this.$emit('change',label)
                }                
            },
            TabRegister(tab){
                this.$set(this.child,tab._uid,{
                    id : tab._uid,
                    width : tab.$el.clientWidth,
                    left : tab.$el.offsetLeft,
                    label : tab.label,
                })
            },
        },
        mounted(){

        },
    }
</script>