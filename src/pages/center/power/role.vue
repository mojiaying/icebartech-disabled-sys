<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterPowerRole {
    
}
</style>
<template>
    <section class="CenterPowerRole o-pt-l">
        <div class="block o-plr-l">
            <Button @click="EditPage(null,'center/power/role-id')">新增角色</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <span class="o-plr">角色名称：</span>
            <el-input v-model="Filter.roleNameLike" placeholder="请输入角色名称" style="width:10rem;" clearable></el-input>
            <Button class="o-ml" @click="MakeFilter()">查询</Button>
        </div>
        <div class="block o-plr-l o-mt">
            <el-table class="o-pt" :data="Main.list" v-loading="Main.loading" ref="table">
                <el-table-column prop="id" label="ID" width="70"></el-table-column>             
                <el-table-column prop="roleName" label="名称" width="150"></el-table-column>
                <el-table-column prop="roleDescribe" label="角色描述" align="left" min-width="100"></el-table-column>
                <el-table-column prop="topPermissionNames" label="拥有权限" align="left" min-width="180"></el-table-column>
                <el-table-column label="操作" align="center" width="140">
                    <template slot-scope="scope">
                        <Button size="small" @click="EditPage(scope.row,'center/power/role-id')" plain>编辑</Button>
                        <Button type="danger" size="small" @click="Del(scope.row)" plain :disabled="scope.row.id == 1">删除</Button>
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
    name: 'CenterPowerRole',
    mixins: [StoreMix],
    data() {
        return {
            store: 'main/role',
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
        Del(params,model=this.StorePath[1],callback){            
            this.Dp('main/REPEAT_ROLE',params.roleKey).then(res=>{
                if(!res.err && !res.data.bussData){
                    this.DelConfirm(()=>{
                        return this.$store.dispatch(`${this.StorePath[0]}/DELETE_${model.toUpperCase()}`,{
                            data :params,
                            id: params.id 
                        }).then(res =>{
                            if(res){
                                this.Suc('操作成功')
                                if(this.storeType == 'default' && this.Main.init){
                                    this.Get(this.Main.page)
                                }
                                return res
                            }
                        },err=>{
                            return err
                        })
                    })
                }else{
                    this.Err('当前角色已被其他账户使用，无法删除')
                }
            })
        },
    },
    components: {

    },
    mounted(){
        this.init()
    },
}
</script>