<style lang="scss">
.Editor{
    min-height:300px; height:300px;
    .quill-editor {
        display:flex; height:100%;
        .ql-container {
            flex:1;
        }
        .ql-editor {
            height:300px;
        }
    }
}
</style>
<template>
    <div class="Editor">
        <quill-editor class="l-flex-v" v-model="content" :options="options" ref="editor"></quill-editor>
        <upload @finish="uploadFinish" ref="upload" style="display:none;"></upload>
    </div>
</template>

<script>

import Vue from 'vue'
import { quillEditor, Quill } from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'


var BlockEmbed = Quill.import('blots/block/embed')
class ImageBlot extends BlockEmbed {
    static create(opt) {
        let node = super.create()
        node.setAttribute('src', opt.src)
        node.setAttribute('style', opt.style)
        return node
    }
    static value(node) {
        return{
            src: node.getAttribute('src'),
            style: node.getAttribute('style'),
        }
     }
}
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot)

export default {
    name : 'Editor',
    data(){
        return {
            content: '',
        }
    },
    props: ['value'],
    watch: {
        value(val){
            this.content = val
        },
        content(val){
            this.$emit('input',val)
        },
    },
    computed: {
        options(){
            let _this = this
            return {
                theme: 'snow',
                //readOnly: false,
                modules: {
                    toolbar: {
                        container: [
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            [{ 'indent': '-1'}, { 'indent': '+1' }],
                            ['bold','italic','underline','strike'],
                            [{ 'align': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            ['clean'],
                            ['image']
                        ],
                        handlers: {
                            image: (value)=>{
                                if(value) {
                                    this.$refs.upload.pick() // 启用图片上传主键
                                }
                            }
                        }
                    }
                },
            }
        },
    },
    methods: {
        // 图片上传完成后回调
        uploadFinish(e){
            let { src } = e
            let quill = this.$refs.editor.quill
            let length = quill.getSelection().index
            src = src.split('?')[0]
            quill.insertEmbed(length, 'image', { src, style: 'max-width:100%; display:block; margin:0 auto;' })
            console.log(quill.getContents(length))
            quill.setSelection(length + 1)
        },
    },
    components: {
        quillEditor,
    },
    mounted(){
        this.content = this.value
        this.$refs.editor.quill
    },
}
</script>