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
                <el-page-header @back="Back()" content="添加打卡记录"></el-page-header>
            </div>
        </div>
        <div class="block o-mt" v-loading="Main.loading">
            <el-form class="o-pt" ref="form" :rules="Rules" :model="ParamsSave" label-width="100px" style="width:100%;">
                <el-form-item label="打卡机构" prop="organId" style="width:100%; max-width:460px;">
                    <el-select v-model="ParamsSave.organId" @change="dataChange($event)" placeholder="请选择" style="width:8rem;">
                        <el-option v-for="(item,index) in organizations" :key="item.id" :label="item.organName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="打卡日期" prop="punchDate" style="width:100%; max-width:460px;">
                    <el-date-picker v-model="ParamsSave.punchDate" type="date" placeholder="打卡日期" value-format="yyyy-MM-dd" ></el-date-picker>
                </el-form-item>
                <el-form-item label="到达打卡时间" prop="arrivePunchTime" style="width:100%; max-width:460px;">
                    <!-- <el-date-picker v-model="Params.arrivePunchTime" type="datetime" placeholder="到达打卡时间" value-format="yyyy-MM-dd HH:mm" ></el-date-picker> -->
                    <el-time-picker
                    v-model="ParamsSave.arrivePunchTime"
                    @change="changeStart"
                    value-format="HH:mm:ss"
                    placeholder="到达打卡时间"></el-time-picker>   
                </el-form-item>
                <el-form-item label="离开打卡时间" prop="leavePunchTime" style="width:100%; max-width:460px;">
                    <el-time-picker :min="ParamsSave.arrivePunchTime"
                    v-model="ParamsSave.leavePunchTime"
                    value-format="HH:mm:ss"
                    @change="changeStart"
                    placeholder="离开打卡时间">
                    </el-time-picker>   
                    <!-- <el-date-picker v-model="Params.leavePunchTime" type="datetime" placeholder="离开打卡时间" value-format="yyyy-MM-dd" ></el-date-picker> -->
                </el-form-item>
                <el-form-item label="服务日期" prop="serviceDate" style="width:100%; max-width:460px;">
                    <el-date-picker v-model="ParamsSave.serviceDate" type="date" placeholder="服务日期" value-format="yyyy-MM-dd" ></el-date-picker>
                </el-form-item>
                <el-form-item v-if="ParamsSave.organId" label="服务内容" prop="serviceContent1" style="width:100%; max-width:460px;">
                      <el-tree
                     node-key="id" :highlight-current="true" show-checkbox  ref="tree"
                   :data="bussData" :props="defaultProps"    ></el-tree>
                     
                     <!-- <el-checkbox-group v-if="bussData.length > 0" v-model="ParamsSave.serviceContent1">
                        <div class="o-pl">
                            <el-checkbox v-for="item in bussData" :label="item.content" :key="item.content">{{item.content}}</el-checkbox>
                        </div>
                    </el-checkbox-group> -->
                    <!-- <el-input v-model="ParamsSave.serviceContent" type="textarea" :rows="2" placeholder="请输入服务内容" ></el-input> -->
                </el-form-item>
                 <el-form-item label="服务时长" prop="serviceDuration" style="width:100%; max-width:460px;">
<div class="l-flex-c">
                        <el-input  oninput="value=value.replace(/[^\d.]/g,'')" class="l-flex-1" v-model="ParamsSave.serviceDuration" placeholder="请输入服务时长" clearable></el-input>
                        <span class="o-pl">分钟</span>  
                    </div>
                </el-form-item>
                 <el-form-item label="服务费用" prop="cost" style="width:100%; max-width:460px;">
                    <div class="l-flex-c">
                        <el-input   oninput="value=value.replace(/[^\d.]/g,'')" v-model="ParamsSave.cost" placeholder="请输入服务费用" clearable></el-input>
                        <span class="o-pl">元</span>  
                    </div>
                </el-form-item>
                 <el-form-item label="备注" prop="remarks" style="width:100%; max-width:460px;">
                    <div class="l-flex-c">
                         <el-input maxlength="250" v-model="ParamsSave.remark" type="textarea" :rows="2" placeholder="请输入备注" ></el-input>
                    </div>
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
            // 定义defaultProps
            defaultProps:{
                children: 'children',
                label: 'content' // 这里的名字要和你封装的数据中的节点的名字一样
            },
             //限制开始时间
        
            organizations:[
            ],//打卡机构    
            forceReload: true,
            Params:{
                //userId:"3532"
            },
            serviceContent1:[],
            ParamsSave:{
                serviceContent1:[]
            },
             Rules: {
                //organId: [ { required: true, message: '请输入打卡机构', trigger: 'blur' } ]
            },
            bussData:[]
        }
    },
    computed: {

    },
    methods: {
       //结束时间限制开始时间
      changeStart() {
        
         var oDate1 = this.ParamsSave.arrivePunchTime ? this.ParamsSave.arrivePunchTime.replace(/:/g,'') * 1 : 0
         var oDate2 = this.ParamsSave.leavePunchTime ? this.ParamsSave.leavePunchTime.replace(/:/g,'') * 1 : 0
         
        if(oDate1 > oDate2 && oDate2!=0){
          this.ParamsSave.leavePunchTime = ''
          this.Err('离开打卡时间不能晚于到达打卡时间')
        } 
      },
        dataChange(e){
            this.Dp('main/ORGAN_SERVICE_ID',{id:e}).then(data=>{
                if(data.code == '200'){
                    this.bussData = data.data.bussData.servesList
                }
            })
            // for(var i in this.organizations){
            //     if(this.organizations[i].id == e){
            //         this.bussData = this.organizations[i].servesList
            //     }
            // }
        },
        setServiceC(){
            var list = this.$refs.tree.getCheckedNodes()
            var strName = [],strId=[]
            for(var i in list){
                strName.push(list[i].content)
                strId.push(list[i].id)
            }
            this.ParamsSave.serviceIds =  JSON.stringify(strId)
            this.ParamsSave.serviceContent = strName.toString()
        },
        punchSave(){
             this.setServiceC()
            this.ParamsSave.userId = this.$route.params.id
            // if(this.ParamsSave.serviceContent1){
            //     this.ParamsSave.serviceContent = this.ParamsSave.serviceContent1.join(",")
            // }
            // this.ParamsSave.serviceContent = this.$route.params.id
            this.Dp('main/PUNCH_SAVE',this.ParamsSave).then(data=>{
                if(data.code == '200'){
                    this.ParamsSave = {}
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
        this.Dp('main/FIND_BY_ORGAN_LIST',{}).then(data=>{
            if(data.code == '200'){
                this.organizations = data.data.bussData
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