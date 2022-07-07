<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterPolicy {
    
}
</style>
<template>
    <div class="CenterPolicy o-pt-l">
        <div class="block o-plr-l">
            <Button @click="inputMember">录入</Button>
            <Button @click="importMember">导入</Button>
            <Button @click="exportMember">导出</Button>
            <Button @click="activationAll">激活</Button>
            <Button @click="importPunchInRecord">导入打卡记录</Button>
            <Button @click="exportUser">导出用户年度信息</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <span>姓名：</span>
            <el-input v-model="queryParam.name" placeholder="请输入姓名：" style="width:10rem;" clearable></el-input>
            <span class="o-plr o-ml">手机号：</span>
            <el-input v-model="queryParam.phone" placeholder="请输入手机号" style="width:10rem;" clearable></el-input>

            <span class="o-plr o-ml">创建时间：</span>
            <el-date-picker v-model="queryParam.daterange" class="o-mr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:13rem;" value-format="yyyy-MM-dd" :picker-options="DateRangePicker"></el-date-picker>
            <Button class="o-ml" @click="queryUser()">查询</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <el-table class="o-pt" :data="Main.list" v-loading="Main.loading" ref="table">
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <el-table-column prop="title" label="账号" align="center" min-width="100"></el-table-column>
                <el-table-column prop="sort" label="姓名"></el-table-column>
                <el-table-column prop="gmtCreated" label="手机号" min-width="150"></el-table-column>
                <el-table-column prop="gmtCreated" label="身份证号" min-width="150"></el-table-column>
                <el-table-column prop="gmtCreated" label="额度" min-width="150"></el-table-column>
                <el-table-column prop="gmtCreated" label="已使用金额" min-width="150"></el-table-column>
                <el-table-column prop="gmtCreated" label="已报销金额" min-width="150"></el-table-column>


                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <Button size="small" @click="EditPage(scope.row,'center/policy-id')" plain>查看</Button>
                        <Button size="small" @click="EditPage(scope.row,'center/policy-id')" plain>编辑</Button>
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
import DateRange from '@/plugins/mixin/daterange'

export default {
    name: 'CenterPolicy',
        mixins: [StoreMix,DateRange],
    data() {
        return {
            store: 'main/policy',
            queryParam:{//查询条件

            },
            types: [
                { title: '全部', name: undefined },
                { title: '热门', name: 'y' },
                { title: '非热门', name: 'n' },
            ]
        }
    },
    computed: {

    },
    methods: {
        //用户查询
        queryUser(){

        },
        inputMember(){//录入
        },
        importMember(){//导入
        },
        exportMember(){//导出
        },
        activationAll(){//激活
        },
        importPunchInRecord(){//导入打卡记录
        },
        exportUser(){//导出用户年度信息
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