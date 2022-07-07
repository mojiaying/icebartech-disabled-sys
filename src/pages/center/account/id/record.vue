<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterAccountIdRecord {
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
    <section class="CenterAccountIdRecord o-pt-l">
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
                <Button  @click="exportList()">导出康复服务记录</Button>
                <Button  @click="insertPage('center/account-id/record/insert')" >添加打卡记录</Button>
                <Button style="background-color: #6FCDC8 !important;margin-left:60px;">未报销金额：{{costData.notCost}}</Button> 
                <Button style="background-color: #6FCDC8 !important;">已报销金额：{{costData.isCost}}</Button>
            </div>
            <div class="block o-plr-l o-mt borderQueryParam">
                <span class="o-plr">打卡机构：</span>
                <el-select clearable v-model="Filter.organId" placeholder="请选择" style="width:8rem;">
                    <el-option v-for="(item,index) in organizations" :key="item.id" :label="item.organName" :value="item.id"></el-option>
                </el-select>
                <span class="o-plr o-ml">打卡日期：</span>
                    <el-date-picker v-model="dateVal" @change="changeDate" class="o-mr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:13rem;" value-format="yyyy-MM-dd" :picker-options="DateRangePicker"></el-date-picker>
                <span class="o-plr o-ml">状态：</span>
                <el-select clearable v-model="Filter.costStatus" placeholder="请选择" style="width:8rem;">
                    <el-option v-for="(item,index) in costStausList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                 <span class="o-plr o-ml">标记</span>
                <el-select clearable v-model="Filter.mark" placeholder="请选择" style="width:8rem;" >
                    <el-option v-for="(item,index) in markList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>     
                <Button class="o-ml" @click="MakeFilter();findByCost()">查询</Button>
            </div>
            <el-table class="o-pt" :data="Main.list" @selection-change="tableSelection"  v-loading="Main.loading" ref="table">
                <el-table-column type="selection" width="60"></el-table-column>
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <el-table-column prop="punchDate" label="日期" align="center" width="150"></el-table-column>
                <el-table-column prop="organName" label="机构名称"></el-table-column>
                <el-table-column prop="amount" label="额度" align="center"></el-table-column>
                <el-table-column prop="cost" label="金额" align="center"></el-table-column>

                <!-- <el-table-column prop="useAmount" label="已使用金额" align="center">
                    <template slot-scope="scope">{{ scope.row.useAmount  ? scope.row.useAmount  : '0.00' }}</template>
                </el-table-column>
                 <el-table-column prop="expAmount" label="已报销金额" align="center">
                    <template slot-scope="scope">{{ scope.row.expAmount ? scope.row.expAmount : '0.00' }}</template>
                </el-table-column> -->
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
                            <div v-if="scope.row.arriveUrl">
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

                <el-table-column prop="" label="打卡类型">
                     <template slot-scope="scope">
                        <span>
                            {{
                                scope.row.punchType == "P" ? "拍照打卡":"人脸识别"
                            }}
                        </span>
                    </template>
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
                <el-table-column prop="remark" label="备注" min-width="100"></el-table-column>

                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <Button size="small" v-if="scope.row.costStatus != 'Y' && scope.row.useAffirm == 'Y' "  @click="reimbursement(scope.row,'Y')" plain>报销</Button>
                        <Button v-if="scope.row.costStatus == 'Y' && scope.row.useAffirm == 'Y'" size="small" @click="reimbursement(scope.row,'N')" plain>取消报销</Button>
                        <Button size="small" @click="EditPage(scope.row,'center/account-id/record/details')" plain>查看</Button>
                        <Button size="small" @click="EditPage(scope.row,'center/account-id/record/edit')" plain>编辑</Button>
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
    name: 'CenterAccountIdRecord',
    mixins: [StoreMix,DateRange],
    data() {
        return {
            dateVal:"",
            organizations:[
                
            ],//打卡机构    
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
                }
            ],//标记    
            costData:{
                isCost:0,
                notCost:0,
            },
            store: 'main/clock',
            Filter: {
               pageSize: 16,
            },

            batch: [],
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
        }
    },
    computed: {
        Target(){
            return this.$store.state.main['account'].item
        },
    },
    mounted(){
        this.Filter.userId = this.$route.params.id * 1
        this.dateVal=[this.Filter.punchDateGE,this.Filter.punchDateLE]
        this.Dp('main/FIND_BY_ORGAN_LIST_BYID',{id:this.$route.params.id}).then(data=>{
            if(data.code == '200'){
                this.organizations = data.data.bussData
            }
        })
        this.reload()
    },
    methods: {
        insertPage(name){
            this.Go(name,{id:this.$route.params.id})
        },
        findByCost(){
            console.log(this.$route.params.id)
            this.Filter.userId = this.$route.params.id * 1
            this.Dp('main/FIND_BY_COST',this.Filter).then(data=>{
                if(data.code == '200'){
                    this.costData.isCost = data.data.bussData.isCost
                    this.costData.notCost = data.data.bussData.notCost
                }
            })
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
        tableSelection(list=[]){
            this.$set(this,'batch',[])
            for(let item of list){
                this.batch.push(item.id)
            }
        },
        reimbursement(row,costStatus){//报销
            let _str = costStatus == 'Y' ? '确认' : '取消'
            let  confirmText = [`账户余额：${this.Target.amount||0}元`,  `${_str}报销项目服务费用${row.cost||0}元？`],_this = this 
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
                    _this.Dp('main/UPDATE_COST_STATUS',{ ids: row.id, "costStatus":costStatus }).then(data=>{
                        if(data){
                            history.go(0)
                            this.Suc('操作成功')
                        }else{
                            _this.Err('报销失败')
                        }
                    })
                }).catch(() => {
               
            })
        },
        exportList(){
            var data = {}
            Object.assign(data,this.Filter,{ ids: this.batch, userId:this.$route.params.id, loginId:this.User.id })
            this.Dp('main/EXPORTS_PUNCH',data).then(buffer=>{
                if(buffer){
                    this.SaveBufferFile(buffer,'康复服务记录.xls','excel')
                }else{
                    this.Err('导出失败')
                }
            })
        },
        init(){
            var _this = this
            // setTimeout(function(){
                // _this.Filter.userId = _this.$route.params.id * 1
                _this.reload()
                _this.findByCost()
            // },500)

        },
        reload(){
            let { id } = this.$route.params
            if(!this.Target && id){
                this.Item(id,'account') 
            }
            
            let page =1

            if(JSON.parse(window.localStorage.getItem("secfilterData"))&&
            JSON.parse(window.localStorage.getItem("secfilterData")).userId==this.$route.params.id){
                page =  Number(window.localStorage.getItem('secBackPage'))
                this.Filter = JSON.parse(window.localStorage.getItem("secfilterData"))
            }else{
                page =  1
                this.Filter = { pageSize: 16}
            }
            if(this.Filter.punchDateGE){
                this.dateVal=[this.Filter.punchDateGE,this.Filter.punchDateLE]
            }
            this.Filter.userId=this.$route.params.id * 1
            this.Filter.organId=null
            this.Page=page
            this.Get(page)

           

          
            
        },
    },
    components: {

    },
    activated(){
        this.init()
    },
}
</script>