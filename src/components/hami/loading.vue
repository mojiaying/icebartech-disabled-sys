<style lang="scss">
    @import "./loading.scss";
</style>
<template>
    <span class="Loading" :class="{'full':full}">
        <span class="core" :style="SizeStyle">
            <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" :style="ColorStyle" cx="50" cy="50" r="20" fill="none" :stroke-width="weight" stroke-miterlimit="10"/>
            </svg>
        </span>
    </span>
</template>

<script>
    export default {
        name : 'Loading',
        props : {        
            size : {
                default : 2,
            },
            weight : {
                default : 2.5,
            },
            full : {
                default : false,
            },
            color : {
                default : '#333',
            },
        },
        computed:{
            SizeStyle(){
                let size = this.size.toString()
                if(size.indexOf('px')>=0 || size.indexOf('pt')>=0 || size.indexOf('em')>=0 || size.indexOf('rem')>=0 || size.indexOf('vh')>=0 || size.indexOf('vw')>=0 || size.indexOf('%')>=0){
                    return `width:${size}; height:${size};`
                }
                return `width:${size}rem; height:${size}rem;`
            },
            ColorStyle(){
                if(this.color){
                    return `stroke:${this.color};`
                }
                return ''
            },
        },
    }
</script>