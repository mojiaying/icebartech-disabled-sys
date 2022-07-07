
export default {
    data(){
        return {
            DateRangeKeys: null,
        }
    },    
    computed: {
        daterange: {
            get(){
                return this.Filter.daterange && typeof this.Filter.daterange == 'string' ? this.Filter.daterange.split(',') : []
            },
            set(val){
                console.log(val)
                this.$set(this.Filter,'daterange',val ? val.join(',') : [])
                this.$set(this.Filter,'gmtCreatedGT',val ? val[0] : undefined)
                this.$set(this.Filter,'gmtCreatedLT',val ? val[1] : undefined)                
            },
        },
        DateRangePicker(){
            let keys = this. DateRangeKeys
            return {
                shortcuts: [
                    {
                        text: '去年',
                        onClick(picker){
                            picker.$emit('pick',[keys['lastyear'].split(',')[0], keys['lastyear'].split(',')[1]])
                        }
                    },
                    {
                        text: '今年',
                        onClick(picker){
                            picker.$emit('pick',[keys['year'].split(',')[0], keys['year'].split(',')[1]])
                        }
                    },
                    {
                        text: '上月',
                        onClick(picker){
                            picker.$emit('pick',[keys['lastmonth'].split(',')[0], keys['lastmonth'].split(',')[1]])
                        }
                    },
                    {
                        text: '本月',
                        onClick(picker){
                            picker.$emit('pick',[keys['month'].split(',')[0], keys['month'].split(',')[1]])
                        }
                    },
                    {
                        text: '昨天',
                        onClick(picker){
                            picker.$emit('pick',[keys['yesterday'].split(',')[0], keys['yesterday'].split(',')[1]])
                        }
                    },
                    {
                        text: '今天',
                        onClick(picker){
                            picker.$emit('pick',[keys['today'].split(',')[0], keys['today'].split(',')[1]])
                        }
                    },
                ]
            }
        },
    },
    methods: {
        DateRangeInit(today=new Date()){
            let year = today.getFullYear()
            let month = today.getMonth()
            let day = today.getDate()
            this.$set(this.$data,'DateRangeKeys',{
                year: `${this.Time(new Date(year,0,1),'yyyy-MM-dd')},${this.Time(new Date(year+1,0,0),'yyyy-MM-dd')}`,
                lastyear: `${this.Time(new Date(year-1,0,1),'yyyy-MM-dd')},${this.Time(new Date(year,0,0),'yyyy-MM-dd')}`,
                month: `${this.Time(new Date(year,month,1),'yyyy-MM-dd')},${this.Time(new Date(year,month+1,0),'yyyy-MM-dd')}`,
                lastmonth: `${this.Time(new Date(year,month-1,1),'yyyy-MM-dd')},${this.Time(new Date(year,month,0),'yyyy-MM-dd')}`,
                yesterday: `${this.Time(new Date(year,month,day-1),'yyyy-MM-dd')},${this.Time(new Date(year,month,day-1),'yyyy-MM-dd')}`,
                today: `${this.Time(new Date(),'yyyy-MM-dd')},${this.Time(new Date(),'yyyy-MM-dd')}`,
            })
        },
        DateRange(type,key='daterange'){
            if(this.DateRangeKeys[type]){
                this.$set(this.Filter,key,this.DateRangeKeys[type])
            }else{
                this.$set(this.Filter,key,this.DateRangeKeys['month'])
            }
            this.MakeFilter()
        },
        isDateRange(type,range){
            let rangeStr = typeof range === 'object' && range.length == 2 ? range.join(',') : range
            if(type && this.DateRangeKeys[type] && this.DateRangeKeys[type] === range){
                return true
            }
            return false
        },
    },
    created(){
        this.DateRangeInit()
    },
}
