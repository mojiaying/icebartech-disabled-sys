<style lang="scss">
@import "@/assets/style/project/config.scss";
</style>
<template>
    <div class="CenterSystemCourse o-pt-l">
        <div class="block o-plr-l">
            <div class="">使用指南</div>
        </div>
        <div class="block o-plr-l o-mt">
            <div class="o-ptb-l o-plr" style="width:100%; min-width:640px; max-width:640px;">
                <Editor v-model="Params.value" style="height:400px;"></Editor>
                <div class="o-pt-l">
                    <Button @click="Submit()" long>提交</Button>
                    <Button @click="rollback()" plain>还原</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.js'
export default {
    name: 'CenterSystemCourse',
    mixins: [StoreMix],
    data() {
        return {
            Params: {
                value: '',
            }
        }
    },
    computed: {},
    methods: {
        init(){
            this.reload()
        },
        reload(){
            this.Dp('main/GET_COURES').then(res=>{
                if(!res.err){
                    try{                        
                        this.$set(this.Params,'value',JSON.parse(res.data.bussData).value)
                    }catch(err){
                        this.$set(this.Params,'value','')
                    }                    
                }
            })
        },
        Submit(){
            let value = this.Params.value
            this.Dp('main/PUT_COURES',{ value }).then(res=>{
                if(!res.err){
                    this.Suc('提交成功')
                }
            })
        },
        rollback(){
            this.Confirm(()=>{
                this.reload()
            },'未保存的数据将会丢失，是否继续？','还原修改')
        }
    },
    components: {

    },
    mounted(){
        this.init()
    },
    created() {

    }
}
</script>