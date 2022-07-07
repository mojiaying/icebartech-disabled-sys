import Vue from 'vue'
import Router from 'vue-router'
import Config from '@/plugins/config'
import Helper from '@/plugins/helper'

Vue.use(Router)

const list = [
    {
        alias: '/',
        name: 'index',
        component: require('@/pages/index.vue').default,
        children: [
            {
                name: 'dictionary',
                title: '项目目录',
                component: require('@/pages/common/dictionary').default,
            },
            {
                name: 'center',
                alias: '/',
                title: '管理中心',
                component: require('@/pages/center/index.vue').default,
                children: [
                    {
                        name: 'center/statis', auth: '/countPage',
                        title: '统计',
                        icon: 'rankfill',
                        component: require('@/pages/center/statis/index.vue').default,
                    },


                    {
                        name: 'center/account', auth: '/userPage',
                        title: '用户中心',
                        icon: 'friendfill',
                        component: require('@/pages/center/account/index.vue').default,
                    },
                    {
                        path: '/center/account/:id',
                        name: 'center/account-id',
                        title: '新增账号',
                        belong: 'center/account',
                        rollback: 'center/account',
                        hide: true,
                        component: require('@/pages/center/account/id.vue').default,
                    },
                    {
                        path: '/center/account/:id/record',
                        name: 'center/account-id/record',
                        title: '服务记录',
                        belong: 'center/account',
                        rollback: 'center/account',
                        hide: true,
                        component: require('@/pages/center/account/id/record.vue').default,
                    },
                    {
                        path: '/center/account/record/details/:id',
                        name: 'center/account-id/record/details',
                        title: '打卡详情',
                        belong: 'center/account',
                        rollback: 'center/account',
                        hide: true,
                        component: require('@/pages/center/account/id/record-details.vue').default,
                    },
                    {
                        path: '/center/account/record/edit/:id',
                        name: 'center/account-id/record/edit',
                        title: '编辑打卡',
                        belong: 'center/account',
                        rollback: 'center/account',
                        hide: true,
                        component: require('@/pages/center/account/id/record-edit.vue').default,
                    },
                    {
                        path: '/center/account/record/insert/:id',
                        name: 'center/account-id/record/insert',
                        title: '添加打卡记录',
                        belong: 'center/account',
                        rollback: 'center/account',
                        hide: true,
                        component: require('@/pages/center/account/id/record-insert.vue').default,
                    },

                    {
                        name: 'center/banner', auth: '/bannerPage',
                        title: '轮播广告',
                        icon: 'medalfill',
                        component: require('@/pages/center/banner/index.vue').default,
                    },
                    {
                        name: 'center/dataImport', auth: '/dataImport',
                        title: '数据对比',
                        icon: 'medalfill',
                        component: require('@/pages/center/dataImport/index.vue').default,
                    },
                    {
                        name: 'center/punchRecord', auth: '/punchRecord',
                        title: '打卡记录',
                        icon: 'newshotfill',
                        noCache: false,
                        component: require('@/pages/center/punchRecord/index.vue').default,
                    },
                    {
                        name: 'center/service', auth: '/serviceContent',
                        title: '服务内容',
                        icon: 'newshotfill',
                        component: require('@/pages/center/service/index.vue').default,
                    },

                    {
                        path: '/center/banner/:id',
                        name: 'center/banner-id',
                        title: '轮播广告',
                        belong: 'center/banner',
                        rollback: 'center/banner',
                        hide: true,
                        component: require('@/pages/center/banner/id.vue').default,
                    },
                    {
                        path: '/center/punchRecord/:id',
                        name: 'center/punchRecord-record',
                        title: '轮播广告',
                        belong: 'center/punchRecord',
                        rollback: 'center/punchRecord',
                        hide: true,
                        component: require('@/pages/center/punchRecord/record.vue').default,
                    },

                    // start
                    // {
                    //     name: 'center/member', auth: '/organPage',
                    //     title: '会员管理',
                    //     icon: 'crownfill',
                    //     component: require('@/pages/center/member/index.vue').default,
                    // },
                    // {
                    //     name: 'center/punch', auth: '/organPage',
                    //     title: '打卡记录列表',
                    //     icon: 'crownfill',
                    //     component: require('@/pages/center/punch/index.vue').default,
                    // },


                    //end

                    {
                        name: 'center/policy', auth: '/organPage',
                        title: '政策管理',
                        icon: 'crownfill',
                        component: require('@/pages/center/policy/index.vue').default,
                    },
                    {
                        path: '/center/policy/:id',
                        name: 'center/policy-id',
                        title: '政策编辑',
                        belong: 'center/policy',
                        rollback: 'center/policy',
                        hide: true,
                        component: require('@/pages/center/policy/id.vue').default,
                    },


                    {
                        name: 'center/utensil', auth: '/devicePage',
                        title: '辅具管理',
                        icon: 'circlefill',
                        component: require('@/pages/center/utensil/index.vue').default,
                    },
                    {
                        path: '/center/utensil/:id',
                        name: 'center/utensil-id',
                        title: '辅具编辑',
                        belong: 'center/utensil',
                        rollback: 'center/utensil',
                        hide: true,
                        component: require('@/pages/center/utensil/id.vue').default,
                    },

                    {
                        name: 'center/institution', auth: '/policyPage',
                        title: '机构管理',
                        icon: 'upstagefill',
                        component: require('@/pages/center/institution/index.vue').default,
                    },
                    {
                        path: '/center/institution/:id',
                        name: 'center/institution-id',
                        title: '机构信息',
                        belong: 'center/institution',
                        rollback: 'center/institution',
                        hide: true,
                        component: require('@/pages/center/institution/id.vue').default,
                    },
                    {
                        path: '/center/institution/:id/record',
                        name: 'center/institution-id/record',
                        title: '服务记录',
                        belong: 'center/institution',
                        rollback: 'center/institution',
                        hide: true,
                        component: require('@/pages/center/institution/id/record.vue').default,
                    },
                    {
                        path: '/center/institution/:id/query_record',
                        name: 'center/institution-id/query_record',
                        title: '服务详情',
                        belong: 'center/institution',
                        rollback: 'center/institution',
                        hide: true,
                        component: require('@/pages/center/institution/id/query_record.vue').default,
                    },

                    {
                        name: 'center/condition', auth: '/conditionPage',
                        title: '条件管理',
                        icon: 'forwardfill',
                        component: require('@/pages/center/condition/index.vue').default,
                    },
                    {
                        path: '/center/condition/:id',
                        name: 'center/condition-id',
                        title: '条件编辑',
                        belong: 'center/condition',
                        rollback: 'center/condition',
                        hide: true,
                        component: require('@/pages/center/condition/id.vue').default,
                    },
                    {
                        name: 'center/category', auth: '/categoryPage',
                        title: '类目管理',
                        icon: 'tagfill',
                        component: require('@/pages/center/category/index.vue').default,
                    },
                    {
                        name: 'center/system/us', auth: '/introducePage',
                        title: '平台介绍',
                        icon: 'formfill',
                        component: require('@/pages/center/system/us.vue').default,
                    },
                    {
                        name: 'center/system/course', auth: '/coursePage',
                        title: '使用指南',
                        icon: 'formfill',
                        component: require('@/pages/center/system/course.vue').default,
                    },
                    {
                        name: 'center/system/log', auth: '/logPage',
                        title: '操作记录',
                        icon: 'newshotfill',
                        component: require('@/pages/center/system/log.vue').default,
                    },

                    {
                        name: 'center/power', auth: '/autoPage',
                        title: '权限管理',
                        icon: 'samefill',
                        redirect: {
                            name: 'center/power/account'
                        },
                    },
                    {
                        name: 'center/power/account', auth: '/ccountPage',
                        title: '账号列表',
                        icon: 'profilefill',
                        belong: 'center/power',
                        component: require('@/pages/center/power/account.vue').default,
                    },
                    {
                        path: '/center/power/account/:id',
                        name: 'center/power/account-id',
                        title: '新增账号',
                        belong: 'center/power',
                        rollback: 'center/power/account',
                        hide: true,
                        component: require('@/pages/center/power/account-id.vue').default,
                    },
                    {
                        name: 'center/power/role', auth: '/rolePage',
                        title: '角色管理',
                        icon: 'profilefill',
                        belong: 'center/power',
                        component: require('@/pages/center/power/role.vue').default,
                    },
                    {
                        path: '/center/power/role/:id',
                        name: 'center/power/role-id',
                        title: '新增角色',
                        belong: 'center/power',
                        rollback: 'center/power/role',
                        hide: true,
                        component: require('@/pages/center/power/role-id.vue').default,
                    },

                ],
            },
            {
                name: 'admin',
                alias: '/',
                title: '管理中心',
                component: require('@/pages/admin/index').default,
                children: [
                    {
                        name: 'admin/statis',
                        title: '首页',
                        icon: 'rankfill',
                        component: require('@/pages/admin/statis/index.vue').default,
                    },
                    {
                        name: 'admin/account',
                        title: '用户中心',
                        icon: 'friendfill',
                        component: require('@/pages/admin/account/index.vue').default,
                    },
                    {
                        path: '/admin/account/:userId/record',
                        name: 'admin/account-id/record',
                        title: '服务记录',
                        belong: 'admin/account',
                        rollback: 'admin/account',
                        hide: true,
                        component: require('@/pages/admin/account/id/record.vue').default,
                    },
                    {
                        path: '/admin/account/record/details/:id',
                        name: 'admin/account-id/record/details',
                        title: '录入详情',
                        belong: 'admin/account',
                        rollback: 'admin/account',
                        hide: true,
                        component: require('@/pages/admin/account/id/record-details.vue').default,
                    },
                    {
                        path: '/admin/account/record/edit/:id',
                        name: 'admin/account-id/record/edit',
                        title: '录入',
                        belong: 'admin/account',
                        rollback: 'admin/account',
                        hide: true,
                        component: require('@/pages/admin/account/id/record-edit.vue').default,
                    },
                    {
                        name: 'admin/service',
                        title: '服务记录',
                        icon: 'friendfill',
                        component: require('@/pages/admin/service/index.vue').default,
                    },
                    // {
                    //     path: '/admin/service/:id/details',
                    //     name: 'admin/service/details',
                    //     title: '服务记录',
                    //     belong: 'admin/service',
                    //     rollback: 'admin/service',
                    //     hide: true,
                    //     component: require('@/pages/admin/service/details.vue').default,
                    // },
                    {
                        path: '/admin/service/details/:id',
                        name: 'admin/service/details',
                        title: '服务记录',
                        belong: 'admin/service',
                        rollback: 'admin/service',
                        hide: true,
                        component: require('@/pages/admin/service/record-details.vue').default,
                    },
                    {
                        path: '/admin/service/edit/:id',
                        name: 'admin/service/edit',
                        title: '录入',
                        belong: 'admin/service',
                        rollback: 'admin/service',
                        hide: true,
                        component: require('@/pages/admin/service/record-edit.vue').default,
                    },
                ],
            },
        ]
    },
    {
        path: '/login', // 登录页面
        name: 'login',
        component: require('@/pages/common/login').default,
    },
    {
        path: '*',
        name: 'error',
        component: require('@/pages/common/error').default,
    },
]
// 初始化路由信息
let dir = {}
const installClient = (group, parent) => {
    function metaInfo(target) {
        for (let item of target) {
            let meta = {
                title: item.title, // 标题
                icon: item.icon ? item.icon : null, // 图标
                belong: item.belong ? item.belong : null, // 隶属导航分组
                rollback: item.rollback ? item.rollback : null, // 上一级
                breadcrumb: parent && parent.meta && parent.meta.breadcrumb ? Helper.Origin(parent.meta.breadcrumb) : [],
                auth: item.auth,
            }
            if (!item.path) {
                item.path = '/' + item.name
            }
            Vue.set(item, 'meta', meta)
            dir[item.name] = item
            if (item.children && item.children.length > 0) {
                Vue.set(item, 'children', metaInfo(item.children, item))
            }
        }
        return target
    }
    let routes = metaInfo(group)
    return new Router({ routes })
}

// 初始化左侧导航信息
const installNavigation = (group, mode = 'center') => {
    for (let main of group) {
        if (main.name === mode) {
            let arr = []
            let dir = {}
            // 生成导航组实例
            for (let item of main.children) {
                if (!item.belong && !item.hide) {
                    let { title, name, icon, auth } = item
                    arr.push({
                        title, name, icon, auth, lonely: true, child: [],
                    })
                    dir[name] = arr.length - 1
                }
            }
            // 生成导航组子项目
            for (let item of main.children) {
                if (item.belong) {
                    let index = dir[item.belong]
                    if (index >= 0) {
                        let { title, name, icon, auth, hide } = item
                        arr[index].child.push({
                            title, name, icon, auth, hide
                        })
                    }
                }
            }
            // 判断导航组是否自有他自己
            for (let item of arr) {
                if (item.child && item.child.length > 0) {
                    for (let sub of item.child) {
                        if (!sub.hide) {
                            item.lonely = false
                        }
                    }
                }
            }
            return arr
        }
    }
    return []
}

const middleware = {
    list, dir,
    client: installClient(list), // 路由待挂载实例
    navigation: {
        index: installNavigation(list[0].children, 'index'),
        center: installNavigation(list[0].children, 'center'),
        admin: installNavigation(list[0].children, 'admin'),
    },
}
export default middleware