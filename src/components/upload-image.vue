<style lang="scss">
    .UploadImage{
        display:inline-block;
        .image {
            display:inline-block; padding:.2rem; border-radius:.2rem; border:1px dashed #ccc;
            cursor:pointer; position:relative; text-align:center;
            img, video {
                vertical-align:middle; max-width:100%; max-height:100%;
            }
            margin-left:.15rem;
            &:first-child {
                margin-left:0;
            }
            .remove {
                position:absolute; top:-.45rem; right:-.4rem; cursor:pointer; border-radius:99px; z-index:1;
                color:#F56C6C; background-color:#FFF; border:1px solid #FFF; box-shadow:0 1px 5px rgba(0,0,0,.1);
            }
        }
        .content {
            font-size:12px; color:#999;
        }
        &.more {
            .image {
                margin-right:.2rem; margin-bottom:.3rem;
            }
        }
    }
</style>
<template>
    <div class="UploadImage" :class="{'more':max>1}">
        <Upload v-for="(item,unit) in valueList" :key="unit" :accepts="accepts" :maxSize="maxSize" :multiple="false" :store="store" :mode="mode" :path="path" :disabled="disabled" @finish="Update($event,unit)">
            <label class="image" :style="sizeStyle">
                <template v-if="item">
                    <template v-if="item.type === 'image'">
                         <img :key="item.path" :src="item.path">
                    </template>
                    <template v-else-if="item.type === 'video'">
                        <video :key="item.path" :src="item.path" controls></video>
                    </template>
                    <Icon v-if="max > 1 && min < valueList.length && type=='edit'" class="remove" name="roundclosefill" size="1.2rem" @click.stop.prevent="Remove(unit)"></Icon>
                </template>
                <template v-else>
                    <slot name="empty" v-if="type=='edit'">
                        <Icon name="add" size="1.5rem" style="color:#bbb;"></Icon>
                    </slot>
                </template>
            </label>
        </Upload>
        <template v-if="valueList.length < max && type=='edit'">
            <Upload :accepts="accepts" :maxSize="maxSize" :multiple="false" :disabled="disabled" @finish="Update($event)">
                <label class="image" :style="sizeStyle" >
                    <slot name="empty">
                        <Icon name="add" size="1.5rem" style="color:#bbb;"></Icon>
                    </slot>
                </label>
            </Upload>
        </template>
    </div>
</template>

<script>
export default {
    name : 'UploadImage',
    data(){
        return {
            readers : {},
            previews: null,
        }
    },
    props : {
        type:{
            default : 'edit',
        },
        value : {
            default : '',
        },
        width: {
            type : [String,Number],
            default : '6rem',
        },
        height: {
            type : [String,Number],
            default : '4rem',
        },
        // upload
        accepts: { 
            type : String,
        },
        maxSize: {
            type : Number,
        },
        store: {
            type : String,
        },
        mode: {
            type : String,
        },
        path: {
            type : [String,Number],
            default : '',
        },
        max: {
            type : [String,Number],
            default : 1,
        },
        min: {
            type: [String,Number],
            default: 0,
        },
        preview: {
            type: [String,Array],
            default: '',
        },
        disabled : {
            default : false,
        },
    },
    computed:{
        sizeStyle(){
            return `width:${this.width};height:${this.height};line-height:${this.height};`
        },
        valueList(){
            let list = []
            if(this.value && typeof this.value === 'string'){
                let values = this.value.split(',')
                for(let i=0;i<values.length;i++){
                    let item = values[i]
                    let url = ''
                    if(item && typeof item === 'string'){
                        let path = item
                        let type = this.mediaType(item)
                        // 渲染器
                        if(this.readers[item]){
                            path = this.readers[item].path
                            type = this.readers[item].type.split('/')[0]
                        }else if(this.previews && this.previews[i]){
                            // 预览器
                            path = this.previews[i].fileUrl ? this.previews[i].fileUrl : this.previews[i]
                        }
                        list.push({ path, type })
                    }else{
                        list.push({ path: '' })
                    }
                }
            }
            return list
        },
    },
    watch: {
        preview(val){
            this.PreviewReload()
        },
    },
    methods: {
        Remove(unit){
            let values = this.value ? this.value.split(',') : []
            if(values[unit]){
                values.splice(unit,1)
                if(this.previews && this.previews[unit]){
                    this.previews.splice(unit,1)
                }
            }
            this.$emit('input',values.length ? values.join(',') : '')
            this.$emit('change',values.length ? values.join(',') : '')
        },
        Update(res,unit){
            if(this.type !== 'edit'){
                return false
            }
            let values = this.value ? this.value.split(',') : []
            if(unit || unit == 0){
                values.splice(unit,1,res.key)
            }else{
                values.push(res.key)
            }
            if(res.reader && res.reader.result){
                this.$set(this.readers,res.key,{ path:res.reader.result, type:res.type })
            }
            this.$emit('input',values.length ? values.join(',') : '')
            this.$emit('change',values.length ? values.join(',') : '')
        },
        PreviewReload(){
            if(this.preview){
                let preview = this.Origin(this.preview)
                this.$set(this,'previews',typeof preview == 'string' ? preview.split(',') : preview)
            }
        },
        mediaType(path){
            try{
                let paths = path.split('.')
                let index = paths.length - 1
                if(paths[index] == 'mp4'){
                    return 'video'
                }else{
                    return 'image'
                }
            }catch(err){
                return 'image'
            }
        },
    },
    mounted(){
        this.PreviewReload()
    },
}
</script>