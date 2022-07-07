<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterAccountIdRecordDetails {
    
}
</style>
<template>
    <section class="CenterAccountIdRecordDetails o-pt-l">
        <div class="block-n">
            <div class="o-p-l">
                <el-page-header @back="Back()" content="查看服务"></el-page-header>
            </div>
        </div>
        <div class="block o-mt" v-loading="Main.loading">
            <el-form class="o-pt" ref="form" :rules="Rules" :model="Params" label-width="100px" style="width:100%;">
                <el-form-item label="服务日期" prop="serviceDate" style="width:100%; max-width:460px;">
                    <!-- <el-date-picker v-model="Params.serviceDate" type="date" placeholder="选择服务日期" value-format="yyyy-MM-dd" readonly></el-date-picker> -->
                    {{Params.serviceDate}}
                </el-form-item>
                <el-form-item label="服务内容" prop="serviceContent" style="width:100%; max-width:460px;">
                    {{Params.serviceContent}}
                    <!-- <el-input v-model="Params.serviceContent" placeholder="请输入服务内容" readonly></el-input> -->
                </el-form-item>
                 <!-- <el-form-item label="服务内容" prop="serviceContent" style="width:100%; max-width:460px;">
                     <el-checkbox-group v-if="bussData" v-model="serviceContent" readonly>
                        <div class="o-pl">
                            <el-checkbox  v-for="item in bussData" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                        </div>
                    </el-checkbox-group>
                </el-form-item> -->
                <el-form-item label="服务时长" prop="serviceDuration" style="width:100%; max-width:460px;">
                    <div class="l-flex-c">
                         {{Params.serviceDuration}}
                        <!-- <el-input  oninput="value=value.replace(/[^\d.]/g,'')"  readonly class="l-flex-1" v-model="Params.serviceDuration" placeholder="请输入服务时长" clearable></el-input> -->
                        <span class="o-pl">分钟</span>  
                    </div>
                </el-form-item>
                <el-form-item label="服务费用" prop="cost" style="width:100%; max-width:460px;">
                    <div class="l-flex-c">
                         {{Params.cost}}
                        <!-- <el-input   oninput="value=value.replace(/[^\d.]/g,'')" readonly v-model="Params.cost" placeholder="请输入服务费用" clearable></el-input> -->
                        <span class="o-pl">元</span>  
                    </div>
                </el-form-item>
                <el-form-item label="用户确认" prop="useAffirm" style="width:100%; max-width:460px;">
                    <template slot-scope="scope">
                        <span>
                            {{
                                 Params.useAffirm == "Y" ? "已确认":
                                 (
                                     Params.useAffirm == "N"?"已拒绝":
                                     (Params.useAffirm == "L"?"待录入":
                                        (Params.useAffirm == "D"?"待确认":
                                        (Params.useAffirm == "K"?"待离开":'已作废'))
                                     )
                                 )
                            }}
                        </span> 
                    </template>
                </el-form-item>
                <el-form-item label="备注" prop="remark" >
                    {{Params.remark}}
                </el-form-item>
                <el-form-item v-if="Params.useAffirm == 'N'" label="拒绝时间" prop="affirmTime" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.affirmTime" placeholder="" readonly></el-input> -->
                     {{Params.affirmTime}}
                </el-form-item>
                <el-form-item v-if="Params.useAffirm == 'N'" label="拒绝原因" prop="useAffirmDsc" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.useAffirmDsc" placeholder="" readonly></el-input> -->
                     {{Params.useAffirmDsc}}
                </el-form-item>
                <!-- <el-form-item label="服务内容" prop="serviceContent" style="width:100%; max-width:460px;">
                    <el-input v-model="Params.serviceContent" type="textarea" :rows="2" placeholder="请输入服务内容" readonly></el-input>
                </el-form-item> -->
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
            store: 'main/clock',
            forceReload: true,
            bussData:[],
            serviceContent:[]
        }
    },
    computed: {

    },
    methods: {
        init(){
            
        },
    },
    components: {

    },
    mounted(){
        var _this = this
        setTimeout(function(){
            if(_this.Params.serviceContent){
                try{
                    _this.serviceContent = JSON.parse(_this.Params.serviceContent)
                    for(var i in _this.serviceContent){
                        _this.bussData.push({
                            id:_this.serviceContent[i],
                            name:_this.serviceContent[i]
                        })
                    }
                }catch{

                }
            }
        },1000)
        
        // this.Dp('main/SERVE_PAGE',{pageIndex:1,pageSize:1000}).then(data=>{
        //     if(data.code == '200'){
        //         this.bussData = data.data.bussData
        //         try{
        //            this.serviceContent = JSON.parse(this.Params.serviceContent)
        //         }catch{

        //         }
        //     }
        // })
    },
    created() {

    },
}
</script>