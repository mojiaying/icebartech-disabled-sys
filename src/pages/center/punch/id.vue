<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterPolicyId {
    .color-picker {
        width:24px; height:24px; display:inline-block; position:relative; box-sizing:border-box; border-radius:50%; border-width:2px; border-style:solid;
        .color-picker-active {
            width:12px; height:12px; position:absolute; top:4px; left:4px; display:inline-block; border-radius:50%;
        }
    }
}
</style>
<template>
    <div class="CenterPolicyId o-pt-l">
        <div class="block-n">
            <div class="o-p-l">
                <el-page-header @back="Rd($route.meta.rollback)" :content="Title"></el-page-header>
            </div>
        </div>
        <div class="block o-mt">
            <el-form class="o-pt" ref="form" :rules="Rules" :model="Params" label-width="100px">
                <el-form-item label="封面图" prop="coverKey">
                    <UploadImage v-model="Params.coverKey" :preview="Params.coverUrl" width="13rem" height="10rem"></UploadImage>
                    <p class="c-text-6 c-color-g">推荐尺寸：520px × 400px</p>
                </el-form-item>
                <el-form-item label="详情图" prop="imagesKey">
                    <UploadImage v-model="Params.imagesKey" :preview="Params.imagesUrlList" width="8rem" height="5rem" :max="9"></UploadImage>
                    <p class="c-text-6 c-color-g">推荐尺寸：750px × 468px</p>
                </el-form-item>
                <el-form-item label="标题" prop="title" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.title" placeholder="请输入政策标题" clearable></el-input>
                </el-form-item>
                <el-form-item label="简述" prop="intro" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.intro" placeholder="请输入政策简述" clearable></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <ul>
                        <li v-for="(item,index) in labels.list" class="l-flex-c o-mb-s">
                            <el-input v-model="item.title" placeholder="请输入标签名称" maxlength="10" style="width:200px;"></el-input>
                            <a v-for="(sub,i) in labels.color" class="color-picker o-ml" :style="{borderColor:sub}" @click="item.color = sub">
                                <a v-show="sub == item.color" class="color-picker-active" :style="{backgroundColor:sub}"></a>
                            </a>
                            <Button @click="labelRemove(index)" class="o-ml-l" size="mini" type="danger" plain>移除标签</Button>
                        </li>
                        <div>
                            <Button size="small" plain :disabled="labels.list.length >= 5" @click="labelAdd()">新增一项标签</Button>
                        </div>
                    </ul>
                </el-form-item>
                <el-form-item label="申请链接" prop="applyUrl" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.applyUrl" placeholder="请输入申请链接" clearable></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.sort" placeholder="请输入排序" clearable></el-input>
                </el-form-item>
                <el-form-item label="详情" prop="details" style="width:100%; max-width:640px;">
                    <Editor v-model="Params.details" style="height:400px;"></Editor>
                </el-form-item>
                <el-form-item label="热门政策" style="width:100%; max-width:460px;">
                    <el-switch v-model="Params.isHot" active-color="rgb(64,158,255)" inactive-color="#cccccc" active-value="y" inactive-value="n"></el-switch>
                </el-form-item>
                <el-form-item label="筛选条件">
                    <el-select v-model="_conditionOf" multiple placeholder="请选择" style="width:100%; max-width:640px;">
                        <el-option v-for="(item,index) in condition.list" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <div v-if="Params.conditionIdIn && Params.conditionIdIn.length" class="o-ptb-s c-color-g c-text-6">请添加筛选条件子项:</div>
                    <div v-for="(pack,unit) in Params.conditionIdIn">
                        <div v-if="pack.conditionOfId && condition.map[pack.conditionOfId]" class="l-flex-c o-pb u-bl o-pl o-ml">
                            <p class="o-pr c-line-1" style="width:110px;">{{ condition.map[pack.conditionOfId].label }}</p>
                            <el-select v-if="condition.map[pack.conditionOfId].children" v-model="pack.conditionId" multiple placeholder="请选择" style="width:100%; max-width:500px;">
                                <el-option v-for="(item,index) in condition.map[pack.conditionOfId].children" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
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
    name: 'CenterPolicyId',
        mixins: [StoreMix],
    data() {
        return {
            store: 'main/policy', forceReload:true,
            Filter: {},
            Params: {
                conditionIdIn: [],
                baseIds: [],
                enjoyIds: [],
                labels: "[]",
                isHot: 'y'
            },
            Rules: {
                coverKey: [ { required: true, message: '请上传封面图', trigger: 'blur' } ],
                imagesKey: [ { required: true, message: '请上传详情图', trigger: 'blur' } ],
                title: [ { required: true, message: '请输入标题', trigger: 'blur' } ],
                intro: [ { required: true, message: '请输入简述', trigger: 'blur' }],                
                applyUrl: [ { required: true, message: '请输入申请链接', trigger: 'blur' } ],
                sort: [ { required: true, message: '请输入排序', trigger: 'blur' } ],
                details: [ { required: true, message: '请输入详情', trigger: 'blur' } ],
                categoryId: [ { required: true, message: '请选择类目', trigger: 'blur' } ],
            },
            context:'',
            labels: {
                view: false,
                color: ['#2FBC0E','#409EFF','#F56C6C','#E6A23C','#909399'],
                list: [],
            },
            condition: {
                value: [],
                list: [],
                map: {},
            },
        }
    },
    computed: {
        Category(){
            return this.$store.state['main'].category
        },
        _conditionOf: {
            get: function(){
                let list = []
                if(this.Params.conditionIdIn){
                    for(let item of this.Params.conditionIdIn){
                        list.push(item.conditionOfId)
                    }
                }
                return list
            },
            set: function(list){
                let origin = {}
                for(let item of this.Params.conditionIdIn){
                    let { conditionOfId, conditionId } = item
                    origin[conditionOfId] = this.Origin(conditionId)
                }
                this.$set(this.Params,'conditionIdIn',[])
                for(let id of list){
                    this.Params.conditionIdIn.push({
                        conditionOfId: Number(id),
                        conditionId: origin[id] ? origin[id] : []
                    })
                }                
            }
        },
        _condition: {
            get: function(){
                return [                    
                    this.Params.conditionOfId ? this.Params.conditionOfId : undefined,
                    this.Params.conditionId ? this.Params.conditionId : undefined,
                ]
            },
            set: function(val){
                this.$set(this.Params,'conditionOfId',val[0])
                this.$set(this.Params,'conditionId',val[1])
            }
        },
    },
    watch: {
        'labels.list': {
            handler: function(val,old){
                try{
                    this.$set(this.Params,'labels',JSON.stringify(val))
                }catch(err){
                    this.$set(this.Params,'labels',JSON.stringify([]))
                }
            },
            deep: true
        },
        'Params.conditionIdIn': {
            handler: function(val,old){
                this.conditionUpdate()
            },
            deep: true
        }
    },
    methods: {
        init(){            
            this.GetInit('main/category',{ pageSize:32 })
            this.GetInit('main/condition',{ pageSize:1000 }).then(res=>{
                this.conditionInit()
            })
            this.conditionInit()
        },
        pageInit(){
            try{
                this.$set(this.labels,'list',JSON.parse(this.Main.item.labels))
            }catch(err){
                this.$set(this.labels,'list',[])
            }
            this.conditionInit()
        },
        conditionInit(){
            let list = this.Origin(this.$store.state.main.condition.list)
            let work = []
            for(let pack of list){
                let packObj = {
                    value: pack.id,
                    label: pack.conditionOf,
                    conditionDivide: pack.conditionDivide,
                    key: { '基本信息': 'baseIds', '已享受扶持项目': 'enjoyIds' }[pack.conditionDivide],
                    children: [],
                }
                for(let item of pack.conditionList){
                    packObj.children.push({
                        value: item.id,
                        label: item.conditionName,
                    })
                }
                work.push(packObj)
                this.$set(this.condition.map,pack.id,packObj)
            }            
            this.$set(this.condition,'list',work)
            if(this.Params.conditionIdIn){
                for(let item of this.Params.conditionIdIn){
                    let data = this.Origin(item)
                    if(item.conditionOfId && typeof item.conditionOfId === 'string'){
                        this.$set(item,'conditionOfId',Number(data.conditionOfId))
                    }
                    if(item.conditionId && typeof item.conditionId === 'string'){
                        this.$set(item,'conditionId',JSON.parse(data.conditionId))
                    }
                }
            }
        },
        conditionUpdate(){            
            this.$set(this.Params,'baseIds',[])
            this.$set(this.Params,'enjoyIds',[])
            if(this.Params.conditionIdIn){
                this.Params.conditionIdIn.forEach((pack,index)=>{
                    let { conditionOfId: id, conditionId: child } = pack                    
                    if(this.condition.map && this.condition.map[id]){                        
                        let { key } = this.condition.map[id]
                        try {
                            for(let item of child){
                                this.Params[key].push(item)
                            }
                        }catch(e){

                        }
                    }else{
                        this.Params.conditionIdIn.splice(index,1)
                    }
                })
            }
        },
        labelAdd(){
            this.labels.list.push(this.Origin({ title:'', color:this.labels.color[0] }))
        },
        labelRemove(index){
            this.labels.list.splice(index,1)
        },
    },
    activated(){
         this.DataReset('labels')
    },
    mounted(){
        this.init()
    },
}
</script>