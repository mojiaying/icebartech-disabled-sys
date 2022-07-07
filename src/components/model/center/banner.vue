<style lang="scss">
    .mCenterBanner {

    }
</style>
<template>
    <el-dialog class="mCenterCategory" :title="Title" size="huge" :visible.sync="view" top="7vh" :close-on-click-modal="false" :destroy-on-close="true">
        <div class="o-plr-l o-ptb" style="background:#F5F5F5;">
            <span class="o-plr o-ml">政策标题：</span>
            <el-input v-model="Filter.titleLike" placeholder="请输入政策标题" style="width:10rem;" clearable></el-input>
            <Button class="o-ml" @click="MakeFilter()">查询</Button>
        </div>
        <div class="o-plr-l o-pt o-mt">
            <el-table class="o-pt" size="small" :data="Main.list" v-loading="Main.loading" ref="table">
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <el-table-column width="100" label="封面图" align="center">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.coverUrl" :previewSrcList="[scope.row.coverUrl]" fit="cover" style="width:91px; height:70px;"></el-image>
                    </template>
                </el-table-column>      
                <el-table-column prop="title" label="标题" align="center" min-width="100"></el-table-column>
                <el-table-column prop="gmtCreated" label="创建时间" min-width="150"></el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <Button size="small" @click="Finish(scope.row)">选择</Button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="o-mtb" v-model="Page" @turning="Get" :total="Main.total"></Pagination>
        </div>
    </el-dialog>
</template>

<script>
import StoreMix from '@/plugins/mixin/store.modul.js'
export default {
    name : 'mCenterBanner',
    mixins : [StoreMix],
    data(){
        return {
            store: 'main/banner_selector',
            Params: {},
            Filter: {
                pageSize: 10,
            },
        }
    },
    watch:{

    },
    computed:{

    },
    methods:{
        init(){
            this.Get()
        },
        Finish(item){
            this.$emit('finish',item)
            this.view = false
        },
    },
}
</script>
