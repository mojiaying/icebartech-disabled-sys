<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterPowerRoleId {
    
}
</style>
<template>
    <section class="CenterPowerRoleId o-pt-l">
        <div class="block-n">
            <div class="o-p-l">
                <el-page-header @back="Rd($route.meta.rollback)" :content="Title"></el-page-header>
            </div>
        </div>
        <div class="block o-mt">
            <el-form class="o-pt" ref="form" :model="Params" label-width="100px" style="width:100%; max-width:460px;">
                <el-form-item label="角色名称">
                    <el-input v-model="Params.roleName" placeholder="请输入角色名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="Params.roleDescribe" type="textarea" placeholder="请输入角色描述" :rows="3" clearable></el-input>
                </el-form-item>
                <el-form-item label="权限选择">
                    <el-checkbox-group v-if="Power.init" v-model="Params.permissionIds">
                        <div v-for="(pack,unit) in Power.list">
                            <div class="o-pl">
                                <el-checkbox :label="pack.id" @change="PowerChange($event,pack.id)">{{ pack.permissionName }}</el-checkbox>
                            </div>
                            <div class="o-pl-h" v-for="(item,index) in pack.childPermissions">
                                <el-checkbox :label="item.id" @change="PowerChange($event,pack.id,item.id)">{{ item.permissionName }}</el-checkbox>
                            </div>
                        </div>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <Button @click="FormSubmit()" long>提交</Button>
                    <Button @click="Rd($route.meta.rollback)" plain>取消</Button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.page.js'
export default {
    name: 'CenterPowerRoleId',
    mixins: [StoreMix],
    data() {
        return {
            store: 'main/role',
            Params: {
                permissionIds: [],
            },
            Filter: {},
        }
    },
    computed: {
        Power(){
            return this.$store.state['main'].power
        },
    },
    methods: {
        init(){
            this.GetInit('power')
            this.reload()
        },
        PowerChange(e,pid,tid){
            console.log('PowerChangeSub',e)
        },
        reload(){

        },
    },
    components: {

    },
    mounted(){
        this.init()
    },
}
</script>