<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterBanner {
    
}
</style>
<template>
    <div>
        <el-dialog title="新增服务内容" :visible.sync="view" :close-on-click-modal="false" :destroy-on-close="true">
          <el-form :model="Params" :rules="rules" ref="form" label-width="140px" class="demo-ruleForm" >
            <el-form-item label="服务内容" prop="content">
              <el-input maxlength="200"  v-model.trim="Params.content"></el-input>
            </el-form-item>
          </el-form>
         <div slot="footer" class="dialog-footer">
          <el-button @click="view=false" >取 消</el-button>
          <el-button type="primary" @click="FormSubmit()" >确 定</el-button>
        </div>
      </el-dialog>
        
    </div>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.modul.js'
export default {
    name: 'CenterBanner',
    mixins: [StoreMix],
     props : {
        pid:{
          default : 0,
          type:Number
        },
        content:{
          default:'',
          type:String
        },
        id:{
          default:0,
          type:Number
        },
        
    },
    data() {
        return {
          view: false,
          Params:{
            content:''
          },
          rules: {
            content: [
                { required: true, message: '请输入服务内容', trigger: 'blur' }
            ]
          }, //弹框表单验证

            store: 'main/service',
            Filter: {
                pageSize: 16,
            },
        }
    },
    watch:{
      pid(val){
        this.Params.content = this.content
        this.Params.pid = val
      },
      id(val){
        this.Params.content = this.content
        this.Params.id = val
      }
    },
    activated(){
        var _this = this
        this.$nextTick(()=>{
            _this.Params.content = _this.content
            _this.Params.id = _this.id
        })

    },
    computed: {

    },
    methods: {
        insertService(){
          let _this = this
          this.Dp(key,data).then(res=>{
                if(!res.err){
                    _this.Suc('操作成功，请重新登录')
                    _this.Rd('login')
                    _this.view = false
                }
                this.init()
            })
        },
        clean(){
          this.view = false
        },
        cancleSubmit(name){
                this.$refs[name].resetFields();
        },
        init(){
            this.reload()
        },
        reload(){
            this.Get()
        },
    },
    components: {

    },
    mounted(){
        this.init()
    },
}
</script>