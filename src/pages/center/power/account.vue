<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterPowerAccount {
    
}
</style>
<template>
    <section class="CenterPowerAccount o-pt-l">
        <div class="block o-plr-l">
            <Button @click="EditPage(null,'center/power/account-id')">新增账号</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <span class="o-plr">姓名：</span>
            <el-input v-model="Filter.userNameLike" placeholder="请输入姓名" style="width:10rem;" clearable></el-input>
            <span class="o-plr o-ml">手机号：</span>
            <el-input v-model="Filter.mobileLike" placeholder="请输入手机号" style="width:10rem;" clearable></el-input>
            <Button class="o-ml" @click="MakeFilter()">查询</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <el-table class="o-pt" :data="Main.list" v-loading="Main.loading" ref="table">
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <el-table-column prop="roleName" label="角色" align="center"  width="100"></el-table-column>
                <el-table-column prop="mobile" label="手机号" align="center" width="150"></el-table-column>
                <el-table-column prop="trueName" label="姓名" align="center" width="150"></el-table-column>
                <el-table-column prop="userName" label="账号" align="center" width="150"></el-table-column>
                <el-table-column prop="gmtCreated" label="创建时间"></el-table-column>
                <el-table-column prop="gmtModified" label="更新时间"></el-table-column>                
                <el-table-column label="操作" align="center" width="140">
                    <template slot-scope="scope">
                        <Button size="small" @click="EditPage(scope.row,'center/power/account-id')" plain>编辑</Button>
                        <Button size="small" type="danger" @click="Del(scope.row)" plain>删除</Button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="o-mtb" v-model="Page" @turning="Get" :total="Main.total"></Pagination>
        </div>
    </section>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.js'
export default {
    name: 'CenterPowerAccount',
    mixins: [StoreMix],
    data() {
        return {
            store: 'main/power_account',
            Filter: {
                pageSize: 16,
            },
        }
    },
    computed: {

    },
    methods: {
        init(){
            this.GetInit('power')
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