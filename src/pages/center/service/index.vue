<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterBanner {
    
}
</style>
<template>
    <div class="CenterBanner o-ptb-l">
        <div class="block o-plr-l o-mt borderQueryParam">
            <span class="o-plr">服务内容：</span>
            <el-input v-model="Filter.contentLike" placeholder="请输入服务内容" style="width:10rem;" clearable></el-input>
            
            <span class="o-plr o-ml">创建时间：</span>
            <el-date-picker v-model="dateVal" @change="changeDate" class="o-mr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:13rem;" value-format="yyyy-MM-dd" :picker-options="DateRangePicker"></el-date-picker>
            <Button class="o-ml" @click="MakeFilter()">查询</Button>
            <Button class="o-ml" @click="insertChildren(null)">新增</Button>
        </div>
        <div class="block o-plr-l o-mt" >
            <el-table class="o-pt" :data="Main.list" row-key="id"
  ref="table"
  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            >
                
                <el-table-column prop="content" label="服务内容" min-width="150"></el-table-column>
                <el-table-column prop="gmtCreated" label="创建时间" min-width="150"></el-table-column>
                <el-table-column label="操作" align="center" width="300">
                    <template slot-scope="scope">
                        <Button size="small" @click="edit(scope.row)" plain>编辑</Button>
                        <Button size="small" type="danger" @click="Del(scope.row)" plain>删除</Button>
                        <Button size="small" v-if="scope.row.pId == 0" @click="insertChildren(scope.row)" plain>添加下级分类</Button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="o-mtb" v-model="Page" @turning="Get" :total="Main.total"></Pagination>
        </div>
        <insert  :pid=pid v-model="view" :content=content :id=id @changeView=changeView @finish="Get(Page)"></insert>
    </div>
</template>
<script>
import StoreMix from '@/plugins/mixin/store.js'
import insert from './insert'
import DateRange from '@/plugins/mixin/daterange'
export default {
    name: 'CenterBanner',
    mixins: [StoreMix,DateRange],
    components: {
        insert
    },
    data() {
        return {
          dateVal:'',
          content:'',
          id:0,
          pid:0,
          store: 'main/service',
          view:false,
        tableData: [
        {
          id: 1,
          name: "个人",
          isParent:true,
          children: [
            {
              id: 11,
              name: "第二根半价套餐",
              alias: "是兄弟就来割",
              operator: "铁手无情",
              state: "无痛"
            }
          ]
        },
        {
          id: 2,
          isParent:true,
          name: "科室",
          children: []
        },

        {
          id: 3,
          name: "全院",
          isParent:true,
          children: [
            {
              id: 31,
              name: "第二根半价套餐",
              alias: "是兄弟就来割",
              operator: "铁手无情",
              state: "无痛"
            },
            {
              id: 41,
              name: "第二根半价套餐",
              alias: "是兄弟就来割",
              operator: "铁手无情",
              state: "无痛"
            }
          ]
        }
      ],
      Filter: {
                pageSize: 10
            },
        }
    },
    computed: {

    },
    methods: {
        changeDate(){
          this.Filter.gmtCreatedGE = this.dateVal[0]
          this.Filter.gmtCreatedLE = this.dateVal[1]
        },
        changeView(){
          this.$set(this ,'view',false)
        },
        edit(data){
          this.id = 0
          var _this = this
          setTimeout(function(){
             _this.id = data.id
            _this.content = data.content
            _this.$set(_this ,'view',true)
          },200)
             

        },
        insertChildren(data){
            this.pid = 0
             var _this = this
            setTimeout(function(){
              if(data){
                _this.pid = data.id
              }
              _this.content = ''
              _this.$set(_this ,'view',true)
            },200)

            //this.isInsertService = true
        },
        init(){
            this.reload()
        },
        reload(){
            this.Get()
        },
    },

    mounted(){
        //this.init()
    },
}
</script>