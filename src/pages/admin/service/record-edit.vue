<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterAccountIdRecordDetails {
    
}
</style>
<template>
    <section class="CenterAccountIdRecordDetails o-pt-l">
        <div class="block-n">
            <div class="o-p-l">
                <el-page-header @back="Back()" content="录入服务"></el-page-header>
            </div>
        </div>
        <div class="block o-mt" v-loading="Main.loading" v-if="Params">
            <el-form class="o-pt" ref="form" :rules="Rules" :model="Params" label-width="100px" style="width:100%;">
                <!-- <el-form-item label="服务日期" prop="serviceDate" style="width:100%; max-width:460px;">
                    <el-date-picker :default-value="Params.serviceDate" :editable="false" :readonly="true" v-model="Params.serviceDate" type="date" placeholder="选择服务日期" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item> -->
                <!-- <el-form-item label="服务项目" prop="serviceItem" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.serviceItem" placeholder="请输入服务项目" clearable></el-input>
                </el-form-item> -->
                <el-form-item label="服务时长" prop="serviceDuration" style="width:100%; max-width:460px;">
                    <div class="l-flex-c">
                        <el-input  oninput="value=value.replace(/[^\d.]/g,'')" class="l-flex-1" v-model="Params.serviceDuration" placeholder="请输入服务时长" clearable></el-input>
                        <span class="o-pl">分钟</span>  
                    </div>
                </el-form-item>
                <el-form-item label="服务费用" prop="cost"  style="width:100%; max-width:560px;">
                    <div class="l-flex-c">
                        <el-input   oninput="value=value.replace(/[^\d.]/g,'')" class="l-flex-1"  v-model="Params.cost" placeholder="请输入服务费用" clearable></el-input>
                        <span class="o-pl">元</span>  
                    </div>

                </el-form-item>
                <!-- <el-form-item label="服务内容" prop="serviceContent" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.serviceContent" type="textarea" :rows="2" placeholder="请输入服务内容" clearable></el-input>
                </el-form-item> -->
                <!-- {{Params.serviceContent}} -->
                <el-form-item   v-if="Params.servesList&&Params.servesList.length > 0 && isFalg" label="服务内容" prop="serviceContent" style="width:100%; max-width:460px;">
                    
                   <el-tree @check="setServiceC"
                   :default-checked-keys="Params.serviceIds"
                    v-model="Params.serviceContent" node-key="id" :highlight-current="true" show-checkbox  ref="tree"
                   :data="Params.servesList" :props="defaultProps"    ></el-tree>
                     
                     <!-- {{Params.serviceContent = (
                         Params.serviceContent === 'string' ? Params.serviceContent.split(",") : []
                     )}} -->
                     <!-- <el-checkbox-group v-model="Params.serviceContent">
                        <div class="o-pl">
                            <el-checkbox @change="serviceContentC" v-for="(item,unit) in Params.servesList" :label="item.content" :key="unit">{{item.content}}</el-checkbox>
                        </div>
                    </el-checkbox-group> -->
                    <!-- <el-input v-model="ParamsSave.serviceContent" type="textarea" :rows="2" placeholder="请输入服务内容" ></el-input> -->
                </el-form-item>
                <el-form-item label="备注" prop="remark" style="width:100%; max-width:460px;">
                    <div class="l-flex-c">
                         <el-input maxlength="250" v-model="Params.remark" type="textarea" :rows="2" placeholder="请输入备注" ></el-input>
                    </div>
                </el-form-item>
                <el-form-item>
                    <Button @click="FormSubmit()" long>提交</Button>
                    <Button @click="Rd($route.meta.rollback)" plain>取消</Button>
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
            // 定义defaultProps
            defaultProps:{
                children: 'children',
                label: 'content' // 这里的名字要和你封装的数据中的节点的名字一样
            },

            store: 'admin/clock',
            forceReload: true,
            Params:{
                serviceContent:[],
            },
            serviceContent:[],
            Rules: {
                serviceDate: [ { required: true, message: '请选择服务日期', trigger: 'blur' } ],
                // serviceItem: [ { required: true, message: '请输入服务项目', trigger: 'blur' } ],
                serviceDuration: [ { required: true, message: '请输入服务时长', trigger: 'blur' } ],
                cost: [ { required: true, message: '请输入服务费用', trigger: 'blur' } ],
                serviceContent: [ { required: true, message: '请输入服务内容', trigger: 'blur' } ],
            },
            isFalg : false
        }
    },
    computed: {

    },
    activated(){
        var _this = this
        this.isFalg = false
        this.$nextTick(()=>{
            setTimeout(function(){
                console.log(_this.Params)
                // if(typeof _this.Params.serviceContent === 'string'){
                //      _this.$set(_this.Params,'serviceContent',_this.Params.serviceContent.split(","))
                //     _this.Params.serviceContent = _this.Params.serviceContent.split(",")
                // }else{
                //     _this.Params.serviceContent = []
                //     _this.$set(_this.Params,'serviceContent',[])
                // }
                if(_this.Params.serviceIds){
                    _this.Params.serviceIds = JSON.parse(_this.Params.serviceIds)
                }
                _this.isFalg = true
                // _this.Params.serviceContent = []
                // _this.$set(_this.Params,'serviceContent',[])
                // _this.$forceUpdate()
            },2000)
        })
    },
    methods: {

    setServiceC(){
        var list = this.$refs.tree.getCheckedNodes()
        var strName = [],strId=[]
        for(var i in list){
            strName.push(list[i].content)
            strId.push(list[i].id)
        }
        this.Params.serviceIds = strId
        this.Params.serviceContent = strName.toString()
        this.$set(this.Params,'serviceContent',this.Params.serviceContent)
        this.$forceUpdate()
    },

        push(){
            // this.$refs.form.validate((valid) => {
            //     if (valid) {
            //         var data = {
            //             remark:this.Params.remark,
            //             serviceContent:this.Params.serviceContent.join(","),
            //             userId:this.$route.params.id,
            //             cost:this.Params.cost,
            //             serviceDuration:this.Params.serviceDuration,
            //             serviceDate:this.Params.serviceDate,
            //             id: this.Params.id,
            //         }
            //         this.Dp('main/H5_PUNCH',data).then(data=>{
            //             if(data.code == '200'){
            //                 this.Params = {}
            //                 this.$router.back()
            //             }
            //         })
            //     } else {
            //         return false
            //     }
            // })
        },
        Submit(model=this.StorePath[1],callback){
            //this.setServiceC()
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
        serviceContentC(e){
            // if(typeof this.Params.serviceContent == 'object'){
            //     this.Params.serviceContent =  this.serviceContent.join(",")
            // }else{
            //      this.Params.serviceContent =  this.serviceContent
            // }
            //  this.$set(this.Params,'serviceContent',this.Params.serviceContent)
            //  this.$forceUpdate()
        },  
        init(){

        },
        pageInit(){
            if(!this.Params.serviceDate){
                this.Params.serviceDate = this.Time(new Date(),'yyyy-MM-dd')
            }
        },
        
    },
    components: {

    },
    mounted(){
        this.init()
    },
}
</script>