<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterInstitutionId {
    
}
</style>
<template>
    <div class="CenterInstitutionId o-pt-l">
        <div class="block-n">
            <div class="o-p-l">
                <el-page-header @back="Rd($route.meta.rollback)" content="查看机构"></el-page-header>
            </div>
        </div>
        <div class="block o-mt">
            <el-form class="o-pt" ref="form" :rules="Rules" :model="Params" label-width="100px">
                <el-form-item label="封面图" prop="coverKey">
                    <UploadImage :disabled=true v-model="Params.coverKey" :preview="Params.coverUrl" width="13rem" height="10rem"></UploadImage>
                    <p class="c-text-6 c-color-g">推荐尺寸：520px × 400px</p>
                </el-form-item>
                <el-form-item label="详情图" prop="imagesKey">
                    <UploadImage  :disabled=true type='query' v-model="Params.imagesKey" :preview="Params.imagesUrlList" width="8rem" height="5rem" :max="9"></UploadImage>
                    <p class="c-text-6 c-color-g">推荐尺寸：750px × 468px</p>
                </el-form-item>
                <el-form-item label="名称" prop="organName" style="width:100%; max-width:460px;">
                    <el-input disabled v-model="Params.organName" placeholder="请输入机构名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="简述" prop="intro" style="width:100%; max-width:460px;">
                    <el-input disabled v-model="Params.intro" placeholder="请输入简述" clearable></el-input>
                </el-form-item>
                <el-form-item label="经度" prop="longitude" style="width:100%; max-width:460px;">
                    <el-input disabled v-model="Params.longitude" placeholder="请输入经度" clearable></el-input>
                </el-form-item>
                <el-form-item label="纬度" prop="latitude" style="width:100%; max-width:460px;">
                    <el-input disabled v-model="Params.latitude" placeholder="请输入纬度" clearable></el-input>
                </el-form-item>
                <el-form-item label="地点名称" prop="altitudeName" style="width:100%; max-width:460px;">
                    <el-input disabled v-model="Params.altitudeName" placeholder="请输入地点名称" clearable></el-input>
                </el-form-item>                
                <el-form-item label="排序" prop="sort" style="width:100%; max-width:460px;">
                    <el-input disabled v-model="Params.sort" placeholder="请输入排序" clearable></el-input>
                </el-form-item>
                <el-form-item label="详情" prop="details" style="width:100%; max-width:640px;">
                     <Editor disabled v-model="Params.details" style="height:400px;"></Editor>
                </el-form-item>
                <el-form-item label="类目" prop="categoryId" style="width:100%; max-width:460px;">
                    <el-select disabled v-model="Params.categoryId" placeholder="请选择类目">
                        <el-option  v-for="item in Category.list" :key="item.id" :label="item.categoryName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="服务内容"  prop="serveIdsList">
                    <!-- <div class="o-pl" v-if="serviceContentList && serviceContentList.length > 0">
                     <el-select   multiple v-model="serveIdsList" placeholder="请选择服务内容">
                        <el-option v-for="item in serviceContentList" :key="item.id" :label="item.content" :value="item.id"></el-option>
                    </el-select> -->
                        <!-- <el-checkbox v-model="Params.serviceContenVal" @change="serviceContenItem()" v-for="store1 in serviceContentList"  :label="store1.name" :key="store1.id">{{store1.name}}</el-checkbox> -->
                    <!-- </div> -->

                    <el-checkbox-group v-model="serveIdsList">
                        <div class="o-pl">
                            <el-checkbox @change="serviceContentC" disabled v-for="(item,unit) in serviceContentList" :label="item.id" :key="item.id">{{item.content}}</el-checkbox>
                        </div>
                    </el-checkbox-group>

                </el-form-item>
                <el-form-item label="机构账号" prop="organAccount" style="width:100%; max-width:460px;" >
                    <el-input v-model="Params.organAccount" placeholder="请输入机构账号" :disabled="!!Params.id"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="organPwd" style="width:100%; max-width:460px;">
                    
                    <el-input v-model="Params.organPwd" placeholder="请输入登录密码" clearable></el-input>
                </el-form-item>
                <el-form-item  prop="status" label="状态"  style="width:100%; max-width:460px;">
                    <el-radio disabled  v-model="Params.status" label="n">启用</el-radio>
                    <el-radio  disabled v-model="Params.status" label="y">停用</el-radio>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.page.js'
export default {
    name: 'CenterInstitutionId',
    mixins: [StoreMix],
    data() {
        return {
            store: 'main/institution', forceReload:true,
            Filter: {},
            serviceContentVal:"",
            serviceContentList:[],
            Rules: {
                coverKey: [ { required: true, message: '请上传机构封面图', trigger: 'blur' } ],
                imagesKey: [ { required: true, message: '请上传机构详情图', trigger: 'blur' } ],
                organName: [ { required: true, message: '请输入机构名称', trigger: 'blur' } ],
                intro: [ { required: true, message: '请输入机构简述', trigger: 'blur' } ],
                longitude: [ { required: true, message: '请输入机构经度', trigger: 'blur' } ], // { float: true, min: 0, max: 180, message: '经度范围在 0 - 180 之间', trigger: 'blur' }
                latitude: [ { required: true, message: '请输入机构纬度', trigger: 'blur' } ], // { float: true, min: 0, max: 90, message: '纬度范围在 0 - 90 之间', trigger: 'blur' }
                altitudeName: [ { required: true, message: '请输入地点名称', trigger: 'blur' } ],
                sort: [ { required: true, message: '请输入机构排序', trigger: 'blur' } ],
                details: [ { required: true, message: '请输入机构详情', trigger: 'blur' } ],
                categoryId: [ { required: true, message: '请选择机构类目', trigger: 'blur' } ],
                organAccount: [ { required: true, message: '请输入机构登录账号', trigger: 'blur' } ],
                // serviceContenVal: [ { required: true, message: '请勾选服务内容', trigger: 'blur' } ],
                 serveIdsList: [ { required: true, message: '请勾选服务内容', trigger: 'blur' } ],
                status: [ { required: true, message: '请选择状态', trigger: 'blur' } ],

                organPwd: [ { required: true, message: '请输入机构密码', trigger: 'blur' },{ min: 8, max: 32, message: '长度在 8 到 32 个字符', trigger: 'blur' } ],
            },
            serveIdsList:[],
            count:0
        }
    },
    computed: {
        Category(){
            return this.$store.state['main'].category
        },
    },
    activated(){
        var _this = this
        this.$nextTick(()=>{
            setTimeout(function(){
                _this.servePage()
                
            },1000)
        })

    },
    watch : {
    	'Params.organPwd'(val){
            // if(val && this.$route.params.id!=='add' && this.count == 0){
            //     this.Params.organPwd = atob(this.Params.organPwd )
            //     this.count++
            // }
    	},
    },
    methods: {
        
        serviceContentC(){
             this.Params.serveIdsList =  this.serveIdsList
            this.Params.serveIds =  this.serveIdsList.join(",")
             
        },
        FormSubmitCheck(){
            //this.Params.serveIds = this.serveIdsList.join(",")
            this.FormSubmit()
        },
        init(){
            this.GetInit('main/category',{ pageSize:32 })
            this.servePage()
        },
        servePage(){
            this.serveIdsList = []
            this.Dp('main/SERVE_PAGE',{ pageIndex: 1, pageSize:100000 }).then(res=>{
               // debugger
                if(res.code == 200){
                    this.serviceContentList = res.data.bussData
                    if(this.Params.serveIds){
                        this.$set(this,'serviceContentList',this.serviceContentList)
                        this.serveIdsList = this.Params.serveIds.split(",")
                        for(var i in this.serveIdsList){
                            this.serveIdsList[i] = this.serveIdsList[i]*1
                        }
                        this.$set(this,'serveIdsList',this.serveIdsList)
                        this.$forceUpdate()
                    }
                    // debugger
                    // var aaaa = this.Params.serveIds
                    // debugger
                    // this.Params.serveIdsList =  aaaa ? aaaa.split(",") : []
                    //this.Params.serveIdsList = this.Params.serveIds && this.Params.serveIds.split(",")
                }
            })
        },
        Submit(model=this.StorePath[1],callback){
            if(!callback){
                callback = (res)=>{
                    this.Suc('操作成功')
                    if(this.Main.init){
                        this.Get(this.Main.page)
                    }
                    if(this.$route.meta.rollback){
                        this.Rd(this.$route.meta.rollback)
                    }                    
                    return res
                }
            }
            let params = this.Origin(this.Params)

            //params.organAccount = btoa(params.organAccount) // 账号密码 B64 加密
            // if(params.id){
            //     params.organPwd = params.organPwd
            // }else{
            //     params.organPwd = btoa(params.organPwd) // 账号密码 B64 加密
            // }
            return (params.id || params.sn) ?
                this.Put(params,model,callback) :
                this.Post(params,model,callback)
        },
    },
    components: {

    },
    mounted(){
        this.init()
        var _this = this
        // setTimeout(function(){
        //     _this.Params.organPwd = atob(_this.Params.organPwd )
        // },1500)
    },
}
</script>