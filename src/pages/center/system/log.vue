<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterSystemLog {
    
}
</style>
<template>
    <div class="CenterSystemLog o-pt-l">
        <div class="block o-plr-l">
            <span class="o-plr">操作人：</span>
            <el-input v-model="Filter.userName" placeholder="请输入姓名" style="width:10rem;" clearable></el-input>
            <span class="o-plr o-ml">操作时间：</span>
            <el-date-picker v-model="daterange" class="o-mr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:13rem;" value-format="yyyy-MM-dd" :picker-options="DateRangePicker"></el-date-picker>
            <Button class="o-ml" @click="MakeFilter()">查询</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <el-table class="o-pt" :data="Main.list" v-loading="Main.loading" ref="table">
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <el-table-column prop="userId" label="UID" align="center" width="80"></el-table-column>
                <el-table-column prop="account" label="操作人" align="center" width="100">
                    <template slot-scope="scope">{{ scope.row.account ? scope.row.account : '-' }}</template>
                </el-table-column>
                <el-table-column prop="type" label="类型" align="center" width="120"></el-table-column>
                <el-table-column prop="value" label="说明" align="left"></el-table-column>
                <el-table-column prop="ip" label="IP" align="center" width="160"></el-table-column>
                <el-table-column prop="gmtCreated" label="操作时间" align="center" width="160"></el-table-column>
            </el-table>
            <Pagination class="o-mtb" v-model="Page" @turning="Get" :total="Main.total"></Pagination>
        </div>
    </div>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.js'
import DateRange from '@/plugins/mixin/daterange'
export default {
    name: 'CenterSystemLog',
    mixins: [StoreMix,DateRange],
    data() {
        return {
            store: 'main/log',
            Filter: {
                name: null,
                daterange: null,
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
            this.Get()
        },
    },
    components: {

    },
    mounted(){
        this.init()
    },
    created() {

    },
}
</script>