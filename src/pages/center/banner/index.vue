<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterBanner {
    
}
</style>
<template>
    <div class="CenterBanner o-ptb-l">
        <div class="block o-plr-l">
            <Button @click="EditPage(null,'center/banner-id')">新增轮播广告</Button>
        </div>
        <div class="block o-plr-l o-mt" >
            <el-table class="o-pt" :data="Main.list" v-loading="Main.loading" ref="table">
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <el-table-column width="200" label="封面图" align="center">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.bannerUrl" :previewSrcList="[scope.row.bannerUrl]" fit="contain" style="width:160px; height:90px;"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="政策标题" min-width="150">
                    <template slot-scope="scope">
                        <span v-if="scope.row.policyDTO && scope.row.policyDTO.title">{{ scope.row.policyDTO.title }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="gmtCreated" label="创建时间" min-width="150"></el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <Button size="small" @click="EditPage(scope.row,'center/banner-id')" plain>编辑</Button>
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
    name: 'CenterBanner',
    mixins: [StoreMix],
    data() {
        return {
            store: 'main/banner',
            Filter: {
                pageSize: 16,
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

    },
    mounted(){
        this.init()
    },
}
</script>