<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterUtensilId {
    
}
</style>
<template>
    <div class="CenterUtensilId o-pt-l">
        <div class="block-n">
            <div class="o-p-l">
                <el-page-header @back="Rd($route.meta.rollback)" :content="Title"></el-page-header>
            </div>
        </div>
        <div class="block o-mt" v-loading="Main.loading">
            <el-form class="o-pt" ref="form" :rules="Rules" :model="Params" label-width="100px">
                <el-form-item label="封面图" prop="coverKey">
                    <UploadImage v-model="Params.coverKey" :preview="Params.coverUrl" width="9rem" height="6rem"></UploadImage>
                    <p class="c-text-6 c-color-g">推荐尺寸：520px × 400px</p>
                </el-form-item>
                <el-form-item label="详情图" prop="imagesKey">
                    <UploadImage v-model="Params.imagesKey" :preview="Params.imagesUrlList" :maxSize="25" width="8rem" height="5rem" accepts="image,video" :max="9"></UploadImage>
                    <p class="c-text-6 c-color-g">推荐尺寸：750px × 468px（可上传 mp4 视频，最大不超过 25 M）</p>
                </el-form-item>
                <el-form-item label="残疾条件" prop="disabilityOf" style="width:100%; max-width:460px;">
                    <el-select v-model="disability" multiple placeholder="请选择残疾条件" style="width:100%;">
                        <el-option v-for="(item,index) in Condition.list" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="辅具名称" prop="deviceName" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.deviceName" placeholder="请输入辅具名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="辅具分类" prop="deviceClassify" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.deviceClassify" placeholder="请输入辅具分类" clearable></el-input>
                </el-form-item>
                <el-form-item label="品牌" prop="brand" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.brand" placeholder="请输入品牌" clearable></el-input>
                </el-form-item>
                <el-form-item label="型号" prop="model" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.model" placeholder="请输入型号" clearable></el-input>
                </el-form-item>
                <el-form-item label="最低年限" prop="lowestUseTerm" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.lowestUseTerm" placeholder="请输入最低使用年限（年）" clearable></el-input>
                </el-form-item>
                <el-form-item label="适应范围" prop="useScope" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.useScope" type="textarea" placeholder="请输入适应范围" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="详情" prop="details" style="width:100%; max-width:640px;">
                    <Editor v-model="Params.details" style="height:400px;"></Editor>
                </el-form-item>
                <el-form-item>
                    <Button @click="FormSubmit()" long>提交</Button>
                    <Button @click="Rd($route.meta.rollback)" plain>取消</Button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.page.js'
export default {
    name: 'CenterUtensilId',
    mixins: [StoreMix],
    data() {
        return {
            store: 'main/utensil', forceReload:true,
            Filter: {},
            Rules: {
                coverKey: [ { required: true, message: '请上传辅具封面图', trigger: 'blur' } ],
                imagesKey: [ { required: true, message: '请上传辅具详情图', trigger: 'blur' } ],
                disabilityOf: [ { required: true, message: '请选择残疾条件', trigger: 'blur' } ],
                deviceName: [ { required: true, message: '请输入辅具名称', trigger: 'blur' } ],
                deviceClassify: [ { required: true, message: '请输入辅具分类', trigger: 'blur' } ],
                brand: [ { required: true, message: '请输入辅具品牌', trigger: 'blur' } ],
                model: [ { required: true, message: '请输入辅具型号', trigger: 'blur' } ],
                lowestUseTerm: [ { required: true, message: '请输入辅具最低使用年限', trigger: 'blur' } ],
                useScope: [ { required: true, message: '请输入辅具适应范围', trigger: 'blur' } ],
                details: [ { required: true, message: '请输入辅具详情', trigger: 'blur' } ],
            },
            forceReload: true,
        }
    },
    computed: {
        Condition(){
            return this.$store.state['main'].utensil_condition
        },
        disability: {
            get: function(){
                if(this.Params && this.Params.disabilityOf){
                    return this.Params.disabilityOf.split(',')
                }
                return []
            },
            set: function(val){
                this.$set(this.Params,'disabilityOf',val ? val.join(',') : '')
            },
        },
    },
    methods: {
        init(){
            this.GetInit('utensil_condition')
        },
        reload(){
            //this.Get()
        },
    },
    components: {

    },
    mounted(){
        this.init()
    },
}
</script>