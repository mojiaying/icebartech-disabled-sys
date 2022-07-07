<style lang="scss">
    .Divider {
        a{
            background-color:#ccc;
        }
    }
</style>
<template>
    <el-divider class="Divider" :direction="direction" :content-position="contentPosition">123</el-divider>
</template>

<script>
    export default {
        name : 'Divider',
        data(){
            return {

            }
        },
        props : {
            direction : { 
                type : String,
                default : 'vertical',
            },
            contentPosition : {
                type : String,
                default : 'center',
            },
        },
    }
</script>