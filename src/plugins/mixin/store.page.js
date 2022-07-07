import StoreMix from '@/plugins/mixin/store.js'
export default { 
    data(){
        return {
            id: null,
            Params: {},
            storeType: 'page',
            forceReload: false,
        }
    },    
    mixins: [StoreMix],
    computed: {
        Title(){
            let title = this.Main.title ? this.Main.title : ''
            if(!this.Params){
                return title
            }
            return this.Params.id ? `编辑${title}` : `新增${title}`
        },
    },
    methods: {
        FormSubmit(){
            this.$refs['form'].validate((valid) => {
                if(valid) {
                    this.Submit()
                }
            })
        },
        Submit(model=this.StorePath[1],callback){
            if(!callback){
                callback = (res)=>{
                    this.Suc('操作成功')
                    
                    if(this.$route.meta.rollback){
                        this.Rd(this.$route.meta.rollback)
                    }else if(this.Main.init){
                        this.ReloadPage()
                    }
                    return res
                }
            }else{
                callback = (res)=>{
                    return false
                }
            }
            let params = this.Origin(this.Params)
            return (params.id || params.sn) ?
                this.Put(params,model,callback) :
                this.Post(params,model,callback)
        },
    },
    activated(){
        let id = this.$route.params.id
        this.id = id
        this.DataReset('Params')
        if(id && id != 'add'){
            if(this.Main && this.Main.item && this.Main.item.id == id && !this.forceReload){
                let item = this.Main.item
                for(let key in item){
                    if(item[key] != undefined){
                       this.$set(this.Params,key,item[key])
                    }
                }
                if(typeof this.pageInit == 'function'){
                    this.pageInit()
                }
            }else{
                this.Item(id).then(res=>{
                    if(!res.err && typeof res.bussData === 'object'){
                        for(let key in res.bussData){
                            if(res.bussData[key] != undefined){
                               this.$set(this.Params,key,res.bussData[key])
                            //    console.log(this.Params)
                            }
                        }
                        if(typeof this.pageInit == 'function'){
                            this.pageInit()
                        }
                    }
                })
            }
        }
    },
    mounted(){

    }
}