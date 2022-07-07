<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterPolicy {
    
}
</style>
<template>
    <div class="CenterPolicy o-pt-l">
        <div class="block o-plr-l">
            <Button @click="EditPage(null,'center/policy-id')">新增政策</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <span>政策类型：</span>
            <el-select v-model="Filter.isHot" placeholder="请选择" style="width:8rem;">
                <el-option v-for="(item,index) in types" :key="item.title" :label="item.title" :value="item.name"></el-option>
            </el-select>
            <span class="o-plr o-ml">政策标题：</span>
            <el-input v-model="Filter.titleLike" placeholder="请输入政策标题" style="width:10rem;" clearable></el-input>
            <Button class="o-ml" @click="MakeFilter()">查询</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <el-table class="o-pt" :data="Main.list" v-loading="Main.loading" ref="table">
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <el-table-column width="100" label="封面图" align="center">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.coverUrl" :previewSrcList="[scope.row.coverUrl]" fit="cover" style="width:130px; height:100px;"></el-image>
                    </template>
                </el-table-column>      
                <el-table-column prop="title" label="标题" align="center" min-width="100"></el-table-column>
                <el-table-column prop="sort" label="排序"></el-table-column>
                <el-table-column prop="gmtCreated" label="创建时间" min-width="150"></el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
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
export default {
    name: 'CenterPolicy',
        mixins: [StoreMix],
    data() {
        return {
            store: 'main/policy',
            Filter: {
                pageSize: 16,
                isHot: undefined
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
        init(){
            this.reload()
        },
        reload(){
            let page =  Number(window.localStorage.getItem('backPage'))||1
            this.Page=page
            this.Get(page)
            // this.Get()
        },
    },
    components: {

    },
    mounted(){
        this.init()
    },
}
</script>