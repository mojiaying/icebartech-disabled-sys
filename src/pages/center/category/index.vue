<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterCategory {
    
}
</style>
<template>
    <div class="CenterCategory o-pt-l">
        <div class="block o-plr-l">
            <Button @click="Edit()">新增类目</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <span class="o-plr">类目名称：</span>
            <el-input v-model="Filter.categoryNameLike" placeholder="请输入类目名称" style="width:10rem;" clearable></el-input>
            <Button class="o-ml" @click="MakeFilter()">查询</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <el-table class="o-pt" :data="Main.list" v-loading="Main.loading" ref="table">
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <el-table-column prop="categoryName" label="类目名称"></el-table-column>
                <el-table-column prop="sort" label="排序" align="center" width="100"></el-table-column>
                <el-table-column label="操作" align="center" width="140">
                    <template slot-scope="scope">
                        <Button size="small" @click="Edit(scope.row)" plain>编辑</Button>
                        <Button size="small" type="danger" @click="Del(scope.row)" plain>删除</Button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="o-mtb" v-model="Page" @turning="Get" :total="Main.total"></Pagination>
            <Editer v-model="Editer.view" :title="Editer.title" :form="Editer.form" @finish="Get(Page)"></Editer>
        </div>
    </div>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.js'
import Editer from '@/components/model/center/category'
export default {
    name: 'CenterCategory',
    mixins: [StoreMix],
    data() {
        return {
            store: 'main/category',
            Filter: {
                pageSize: 32,
            },
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
        Editer,
    },
    mounted(){
        this.init()
    },
}
</script>