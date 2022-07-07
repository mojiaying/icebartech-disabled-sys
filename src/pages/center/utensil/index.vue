<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterUtensil {
    
}
</style>
<template>
    <div class="CenterUtensil o-pt-l">
        <div class="block o-plr-l">
            <Button @click="EditPage(null,'center/utensil-id')">新增辅具</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <span class="o-plr o-ml">辅具名称：</span>
            <el-input v-model="Filter.deviceNameLike" placeholder="请输入辅具名称" style="width:10rem;" clearable></el-input>
            <span class="o-plr">残疾条件：</span>
            <el-select v-model="Filter.disabilityOfLike" placeholder="请选择残疾条件" style="width:7rem;">
                <el-option label="所有" value=""></el-option>
                <el-option v-for="(item,index) in Condition.list" :key="index" :label="item" :value="item"></el-option>
            </el-select>
            <Button class="o-ml" @click="MakeFilter()">查询</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <el-table class="o-pt" :data="Main.list" v-loading="Main.loading" ref="table">
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <el-table-column width="180" label="封面图" align="center">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.coverUrl" :previewSrcList="[scope.row.coverUrl]" fit="contain" style="width:160px; height:90px;"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="deviceName" label="辅具名称"></el-table-column>
                <el-table-column prop="deviceClassify" label="辅具分类"></el-table-column>
                <el-table-column prop="brand" label="品牌"></el-table-column>
                <el-table-column prop="model" label="型号"></el-table-column>
                <el-table-column prop="disabilityOf" label="残疾条件" align="center" min-width="150">
                    <template slot-scope="scope">
                        <div v-if="scope.row.disabilityOf">
                            <span class="o-mlr-s" v-for="item of scope.row.disabilityOf.split(',')">{{ item }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <Button size="small" @click="EditPage(scope.row,'center/utensil-id')" plain>编辑</Button>
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
    name: 'CenterUtensil',
        mixins: [StoreMix],
    data() {
        return {
            store: 'main/utensil',
            Filter: {
                pageSize: 16,
                disabilityOfLike: '',
            },
        }
    },
    computed: {
        Condition(){
            return this.$store.state['main'].utensil_condition
        },
    },
    methods: {
        init(){
            this.GetInit('utensil_condition')
            this.reload()
        },
        reload(){
            
            let page =  Number(window.localStorage.getItem('backPage'))||1
            this.Filter = JSON.parse(window.localStorage.getItem("filterData"))|| {
                pageSize: 10,
                pageIndex:1
            };
            this.Page=page
            this.Get(page)
        },
    },
    components: {

    },
    mounted(){
        this.init()
    },
    
}
</script>