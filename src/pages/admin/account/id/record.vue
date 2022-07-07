<style lang="scss">
@import "@/assets/style/project/config.scss";
.AdminAccountIdRecord {
   .title {
        margin-left:.3rem; padding-left:.6rem; border-left:4px solid $color-t; height:1.8rem; line-height:1.4rem; font-size:.8rem;
    }
    .row-item {
        flex:0 0 25%; height:2rem; line-height:2rem;
    }
    .borderQueryParam{
        border: 1px solid #BBBBBB;
    }
}
</style>
<template>
    <section class="AdminAccountIdRecord o-pt-l">
        <div class="block-n">
            <div class="o-p-l">
                <el-page-header @back="Rd($route.meta.rollback)" content="账户详情"></el-page-header>
            </div>
            <div class="o-p-l u-bt" v-if="Target">
                <div class="title o-mb">基本信息</div>
                <ul class="l-flex" style="min-width:768px; max-width:1440px; flex-wrap:wrap;">
                    <li class="row-item" v-for="item in keys">
                        <span class="c-color-g o-pr-s" style="width:3.6rem; display:inline-block;">{{ item.title }}</span>
                        <span v-if="item.name == 'city'">{{ Target.province }}{{ Target.city }}{{ Target.district }}</span>
                        <span v-else>{{ Target[item.name] != undefined ? Target[item.name] : '-' }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="block-n o-p-l o-mt">
            <div class="title">
                打卡记录
                <!-- <Button style="background-color: #6FCDC8 !important;margin-left:60px;">未报销金额：{{Target.wbxAmount}}</Button> 
                <Button style="background-color: #6FCDC8 !important;">已报销金额：{{Target.ybxAmount}}</Button> -->

                   <Button style="background-color: #6FCDC8 !important;margin-left:60px;">未报销金额：{{costData.notCost}}</Button> 
                <Button style="background-color: #6FCDC8 !important;">已报销金额：{{costData.isCost}}</Button>
            </div>
            <div class="block o-plr-l o-mt borderQueryParam">
                <span class="o-plr o-ml">打卡日期：</span>
                <el-date-picker v-model="dateVal" @change="changeDate" class="o-mr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:13rem;" value-format="yyyy-MM-dd" :picker-options="DateRangePicker"></el-date-picker>

                <span class="o-plr">状态：</span>
                <el-select clearable v-model="Filter.costStatus" placeholder="请选择" style="width:8rem;">
                    <el-option v-for="(item,index) in costStausList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <span class="o-plr o-ml">用户确认：</span>
                <el-select clearable v-model="useAffirm" multiple collapse-tags placeholder="请选择" style="width:8rem;" @change="changeUseAffirm">
                    <el-option v-for="(item,index) in useAffirmList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <Button class="o-ml" @click="MakeFilter();findByCost()">查询</Button>
            </div>
            <el-table class="o-pt" :data="Main.list" v-loading="Main.loading" ref="table">
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <el-table-column prop="punchDate" label="日期" align="center" width="150"></el-table-column>
                <el-table-column prop="organName" label="机构名称"></el-table-column>
                <el-table-column prop="" label="到达打卡" align="left" min-width="200">
                    <template slot-scope="scope">
                        <div class="l-flex-c" v-if="scope.row.arrivePunchTime">
                            <div v-if="scope.row.arriveUrl">
                                <el-image :src="scope.row.arriveUrl" :previewSrcList="[scope.row.arriveUrl]" fit="fill" style="width:80px; height:80px;"></el-image>
                            </div>    
                            <div v-else>
                                暂无图片
                            </div>
                            <div class="l-flex-1 o-pl">
                                <div>时间: {{ scope.row.arrivePunchTime }}</div>
                                <div>地点: {{ scope.row.arriveSite }}</div>
                            </div>
                        </div>
                        <div v-else class="c-color-g">暂未打卡</div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="离开打卡" align="left" min-width="200">
                    <template slot-scope="scope">
                        <div class="l-flex-c" v-if="scope.row.leavePunchTime">
                            <div v-if="scope.row.leaveUrl">
                                <el-image :src="scope.row.leaveUrl" :previewSrcList="[scope.row.leaveUrl]" fit="fill" style="width:80px; height:80px;"></el-image>
                            </div>
                            <div v-else>
                                暂无图片
                            </div>
                            <div class="l-flex-1 o-pl">
                                <div>时间: {{ scope.row.leavePunchTime }}</div>
                                <div>地点: {{ scope.row.leaveSite }}</div>
                            </div>
                        </div>
                        <div v-else class="c-color-g">暂未打卡</div>
                    </template>
                </el-table-column>
                <el-table-column prop="cost" label="服务费用" align="center">                   
                </el-table-column>
              
                <el-table-column prop="serviceDuration" label="服务时长" align="center">
                </el-table-column>
                <el-table-column prop="serviceContent" label="服务内容" align="center">
                </el-table-column>
                
                <el-table-column prop="" label="状态">
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
                <el-table-column prop="remark" label="备注" >
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <div style="display: flex;">
                            <!-- <Button size="small" @click="EditPage(scope.row,'admin/account-id/record/edit')" :plain="!!scope.row.serviceItem"> -->
                            <Button size="small" v-if="scope.row.useAffirm == 'L' || scope.row.useAffirm == 'D'|| scope.row.useAffirm == 'K'" @click="EditPage(scope.row,'admin/account-id/record/edit')" :plain="!!scope.row.serviceItem">
                                <!-- <span v-if="scope.row.useAffirm == 'L' && scope.row.serviceContent">编辑</span> -->
                                <span >录入</span>
                            </Button>
                            <Button size="small" @click="EditPage(scope.row,'admin/account-id/record/details')" :plain="!!scope.row.serviceItem">
                                <span >查看</span>
                            </Button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="o-mtb" v-model="Page" @turning="Get" :total="Main.total"></Pagination>
        </div>
    </section>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.js'
import DateRange from '@/plugins/mixin/daterange'
export default {
    name: 'AdminAccountIdRecord',
    mixins: [StoreMix,DateRange],
    data() {
        return {
            useAffirm:[],
            store: 'admin/clock_admin',
            Filter: {
                pageSize: 16,
                organId: null, 
                userId: null,
            },
            organizations:[],
             
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
            keys: [
                { name:'userName', title:'姓名' },
                { name:'birthday', title:'出生日期' },
                { name:'mobile', title:'手机号' },
                { name:'idCard', title:'身份证号' },
                { name:'disabilityGrade', title:'残疾类型' },
                { name:'disabilityType', title:'残疾等级' },
                { name:'city', title:'户籍' },
                { name:'street', title:'街道' },
                { name:'communityName', title:'社区名称' },
                { name:'amount', title:'额度' },
                { name:'remarks', title:'备注' },
            ],
            Target:{},
            dateVal:"",
            costData:{
                isCost:0,
                notCost:0,
            },
        }
    },
    computed: {
        // Target(){
        //     return this.$store.state.admin['institution_record'].item
        // },
    },
    created(){
        this.Filter.userId = this.$route.params.userId * 1
    },
    methods: {
        changeUseAffirm(){
                if(this.useAffirm.indexOf('')==-1){
                this.Filter.userAffirmStr=this.useAffirm.join()
            }else{
                this.Filter.useAffirm=''
            }
        },
        changeDate(){
            if(this.dateVal){
                this.Filter.punchDateGE  = this.dateVal[0]
                this.Filter.punchDateLE = this.dateVal[1]
            }else{
                this.Filter.punchDateGE  = ''
                this.Filter.punchDateLE = ''
            }
        },
        init(){
            var _this = this
            // setTimeout(function(){
                // _this.Filter.userId = _this.$route.params.userId * 1
                _this.getDeta()
                _this.reload()
                _this.findByCost()
            // },500)
        },
        reload(){
           
            let { id } = this.$route.params
            let page =1
            if(JSON.parse(window.localStorage.getItem("secfilterData"))&&
            JSON.parse(window.localStorage.getItem("secfilterData")).userId==this.$route.params.userId
            &&JSON.parse(window.localStorage.getItem("secfilterData")).organId==this.User.id){
                page =  Number(window.localStorage.getItem('secBackPage'))
                this.Filter = JSON.parse(window.localStorage.getItem("secfilterData"))
            }else{
                page =  1
                this.Filter = { pageSize: 16}
            }

            if(!this.Target && id){
                this.Item(id,'account')
            }
            this.Filter.userId=this.$route.params.userId * 1,
            this.Filter.organId=this.User.id
            // this.Filter.organId=null
            this.Page=page
            this.Get(page)
        },
        getDeta(){
             this.Dp('admin/USER_ID_DETA',this.$route.params.userId).then(res=>{
                if(!res.err){
                    res.data.bussData.noAmount = res.data.bussData.useAmount - res.data.bussData.expAmount 
                     Object.assign(this.Target,res.data.bussData)
                    this.Target = res.data.bussData
                   // this.Target =
                }
            })
        },
          findByCost(){
            this.Filter.userId = this.$route.params.userId * 1
            // let data={
            //     userId:this.Filter.userId,
            //     punchDateGE:this.Filter.punchDateGE,
            //     punchDateLE:this.Filter.punchDateLE
            // }
            this.Dp('main/FIND_BY_COST',this.Filter).then(data=>{
                console.log(data)
                if(data.code == '200'){
                    this.costData.isCost = data.data.bussData.isCost
                    this.costData.notCost = data.data.bussData.notCost
                }
            })
        },
    },
    components: {

    },
    activated(){
        this.init()
    },
}
</script>