<template>
    <label class="Upload" @click.stop="pick">
        <slot>
            <Button>上传图片</Button>
        </slot>
        <form ref="form" style="display:none;">
            <input :id="id" type="file" :accept="Accepts" @change="check" :multiple="multiple" ref="box" :disabled="disabled" style="display:none;">
        </form>
    </label>
</template>

<script>
import axios from 'axios'
export default {
    name : 'Upload',
    data(){
        return {
            uploading : -1,
            success : 0,
            queue : [],
            uploadHost : null,
            defaultConfig : {
                accepts : {
                    image : ['image/jpeg','image/jpg','image/png'],
                    video: ['video/mp4'],
                    file : '',
                },
            },
            id : '',
        }
    },
    props : {
        accepts : { 
            type : String,
            default : 'image'
        },
        maxSize : {
            type : Number,
            default : 3
        },
        multiple : {
            type : Boolean,
            default : false
        },
        disabled : {
            default : false,
        },
    },
    computed : {
        Accepts(){
            let opt = this.defaultConfig.accepts
            let accepts = []
            if(this.accepts){
                for(let unit of this.accepts.split(',')){
                    if(opt[unit]){
                        for(let item of opt[unit]){
                            accepts.push(item)
                        }
                    }
                }
            }
            return accepts.join(',')
        },            
    },
    watch:{
        uploading(val){
            if(val==0){
                this.$emit('complete',this.queue.length,this.success,this.queue)
                this.$refs.box.files.value = null
                this.uploading = -1
                this.success = 0
                this.queue = []
            }
        }
    },
    methods: {
        pick(){
            this.$refs.box.click()
        },
        check(){
            this.upload()
        },
        reset(){
            let id = this.id = this.Uuid()
            this.$nextTick(()=>{
                document.getElementById(id).value = ''
            })
        },
        upload() {
            // 校验文件类型
            let files = document.getElementById(this.id).files
            let num = files.length
            let maxSize = this.maxSize * 1024 * 1024
            if(!files) reutrn
            if(maxSize){
                for(let i=0;i<files.length;i++){
                    if(maxSize < files[0].size){
                        return this.$notify.error({title:'操作失败',message:`单个文件容量不得超过 ${this.maxSize} M。`})
                    }
                }
            }
            if(!num){
                return false
            }
            if(num > 24){
                return this.$notify.error({title:'操作失败',message:'每次最多上传 24 张图片。'})
            }

            let reader = new FileReader()
            reader.readAsDataURL(files[0])
            let suffix = files[0].name.split('.')[1]
            // 获取上传
            this.Dp('base/UPLOAD_TOKEN',{ type:files[0].type, suffix }).then(res=>{
                if(!res.err && res.data.bussData){
                    this.queue.push({
                        file: files[0],
                        key: res.data.bussData.fileKey,
                        upload: res.data.bussData.uploadUrl,
                        src: res.data.bussData.downloadUrl,
                        progress: 0,
                        reader,
                    })
                    this.Push()                    
                }else{
                    this.$notify.error({title:'操作失败',message:res.msg});
                }
            })             
        },

        // 上传至服务器
        Push(flag){
            this.uploading = this.queue.length
            for(let i=0;i<this.queue.length;i++){
                let type = this.queue[i].file.type
                let { upload, file, key, src, reader } = this.queue[i]
                axios.put(upload,file,{
                    headers: {
                        'Content-Type': type,
                    },
                    onUploadProgress: (event)=>{
                        let progress = parseFloat(event.loaded / event.total * 100)
                        this.$set(this.queue[i],'progress',progress)
                        this.$emit('progress',this.queue)
                    }    
                }).then(res=>{
                    this.$set(this,'uploading',this.uploading-1)
                    if(res.status == 200){
                        this.$set(this,'success',this.success+1)                       
                        this.$emit('finish',{ key, src, reader, type })
                    }
                })
            }
            this.reset()
        }
    },
    mounted(){
        this.reset()
    },
}
</script>