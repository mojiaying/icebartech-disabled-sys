import Vue from 'vue'
import ajax from '@/plugins/ajax.js'

export default {
    data(){
        return {
            backPage: 1,
            secBackPage:1,
            Page: 1,
            Params: {},
            Filter: {},
            filterData:{},
            Editer: {
                view : false,
                title : null,
                form : null,
            },
            storeType: 'default',
        }
    },
    computed: {
        Main(){

            if(this.StorePath){
                return this.$store.state[this.StorePath[0]][this.StorePath[1]]
            }
            return {}
        },
        StorePath(){
            if(this.store){
                return this.store.split('/')
            }
            if(this.Store){
                return this.Store.split('/')
            }
            return null
        },
    },
    methods : {
        Ajax(config){
            return ajax(config)
        },
        Get(page,model,filter){       
            let params = this.Origin(filter ? filter : this.Filter)

            if(typeof page == 'string'){
                model = page
                filter = model
                page = null
            }
            
            if(page){
                params.pageIndex = page
                if(this.$route.name.match(/\//g).length==1){
                    if(JSON.stringify(this.Filter).length>2){
                        this.backPage=page
                        window.localStorage.setItem("backPage", this.backPage);
                        window.localStorage.setItem("filterData", JSON.stringify(this.Filter));
                    }
                }
            }
            
            if(this.$route.name.match(/\//g).length==2){
                this.secBackPage=this.Page
                window.localStorage.setItem("secBackPage", this.secBackPage);
                window.localStorage.setItem("secfilterData", JSON.stringify(this.Filter));
            }
            if(!model){
                model = this.StorePath[1]
            }
            // 重置更多加载
            if(this.Filter._more){
                this.Filter._more = false
            }
            // console.log(params.pageIndex)
            // this.backPage=params.pageIndex

            let path = `${this.StorePath[0]}/GET_${model.toUpperCase()}`
            return this.$store.dispatch(path,{
                params,
            }).then((res,opt)=>{                
                return res
            })
        },
        ReloadPage(model,filter){
            if(!model){
                model = this.StorePath[1]
            }
            if(!filter){
                filter = this.Origin(this.Main.filter)
            }
            let store = this.$store.state[this.StorePath[0]][model]
            let page = store.page ? store.page : 1
            return this.Get(page,model,filter)
        },
        GetInit(path='',params={}){
            let store = path.split('/')[0]
            let model = path.split('/')[1]
            if(!model){
                model = store
                store = this.StorePath[0]
            }
            return this.$store.state[store][model].init ? 
                Promise.resolve(this.$store.state[store][model].list) :
                this.$store.dispatch(`${store}/GET_${model.toUpperCase()}`,{params}).then(({data})=>{return data})
        },
        Item(id,path=''){
            let store = path.split('/')[0]
            let model = path.split('/')[1]
            if(!model){
                model = store ? store : this.StorePath[1]
                store = this.StorePath[0]
            }
            return this.$store.dispatch(`${store}/GET_${model.toUpperCase()}`,{id}).then(({data})=>{return data})
        },
        More(model,filter){
            this.Filter._more = true
            return this.Get(this.Page + 1,model,filter)
        },
        TopReset(model='Main'){
            if(!this[model].empty){
                this.Reset()
                this.MakeFilter()
            }
        },
        LoadMore(model='main'){
            if(!this[model]._init || this[model]._loading || !this[model]._more || this.routeName !== this.$route.name){
                // console.log('无法加载')
            }else{
                this.More()
            }
        },
        Action(name='POST',data={},model=this.StorePath[1]){
            let path = `${this.StorePath[0]}/${name.toUpperCase()}_${model.toUpperCase()}`
            return this.$store.dispatch(path,data)
        },
        Post(params=this.Origin(this.Params),model=this.StorePath[1],callback){
            let path = `${this.StorePath[0]}/POST_${model.toUpperCase()}`
            if(!callback){
                callback = (res) =>{
                    if(res){
                        this.view = false
                        this.Suc('操作成功')
                        this.$emit('finish',res ? res : 1)
                        return res
                    }
                }
            }
            return this.$store.dispatch(path,{data:params}).then(callback,err=>{
                return err
            })
        },
        Put(params=this.Origin(this.Params),model=this.StorePath[1],callback){
            let path = `${this.StorePath[0]}/PUT_${model.toUpperCase()}`
            if(!callback){
                callback = (res) =>{
                    if(res){
                        this.view = false
                        this.Suc('操作成功')
                        this.$emit('finish',res ? res : 1)
                        return res
                    }
                }
            }
            console.log(path)
            return this.$store.dispatch(path,{data:params,id:params.id||params.sequence}).then(callback,err=>{
                return err
            })
        },
        Del(params=this.Origin(this.Params),model=this.StorePath[1],callback){
            let path = `${this.StorePath[0]}/DELETE_${model.toUpperCase()}`
            if(!callback){
                callback = (res) =>{
                    if(res){
                        this.Suc('操作成功')
                        if(this.storeType == 'default' && this.Main.init){
                            this.Get(this.Main.page)
                        }
                        return res
                    }
                }
            }
            return confirm ?
                this.DelConfirm(()=>{
                    return this.$store.dispatch(path,{data:params,id:params.id||params.sn}).then(callback,err=>{
                        return err
                    })
                }) :
                this.$store.dispatch(path,{data:params,id:params.id||params.sn}).then(callback,err=>{
                    return err
                })
        },
        Clean(model=this.StorePath[1]){
            let path = `${this.StorePath[0]}/RESET`
            this.Cm(path,model)
        },
        Submit(model=this.StorePath[1],callback){
            let params = this.Origin(this.Params)
            return (params.id || params.sn) ?
                this.Put(params,model,callback) :
                this.Post(params,model,callback)
        },
        Edit(row,title,model='Editer'){
            if(this[model]){
                this[model].view  = true
                this[model].title = title ? title : (row ? '修改数据' : '新增数据')
                this[model].form  = row ? this.Origin(row) : null
            }
        },
        EditPage(item,name,model){
            this.Active(item,model).then(res=>{
                this.Go(name,item ? item : {id:'add'})
            })
        },
        Reset(model=this.StorePath[1]){
            let path = `${this.StorePath[0]}/RESET`
            return this.$store.commit(path,{name:model.toLowerCase()})
        },
        MakeFilterInit(){
            this.DataReset('Filter')
        },
        MakeFilter(query=[]){
            this.Page = 1
            this.Get(1)
        },
        Active(item,model=this.StorePath[1]){
            let path = `${this.StorePath[0]}/ACTIVE_${model.toUpperCase()}`
            if(item && item.id != 'add'){
                return this.$store.dispatch(path,item)
            }else{
                // console.log(`${this.StorePath[0]}/ACTIVE_${model.toUpperCase()}`+'_RESET')
                return this.$store.dispatch(path+'_RESET',item)
            }           
        },
        checkUploadType(files){
            var fileName = files[0].name.split(".")
            if(fileName[fileName.length -1]=== "xlsx" ||
                fileName[fileName.length -1]=== "xls" ||
                fileName[fileName.length -1]=== "xltx" ||
                fileName[fileName.length -1]=== "xlt" ||
                fileName[fileName.length -1]=== "xlsm" ||
                fileName[fileName.length -1]=== "xlsb" ||
                fileName[fileName.length -1]=== "xltm" ||
                fileName[fileName.length -1]=== "csv"
            ){
                return true
            }
            this.Err('请导入excel！')
            return false
        },
        Dp(name,data){
            return this.$store.dispatch(this.StorePathFormat(name),data)
        },
        Cm(name,data){
            return this.$store.commit(this.StorePathFormat(name),data)
        },
        StorePathFormat(path){
            let StorePath = path.split('/')
            if(StorePath[0] && !StorePath[1] && this.StorePath){
                StorePath[1] = StorePath[0].toUpperCase()
                StorePath[0] = this.StorePath[0]
            }else{
                StorePath[1] = StorePath[1].toUpperCase()
            }
            return StorePath.join('/')
        },

        Formation(req=[]){
            return Promise.all().then(res=>{

            },err=>{
                
            })
        },
    },

    

    beforeRouteEnter(to, from, next){
        next(vm=>{
            console.log(from.name)
             if ((to.name.indexOf('center/')>-1)&&to.meta.auth) {
              next((vm) => {
                // setTimeout((_) => {
                  let auths = Object.keys(vm.Block.auth);
                  // console.log(auths.indexOf(to.meta.auth))
                  if(auths.length){

                    // console.log(auths.indexOf(to.meta.auth))
                    if (auths.indexOf(to.meta.auth) == -1) {
                      vm.$message.warning("该用户无此菜单权限");
                      vm.$router.replace("/center");
                    } else {
                      next();
                    }
                }
                // }, 100);
                
              });
            } else {
              next();
            }
            
            if(to && from && from.name && ~from.name.indexOf(to.name)){
                   
                     // 重新拉取数据，当前数据列表的页码不变
                    // 返回型路由执行代码
            }else if( vm.storeType === 'default' && vm.Main.init ){
                let update = vm.Main.update
                let cacheInterval = 1 * 1000 // 页面数据缓存时间
                if(!update || Date.now() - update > cacheInterval){
                    vm.backPage=Number(window.localStorage.getItem('backPage'))
                    // window.localStorage.setItem("filterData", JSON.stringify(this.Filter));
                    // vm.Get(vm.backPage) // 重新拉取数据，当前数据列表的页码不变
                } 
            } 
            if (from.name=='center/acount'||from.name=='center/institution'||from.name=='center/punchRecord'){
                // console.log(222)
                // vm.backPage=Number(window.localStorage.setItem('backPage',null))
            // }else if (to.name=='center/institution'||to.name=='center/institution'||to.name=='center/punchRecord'){
            //     vm.backPage=Number(window.localStorage.getItem('backPage'))
            //     vm.Get(vm.backPage) // 重新拉取数据，当前数据列表的页码不变
            }
        })
    },
}

// if(params.pageIndex&&(this.store=='main/institution'||this.store=='main/account')){
//     window.localStorage.setItem("backPage", params.pageIndex);
// }else if(!params.pageIndex&&(this.store=='main/institution'||this.store=='main/account')){
//     params.pageIndex = window.localStorage.getItem('backPage')
// }
