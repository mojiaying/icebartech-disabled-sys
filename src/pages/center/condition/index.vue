<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterCondition {
    
}
</style>
<template>
    <div class="CenterCondition o-pt-l">
        <div class="block o-plr-l">
            <Button @click="EditPage(null,'center/condition-id')">新增条件</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <span class="o-plr">所属划分：</span>
            <el-select v-model="Filter.conditionDivide" placeholder="请选择所属划分" style="width:8rem;">
                <el-option label="所有" :value="undefined"></el-option>
                <el-option v-for="item in Main.divides" :key="item.name" :label="item.title" :value="item.name"></el-option>
            </el-select>
            <span class="o-plr o-ml">条件筛选：</span>
            <el-input v-model="Filter.conditionOfLike" placeholder="请输入条件筛选" style="width:10rem;" clearable></el-input>
            <Button class="o-ml" @click="MakeFilter()">查询</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <el-table class="o-pt" :data="Main.list" v-loading="Main.loading" ref="table">
                <el-table-column prop="id" label="ID" width="70"></el-table-column>   
                <el-table-column prop="conditionDivide" label="所属划分" align="center" width="120"></el-table-column>
                <el-table-column prop="conditionOf" label="筛选条件" align="center"></el-table-column>
                <el-table-column prop="organName" label="条件名称" align="center" min-width="150">
                    <template slot-scope="scope">
                        <el-tag v-for="(item,index) in scope.row.conditionList" :key="item.id" style="margin:2px 3px;" size="small">{{ item.conditionName }}</el-tag>                    
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="排序" align="center" width="80"></el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <Button size="small" @click="EditPage(scope.row,'center/condition-id')" plain>编辑</Button>
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
    name: 'CenterCondition',
    mixins: [StoreMix],
    data() {
        return {
            store: 'main/condition',
            Filter: {
                pageSize: 16,
            },
        }
    },
    computed: {
        Condition(){
            return this.$store.state['main'].condition_sub
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
    mounted(){
        this.init()
    },
}
</script>