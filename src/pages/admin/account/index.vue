<style lang="scss">
@import "@/assets/style/project/config.scss";
.AdminAccount {
    
}
</style>
<template>
    <div class="AdminAccount o-pt-l">
        <div class="block o-plr-l">
            <!-- <Button @click="exportList()" :loading="Main.editing" :disabled="!batch.length">导出列表</Button> -->

            <div class="block o-plr-l">
                <Button @click="exportList()" :loading="Main.editing" >导出</Button>
            </div>
            <!-- <el-dropdown 
            placement="bottom"
            trigger="click"
            @command="batchOperate"
            style="margin-right: 10px;"
          >
          <div class="block o-plr-l">
            <Button @click="exportList()" :loading="Main.editing" >导出列表</Button>
        </div>
            <Button  >
              导出列表
             <i class="el-icon-arrow-down el-icon--right"></i>
           </Button>
           <el-dropdown-menu slot="dropdown">
             <el-dropdown-item command="export_excel"
               >导出Excel</el-dropdown-item
             >
             <el-dropdown-item command="export_pdf"
               >导出PDF</el-dropdown-item
             >
           </el-dropdown-menu>
         </el-dropdown> -->

        </div>
        <div class="block o-plr-l o-mt">
            <span class="o-plr">姓名：</span>
            <el-input v-model="Filter.userNameLike" placeholder="请输入姓名" style="width:10rem;" clearable></el-input>
            <span class="o-plr o-ml">手机号：</span>
            <el-input v-model="Filter.mobileLike" placeholder="请输入手机号" style="width:10rem;" clearable></el-input>
            <span class="o-plr o-ml">身份证号：</span>
            <el-input v-model="Filter.idCardLike" placeholder="请输入身份证号" style="width:10rem;" clearable></el-input>            
           
            <Button class="o-ml" @click="MakeFilter()">查询</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <el-table class="o-pt" :data="Main.list" v-loading="Main.loading" @selection-change="tableSelection" ref="table">
                <el-table-column type="selection" width="60"></el-table-column>
                <el-table-column prop="userId" label="ID" width="70"></el-table-column>
                <el-table-column prop="idCard" label="身份证号" align="center"  min-width="140"></el-table-column>
                <el-table-column prop="mobile" label="手机号" align="center" min-width="120"></el-table-column>
                <el-table-column prop="userName" label="姓名" align="center" min-width="120">
                    <template slot-scope="scope">{{ scope.row.userName ? scope.row.userName : '-' }}</template>
                </el-table-column>
                <el-table-column prop="amount" label="额度" align="center"  min-width="100"></el-table-column>
                <el-table-column prop="useAmount" label="消费总额" align="center"  min-width="100">
                    <template slot-scope="scope">{{ scope.row.useAmount ? scope.row.useAmount : '0.00' }}</template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="scope">
                        <Button size="small" @click="EditPage(scope.row,'admin/account-id/record')" plain>查看</Button>
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
    name: 'AdminAccount',
    mixins: [StoreMix],
    data() {
        return {
            store: 'admin/institution_record',
            Filter: {
                name: null,
                pageSize: 16,
            },
            batch: [],
             
        }
    },
    computed: {

    },
    methods: {
        init(){
            this.reload()
        },
        reload(){
          let page =  1
            if(JSON.parse(window.localStorage.getItem("filterData"))&&JSON.parse(window.localStorage.getItem("filterData")).organId==this.User.id){
                page =  Number(window.localStorage.getItem('backPage'))
                this.Filter = JSON.parse(window.localStorage.getItem("filterData"))
            }else{
                page =  1
                this.Filter = { pageSize: 16}
            }
            this.Filter.organId = this.User.id
            this.Filter.userId=null
            this.Page=page
            this.Get(page)
        },
        tableSelection(list=[]){
            this.$set(this,'batch',[])
            for(let item of list){
                this.batch.push(item.userId)
            }
        },
        batchOperate(command) {
          switch (command) {
            case "export_pdf":
              this.exportPDF();
              break;
            case "export_excel":
              this.exportList();
              break;
         }
       },
	    exportPDF() {
            this.Dp('main/EXPORTS_PUNCH_PDF',{ ids: this.batch.join(), userId:this.User.id }).then(buffer=>{
                if(buffer){
                    this.SaveBufferFile(buffer,'用户列表.pdf','pdf')
                }else{
                    this.Err('导出失败')
                }
            }) 
       },
        exportList(){
            var data =  Object.assign(this.Filter,{ ids: this.batch})
            this.Dp('main/EXPORTS_PUNCH_EXCEL',data).then(buffer=>{
                if(buffer){
                    this.SaveBufferFile(buffer,'用户列表.pdf','pdf')
                }else{
                    this.Err('导出失败')
                }
            })
        },
    },
    components: {

    },
    mounted(){
        this.Filter.organId = this.User.id
        if(this.Filter.organId){
            this.init()
        }
    },
    created() {

    },
}
</script>