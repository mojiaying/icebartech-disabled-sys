<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterAccountIdRecordDetails {
    
}
</style>
<template>
    <section class="CenterAccountIdRecordDetails o-pt-l">
        <div class="block-n">
            <div class="o-p-l">
                <el-page-header @back="Back()" content="录入明细"></el-page-header>
            </div>
        </div>
        <div class="block o-mt" v-loading="Main.loading" v-if="Params">
            <el-form class="o-pt"   ref="form" :rules="Rules" :model="Params" label-width="100px" style="width:100%;">
                <el-form-item label="服务日期" prop="serviceDate" style="width:100%; max-width:460px;">
                    <!-- <el-date-picker :default-value="new Date()"  :editable="false" v-model="Params.serviceDate" type="date" placeholder="选择服务日期" value-format="yyyy-MM-dd"></el-date-picker> -->
                                    {{Params.serviceDate||'已作废'}}
                </el-form-item>
            
                <!-- <el-form-item label="服务项目" prop="serviceItem" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.serviceItem" placeholder="请输入服务项目" clearable></el-input>
                </el-form-item> -->
                <el-form-item label="服务时长" prop="serviceDuration" style="width:100%; max-width:460px;">
                    <div class="l-flex-c">
                        {{Params.serviceDuration||0}}
                        <!-- <el-input  oninput="value=value.replace(/[^\d.]/g,'')" class="l-flex-1" v-model="Params.serviceDuration" placeholder="请输入服务时长" clearable></el-input> -->
                        <span class="o-pl">分钟</span>  
                    </div>
                </el-form-item>
                <el-form-item label="服务费用" prop="cost" style="width:100%; max-width:460px;">
                    <div class="l-flex-c">
                        {{Params.cost}}
                        <!-- <el-input   oninput="value=value.replace(/[^\d.]/g,'')" v-model="Params.cost" placeholder="请输入服务费用" clearable></el-input> -->
                        <span class="o-pl">元</span>  
                    </div>

                </el-form-item>
                <!-- <el-form-item label="服务内容" prop="serviceContent" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.serviceContent" type="textarea" :rows="2" placeholder="请输入服务内容" clearable></el-input>
                </el-form-item> -->
                <el-form-item v-if="Params.serviceContent&&Params.serviceContent.length&&Params.servesList.length > 0" label="服务内容" prop="serviceContent" style="width:100%; max-width:460px;">
                     {{Params.serviceContent}}
                     <!-- <el-checkbox-group v-model="serviceContent">
                        <div class="o-pl">
                            <el-checkbox @change="serviceContentC" v-for="(item,unit) in Params.servesList" :label="item.content" :key="item.content">{{item.content}}</el-checkbox>
                        </div>
                    </el-checkbox-group> -->
                    <!-- <el-input v-model="ParamsSave.serviceContent" type="textarea" :rows="2" placeholder="请输入服务内容" ></el-input> -->
                </el-form-item>
               
                 <el-form-item  v-if="Params.useAffirm == 'Y'"  label="确认时间" prop="affirmTime"  style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.affirmTime"  readonly></el-input> -->
                    {{Params.affirmTime}}
                </el-form-item>
                <el-form-item v-if="Params.useAffirm == 'N'" label="拒绝时间" prop="affirmTime"  style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.affirmTime"  readonly></el-input> -->
                    {{Params.affirmTime}}
                </el-form-item>
                <el-form-item v-if="Params.useAffirm == 'N'"  label="拒绝原因" prop="useAffirmDsc" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.useAffirmDsc"  readonly></el-input> -->
                    {{Params.useAffirmDsc}}
                </el-form-item>
                <el-form-item label="备注" prop="remark" style="width:100%; max-width:460px;">
                    {{Params.remark}}
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.page.js'
export default {
    name: 'CenterAccountIdRecordDetails',
    mixins: [StoreMix],
    data() {
        return {
            store: 'admin/clock',
            forceReload: true,
            serviceContent:[],
            Rules: {
                serviceDate: [ { required: true, message: '请选择服务日期', trigger: 'blur' } ],
                // serviceItem: [ { required: true, message: '请输入服务项目', trigger: 'blur' } ],
                serviceDuration: [ { required: true, message: '请输入服务时长', trigger: 'blur' } ],
                cost: [ { required: true, message: '请输入服务费用', trigger: 'blur' } ],
                serviceContent: [ { required: true, message: '请输入服务内容', trigger: 'blur' } ],
            },
        }
    },
    computed: {

    },
    activated(){

        var _this = this
        this.$nextTick(()=>{
            setTimeout(function(){
                if(_this.Params.serviceContent){
                     _this.$set(this,'serviceContent',_this.Params.serviceContent.split(","))
                    _this.serviceContent = _this.Params.serviceContent.split(",")
                }else{
                    _this.serviceContent = []
                    _this.Params.serviceContent = []
                      _this.$set(this,'serviceContent',[])
                }
            },1000)
        })
    },
    methods: {
       
        serviceContentC(){
            if(typeof this.serviceContent == 'object'){
                this.Params.serviceContent =  this.serviceContent.join(",")
            }else{
                 this.Params.serviceContent =  this.serviceContent
            }
            this.Params
             this.$set(this.Params,'serviceContent',this.Params.serviceContent)
             this.$set(this,'serviceContent',this.serviceContent)
            
        },
        init(){

        },
        pageInit(){

            if(!this.Params.serviceDate){
                this.Params.serviceDate = this.Time(new Date(),'yyyy-MM-dd')
            }
        },
        Submit(model=this.StorePath[1],callback){
            let params = this.Origin(this.Params)
            return this.Put(params,model,(res)=>{
                if(res){
                    this.Suc('操作成功')
                    // if(this.Main.init){
                    //     this.ReloadPage()
                    // }
                    this.Back()
                    return res
                }
            })
        },
    },
    components: {

    },
    mounted(){

        this.$set(this,'serviceContent',[])
        this.serviceContent = []
        this.Params.serviceContent  = []
        this.init()
    },
}
</script>