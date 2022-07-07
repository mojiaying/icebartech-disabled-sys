<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterConditionId {
    .sub-item {
        padding:8px 16px; margin-right:.6rem; margin-bottom:.6rem; border:1px solid #CCC; border-radius:4px; position:relative;
        .remove-btn {
            position:absolute; top:-.5rem; right:-.5rem;
        }
    }
}
</style>
<template>
    <div class="CenterConditionId o-pt-l">
        <div class="block-n">
            <div class="o-p-l">
                <el-page-header @back="Rd($route.meta.rollback)" :content="Title"></el-page-header>
            </div>
        </div>
        <div class="block o-mt">
            <el-form class="o-pt" ref="form" :rules="Rules" :model="Params" label-width="100px" style="width:100%;">
                <el-form-item label="所属划分" prop="conditionDivide" style="width:100%; max-width:460px;">
                    <el-select v-model="Params.conditionDivide" placeholder="请选择所属划分">
                        <el-option v-for="item in Main.divides" :key="item.name" :label="item.title" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="筛选条件" prop="conditionOf" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.conditionOf" placeholder="" clearable></el-input>
                </el-form-item>
                <el-form-item label="条件名称" prop="conditionSaveParamsList">
                    <div>
                        <a v-for="(item,index) in Params.conditionSaveParamsList" :key="index" class="sub-item">
                            <span>{{ item.conditionName }}</span>
                            <Icon class="remove-btn c-color-e" name="roundclosefill" size=".9" @click="removeSub(item,index)"></Icon>
                        </a>
                        <!-- <el-tag v-for="(item,index) in Params.conditionSaveParamsList" :key="index" style="margin-right:5px; margin-bottom:4px;" @close="removeSub(item,index)" closable>{{ item.conditionName }}</el-tag> -->
                    </div>
                    <div>
                        <Button v-if="!sub.view" size="small" @click="ViewSub()" plain>新增一项</Button>
                        <el-input v-if="sub.view" v-model="sub.name" size="small" placeholder="请输入名称" clearable style="width:6rem;"></el-input>                        
                        <Button v-if="sub.view" class="o-ml" size="small" @click="AddSub()" plain>确认</Button>
                        <Button v-if="sub.view" class="o-ml" size="small" type="warning" @click="ViewSub()" plain>取消</button>
                    </div>                    
                </el-form-item>
                <el-form-item label="排序值" prop="sort" style="width:100%; max-width:460px;">
                    <el-input v-model.number="Params.sort" placeholder="请输入排序值" clearable></el-input>
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
    name: 'CenterConditionId',
    mixins: [StoreMix],
    data() {
        var conditionSaveParamsListCheck = (rule, value, callback) => {
            if(!value || !value.length) {
                return callback(new Error('请添加条件名称'))
            }else{
                callback()
            }
        }
        return {
            store: 'main/condition',
            Params: {
                conditionDeleteIdList: [],
                conditionSaveParamsList: [],
            },
            Filter: {},
            sub: {
                view: false,
                name: '',
            },
            Rules: {
                conditionDivide: { required: true, message: '请选择所属划分', trigger: 'blur' },
                conditionOf: { required: true, message: '请输入筛选条件', trigger: 'blur' },
                conditionSaveParamsList: {  required: true, validator: conditionSaveParamsListCheck, trigger: 'blur' },
                sort: { required: true, message: '请输入排序值', trigger: 'blur' },
            },
        }
    },
    computed: {
        Condition(){
            return this.$store.state['main'].condition_sub
        },
    },
    methods: {
        pageInit(){
            if(this.Params.id){
                if(this.Params.conditionList && this.Params.conditionList.length > 0){
                    for(let item of this.Params.conditionList){
                        this.Params.conditionSaveParamsList.push(this.Origin(item))
                    }
                }
            }
        },
        ViewSub(){
            this.sub.view = !this.sub.view
            this.sub.name = ''
        },
        AddSub(){
            if(this.sub.name){
                for(let item of this.Params.conditionSaveParamsList){
                    if(item.conditionName == this.sub.name){
                        return this.Err('条件名称重复')
                    }
                }
                let conditionOfId = this.Params.id ? this.Params.id : undefined
                this.Params.conditionSaveParamsList.push({ conditionName:this.sub.name, conditionOfId, sort:0 })
                this.ViewSub()
            }else{
                return this.Err('请输入条件名称')
            }
        },
        removeSub(item,index){
            this.DelConfirm(()=>{
                if(item.id){
                    this.Params.conditionDeleteIdList.push(item.id)
                }
                this.Params.conditionSaveParamsList.splice(index,1)
            },`是否删除 ${item.conditionName} 标签？`,'标签删除')
        },
    },
    components: {

    },
    mounted(){

    },
    created() {

    },
}
</script>