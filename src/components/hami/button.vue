<style lang="scss">
    @import "./button.scss";
</style>
<template>
    <a class="Button" :class="[TypeStyle,SizeStyle,{'Button-circle':isCircle}]" :disabled="disabled" :href="href" v-waves="!disabled && !loading && waves">
        <button @click="Handle($event)" :type="nativeType" :disabled="disabled">
            <span class="Button-content">
                <span class="Button-icon" v-if="icon || loading">
                    <Icon v-if="icon && !loading" :name="icon" :size="IconSize"></Icon>
                    <Loading v-if="loading" :type="type" :size="IconSize" :weight="4.5" :color="TypeThemeColor"></Loading>
                </span>
                <span class="Button-slot">
                    <slot>
                        <!-- <span v-if="!icon">按钮</span> -->
                    </slot>
                </span>
            </span>
        </button>
    </a>
</template>

<script>
    export default {
        name : 'Button',
        data(){
            return {

            }
        },
        props : {
            type : {
                type : String,
                default : 'theme',
            },
            size : {
                type : String,
                default : 'normal'
            },
            loading : {
                type : Boolean,
                default : false,
            },
            disabled : {
                type : Boolean,
                default : false,
            },
            nativeType : {
                type : String,
                default : 'button', // button / submit / reset
            },
            href : {
                type : String,
            },
            icon : {
                type : String,
                default : '',
            },
            waves : {
                type : Boolean,
                default : true,
            },
            circle : {
                type : false,
            },
        },
        computed:{
            TypeStyle(){
                return `Button-${this.type}`
            },
            TypeTheme(){
                if(this.type === 'w' || this.type === 'white'){
                    return 'white'
                }
                return 'dark'
            },
            TypeThemeColor(){
                if(this.TypeTheme === 'white'){
                    return '#333'
                }
                if(this.TypeTheme === 'dark'){
                    return '#fff'
                }
                return ''
            },
            SizeStyle(){
                return `Button-${this.size}`
            },
            IconSize(){
                if(this.isCircle){
                    let sizeDir = {
                        big : '1.05',
                        small : '.85',
                        mini : '.8'
                    }
                    return sizeDir[this.size] ? sizeDir[this.size] : '.95'
                }
                return this.size === 'small' || this.size === 'mini' ? '.9' : '1'
            },
            isCircle(){
                return this.circle !== undefined
            },
        },
        methods: {
            Handle(e){
                if(!this.loading && !this.disabled){
                    this.$emit('click',e)
                }
            },
        },
        mounted(){
            
        },
    }
</script>