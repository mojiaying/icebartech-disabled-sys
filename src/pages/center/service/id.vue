<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterBannerId {
    
}
</style>
<template>
    <div class="CenterBannerId o-ptb-l">
        <div class="block-n">
            <div class="o-p-l">
                <el-page-header @back="Rd($route.meta.rollback)" :content="Title"></el-page-header>
            </div>
        </div>
        <div class="block o-mt" v-loading="Main.loading">
            <el-form class="o-pt" ref="form" :rules="Rules" :model="Params" label-width="100px" style="width:100%;">
                <el-form-item label="封面图" prop="bannerKey">
                    <UploadImage v-model="Params.bannerKey" :preview="Params.bannerUrl" width="14.5rem" height="8rem"></UploadImage>
                    <p class="c-text-6 c-color-g">推荐尺寸：700px × 380px</p>
                </el-form-item>
                <el-form-item label="类目导航" prop="bannerLinkId">
                    <div class="l-flex-c">
                        <el-input :value="policyTitle" placeholder="请选择需要导航的政策" readonly style="width:200px;"></el-input>
                        <Button class="o-ml" size="small" @click="Edit()" plain>选择政策</Button>
                        <Button class="o-ml-s" type="danger" @click="Clean()" size="small" plain>清空选择</Button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <Button @click="FormSubmit()" long>提交</Button>
                    <Button @click="Rd($route.meta.rollback)" plain>取消</Button>
                </el-form-item>
            </el-form>
        </div>
        <Editer v-model="Editer.view" title="政策链接" :form="{}" @finish="finish"></Editer>
    </div>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.page.js'
import Editer from '@/components/model/center/banner'
export default {
    name: 'CenterBannerId',
    mixins: [StoreMix],
    data() {
        return {
            store: 'main/banner',
            Rules: {
                bannerKey: [ { required: true, message: '请上传轮播图封面', trigger: 'blur' } ],
                bannerLinkId: [ { required: true, message: '请选择类目导航', trigger: 'blur' } ],
            },
        }
    },
    computed: {
        policyTitle(){
            if(this.Params.policyDTO){
                return this.Params.policyDTO.title
            }
            return ''
        },
    },
    methods: {
        finish(e){
            this.Params.bannerLinkId = e.id
            this.$set(this.Params,'policyDTO',e)
        },
        Clean(){
            this.Params.bannerLinkId = undefined
            this.$set(this.Params,'policyDTO',undefined)
        },
    },
    components: {
        Editer,
    },
    mounted(){

    },
    created() {

    },
}
</script>