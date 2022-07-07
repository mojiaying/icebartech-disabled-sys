<style lang="scss">
@import "@/assets/style/project/config.scss";

/*鼠标移入某行时的背景色*/
.downloadClass:hover{
   color: #92cbf1;
}
</style>
<template>
    <div class="CenterAccount o-pt-l" v-loading="importing" element-loading-text="导入中，请暂停操作">
        <div class="block o-plr-l">
            <Button @click="EditPage(null,'center/account-id')">新录入</Button>
            <Divider></Divider>
            <Button @click.stop="upload()">
                <span>导入账户</span>
                <!--<input :id="uploadId" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="uploadFile" ref="file" style="display:none;"> -->
                <input :id="uploadId" type="file" accept="application/vnd.ms-excel" @change="uploadFile" ref="file" style="display:none;">
            </Button>            
            <Button  type="none" @click="downloadTPL()" download="tpl">
                <a href="#" class="downloadClass">下载导入模板</a></Button>
            <Button  type="none" @click="downloadTPL1()" download="tpl">
                <a href="#" class="downloadClass">下载导入经费模版</a>
            </Button>
            <Divider></Divider>
            <!-- <Button @click="exportList()" :loading="Main.editing" :disabled="!batch.length">导出列表</Button> -->
             <el-dropdown 
            placement="bottom"
            trigger="click"
            @command="batchOperate"
            style="margin-right: 10px;"
          >
            <Button >
              用户基本信息表导出表
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
         </el-dropdown>

            <Button @click.stop="upload1()" :loading="Main.editing" type="success">
                <span>导入经费</span>
                <!--<input :id="uploadId" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="uploadFile" ref="file" style="display:none;"> -->
                <input :id="punchClockId" type="file" accept="application/vnd.ms-excel" @change="uploadPunchClockFile" ref="file1" style="display:none;">
            </Button>
            <Button @click="exportUserInfo" :loading="Main.editing" type="success" >导出康复经费汇总表</Button>
            <Button @click="activate(true)" :loading="Main.editing" type="success" :disabled="!batch.length">激活账户</Button>
            <Button @click="activate(false)" :loading="Main.editing" type="warning" :disabled="!batch.length">冻结账户</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <span class="o-plr">姓名：</span>
            <el-input v-model="Filter.userNameLike" placeholder="请输入姓名" style="width:10rem;" clearable></el-input>
            <span class="o-plr o-ml">手机号：</span>
            <el-input v-model="Filter.mobileLike" placeholder="请输入手机号" style="width:10rem;" clearable></el-input>
            <span class="o-plr o-ml">身份证号：</span>
            <el-input v-model="Filter.idCardLike" placeholder="请输入身份证号" style="width:10rem;" clearable></el-input>  
            <!-- 街道、社区、“出生日期”、           -->
            <span class="o-plr o-ml">街道：</span>
            <el-input v-model="Filter.streetLike" placeholder="请输入街道" maxlength="1024" style="width:10rem;" clearable></el-input>
            <div style="margin-top:10px">
            <span class="o-plr o-ml">社区名称：</span>
            <el-input v-model="Filter.communityNameLike" placeholder="请输入社区名称" maxlength="1024" style="width:10rem;" clearable></el-input>
            <span class="o-plr o-ml">出生日期：</span>
              <el-date-picker
                v-model="birthday"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeBirthday"
                value-format="yyyy-MM-dd">
                </el-date-picker>
            <!-- <el-date-picker v-model="Filter.birthday" type="date" value-format="yyyy-MM-dd" style="width:10rem;" placeholder="请选择出生日期"></el-date-picker> -->
            <span class="o-plr o-ml">残疾类型：</span>
            <el-select v-model="Filter.disabilityTypeStr">
                <el-option :value="''" label="全部"></el-option>
                <el-option v-for="(item,index) in disTypeList" :label="item.content" :value="item.content" :key="'type'+index"></el-option>
            </el-select>
            <!-- <el-input v-model="Filter.disabilityType" placeholder="请输入残疾类型" maxlength="24" style="width:10rem;" clearable></el-input> -->
            <span class="o-plr o-ml">残疾等级：</span>
            <!-- <el-input v-model="Filter.disabilityGrade" placeholder="请输入残疾等级" maxlength="24" style="width:10rem;" clearable></el-input> -->
            <el-select v-model="Filter.disabilityGradeStr" placeholder="请选择残疾等级" >
                <el-option value="">全部</el-option>
                <el-option value="一级">一级</el-option>
                <el-option value="二级">二级</el-option>
                <el-option value="三级">三级</el-option>
                <el-option value="四级">四级</el-option>
                <el-option value="未评级">未评级</el-option>
            </el-select>
            </div>
            <div style="margin-top:10px">
            <span class="o-plr o-ml">是否冻结：</span>
            <el-select v-model="Filter.isActivate" placeholder="请选择是否冻结" >
              <el-option value="">全部</el-option>
              <el-option value="y" label="未冻结"></el-option>
              <el-option value="n" label="已冻结"></el-option>
            </el-select>


            <Button class="o-ml" @click="MakeFilter()">查询</Button>
            </div>
        </div>
        <div class="block o-plr-l o-mt">
            <el-table :data="Main.list" v-loading="Main.loading" @selection-change="tableSelection" ref="table">
                <el-table-column type="selection" width="60"></el-table-column>
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <el-table-column prop="idCard" label="身份证号" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
                <el-table-column prop="userName" label="姓名" align="center">
                    <template slot-scope="scope">{{ scope.row.userName ? scope.row.userName : '-' }}</template>
                </el-table-column>
                <!-- <el-table-column prop="userName" label="账号" align="center" width="150"></el-table-column> -->
                <el-table-column prop="amount" label="额度" align="center"></el-table-column>
                <el-table-column prop="useAmount" label="已使用金额" align="center">
                    <template slot-scope="scope">{{ scope.row.useAmount  ? scope.row.useAmount  : '0.00' }}</template>
                </el-table-column>
                 <el-table-column prop="expAmount" label="已报销金额" align="center">
                    <template slot-scope="scope">{{ scope.row.expAmount ? scope.row.expAmount : '0.00' }}</template>
                </el-table-column>
                <el-table-column prop="street" label="街道" align="center">
                </el-table-column>
                <el-table-column prop="communityName" label="社区" align="center">
                </el-table-column>
                <el-table-column prop="birthday" label="出生日期" align="center">
                </el-table-column>
                <el-table-column prop="disabilityType" label="残疾类别" align="center">
                </el-table-column>
                <el-table-column prop="disabilityGrade" label="残疾等级" align="center">
                </el-table-column>
                <el-table-column prop="gmtCreated" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="" label="状态" width="100">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.isActivate == 'y'" size="small" type="success">已激活</el-tag>
                        <el-tag v-if="scope.row.isActivate == 'n'" size="small" type="info">未激活</el-tag>
                    </template> 
                </el-table-column>
                <el-table-column label="备注" prop="remarks" >
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <Button size="small" @click="EditPage(scope.row,'center/account-id/record')" plain>查看</Button>
                        <Button size="small" @click="EditPage(scope.row,'center/account-id')" plain>编辑</Button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="o-mtb" v-model="Page" @turning="Get" :total="Main.total"></Pagination>
        </div>

        <el-dialog
            title="导入用户已存在，是否覆盖"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="closeDialog">
            <div>
                <p v-for="(item,index) in repeatData" :key="index" class="import_list">
                   导入用户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  姓名：{{item.userName}}  &nbsp;&nbsp;&nbsp;身份证号：{{item.idCard}}
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="coverUser">是</el-button>
                <el-button @click="uncoverUser">否</el-button>
                <el-button type="primary" @click="batchSave">全部覆盖</el-button>
            </span>
            </el-dialog>

    </div>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.js'
import axios from 'axios'
export default {
    name: 'CenterAccount',
    mixins: [StoreMix],
    data() {
        return {
            importing:false,
            dialogVisible:false,
            Params: {},
            repeatData:[],
            store: 'main/account',
            Filter: {
                disabilityTypeStr:'',
                disabilityGradeStr:'',
                isActivate:'',
                name: null,
                pageSize: 10,
            },
            birthday:[],
            disTypeList:[],
            disabilityGrade:[],
            disabilityType:[],
            batch: [],
            uploadId: null,
            punchClockId:null
        }
    },
    computed: {

    },
    methods: {
        typeChange(){
            if(this.disabilityType.indexOf('')==-1){
                this.Filter.disabilityTypeStr=this.disabilityType.join()
            }else{
                this.Filter.disabilityTypeStr=''
            }
        },
        gradeChange(){
             if(this.disabilityGrade.indexOf('')==-1){
                this.Filter.disabilityGradeStr=this.disabilityGrade.join()
            }else{
                this.Filter.disabilityGradeStr=''
            }

        },
        //导出用户年度信息
        exportUserInfo(){
            var data = {}
            Object.assign(data,this.Filter,{ ids: this.batch, loginId:this.User.id })
            this.Dp('main/ANNUAL_EXPORT',data).then(buffer=>{
                if(buffer){
                    this.SaveBufferFile(buffer,'导出康复经费汇总表.xls','excel')
                }else{
                    this.Err('导出失败')
                }
            })
        },
        changeBirthday(){
            console.log(111,this.birthday)
            if(this.birthday){
                this.Filter.birthdayGE=this.birthday[0]?this.birthday[0]:''
                this.Filter.birthdayLE=this.birthday[1]?this.birthday[1]:''
            }else{
                this.Filter.birthdayLE=''
                this.Filter.birthdayGE=''
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
            var data = {}
            Object.assign(data,this.Filter,{ ids: this.batch, loginId:this.User.id })
            this.Dp('main/EXPORTS_ACCOUNT_PDF',data).then(buffer=>{
                if(buffer){
                    this.SaveBufferFile(buffer,'用户列表.pdf','pdf')
                }else{
                    this.Err('导出失败')
                }
            })
       },
        init(){
            this.reload()
            //this.Post()
            // $.ajax({
            //     url: "/admin/organ/findByOrganList",
            //     //data: {name: 'jenny'},
            //     type: "POST",
            //     dataType: "json",
            //     success: function(data) {
            //         debugger
            //         // data = jQuery.parseJSON(data);  //dataType指明了返回数据为json类型，故不需要再反序列化
            //     }
            // });
           
        },
        reload(){
            console.log(JSON.parse(window.localStorage.getItem("filterData")))
            let page =  Number(window.localStorage.getItem('backPage'))||1
            this.Filter = JSON.parse(window.localStorage.getItem("filterData"))|| this.Filter;
            this.Page=page
            this.Get(page)
            this.resetUpload()
        },
        resetUpload(){
            let uploadId = this.uploadId = this.Uuid()
            let punchClockId =  this.punchClockId = this.Uuid()
            this.$nextTick(()=>{
                document.getElementById(uploadId).value = ''
                document.getElementById(punchClockId).value = ''
            })
        },
        downloadTPL(){
            this.Dp('main/TEMPLATE_ACCOUNT').then(buffer=>{
                if(buffer){
                    this.SaveBufferFile(buffer,'用户导入模板.xls','excel')
                }else{
                    this.Err('导出失败')
                }
            })
        },
        downloadTPL1(){
            this.Dp('main/TEMPLATE_IMPORT_PUNCH').then(buffer=>{
                if(buffer){
                    this.SaveBufferFile(buffer,'打卡记录模板.xls','excel')
                }else{
                    this.Err('导出失败')
                }
            })
        },
        tableSelection(list=[]){
            this.$set(this,'batch',[])
            for(let item of list){
                this.batch.push(item.id)
            }
        },
        // 激活/禁用 用户
        activate(state=true){
            this.Dp('main/ACTIVATE_ACCOUNT',{ ids: this.batch.join(), userId:this.User.id, isActivate:state }).then(res=>{
                if(!res.err){
                    this.Suc('操作成功')
                    this.Get(this.Main.page)
                }
            })
        },
        exportList(){
            var data = {}
            Object.assign(data,this.Filter,{ ids: this.batch, loginId:this.User.id })
            this.Dp('main/EXPORTS_ACCOUNT',data).then(buffer=>{
                if(buffer){
                    this.SaveBufferFile(buffer,'用户列表.xls','excel')
                }else{
                    this.Err('导出失败')
                }
            })
        },
        upload(){
            this.$refs.file.click()
        },
        upload1(){
            this.$refs.file1.click()
        },
        //导入打卡记录
        uploadPunchClockFile(e){
            if(e){
                let files = this.$refs.file1.files
                if(files[0] && files[0].size){
                    let form = new FormData()
                    form.append('file',files[0])
                    if(!this.checkUploadType(files)){
                        return false
                    }
                    this.importing=true
                    this.Dp('main/UPLOAD_PUNCH_ACCOUNT',form).then(res=>{
                        if(!res.err){
                            this.Suc('操作成功')
                            this.Get(this.Main.page)
                            this.importing=false

                        }else{
                            this.Err('操作失败')
                            this.importing=false

                        }
                    }).catch(err=>{
                    this.importing=false

                    })
                    this.resetUpload()
                }
            }
        },
        
        uploadFile(e){
            if(e){
                let files = this.$refs.file.files
                if(files[0] && files[0].size){
                    let form = new FormData()
                    form.append('file',files[0])
                    if(!this.checkUploadType(files)){
                        return false
                    }
                    this.Dp('main/UPLOAD_ACCOUNT',form).then(res=>{
                        if(!res.err){
                            if(res.data.bussData.length){
                                this.dialogVisible=true
                                this.repeatData = res.data.bussData
                            }else{
                                this.Suc('操作成功')
                                this.Get(this.Main.page)
                            }
                        }
                    })
                    this.resetUpload()
                }
            }
        },
        batchSave(){
            this.Dp('main/UPLOAD_BATCH_SAVE',this.repeatData).then(res=>{
                if(!res.err){
                    this.Suc('操作成功')
                    this.repeatData=[]
                    this.dialogVisible=false
                    this.Get(this.Main.page)
                }
            })
        },
        uncoverUser(){
            this.repeatData.splice(0,1)
            if(this.repeatData.length==0){
                this.dialogVisible=false
                this.Get(this.Main.page)
            }
            //this.Params= this.repeatData[0]
            //this.Params.id=''

            //this.Dp('main/SAVE_USER',this.Params).then(res=>{
                //if(!res.err){
                   // this.repeatData.splice(0,1)
                   // if(this.repeatData.length==0){
                   //     this.dialogVisible=false
                   //     this.Get(this.Main.page)
                   // }
              //  }
           // })
        },
        coverUser(){
            this.Params= this.repeatData[0]
            
            this.Dp('main/SAVE_USER',this.Params).then(res=>{
                if(!res.err){
                    this.repeatData.splice(0,1)
                     if(this.repeatData.length==0){
                        this.dialogVisible=false
                        this.Get(this.Main.page)
                    }
                }
            })
        },
        closeDialog(done){
            this.$confirm('关闭后弹框中重复数据不保存，是否关闭？')
            .then(_ => {
                this.repeatData=[]
                done();
            })
            .catch(_ => {});
        }
    },
    components: {

    },
    mounted(){
        this.init()
    },
    created() {
        this.disTypeList=[]
        // this.disTypeList.push({content:'全部',value:''})
        this.Dp('base/DISABLED_TYPE').then(res=>{
           this.disTypeList.push(...res.data.bussData)
        })
    },
}
</script>
<style>
.import_list:first-child{
    color: orange;
}
</style>