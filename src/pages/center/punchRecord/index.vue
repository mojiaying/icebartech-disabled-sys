<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterBanner {
    
}
</style>
<template>
    <div class="CenterBanner o-ptb-l" element-loading-text="加载中，请暂停操作"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="block o-plr-l">
            <Button @click="exportUserInfo" :loading="downLoadingList" :disabled="downLoadingList" >导出康复服务记录</Button>
            <Button @click="dialogImgVisible=true" :disabled="downLoading" :loading="downLoading"  >导出服务照片</Button>
            <Button @click="allReimbursement('Y')" :loading="downLoadingRe" :disabled="costFlag=='Y' || costFlag==''||downLoadingRe">批量报销</Button>
            <Button @click="allReimbursement('N')" :loading="downLoadingRen" :disabled="costFlag=='N' || costFlag==''||downLoadingRen">批量取消报销</Button>

            <Button style="background-color: #6FCDC8 !important;margin-left:60px;">金额：{{fundAmount}}</Button> 
            <!-- <Button style="background-color: #6FCDC8 !important;margin-left:60px;">未报销金额：{{notBxAmount}}</Button>  -->

        </div>
        <div class="block o-plr-l o-mt borderQueryParam">
            <span class="o-plr">姓名：</span>
            <el-input v-model="Filter.userName" placeholder="请输入姓名" style="width:10rem;" clearable></el-input>
            <span class="o-plr">手机号：</span>
            <el-input v-model="Filter.mobile" placeholder="请输入手机号" style="width:10rem;" clearable></el-input>
            <span class="o-plr">打卡机构：</span>
            <!-- <el-select clearable v-model="Filter.organId" placeholder="请选择" style="width:8rem;">
                <el-option v-for="(item,index) in organizations" :key="item.id" :label="item.organName" :value="item.id"></el-option>
            </el-select> -->

<!--            <el-input v-model="organNameLike" @change="changeOrgan" placeholder="请输入打卡机构" style="width:10rem;" maxlength="50" clearable></el-input>-->
            <el-input v-model="Filter.organNameLike"  placeholder="请输入打卡机构" style="width:10rem;" clearable></el-input>

            <span class="o-plr o-ml">打卡日期：</span>
             <el-date-picker v-model="dateVal" @change="changeDate" class="o-mr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:13rem;" value-format="yyyy-MM-dd" :picker-options="DateRangePicker"></el-date-picker>
             <span class="o-plr">状态：</span>
            <el-select clearable v-model="Filter.costStatus" placeholder="请选择" style="width:8rem;">
                <el-option v-for="(item,index) in costStausList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            
            <!-- <span class="o-plr">用户确认：</span>
            <el-select clearable v-model="Filter.useAffirm" multiple collapse-tags placeholder="请选择" style="width:8rem;">
                <el-option v-for="(item,index) in useAffirmList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select> -->
            <div style="margin-top: 10px;">
                <span class="o-plr o-ml">用户确认：</span>
                <el-select clearable v-model="useAffirm" multiple collapse-tags placeholder="请选择" style="width:8rem;" @change="changeUseAffirm">
                    <el-option v-for="(item,index) in useAffirmList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <span class="o-plr">标记：</span>
                <el-select clearable v-model="mark" multiple collapse-tags placeholder="请选择" style="width:10rem;" @change="changeMark">
                    <el-option v-for="(item,index) in markList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <Button class="o-ml" @click="MakeFilter();findByCost()" :disabled="organLoding">查询</Button>

            </div>
        </div>
        <div class="block o-plr-l o-mt" >
            <el-table class="o-pt" :data="Main.list" v-loading="Main.loading || organLoding" @selection-change="tableSelection" @select-all="selectAllPage" ref="table">
                <el-table-column :selectable='selectInit' type="selection" width="60"></el-table-column>
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <el-table-column prop="userName" label="姓名" ></el-table-column>
                <el-table-column prop="mobile" label="手机号" ></el-table-column>
                <el-table-column prop="idCard" label="身份证号" ></el-table-column>
                <el-table-column prop="organName" label="打卡机构" ></el-table-column>
                <el-table-column prop="punchDate" label="打卡日期" ></el-table-column>
                <el-table-column prop="cost" label="服务费用"></el-table-column>
                <!-- <el-table-column prop="serviceDuration" label="服务时长"></el-table-column>
                <el-table-column prop="serviceContent" label="服务内容"></el-table-column>
                 -->
                <el-table-column prop="costStatus" label="状态">
                     <template slot-scope="scope">
                        <span>
                            {{
                                scope.row.costStatus == "Y" ? "已报销":"未报销"
                            }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="useAffirm" label="用户确认">
                    <template slot-scope="scope">
                        <span>
                            {{
                                 scope.row.useAffirm == "Y" ? "已确认":
                                 (
                                     scope.row.useAffirm == "N"?"已拒绝":
                                     (scope.row.useAffirm == "L"?"待录入":
                                        (scope.row.useAffirm == "D"?"待确认":
                                        (scope.row.useAffirm == "K"?"待离开":'已作废'))
                                     )
                                 )
                            }}
                        </span> 
                    </template>
                </el-table-column>
                <el-table-column prop="mark" label="标记">
                    <template slot-scope="scope">
                        <span>
                            {{
                                 scope.row.mark == "admin" ? "后台录入":
                                 (
                                     scope.row.mark == "slaver"?"机构录入":"小程序录入"
                                 )
                            }}
                        </span> 
                    </template>
                </el-table-column>
                <el-table-column prop="amount" label="额度" align="center">
                </el-table-column>
                <el-table-column prop="serviceContent" label="服务内容" align="center">
                </el-table-column>
                <el-table-column prop="useOwnAmount" label="消费总额" align="center">
                </el-table-column>
                <el-table-column prop="useOwnOrgAmount" label="机构总额" align="center">
                </el-table-column>
                <el-table-column prop="serviceDuration" label="服务时长" align="center">
                </el-table-column>
                <el-table-column prop="birthday" label="出生日期" align="center">
                </el-table-column>
                <el-table-column prop="disabilityType" label="残疾类别" align="center">
                </el-table-column>
                <el-table-column prop="disabilityGrade" label="残疾等级" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作" align="center" min-width='150'>
                    <template slot-scope="scope">
                        <Button size="small" v-if="(scope.row.costStatus != 'Y' && scope.row.useAffirm == 'Y') || (scope.row.costStatus != 'Y'&&scope.row.useAffirm == 'F')"  @click="reimbursement(scope.row,'Y')" plain>报销</Button>
                        <Button size="small" v-if="scope.row.useAffirm!='F'" @click="reimbursement(scope.row,'D')" plain>作废</Button>
                        <Button v-if="(scope.row.costStatus == 'Y' && scope.row.useAffirm == 'Y') ||  (scope.row.costStatus == 'Y'&&scope.row.useAffirm == 'F')" size="small" @click="reimbursement(scope.row,'N')" plain>取消报销</Button>
                        <Button size="small" @click="EditPage(scope.row,'center/punchRecord-record')" plain>查看</Button>
                    </template>
                </el-table-column>
                
            </el-table>
            <Pagination class="o-mtb" v-model="Page" @turning="Get" :total="Main.total"></Pagination>
        </div>
        <el-dialog
        title="提示"
        :visible.sync="dialogImgVisible"
        width="30%">
        <div class="block">
            <span class="demonstration">选择导出月份：</span>
            <el-date-picker
            v-model="imgTime"
            value-format="timestamp"
            type="month"
            placeholder="选择月">
            </el-date-picker>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="exportImage()">确 定</el-button>
        </span>
        </el-dialog>
          
    </div>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.js'
import DateRange from '@/plugins/mixin/daterange'
import { constants } from 'zlib';
export default {
    name: 'CenterBanner',
    mixins: [StoreMix,DateRange],
    data() {
        return {
            organLoding: true,
            downLoadingList:false,
            dateVal:'',
            organizations:[],
            downLoadingRen:false,
            downLoading:false,
            downloadingList:false,
            downLoadingRe:false,
            imgTime:'',
            dialogImgVisible:false,
            Target:{},
            fundAmount:0,
            mark:'',
            useAffirm:'',
            store: 'main/punchRecord',
            organNameLike:'',
            notBxAmount:0,
            useAffirmList:[
                 {
                    id:"",
                    name:"全部"
                },
                {
                    id:"Y",
                    name:"已确认"
                },
                {
                    id:"N",
                    name:"已否决"
                },
                {
                    id:"D",
                    name:"待确认"
                },
                {
                    id:"L",
                    name:"待录入"
                },
                {
                    id:"F",
                    name:"已作废"
                },
            ],
            costStausList:[
                {
                    id:"",
                    name:"全部"
                },
                {
                    id:"Y",
                    name:"已报销"
                },
                {
                    id:"N",
                    name:"未报销"
                },
                
            ],//状态    
            markList:[
                {
                    id:"",
                    name:"全部"
                },
                {
                    id:"admin",
                    name:"后台录入"
                },
                {
                    id:"slaver",
                    name:"机构录入"
                },
                {
                    id:"app",
                    name:"小程序录入"
                }
            ],
            Filter: {
                pageSize: 10,
                pageIndex:1
            },
            batch:[],
            AllData:{
               surplusAmount:0,
               cost:0,
               id:''
            },
            isFlag:true,
            getAll:false,
            costFlag:"",
        }
    },
    computed: {

    },
    activated(){
        // var _this = this
        // this.$nextTick(()=>{
        //     setTimeout(function(){
        //         _this.init()
        //     },1000)
        // })

    },
    methods: {
    changeMark(){
        this.Filter.markListStr=this.mark.join()
    },
    changeUseAffirm(){
        if(this.useAffirm.indexOf('')==-1){
            this.Filter.userAffirmStr=this.useAffirm.join()
        }else{
            this.Filter.userAffirm=''
        }
    },
    changeOrgan(){
        this.organLoding = true
        this.organizations.forEach(res=>{
            if((res.organName).indexOf(this.organNameLike)!==-1){
                this.Filter.organId = res.id
            }
        })
        this.organLoding = false
    },
    selectInit(row,index){
        if(row.useAffirm=='Y'){    //判断条件               
            return true  //不可勾选
        }else{    
            return false  //可勾选
    
        }
    },
    findByCost(){
        this.Dp('main/FIND_AMOUNT',this.Filter).then(data=>{
            if(data.code == '200'){
                this.fundAmount = data.data.bussData.fundAmount
                this.notBxAmount = data.data.bussData.notBxAmount
            }
        })
    },
        changeDate(){
            if(this.dateVal){
                this.Filter.punchDateGE = this.dateVal[0]
                this.Filter.punchDateLE = this.dateVal[1]
            }else{
                this.Filter.punchDateGE = null
                this.Filter.punchDateLE = null
            }

        },
        exportUserInfo(){
            if(!this.Filter.punchDateGE||!this.Filter.punchDateLE){
                this.Err('请选择导出时间,时间不超过30天')
                return
            }
            let start  = new Date(this.Filter.punchDateGE.replace(/-/g,"/")).getTime();
            let end = new Date(this.Filter.punchDateLE.replace(/-/g,"/")).getTime();
            if(end - start  > 31*24*60*60*1000){
                this.Err('导出时间范围超过30天,请分段导出')
                return
            }

            var data = Object.assign(this.Filter,{ ids: this.batch, userId:'', loginId:this.User.id })
            this.Dp('main/EXPORTS_PUNCH',data).then(buffer=>{
                if(buffer){
                    this.SaveBufferFile(buffer,'康复服务记录.xls','excel')
                }else{
                    this.Err('导出失败')
                }
                this.downLoadingList=false

            }).catch(err=>{
                this.Err('导出失败，请选择30天范围分开导出')
                this.downLoadingList=false
            })
        },
        exportImage(){
            if(this.imgTime){
                var data = {
                    year:new Date(this.imgTime).getFullYear(),
                    month:new Date(this.imgTime).getMonth()+1
                }
                this.downLoading=true
                this.Dp('main/EXPORTS_IMAGE',data).then(res=>{
                    if(res){
                        this.SaveBufferFile(res,'服务图片.zip','zip')
                        this.downLoading=false

                    }else{
                        this.Err('导出失败')
                        this.downLoading=false

                    }
                },err=>{
                    this.downLoading=false
                    this.dialogImgVisible=false
                    return false
                })
                this.dialogImgVisible=false
            }else{
               this.Err('请选择导出时间') 
            }
        },
        reimbursement(row,costStatus){
            if(!this.isFlag){
               this.Err('请勾选相同报销状态！') 
               return
            }
            if(costStatus=='D'){
            //作废
                let  confirmText = [`确认作废此条数据？`],_this = this 
                const newDatas = []
                const h = this.$createElement
                for (const i in confirmText) {
                    newDatas.push(h('p', null, confirmText[i]))
                }
                this.$confirm( '提示', {
                    title:"提示",
                    message: h('div', null, newDatas),
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    }).then(() => {
                    _this.Dp('main/DELETE_COST_STATUS',{ id: row.id }).then(data=>{
                            if(data.code==200){
                                this.Suc('操作成功')
                                this.reload()

                            }else{
                                _this.Err(data.data.errMsg)
                            }
                        })
                    }).catch(() => {
                   
                })

            } else {
                if(this.getAll){
                    let params = {
                        costStatus:this.Filter.costStatus||'',
                        mark:this.Filter.mark||'',
                        mobile:this.Filter.mobile||'',
                        organId:this.Filter.organId||'',
                        organNameLike:this.Filter.organNameLike||'',
                        punchDateGE:this.Filter.punchDateGE||'',
                        punchDateLE:this.Filter.punchDateLE||'',
                        userName:this.Filter.userName||'',
                        bxStatus:costStatus,
                    }
                    if(costStatus=='Y'){
                        this.downLoadingRe=true
                    }else{
                        this.downLoadingRen=true
                    }
                        this.Dp('main/GET_ALL_RECORD', params).then(res=>{
                        if(res.code==200){
                            let data={
                                id:res.data.bussData.ids.join(),
                                cost:res.data.bussData.amount,
                                surplusAmount:res.data.bussData.surplusAmount||0
                            }
                            this.recverable(data,costStatus)    
                            this.downLoadingRe=false
                            this.downLoadingRen=false

                            // recverable(row,costStatus)
                            // _this.Get()
                        }else{
                            this.downLoadingRe=false
                            this.downLoadingRen=false

                            this.Err(res.code.errMsg)
                        }
                        },err=>{
                            this.downLoadingRe=false
                            this.downLoadingRen=false

                            return false
                        })
                    }else{
                    this.recverable(row,costStatus)    
                }
            //报销
            }
        },
        recverable(row,costStatus){
            let _str = costStatus == 'Y' ? '确认' : '取消'
            let  confirmText = [`${_str}报销项目服务费用${row.cost||0}元？`],_this = this 
            const newDatas = []
            const h = this.$createElement
            for (const i in confirmText) {
                newDatas.push(h('p', null, confirmText[i]))
            }
            this.$confirm( '提示', {
                title:"提示",
                message: h('div', null, newDatas),
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                //type: 'warning'
                }).then(() => {
                    // 正常跳转
                    this.downLoading=true
                        _this.Dp('main/UPDATE_COST_STATUS1',{ ids: row.id, "costStatus":costStatus }).then(data=>{
                           if(data.code==200){
                                _this.Suc('操作成功')
                                _this.Page=1    
                                _this.reload()
                                _this.downLoading=false
                            }else{
                                _this.Err(data.data.errMsg)
                            }
                            _this.downLoading=false
                             },err=>{
                                _this.downLoading=false
                            return false
                        }).catch(() => {
                        _this.downLoading=false
                    })
                })

        },
        allReimbursement(costStatus){
            this.reimbursement(this.AllData,costStatus)
        },
        tableSelection(list=[]){
            this.$set(this,'batch',[])
            this.getAll=false

            let cost = 0
            this.isFlag = true
            for(let item of list){
                if(item.costStatus!=list[0].costStatus){
                    this.isFlag = false
                    // this.Err('请勾选相同报销状态！')
                    // return
                }
                cost += item.cost || 0
                if(this.batch.indexOf(item.id)==-1){
                    this.batch.push(item.id)
                }
            }
            if(list.length > 0){
                this.costFlag = list[0].costStatus
            }else{
                this.costFlag = ''
            }
            this.$set(this,'costFlag',this.costFlag)
            this.$set(this,'isFlag',this.isFlag)
            this.$set(this,'batch',this.batch)
            // console.log(this.batch)
            this.AllData.id = this.batch.join()
            this.AllData.surplusAmount = list.length > 0 ? list[0].surplusAmount : 0
            this.AllData.cost = cost
        },
        selectAllPage(a){
            this.isFlag = true
            if(a.length>0){
                this.getAll=true
            }
        },
        init(){
            this.reload()
            // this.findByCost()
        },
        reload(){
            // let page =  Number(window.localStorage.getItem('backPage'))||1
            // this.Filter = JSON.parse(window.localStorage.getItem("filterData"))|| {
            //     pageSize: 10,
            //     pageIndex:1
            // };
          let page =  1
console.log(this.User)
            if(JSON.parse(window.localStorage.getItem("filterData"))){
                page =  Number(window.localStorage.getItem('backPage'))
                this.Filter = JSON.parse(window.localStorage.getItem("filterData"))
            }else{
                page =  1
                this.Filter = { pageSize: 16,pageIndex:1}
            }
            this.Filter.organId = null
            this.Filter.userId= null
            if(this.Filter.punchDateGE){
                this.dateVal=[this.Filter.punchDateGE,this.Filter.punchDateLE]
            }
            if(this.Filter.markListStr){
                this.mark=this.Filter.markListStr.split(',')
            }
            if(this.Filter.userAffirmStr){
                this.useAffirm=this.Filter.userAffirmStr.split(',')
            }
            this.Page=page
            this.Get(page)
            this.findByCost()
            
        },
    },
    components: {

    },
    mounted(){
        this.init()
        //this.Filter = {}
        //this.Filter.userId = this.User.id
        //debugger
        this.Dp('main/FIND_BY_ORGAN_LIST',{}).then(data=>{
            if(data.code == '200'){
                 data.data.bussData.forEach(it=>{
                    if(it["organName"]){
                        this.organizations.push(it)
                    }
                })
            }
            this.organLoding = false
        })
    },
}
</script>