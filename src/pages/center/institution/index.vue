<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterInstitution {
    
}
</style>
<template>
    <div class="CenterInstitution o-pt-l">
        <div class="block o-plr-l">
            <Button @click="EditPage(null,'center/institution-id')">新增机构</Button>
            <Divider></Divider>
            <Button @click="exportList()" :loading="loadEcporting" :disabled="loadEcporting">导出机构</Button>


        </div>
        <div class="block o-plr-l o-mt">
            <span class="o-plr">机构名称：</span>
            <el-input v-model="Filter.organNameLike" placeholder="请输入机构名称" style="width:10rem;" clearable></el-input>
            <Button class="o-ml" @click="MakeFilter()">查询</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <el-table class="o-pt" :data="Main.list" v-loading="Main.loading" @selection-change="tableSelection" ref="table">
                <el-table-column type="selection" width="60"></el-table-column>
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <!-- <el-table-column prop="" label="服务类别"></el-table-column> -->
                <el-table-column width="180" label="封面图" align="center">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.coverUrl" :previewSrcList="[scope.row.coverUrl]" fit="contain" style="width:160px; height:90px;"></el-image>
                    </template>
                </el-table-column>      
                <el-table-column prop="organName" label="名称" align="center" min-width="100"></el-table-column>
                <el-table-column prop="servesStr" label="服务类别" align="center" min-width="100"></el-table-column>
                <el-table-column prop="punchUserTotal" label="服务用户数"></el-table-column>
                <el-table-column prop="expendTotal" label="消费总额"></el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <span>
                            {{
                                scope.row.status == "y" ? "停用":"启用"
                            }}
                        </span>
                    </template>

                </el-table-column>
                <el-table-column prop="gmtCreated" label="创建时间" min-width="150"></el-table-column>
                <el-table-column label="操作" align="center" width="350">
                    <template slot-scope="scope">
                        <Button size="small" v-if="scope.row.status == 'y'" @click="updateStatus(scope.row,'n')" plain>启用</Button>
                        <Button size="small" v-if="scope.row.status == 'n'" @click="updateStatus(scope.row,'y')" plain>停用</Button>
                        <Button size="small" @click="EditPage(scope.row,'center/institution-id/query_record')" plain>查看</Button>
                        <Button size="small" @click="EditPage(scope.row,'center/institution-id/record')" plain>记录</Button>
                        <Button size="small" @click="EditPage(scope.row,'center/institution-id')" plain>编辑</Button>
                        <Button size="small" type="danger" @click="Del(scope.row)" plain>删除</Button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="o-mtb" v-model="Page" @turning="Get" :total="Main.total"></Pagination>
        </div>
    </div>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.js'
export default {
    name: 'CenterInstitution',
        mixins: [StoreMix],
    data() {
        return {
            store: 'main/institution',
            Filter: {
                pageSize: 10,
            },
            loadEcporting:false,
            batch: [],
        }
    },
    computed: {

    },
    methods: {
        // findByCost(){
        //     this.Dp('main/FIND_AMOUNT',this.Filter).then(data=>{
        //         if(data.code == '200'){
        //             this.fundAmount = data.data.bussData.fundAmount
        //             // this.Target.expAmount = data.data.bussData.isCost
        //             // this.Target.noAmount = data.data.bussData.notCost
        //         }
        //     })
        // },
        updateStatus(rows,status){
            this.Dp('main/UPDATE_STATUS',{ ids: [rows.id], status:status }).then(res=>{
                if(res.code == 200){
                    this.reload()
                }
            })
            
        },
        init(){
            this.reload()
        },
        reload(){
            let page =  Number(window.localStorage.getItem('backPage'))||1

            this.Page=page
            this.Get(page)
        },
        tableSelection(list=[]){
            this.$set(this,'batch',[])
            for(let item of list){
                this.batch.push(item.id)
            }
        },
        exportList(){
            this.loadEcporting=true
            this.Dp('main/EXPORTS_INSTITUTION',{ ids: this.batch.join(), userId:this.User.id }).then(buffer=>{
                if(buffer){
                    this.SaveBufferFile(buffer,'机构列表.xls','excel')
            this.loadEcporting=false
                }else{
                    this.Err('导出失败')
            this.loadEcporting=false
                }
            })
        },
    },
    components: {

    },
    mounted(){
        console.log(window.localStorage.getItem('filterData'))
        this.Filter = JSON.parse(window.localStorage.getItem('filterData'))||this.Filter

        this.init()
        // this.findByCost()
    },
}
</script>