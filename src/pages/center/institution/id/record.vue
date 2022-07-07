<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterInstitutionIdRecord {
    
}
</style>
<template>
    <div class="CenterInstitutionIdRecord o-pt-l">
        <div class="block-n">
            <div class="o-p-l">
                <el-page-header @back="Rd($route.meta.rollback)" content="服务记录"></el-page-header>
            </div>
        </div>
        <div class="block o-plr-l">
            <Button @click="exportList()"  :loading="downLoadingList" :disabled="downLoadingList" >导出康复服务记录</Button>
            <Button @click="exportOrganExcelService()"  :disabled="downLoading" :loading="downLoading"  >导出经费汇总表</Button>

            <Button style="background-color: #6FCDC8 !important;margin-left:60px;">金额：{{fundAmount}}</Button> 
            <!-- <Button style="background-color: #6FCDC8 !important;margin-left:60px;">未报销金额：{{notBxAmount}}</Button>  -->

        </div>
        <div class="block o-plr-l o-mt">
            <span class="o-plr">姓名：</span>
            <el-input v-model="Filter.userName" placeholder="请输入姓名" style="width:10rem;" clearable></el-input>
            <span class="o-plr">身份证号：</span>
            <el-input v-model="Filter.idCard" placeholder="请输入身份证号" style="width:10rem;" clearable></el-input>
             <!-- <span class="o-plr o-ml">服务日期：</span>
            <el-date-picker v-model="dateVal" @change="changeDate" class="o-mr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:13rem;" value-format="yyyy-MM-dd" :picker-options="DateRangePicker"></el-date-picker> -->
            <span class="o-plr">状态：</span>
            <el-select clearable v-model="Filter.costStatus" placeholder="请选择" style="width:8rem;">
                <el-option v-for="(item,index) in costStausList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <span class="o-plr o-ml">用户确认：</span>
             <el-select clearable v-model="useAffirm" multiple collapse-tags placeholder="请选择" style="width:8rem;" @change="changeUseAffirm">
                <el-option v-for="(item,index) in useAffirmList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <div style="margin-top: 10px;">
                <span class="o-plr">标记：</span>
                <el-select clearable v-model="mark" multiple collapse-tags placeholder="请选择" style="width:10rem;" @change="changeMark">
                    <el-option v-for="(item,index) in markList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            <span class="o-plr o-ml">打卡日期</span>
            <el-date-picker v-model="dateVal" @change="changePickDate" class="o-mr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:13rem;" value-format="yyyy-MM-dd" :picker-options="DateRangePicker"></el-date-picker>
            <Button class="o-ml" @click="MakeFilter();findByCost()">查询</Button>
            </div>
            <Divider></Divider>
        </div>
        <div class="block o-plr-l o-mt">
            <el-table class="o-pt" :data="Main.list" @selection-change="tableSelection" ref="table">
                <el-table-column type="selection" width="60"></el-table-column>
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <el-table-column prop="organName" label="机构名称" align="center"></el-table-column>
                <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
                <el-table-column prop="birthday" label="出生日期" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
                <el-table-column prop="idCard" label="身份证" align="center" min-width="125"></el-table-column>
                <el-table-column prop="disabilityType" label="残疾类型" align="center"></el-table-column>
                <el-table-column prop="disabilityGrade" label="残疾等级" align="center"></el-table-column>
                <el-table-column prop="amount" label="额度" align="center"></el-table-column>
                <!-- <el-table-column prop="serviceItem" label="服务项目" align="center"></el-table-column> -->
                <el-table-column prop="cost" label="服务费用" align="center">
                    <template slot-scope="scope">{{ scope.row.cost ? scope.row.cost + '元' : '-' }}</template>
                </el-table-column>
                <el-table-column prop="serviceContent" label="服务内容" align="center"></el-table-column>
                <!-- <el-table-column prop="useAmount" label="消费总额" align="center"></el-table-column> -->
                <el-table-column prop="useOwnOrgAmount" label="消费总额" align="center"></el-table-column>
                
                <el-table-column prop="punchDate" label="打卡日期" align="center"></el-table-column>
                <el-table-column prop="mark" label="标记" align="center">
                    <template slot-scope="scope">
                        <span>
                            {{
                                scope.row.mark == "admin" ? "后台录入":(
                                    scope.row.mark == "slaver" ? "机构录入":"小程序录入"
                                )
                            }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="costStatus" label="状态" min-width="100">
                     <template slot-scope="scope">
                        <span>
                            {{
                                scope.row.costStatus == "Y" ? "已报销":"未报销"
                            }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="用户确认">
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
                <el-table-column label="服务时长" align="center">
                    <template slot-scope="scope">{{ scope.row.serviceDuration ? scope.row.serviceDuration + '分钟' : '-' }}</template>
                </el-table-column>
            </el-table>
            <Pagination  class="o-mtb" v-model="Page" @turning="Get" :total="Main.total"></Pagination>
        </div>
    </div>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.js'
import DateRange from '@/plugins/mixin/daterange'
export default {
    name: 'CenterInstitutionIdRecord',
    mixins: [StoreMix,DateRange],
    data() {
        return {
            store: 'main/institution_record',
            downLoadingList:false,
            downLoading:false,
            Filter: {
                pageSize: 16,
            },
            batch: [],
            mark:[],
            dateVal:'',
            useAffirm:[],
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
                
            ],
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
                },
            ],
            fundAmount:0,
            notBxAmount:0

        }
    },
  
    computed: {

    },
    methods: {
        findByCost(){
            this.Dp('main/FIND_AMOUNT',this.Filter).then(data=>{
                if(data.code == '200'){
                    this.fundAmount = data.data.bussData.fundAmount
                    this.notBxAmount = data.data.bussData.notBxAmount
                }
            })
        },
        changeUseAffirm(){
            if(this.useAffirm.indexOf('')==-1){
                this.Filter.userAffirmStr=this.useAffirm.join()
            }else{
                this.Filter.useAffirm=''
            }
        },
        changeMark(){
            this.Filter.markListStr=this.mark.join()
        },
        changeDate(){
            if(this.dateVal){
                this.Filter.serviceDateGE  = this.dateVal[0]
                this.Filter.serviceDateLE = this.dateVal[1]
            }else{
                this.Filter.serviceDateGE  = ''
                this.Filter.serviceDateLE = ''
            }
        },
        changePickDate(){
            if(this.dateVal){
                this.Filter.serviceDateGE  = this.dateVal[0]
                this.Filter.serviceDateLE = this.dateVal[1]
            }else{
                this.Filter.serviceDateGE  = ''
                this.Filter.serviceDateLE = ''
            }
        },
        init(){
            //this.id = this.Filter.organId = this.$route.params.id
            var _this = this

            // setTimeout(function(){
            _this.findByCost()
            _this.Get(1)
            // },500)
            
        },
        tableSelection(list=[]){
            this.$set(this,'batch',[])
            for(let item of list){
                this.batch.push(item.id)
            }
        },
        exportList(){
              if(!this.Filter.serviceDateGE||!this.Filter.serviceDateLE){
                this.Err('请选择导出时间,时间不超过90天')
                return
            }
            let start  = new Date(this.Filter.serviceDateGE.replace(/-/g,"/")).getTime();
            let end = new Date(this.Filter.serviceDateLE.replace(/-/g,"/")).getTime();
            console.log(start,end,this.Filter.serviceDateGE,this.Filter.serviceDateLE)
            if(end - start  > 93*24*60*60*1000){
                this.Err('导出时间范围超过90天,请分段导出')
                return
            }
            var data = {}
            this.downLoadingList = true
            Object.assign(data,this.Filter,{ ids: this.batch, loginId:this.User.id,})
            this.Dp('main/EXPORTS_RECORD',data).then(buffer=>{
                if(buffer){
                    this.SaveBufferFile(buffer,'导出康复服务记录.xls','excel')
                }else{
                    this.Err('导出失败')
                }
            this.downLoadingList = false

            }).catch(err=>{
            this.downLoadingList = false

            this.Err('导出失败')
            })
        },
        exportOrganExcelService(){
            //   if(!this.Filter.serviceDateGE||!this.Filter.serviceDateLE){
            //     this.Err('请选择导出时间,时间不超过90天')
            //     return
            // }
            // let start  = new Date(this.Filter.serviceDateGE.replace(/-/g,"/")).getTime();
            // let end = new Date(this.Filter.serviceDateLE.replace(/-/g,"/")).getTime();
            // if(end - start  > 93*24*60*60*1000){
            //     this.Err('导出时间范围超过90天,请分段导出')
            //     return
            // }
            var data = {
                // userNameLike:this.Filter.userName,
                //  idCard:this.Filter.idCard,
                //  serviceDateGE:this.Filter.serviceDateGE,
                // serviceDateLE:this.Filter.serviceDateLE,
                //mobileLike:this.Filter.mobile,
                //  organId:this.Filter.organId,
            }
                this.downLoading = true

            
            Object.assign(data,this.Filter,{ ids: this.batch, loginId:this.User.id,})
            this.Dp('main/EXPORT_ORGAN_EXCEL_SERVICE',data).then(buffer=>{
                if(buffer){
                    this.SaveBufferFile(buffer,'导出康复经费汇总表.xls','excel')
                }else{
                    this.Err('导出失败')
                }
            this.downLoading = false

            }).catch(err=>{
                this.downLoading = false
                // let msg= String.fromCharCode.apply(null, new Uint8Array(err));
                // console.log(msg)
                // let data = JSON.parse(msg)
                // this.Err(data.data.errMsg)
                this.Err('导出失败')
            })
        },
    },
    components: {

    },
    activated(){
        this.init()
    },
    mounted(){
         //this.id = this.Filter.organId = this.$route.params.id
    },
    created() {
        this.Filter.organId = this.$route.params.id
    },
}
</script>