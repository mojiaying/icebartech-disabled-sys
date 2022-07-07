<style lang="scss">
    .FormItem {
        width:100%;
        .title {
            margin-top:.2rem; line-height:1.6rem;
        }
        .explain {
            vertical-align:middle; color:#999; padding-left:2px;
        }
        .el-input, .el-select {
            width:100%;
        }
    }
</style>
<template>
    <div class="FormItem" ref="form-item">
        <p class="title c-text-7">
            <el-badge>
                <span>{{ title }}</span>
            </el-badge>
            <span class="explain c-color-g c-text-6" v-if="explain">{{ explain }}</span>
        </p>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name : 'FormItem',
    data() {
        return {
            editor : null,
        };
    },
    props:{
        title : {
            String : true,
            default : '',
        },
        explain : {
            String : true,
            default : '',
        },
    },
    methods: {

    },
    mounted(){

    },
}
</script>
