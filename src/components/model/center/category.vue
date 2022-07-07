<style lang="scss">
    .mCenterCategory {

    }
</style>
<template>
    <el-dialog class="mCenterCategory" :title="Title" size="small" :visible.sync="view" top="10vh" :close-on-click-modal="false" :destroy-on-close="true">
        <el-form class="o-pt" ref="form" :rules="Rules" :model="Params" label-width="100px">
            <el-form-item label="类目名称" prop="categoryName">
                 <el-input placeholder="请输入类目名称" size="medium" v-model="Params.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="类目排序" prop="sort">
                <el-input placeholder="请输入类目排序" size="medium" v-model.number="Params.sort"></el-input>
            </el-form-item>
        </el-form>
        <el-row class="o-mt-h c-text-r" tag="div" :gutter="10">
            <el-col :span="12"><el-button type="info" @click="view=false" full>取消</el-button></el-col>
            <el-col :span="12"><el-button type="primary" @click="FormSubmit()" full>提交</el-button></el-col>
        </el-row>
    </el-dialog>
</template>

<script>
import StoreMix from '@/plugins/mixin/store.modul.js'
export default {
    name : 'mCenterCategory',
    mixins : [StoreMix],
    data(){
        return {
            store: 'main/category',
            Params: {},
            Rules: {
                categoryName: [ { required: true, message: '请输入类目名称', trigger: 'blur' } ],
                sort: [ { required: true, message: '请输入类目排序', trigger: 'blur' } ],
            },
        }
    },
    watch:{

    },
    computed:{

    },
    methods:{
        init(){
            
        },
    },
}
</script>
