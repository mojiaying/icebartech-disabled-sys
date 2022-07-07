1、如何运行测试模式？
命令行执行 npm run dev


2、如何正式打包项目？
命令行运行 npm run build


3、总后台和机构后台在哪？
本项目合并了 总后台(center) 机构后台(admin) 在项目中获取 this.$build 或 window.App.$build 即可获取当前运行环境


4、接口如何管理 & 接口交互数据存储在哪？
后端数据交互统一交予 vuex 进行管理，在 this.$sotre 中可以获取数据 page 层仅存储表单数据（Params）和列表筛选条件（Filter）


5、页面是怎么和后端接口进行交互的？
需要交互的页面引用了 plugins/store.js 自动交互逻辑，在页面 store 绑定了默认的数据模型进行交互


6、前端路由是怎么自动处理的？
前端路由使用 plugins/router.js 中间件进行管理，包含前后推进逻辑，与左侧导航权限判断

 
7、怎么上传图片到服务器？
统一上传组件 components/upload.vue ; 图片、图片组上传组件 components/upload-image.vue


8、关于富文本编辑器？
组件 components/editor.vue , 因模块体积较大，本组件已启用异步加载


9、页面的默认拉取数据逻辑？
同级路由切换 -> 每次拉取默认缓存 30 秒，可以在 plugins/mixin/store.js 中的 beforeRouteEnter 的路由导航内修改
上级路由返回 -> 如果修改了文件，自动重新拉取数据，如果没有修改操作，则不刷新页面，可在 plugins/mixin/store.js 和 plugins/mixin/store.page.js 查看