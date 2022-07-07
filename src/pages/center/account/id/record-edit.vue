<style lang="scss">
@import "@/assets/style/project/config.scss";
    .el-time-spinner__item {
        height: 34px !important;
        line-height: 34px !important;
    }
</style>
<template>
    <section class="CenterAccountIdRecordDetails o-pt-l">
        <div class="block-n">
            <div class="o-p-l">
                <el-page-header @back="Back()" content="编辑打卡记录"></el-page-header>
            </div>
        </div>
        <div class="block o-mt" v-loading="Main.loading">
            <el-form class="o-pt" ref="form" :rules="Rules" :model="Params" label-width="100px" style="width:100%;">
                <!-- <el-form-item label="打卡机构" prop="organId" style="width:100%; max-width:460px;">
                    <el-select v-model="Params.organId" @change="dataChange($event)" placeholder="请选择" style="width:8rem;">
                        <el-option v-for="(item,index) in organizations" :key="item.id" :label="item.organName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="打卡日期" prop="punchDate" style="width:100%; max-width:460px;">
                    <el-date-picker v-model="Params.punchDate" type="date" placeholder="打卡日期" value-format="yyyy-MM-dd" ></el-date-picker>
                </el-form-item> -->
                <!-- <el-form-item label="到达打卡时间" prop="arrivePunchTime" style="width:100%; max-width:460px;">
                    <el-time-picker
                    v-model="Params.arrivePunchTime"
                    value-format="HH:mm:ss"
                    placeholder="到达打卡时间"></el-time-picker>   
                </el-form-item> -->
                <!-- <el-form-item label="离开打卡时间" prop="leavePunchTime" style="width:100%; max-width:460px;">
                    <el-time-picker
                    v-model="Params.leavePunchTime"
                    value-format="HH:mm:ss"
                    placeholder="离开打卡时间">
                    </el-time-picker>   
                </el-form-item> -->
                <el-form-item label="服务日期" prop="serviceDate" style="width:100%; max-width:460px;">
                    {{Params.serviceDate}}
                    <!-- <el-date-picker v-model="Params.serviceDate" type="date" placeholder="服务日期" value-format="yyyy-MM-dd" ></el-date-picker> -->
                </el-form-item>
                 <el-form-item v-if="Params.organId && isFalg " label="服务内容" prop="serviceContent1" style="width:100%; max-width:460px;">
                     <!-- <el-checkbox-group v-if="bussData.length > 0" v-model="serviceContent1">
                        <div class="o-pl">
                            
                            <el-checkbox v-for="item in bussData" :label="item.content" :key="item.content">{{item.content}}</el-checkbox>
                        </div>
                    </el-checkbox-group> -->
                    <el-tree
                     :default-checked-keys="Params.serviceIds"
                     node-key="id" :highlight-current="true" show-checkbox  ref="tree"
                   :data="bussData" :props="defaultProps"    ></el-tree>
                    <!-- <el-input v-model="ParamsSave.serviceContent" type="textarea" :rows="2" placeholder="请输入服务内容" ></el-input> -->
                </el-form-item>
                 <el-form-item label="服务时长" prop="serviceDuration" style="width:100%; max-width:460px;">
<div class="l-flex-c">
                        <el-input  oninput="value=value.replace(/[^\d.]/g,'')" class="l-flex-1" v-model="Params.serviceDuration" placeholder="请输入服务时长" clearable></el-input>
                        <span class="o-pl">分钟</span>  
                    </div>
                </el-form-item>
                 <el-form-item label="服务费用" prop="cost" style="width:100%; max-width:460px;">
                    <div class="l-flex-c">
                        <el-input   oninput="value=value.replace(/[^\d.]/g,'')" v-model="Params.cost" placeholder="请输入服务费用" clearable></el-input>
                        <span class="o-pl">元</span>  
                    </div>
                </el-form-item>
                <el-form-item label="用户确认" prop="useAffirm" style="width:100%; max-width:460px;">
                    <template slot-scope="scope">
                        <span>
                            {{
                                 Params.useAffirm == "Y" ? "已确认":
                                 (
                                     Params.useAffirm == "N"?"已拒绝":
                                     (Params.useAffirm == "L"?"待录入":
                                        (Params.useAffirm == "D"?"待确认":
                                        (Params.useAffirm == "K"?"待离开":'已作废'))
                                     )
                                 )
                            }}
                        </span> 
                    </template>
                </el-form-item>
                <el-form-item label="备注">
                    <div class="l-flex-c">
                         <el-input maxlength="250" v-model="Params.remark" type="textarea" :rows="2" placeholder="请输入备注" ></el-input>
                    </div>
                    <!-- <el-input v-model="Params.remarks" type="textarea" :rows="3" placeholder="请输入备注" maxlength="2048" clearable></el-input> -->
                </el-form-item>
                <el-form-item v-if="Params.useAffirm == 'N'" label="拒绝时间" prop="affirmTime" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.affirmTime" placeholder="" readonly></el-input> -->
                     {{Params.affirmTime}}
                </el-form-item>
                <el-form-item v-if="Params.useAffirm == 'N'" label="拒绝原因" prop="useAffirmDsc" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.useAffirmDsc" placeholder="" readonly></el-input> -->
                     {{Params.useAffirmDsc}}
                </el-form-item>
                <el-form-item>
                    <Button @click="punchSave()"  plain>提交</Button>
                    <Button @click="$router.back()" plain>取消</Button>
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
            store: 'main/clock',
            organizations:[
            ],//打卡机构    
            // 定义defaultProps
            defaultProps:{
                children: 'children',
                label: 'content' // 这里的名字要和你封装的数据中的节点的名字一样
            },
            forceReload: true,
            Params:{
                serviceContent1 : []
                //userId:"3532"
            },
            serviceContent1:[],
            ParamsSave:{
                serviceContent1:[]
            },
             Rules: {
                //organId: [ { required: true, message: '请输入打卡机构', trigger: 'blur' } ]
            },
            bussData:[],
            isFalg:false
        }
    },
    computed: {

    },
    activated(){
         var _this = this
         this.isFalg = false
        setTimeout(function(){
            //debugger
            if(_this.Params.serviceContent){
                try{
                    if(_this.Params.serviceIds){
                        _this.Params.serviceIds = JSON.parse(_this.Params.serviceIds)
                    }
                    _this.isFalg = true
                    //_this.serviceContent1 = _this.Params.serviceContent.split(",")
                    //debugger
                    // for(var i in _this.serviceContent){
                    //     _this.bussData.push({
                    //         id:_this.serviceContent[i],
                    //         content:_this.serviceContent[i]
                    //     })
                    //}
                    //_this.$set(this,'serviceContent1',_this.serviceContent1)
                    //_this.serviceContent = _this.Params.serviceContent.split(",")
                }catch{

                }
            }
        },1000)
    },
    methods: {
        // serviceContentC(){
        //     if(typeof this.serviceContent == 'object'){
        //         this.Params.bussData =  this.serviceContent.join(",")
        //     }else{
        //          this.Params.serviceContent =  this.serviceContent
        //     }
        //      this.$set(this.Params,'serviceContent',this.Params.serviceContent)
        //      this.$set(this,'serviceContent',this.serviceContent)
            
        // },
        // dataChange(e){
        //     debugger
        //     for(var i in this.organizations){
        //         if(this.organizations[i].id == e){
        //             this.bussData = this.organizations[i].servesList
        //         }
        //     }
        // },
        setServiceC(){
            var list = this.$refs.tree.getCheckedNodes()
            var strName = [],strId=[]
            for(var i in list){
                strName.push(list[i].content)
                strId.push(list[i].id)
            }
            debugger
            this.Params.serviceIds =  JSON.stringify(strId)
            this.Params.serviceContent = strName.toString()
        },
        punchSave(){
            this.Params.userId = this.$route.params.id
            var data = {
                serviceDate:this.Params.serviceDate,
                serviceDuration:this.Params.serviceDuration,
                cost:this.Params.cost,
                id:this.Params.id
            }
            this.setServiceC()
            if(this.Params.serviceContent){
                data.serviceContent = this.Params.serviceContent
                data.serviceIds = this.Params.serviceIds
            }
            // this.ParamsSave.serviceContent = this.$route.params.id
            this.Dp('main/PUNCH_SAVE',data).then(data=>{
                if(data.code == '200'){
                    this.Params = {}
                   this.$router.back()
                }
            })
        },
        init(){
            // var _this = this
            // setTimeout(function(){
            //     for(var key in _this.Params){
            //         delete _this.Params[key];
            //     }
                
            //     debugger
            // },2000)
        },
    },
    components: {
    },
    mounted(){
        var _this = this
        this.Dp('main/FIND_BY_ORGAN_LIST',{}).then(data=>{
            if(data.code == '200'){
                this.organizations = data.data.bussData
                for(var i in this.organizations){
                    if(this.organizations[i].id == _this.Params.organId){
                        this.bussData = this.organizations[i].servesList
                    }
                }
            }
        })
        // this.Dp('main/SERVE_PAGE',{pageIndex:1,pageSize:1000}).then(data=>{
        //     if(data.code == '200'){
        //         this.bussData = data.data.bussData
        //     }
        // })
        
        this.init()
    },
    created() {

    },
}
</script>