<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterBanner {
    
}
</style>
<template>
    <div class="CenterBanner o-ptb-l">
        <div class="block o-plr-l o-mt borderQueryParam">
            <!-- <span class="o-plr">姓名：</span>
            <el-input v-model="Filter.userNameLike" placeholder="请输入姓名" style="width:10rem;" clearable></el-input>
            <span class="o-plr">手机号：</span>
            <el-input v-model="Filter.userNameLike" placeholder="请输入手机号" style="width:10rem;" clearable></el-input>
            <span class="o-plr o-ml">打卡日期：</span>
             <el-date-picker v-model="Filter.daterange" class="o-mr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:13rem;" value-format="yyyy-MM-dd" :picker-options="DateRangePicker"></el-date-picker>
            <Button class="o-ml" @click="MakeFilter()">查询</Button> -->
            <!-- <Button class="o-ml" @click="MakeFilter()">导入</Button> -->
            <Button @click.stop="upload()">
                <span>导入</span>
                <!--<input :id="uploadId" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="uploadFile" ref="file" style="display:none;"> -->
                <input :id="uploadId" type="file" accept="application/vnd.ms-excel" @change="uploadFile" ref="file" style="display:none;">
            </Button>
            <Button class="o-ml" @click="export2Excel()">导出</Button>
            <Button type="none" @click="downloadTPL()" download="tpl">下载导入模板</Button>

             <el-date-picker
                v-model="year"
                type="year"
                placeholder="选择年">
            </el-date-picker>
        </div>
        <div class="block o-plr-l o-mt" >
            <el-table class="o-pt" :data="Main.list.slice((Main.pageIndex-1)*Main.pageSize,Main.pageIndex*Main.pageSize)"  v-loading="Main.loading" ref="table">
                <el-table-column type="selection" width="60"></el-table-column>
                <!-- <el-table-column prop="id" label="ID" width="70"></el-table-column> -->
                <!-- <el-table-column prop="idCard" label="账号" min-width="150"></el-table-column> -->
                <el-table-column label="序号" prop="no"   width="50" align="center"></el-table-column>
                <el-table-column prop="userName" label="姓名" min-width="150"></el-table-column>
                <el-table-column prop="sex" label="性别" min-width="150"></el-table-column>
                <el-table-column prop="birthDay" label="出生日期" min-width="150"></el-table-column>
                <el-table-column prop="idCard" label="身份证号" min-width="150"></el-table-column>
                <el-table-column prop="disabilityType" label="残疾类别" min-width="150"></el-table-column>
                <el-table-column prop="disabilityGrade" label="残疾等级" min-width="150"></el-table-column>
                <el-table-column prop="organName" label="康复机构" min-width="150"></el-table-column>
                <el-table-column prop="invoiceMoney" label="发票金额（元）" min-width="150"></el-table-column>
                <el-table-column prop="invoiceCode" label="发票号码" min-width="150"></el-table-column>
                <el-table-column prop="depositBank" label="开户银行" min-width="150"></el-table-column>
                <el-table-column prop="bankAccount" label="银行帐号" min-width="150"></el-table-column>
                <el-table-column prop="useCost" label="本次可报销金额（元）" min-width="150"></el-table-column>
                <!-- <el-table-column prop="amount" label="额度" min-width="150"></el-table-column>
                <el-table-column prop="useAmount" label="已使用金额" min-width="150"></el-table-column>
                <el-table-column prop="useIsCost" label="已报销金额" min-width="150"></el-table-column>
                <el-table-column prop="des" label="是否超标" min-width="150"></el-table-column> -->
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="Main.pageIndex"
                :page-sizes="[10, 20, 30, 50, 100]"
                :page-size="Main.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="Main.list.length">
            </el-pagination>
            <!-- <Pagination class="o-mtb" v-model="Page" @turning="Get" :total="Main.total"></Pagination> -->
        </div>
    </div>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.js'
export default {
    name: 'CenterBanner',
    mixins: [StoreMix],
    data() {
        return {
            store: 'main/banner',
            Main:{
                list:[],
                total:0,
                pageIndex:1,
                pageSize:10
            },
            Filter: {
                pageSize: 16,
            },
            uploadId: null,
            year: new Date(),
            punchClockId:null
        }
    },
    computed: {

    },
    methods: {
        
        // 每页多少条
        handleSizeChange(val) {
            this.Main.pageSize = val;
        },
        // 当前页
        handleCurrentChange(val) {
            this.Main.pageIndex = val;
        },


        export2Excel() {

            require.ensure([], () => {
                const { export_json_to_excel } = require('./vendor/Export2Excel');
                const tHeader =
                    [
                     '序号','姓名','性别', '出生日期', '身份证号', '残疾类别', '残疾等级', '康复机构', '发票金额（元）'
                     , '发票号码', '开户银行', '银行帐号', '本次可报销金额（元）'
                     , '额度', '已使用金额', '已报销金额', '是否超标'
                    ];
                const filterVal =
                    ['no','userName', 'sex','birthDay','idCard','disabilityType','disabilityGrade',
                    'organName','invoiceMoney','invoiceCode','depositBank'
                    ,'bankAccount','useCost','amount','useAmount','useIsCost',
                    'des'];  
                // const list =
                // [
                //     {id: 1, title: 2, author: 3, pageviews: 4, display_time: 5},
                //     {id: 6, title: 7, author: 8, pageviews: 9, display_time: 10},
                //     {id: 11, title: 12, author: 13, pageviews: 14, display_time: 15},
                //     ];
                var list  = this.$refs.table.selection.length > 0 ? this.$refs.table.selection: this.Main.list 
                const data = this.formatJson(filterVal, list);       
                export_json_to_excel(tHeader, data,'数据导入对比');
            })
      },
 
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },



        init(){
            this.reload()
        },
        reload(){
            this.Get()
        },
        upload(){
            this.$refs.file.click()
        },
        uploadFile(e){
            if(e){
                let files = this.$refs.file.files
                if(files[0] && files[0].size){
                    let form = new FormData()
                    form.append('file',files[0])
                    form.append('year',this.year.getFullYear())
                    this.Dp('main/DIFFERENCE_IMPORT',form).then(res=>{
                        debugger
                        if(!res.err){
                            this.Main.list = res.data.bussData
                            this.Main.total = res.data.bussData.length
                            this.Suc('操作成功')
                            this.Get(this.Main.page)
                        }
                    })
                    this.resetUpload()
                }
            }
        },
        resetUpload(){
            let uploadId = this.uploadId = this.Uuid()
            this.$nextTick(()=>{
                document.getElementById(uploadId).value = ''
            })
        },
        exportTable(){
            this.Dp('main/EXPORTS_PO_LOG',{}).then(buffer=>{
                if(buffer){
                    this.SaveBufferFile(buffer,'数据对比.xls','excel')
                }else{
                    this.Err('导出失败')
                }
            })
        },
        downloadTPL(){
            this.Dp('main/EXPORT_TEMPLATE').then(buffer=>{
                if(buffer){
                    this.SaveBufferFile(buffer,'数据对比导入模板.xls','excel')
                }else{
                    this.Err('导出失败')
                }
            })
        }
    },
    components: {

    },
    mounted(){
        this.init()
    },
}
</script>