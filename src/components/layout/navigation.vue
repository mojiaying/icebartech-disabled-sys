<style lang="scss">
	@import "@/assets/style/project/config.scss";
	.Navigation {
		width:10rem; min-width:10rem; height:100%; background-color:#2c2f33; color:#fff; position:relative;
		.layout {
			position:absolute; top:0; left:0; right:0; bottom:0;
			.menu {
				overflow-y:auto; cursor:pointer;

				.menu-group {
					.menu-link {
						height:2.2rem; line-height:2.2rem; padding-top:.2rem; padding-bottom:.2rem; padding-left:.8rem;
						transition: background-color,color .3s,.3s; border-right:4px solid $color-n;
						&:hover {
							background-color:rgba(0,0,0,.1);
						}
					}
					.menu-item {
						border-right:4px solid $color-n;
						.menu-link {
							height:1.9rem; line-height:1.9rem; padding-left:1.8rem;
						}
					}
					.menu-item-active {
						background-color:rgba(0,0,0,.1);
					}
				}
			}
			.bottom {
				height:2rem;
			}
		}
    }
</style>
<template>
    <nav class="Navigation">
    	<div class="layout l-flex-v">
    		<div>
    			<p class="o-ptb-h c-text-c c-text-10">宝安助残</p>
    		</div>
	        <div class="menu l-flex-1">
	        	<ul class="menu-group" v-for="(pack,unit) in Router" :key="pack.name" :index="pack.title" v-if="!pack.auth || Auth[pack.auth]">
	        		<div class="menu-link" :class="{'menu-item-active':$route.name === pack.name}" @click="menuGroupChange(pack,unit)" v-waves>
	        			<div class="menu-content l-flex-c">
		        			<Icon class="o-mr" :name="pack.icon" size="1"></Icon>
		        			<div class="title">{{ pack.title }}</div>
		        		</div>
	        		</div>
	        		<el-collapse-transition v-if="!pack.lonely">
	        			<div v-if="unitActive === unit">
			        		<li class="menu-item" :class="{'menu-item-active':$route.name === item.name}" v-for="(item,index) in pack.child" v-if="!item.hide" :index="item.name" :key="item.name" @click="GoNext(pack,item)" v-waves>
			        			<div class="menu-link">
			        				<div class="menu-content l-flex-c">
				        				<Icon class="o-mr" :name="item.icon" size="1.1"></Icon>
				        				<div class="title">{{ item.title }}</div>
			        				</div>
			        			</div>
			        		</li>
		        		</div>
		        	</el-collapse-transition>
	        	</ul>
	        </div>

	        {{/* 底部 */}}
	        <div class="bottom">
	        	
	        </div>
        </div>
    </nav>
</template>

<script>
import Router from '@/plugins/router'
console.log(Router)
export default {
	name : 'Navigation',
    data(){
        return {
            //Router: Router.navigation,
            unitActive : null,
        }
    },
    computed: {
        Auth(){
            return this.Block.auth
        },
        Router(){
            let build = this.$build
            let router = []
            for(let pack of Router.navigation[build]){
                let group = {
                    ...this.Origin(pack),
                }
                if(group.auth && this.Auth[group.auth]){
                    group.title = this.Auth[group.auth].menuName ? this.Auth[group.auth].menuName : group.title
                    group.icon = this.Auth[group.auth].menuIcon ? this.Auth[group.auth].menuIcon : group.icon
                }
                if(group.child && group.child.length > 0){
                    for(let sub of group.child){
                        if(sub.auth && this.Auth[sub.auth]){
                            sub.title = this.Auth[sub.auth].menuName ? this.Auth[sub.auth].menuName : sub.title
                            sub.icon = this.Auth[sub.auth].menuIcon ? this.Auth[sub.auth].menuIcon : sub.icon
                        }
                    }
                }
                router.push(group)
            }
            return router
        },
    },
    watch : {
    	'$route.name'(val){
    		this.menuGroupChange()
    		this.RouteAuthCheck()
				
    	},
    },
    methods:{
    	GoNext(pack,item){
    		if(item){
    			this.Go(item.name)
    		}else if(pack){
    			this.Go(pack.name)
    		}
    	},
    	menuGroupChange(pack,unit){
				if(pack){
					window.localStorage.setItem("backPage", null);
					window.localStorage.setItem("filterData", null);
				}
				 
    		if(pack && pack.lonely){
    			this.unitActive = null
    			this.GoNext(pack)
    		}else if(unit >= 0){
    			this.unitActive = this.unitActive == unit ? null : unit
    		}else{
    			for(let unit=0;unit<this.Router.length;unit++){
    				let item = this.Router[unit]
    				if(~item.name.indexOf(this.$route.name)){
    					this.unitActive = unit
    					break;
    				}
    			}
    		}
    	},
        RouteAuthCheck(){
            let { name, meta } = this.$route
            if(meta){
            	if(meta.auth){
            		if(this.Auth && !this.Auth[meta.auth]){
            			this.Rd(this.Config.build)
            			this.Err('当前账户无访问权限')
            		}
            	}else if(meta.belong){
            		if(Router.dir[meta.belong] && Router.dir[meta.belong].meta.auth){
            			let auth = Router.dir[meta.belong].meta.auth
            			if(this.Auth && !this.Auth[auth]){
	            			this.Rd(this.Config.build)
	            			this.Err('当前账户无访问权限')
            			}
            		}
            	}
            }
        },
    },
    components: {
        
    },
    mounted(){
    	
    },
}
</script>