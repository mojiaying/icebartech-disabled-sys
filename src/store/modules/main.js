import dgx from '@/plugins/dgx/index.js'
import ajax from '@/plugins/ajax.js'
import Helper from '@/plugins/helper.js'

const store = 'main';
const STORE = store.toUpperCase();

// const MakeAdminPath = function(name){
//     return {
//         GET: { url:`admin/${name}/page`, method:'POST', row:`admin/${name}/{id}`, row_method: 'GET' },
//         POST: `admin/${name}/save`,
//         PUT: { url:`admin/${name}/save`, method:'POST'},
//         DELETE: { row:`admin/${name}/{id}` }
//     }
// }

export default dgx({
    store,
    state: {

        account: {
            title: '用户',
            paths: {
                GET: { url:'admin/wx/user/page', row:'admin/wx/user/{id}', method:'POST', row_method: 'GET' },
                POST: 'admin/wx/user/save',
                PUT: { url:'admin/wx/user/update', method:'POST'},
                DELETE: { row:'admin/wx/user/{id}', }
            },
        },
        clock: {
            title: '打卡',
            paths: {
                GET: { url:'admin/punch/page', row:'admin/punch/{id}', method:'POST', row_method: 'GET' },
            },
        },
        punchRecord: {
            title: '打卡',
            paths: {
                GET: { url:'admin/punch/page', row:'admin/punch/{id}', method:'POST', row_method: 'GET' },
            },
        },
        service: {
            title: '服务内容',
            paths: {
                GET: { url:'admin/serve/page', method:'POST', row:'admin/serve/{id}', row_method: 'GET' },
                POST: 'admin/serve/save',
                PUT: { url:'admin/serve/save', method:'POST'},
                DELETE: { row:'admin/serve/{id}'}
            },
        },
        statis: {
            title: '统计',
            paths: 'admin/count/',
            keys: [
                { name:'appUserTotal', title:'会员总数' },
                // { name:'everydayTotal', title:'每日新增' },
                { name:'bxTotal', title:'报销总额' },
                
                { name:'expendTotal', title:'消费总数' },
                { name:'punchTotal', title:'打卡总数' },
                { name:'punchUserTotal', title:'打卡会员数' },
                { name:'organTotal', title:'机构总数' },
            ],
        },

        banner: {
            title: '轮播广告',
            paths: {
                GET: { url:'admin/banner/page', method:'POST', row:'admin/banner/{id}', row_method: 'GET' },
                POST: 'admin/banner/save',
                PUT: { url:'admin/banner/save', method:'POST'},
                DELETE: { row:'admin/banner/{id}' }
            },
        },
        banner_selector: {
            title: '轮播广告选择器',
            paths: {
                GET: { url:'admin/policy/page', method:'POST', row:'admin/policy/{id}', row_method: 'GET' },
            },
        },

        category: {
            title: '类目',
            paths: {
                GET: { url:'admin/category/page', row:'admin/category/{id}', method:'POST', row_method: 'GET' },
                POST: 'admin/category/save',
                PUT: { url:'admin/category/save', method:'POST'},
                DELETE: { row:'admin/category/{id}' }
            },
        },

        institution: {
            title: '机构',
            paths: {
                GET: { url:'admin/organ/page', method:'POST', row:'admin/organ/{id}', row_method: 'GET' },
                POST: 'admin/organ/save',
                PUT: { url:'admin/organ/save', method:'POST'},
                DELETE: { row:'admin/organ/{id}' }                
            },
        },
        institution_record: {
            title: '打卡记录',
            paths: {
                GET: { url:'admin/punch/findByPage',  row:'admin/punch/findByPage/{id}', method:'POST' },
                POST: 'admin/punch/save',
                PUT: { url:'admin/punch/updateCostStatus', method:'POST'},
            },
        },

        condition: {
            title: '条件',
            paths: {
                GET: { url:'admin/conditionOf/page', method:'POST', row:'admin/conditionOf/{id}', row_method: 'GET' },
                POST: 'admin/conditionOf/save',
                PUT: { url:'admin/conditionOf/save', method:'POST'},
                DELETE: { row:'admin/conditionOf/{id}' }                
            },
            divides: [
                { name:'基本信息', title:'基本信息' },
                { name:'已享受扶持项目', title:'已享受扶持项目' },
            ],
        },
        condition_sub: {
            title: '条件',
            paths: {
                GET: { url:'admin/condition/page', method:'POST', row:'admin/condition/{id}', row_method: 'GET' },
                POST: 'admin/condition/save',
                PUT: { url:'admin/condition/save', method:'POST'},
                DELETE: { row:'admin/condition/{id}' }
            },

        },
        policy: {
            title: '政策',
            paths: {
                GET: { url:'admin/policy/page', method:'POST', row:'admin/policy/{id}', row_method: 'GET' },
                POST: 'admin/policy/save',
                PUT: { url:'admin/policy/save', method:'POST'},
                DELETE: { row:'admin/policy/{id}' }                
            },
            },
            utensil: {
            title: '辅具',
            paths: {
                GET: { url:'admin/device/page', method:'POST', row:'admin/device/{id}', row_method: 'GET' },
                POST: 'admin/device/save',
                PUT: { url:'admin/device/save', method:'POST'},
                DELETE: { row:'admin/device/{id}' }                
            },
        },
        utensil_condition: {
            title: '辅具残疾条件',
            paths: {
                GET: { url:'admin/device/findByDisabilityOfList', method:'POST' }
            },
        },

        power_account: {
            title: '管理员',
            paths: {
                GET: { url:'admin/user/page', row:'admin/user/{id}', method:'POST', row_method: 'GET' },
                POST: 'admin/user/save',
                PUT: { url:'admin/user/save', method:'POST'},
                DELETE: { row:'admin/user/{id}', }
            },
        },
        power: {
            title: '权限',
            paths: {
                GET: { url:'admin/permission/list' }
            },
            types: [
                { name:'admin', title: '管理员' },
                { name:'normal', title: '普通' },
            ],
        },
        role: {
            title: '角色',
            paths: {
                GET: { url:'admin/role/page', row:'admin/role/{id}', method:'POST', row_method: 'GET' },
                POST: 'admin/role/save',
                PUT: { url:'admin/role/save', method:'POST'},
                DELETE: { row:'admin/role/{id}', }
            },
        },


        log: {
            title: '操作日志',
            paths: {                
                GET: { url:'admin/log/page', row:'admin/log/{id}', method:'POST', row_method: 'GET' },
            },
        },
        // district: {
        //     title: '地区选择器',
        //     paths: {
        //         GET: { url:'base/admin/loadDictionary/path' }
        //     },
        // },
        
    },
    actions: {
        GET_ALL_RECORD({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/punch/getCostConf4Batch`,
                data
            })
        },
        GET_BY_ID_CARD({ state, dispatch, commit },data){
            console.log(data.userName)
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `admin/wx/user/getByIdCard?idCard=${data.idCard}`,
                data
            })
        },
        GET_BY_ID_CARD_OR_NAME({ state, dispatch, commit },data){
            console.log(data.userName)
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `admin/wx/user/getByIdCardOrName?idCard=${data.idCard}`,
                data
            })
        },
        // 用户列表 - 下载批量导入模板
        TEMPLATE_ACCOUNT({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `admin/wx/user/exportTemplate`,
                responseType: 'arraybuffer'
            })
        },
        // 用户列表 - 下载批量导入模板
        TEMPLATE_IMPORT_PUNCH({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `admin/punch/template/importPunch`,
                responseType: 'arraybuffer'
            })
        },
         // 数据对比导入模板
         EXPORT_TEMPLATE({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `data/difference/exportTemplate`,
                responseType: 'arraybuffer'
            })
        },
        // 用户列表 - 批量导入
        UPLOAD_ACCOUNT({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/wx/user/import`,
                headers: {
                    'Content-Type' : '123'
                },
                model: 'account',
                data,
            })
        },
        //批量覆盖用户数据
        UPLOAD_BATCH_SAVE({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/wx/user/batchSave`,
                model: 'account',
                data,
            })
        },
        // 用户列表 - 批量导入
        UPLOAD_PUNCH_ACCOUNT({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/punch/excel/importPunch`,
                timeout:100000,
                headers: {
                    'Content-Type' : ''
                },
                model: 'account',
                data,
            })
        },
        // 数据对比 - 批量导入
        DIFFERENCE_IMPORT({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `data/difference/import`,
                headers: {
                    'Content-Type' : ''
                },
                model: 'account',
                data,
            })
        },
        // 用户列表 - 批量导出
        EXPORTS_ACCOUNT({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/wx/user/excel/export`,
                model: 'account',
                responseType: 'arraybuffer',
                data,
            })
        },
        // 用户列表 - 批量导出
        EXPORTS_ACCOUNT_PDF({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/wx/user/pdf/export`,
                model: 'account',
                responseType: 'arraybuffer',
                data,
            })
        },
        // 用户列表 - 批量导出
        EXPORTS_PUNCH_PDF({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                timeout: 100000000,
                method: 'POST',
                url: `admin/h5_punch/pdf/export?ids=${data.ids}&loginId=${data.userId}`,
                model: 'account',
                responseType: 'arraybuffer',
                data
            })
        },
        // 用户列表 - 批量导出
        EXPORTS_PUNCH_EXCEL({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/h5_punch/pdf/exportOrganUser`,
                model: 'account',
                responseType: 'arraybuffer',
                data
            })
        },
        // 用户列表 - 导出用户列表
        ANNUAL_EXPORT({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/punch/excel/annualExport`,
                model: 'account',
                responseType: 'arraybuffer',
                data
            })
        },
        // 数据对比导出记录日志
        EXPORTS_PO_LOG({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `data/difference/savePoLog`,
                model: 'account',
                responseType: 'arraybuffer',
            })
        },
        
        // 用户列表 - 批量激活或冻结
        ACTIVATE_ACCOUNT({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `admin/wx/user/updateActivate/${data.ids}?isActivate=${data.isActivate ? 'y' : 'n'}`,
                model: 'account',
                data,
            })
        },
        // 获取平台介绍
        GET_INTRODUCE({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `introduce/findByIntroduce`,
            })
        },
        // 保存平台介绍
        PUT_INTRODUCE({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `introduce/saveIntroduce`,
                data,
            })
        },
        // 获取平台使用指南
        GET_COURES({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `introduce/findByCourse`,
            })
        },
        // 保存平台使用指南
        PUT_COURES({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `introduce/saveCourse`,
                data,
            })
        },
        // 机构列表 - 批量导出
        EXPORTS_INSTITUTION({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                timeout: 100000,
                url: `admin/organ/export?ids=${data.ids}`,
                model: 'institution',
                responseType: 'arraybuffer',
            })
        },
        UPDATE_COST_STATUS({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/punch/updateCostStatus`,
                data
            })
        },
        SAVE_USER({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/wx/user/save`,
                data
            })
        },
        
        UPDATE_COST_STATUS1({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                timeout: 100000000,
                url: `admin/punch/updateCostStatus1`,
                data
            })
        },
        DELETE_COST_STATUS({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `admin/punch/cancel/${data.id}`,
            })
        },
        // 打卡记录 - 批量导出
        EXPORTS_PUNCH({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/punch/exportPunch`,
                // model: 'institution_record',
                responseType: 'arraybuffer',
                timeout: 100000000,
                data
            })
        },
        EXPORTS_IMAGE({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `admin/wx/user/downloadPunchImg?year=${data.year}&month=${data.month}`,
                timeout: 100000000,
                // model: 'institution_record',
                responseType: 'arraybuffer',
            })
        },
        // 机构服务 - 批量导出
        EXPORTS_RECORD({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/punch/exportService`,
                //model: 'institution_record',
                timeout: 100000000,
                responseType: 'arraybuffer',
                data
            })
        },
        // 机构服务 - 批量导出
        EXPORT_ORGAN_EXCEL_SERVICE({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/punch/exportOrganExcelService`,
                //model: 'institution_record',
                timeout: 100000000,
                responseType: 'arraybuffer',
                data
            })
        },
        REPEAT_ROLE({ state, dispatch, commit },key){
            return dispatch(`${STORE}_AJAX`,{
                method: 'DELETE',
                url: `admin/role/checkRole/${key}`,
                model: 'role',
            })
        },
        FIND_BY_ORGAN_LIST({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/organ/findByOrganList `,
                data
            })
        },
         FIND_BY_ORGAN_LIST_BYID({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `admin/wx/user/queryUserOrgList/${data.id}`,
            })
        },
        FIND_BY_COST({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/punch/findByCost `,
                data
            })
        },
        FIND_AMOUNT({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `/admin/punch/queryFundAmount`,
                data
            })
        },
        
        PUNCH_SAVE({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/punch/savePunch`,
                data
            })
        },
        ORGAN_SERVICE_ID({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `admin/organ/${data.id}`,
                data
            })
        },
        H5_PUNCH({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/h5_punch/save`,
                data
            })
        },
         // 
         SERVE_PAGE({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/serve/page`,
                data
            })
        },
         // 机构服务 - 批量导出
         UPDATE_STATUS({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/organ/updateStatus?ids=${data.ids}&status=${data.status}`,
                data
            })
        },
    },
    mutations: {

    },
}, ajax)
