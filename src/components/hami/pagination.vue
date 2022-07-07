<style lang="scss">
    @import "./pagination.scss";
</style>
<template>
    <div class="Pgination" :class="type" v-show="total>0">
        <slot></slot>
        <div class="pgination-main">
            <ul>
                <li @click="lastPage">上一页</li>
                <li v-for="(item,index) in pageBox" :class="{'active':item==value}" @click="go(item)">{{item}}</li>
                <li @click="nextPage">下一页</li>
            </ul>
            <ul v-if="type=='normal'">
                <span>共 {{total}} 页，跳至</span>
                <input class="go" type="text" v-model.number="next" @keyup.13="go(next)">
                <span>页</span>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'Pgination',
        data(){
            return {
                next : null,
                page : 1,
            }
        },
        props : {
            value : { 
                type : Number,
                default : 1
            },            
            total : {
                type : Number,
                default : 1
            },
            size : {
                type : Number,
                default : 7
            },
            type : {
                default : 'normal'
            }
        },
        computed:{
            pageBox(){
                let page  = this.value
                
                let total = this.total
                let size  = this.size
                let start = 1
                let arr   = []
                if(total<=size){
                    // 页面不足时候直接打印
                    size = total                    
                }else if(page<Math.ceil(size/2)){
                    start = 1
                }else if(total-page<Math.ceil(size/2)){
                    start = page - (size - (total-page)) + 1
                }else{
                    start = page - Math.floor(size/2)
                }

                for(let i=0;i<size;i++){
                    arr.push(i+start)
                }
                return arr
            },            
        },
        methods: {
            go(page){
                if(typeof page==='number'&&page%1===0&&page>0&&page<=this.total&&page!=this.value){
                    this.$emit('input',page)
                    this.$emit('turning',page)
                }
            },
            nextPage(){
                if(this.value<this.total){
                    this.$emit('input',this.value+1)
                    this.$emit('turning',this.value+1)
                }
            },
            lastPage(){
                if(this.value>1){
                    this.$emit('input',this.value-1)
                    this.$emit('turning',this.value-1)
                }
            }
        }
    }
</script>