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
    <section class="CenterAccountIdRecordDetails o-pt-l">
        <div class="block-n">
            <div class="o-p-l">
                <el-page-header @back="Back()" content="查看详情"></el-page-header>
            </div>
        </div>
        <div class="block o-mt" v-loading="Main.loading">
            <el-form class="o-pt" ref="form"  :model="Params" label-width="100px" style="width:100%;">
                <el-form-item label="ID" prop="id" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.id"  readonly></el-input> -->
                    {{Params.id}}
                </el-form-item>
                <el-form-item label="账号" prop="idCard" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.idCard"  readonly></el-input> -->
                    {{Params.idCard}}
                </el-form-item>
                <el-form-item label="姓名" prop="userName" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.userName"  readonly></el-input> -->
                    {{Params.userName}}
                </el-form-item>
                <el-form-item label="手机号" prop="mobile" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.mobile"  readonly></el-input> -->
                     {{Params.mobile}}
                </el-form-item>
                <el-form-item  label="身份证号" prop="idCard" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.idCard"  readonly></el-input> -->
                    {{Params.idCard}}
                </el-form-item>
                <el-form-item label="打卡机构" prop="organName" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.organName"  readonly></el-input> -->
                    {{Params.organName}}
                </el-form-item>
                <el-form-item label="打卡日期" prop="punchDate" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.punchDate"  readonly></el-input> -->
                    {{Params.punchDate}}
                </el-form-item>
                <el-form-item label="到达打卡时间" prop="arrivePunchTime" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.arrivePunchTime"  readonly></el-input> -->
                    {{Params.arrivePunchTime}}
                </el-form-item>
                <el-form-item  v-if="Params.arriveUrl"  label="到达打卡图片" prop="arriveUrl" style="width:100%; max-width:460px;">
                    <el-image :src="Params.arriveUrl" :previewSrcList="[Params.arriveUrl]" fit="fill" ></el-image>
                </el-form-item>
                <el-form-item  v-if="!Params.arriveUrl"  label="到达打卡图片" prop="arriveUrl" style="width:100%; max-width:460px;">
                    暂无图片
                </el-form-item>
                <el-form-item label="离开打卡时间" prop="leavePunchTime" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.leavePunchTime"  readonly></el-input> -->
                    {{Params.leavePunchTime}}
                </el-form-item>
                  <el-form-item v-if="Params.leaveUrl" label="离开打卡图片" prop="leaveUrl" style="width:100%; max-width:460px;">
                    <el-image :src="Params.leaveUrl" :previewSrcList="[Params.leaveUrl]" fit="fill" ></el-image>
                </el-form-item>
                <el-form-item v-if="!Params.leaveUrl" label="离开打卡图片" prop="leaveUrl" style="width:100%; max-width:460px;">
                    暂无图片
                </el-form-item>
                <el-form-item label="状态" prop="costStatus" style="width:100%; max-width:460px;">
                    {{
                                Params.costStatus == "Y" ? "已报销":"未报销"
                            }}
                </el-form-item>
                <el-form-item label="用户确认" prop="useAffirm" style="width:100%; max-width:460px;">
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
                </el-form-item>
                <el-form-item v-if="Params.useAffirm == 'N'" label="拒绝时间" prop="affirmTime" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.affirmTime"  readonly></el-input> -->
                    {{Params.affirmTime}}
                </el-form-item>
                <el-form-item v-if="Params.useAffirm == 'N'"  label="拒绝原因" prop="useAffirmDsc" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.useAffirmDsc"  readonly></el-input> -->
                    {{Params.useAffirmDsc}}
                </el-form-item>
                <el-form-item label="服务日期" prop="serviceDate" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.serviceDate"  readonly></el-input> -->
                    {{Params.serviceDate}}
                </el-form-item>
                <el-form-item label="服务内容" prop="serviceContent" style="width:100%; max-width:460px;">
                    <!-- <el-input v-model="Params.serviceContent"  readonly></el-input> -->
                    {{Params.serviceContent}}
                </el-form-item>
                <el-form-item label="服务时长" prop="serviceDuration" style="width:100%; max-width:460px;">
                    <div class="l-flex-c">
                        {{Params.serviceDuration}}
                        <!-- <el-input  oninput="value=value.replace(/[^\d.]/g,'')" readonly class="l-flex-1" v-model="Params.serviceDuration" placeholder="请输入服务时长" clearable></el-input> -->
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
                <el-form-item label="备注" prop="remark" style="width:100%; max-width:460px;">
                    {{Params.remark}}
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.page.js'
export default {
    name: 'CenterAccountIdRecord',
    mixins: [StoreMix],
    data() {
        return {
            store: 'main/clock',
            forceReload: true,
        }
    },
    computed: {
        Target(){
            return this.$store.state.main['account'].item
        },
    },
    methods: {
        init(){
            this.reload()
        },
        reload(){
            this.Get()
        },
    },
    components: {

    },
    activated(){
        this.init()
    },
}
</script>