import dgx from '@/plugins/dgx/index.js'
import ajax from '@/plugins/ajax.js'
import Helper from '@/plugins/helper.js'

const store = 'admin';
const STORE = store.toUpperCase();

export default dgx({
    store,
    state: {
        account: {
            title: '用户',
            paths: {
                GET: { url:'admin/h5_punch/userPage', row:'admin/wx/user/{id}', method:'POST', row_method: 'GET' },
            },
        },
        statis: {
            title: '统计',
            paths: {
                GET: { url: 'admin/h5_punch/findByExpendTotal', method:'POST' },
            },
        },
        institution_record: {
            title: '打卡记录',
            paths: {
                GET: { url:'admin/h5_punch/findOrganUserPage', method:'POST' },
            },
        },
        findByPage: {
            title: '打卡记录',
            paths: {
                GET: { url:'admin/punch/findByPage', method:'POST' },
            },
        },
        service: {
            title: '服务内容',
            paths: {
                GET: { url:'admin/serve/page', method:'POST', row:'admin/serve/{id}', row_method: 'GET' },
            },
        },
        clock: {
            title: '打卡',
            paths: {
                GET: { url: 'admin/h5_punch/page', row: 'admin/h5_punch/{id}', method: 'POST', row_method: 'GET' },
                POST: 'admin/h5_punch/save',
                PUT: { url: 'admin/h5_punch/save', method: 'POST' },
            },
        },
        clock_admin: {//admin.html#/admin/account/3536/record
            title: '打卡',
            paths: {
                GET: { url: 'admin/punch/page', row: 'admin/h5_punch/{id}', method: 'POST', row_method: 'GET' },
                POST: 'admin/h5_punch/save',
                PUT: { url: 'admin/h5_punch/save', method: 'POST' },
            },
        },
    },
    actions: {

        // 用户列表 - 批量导入
        // UPLOAD_ACCOUNT({ state, dispatch, commit },data){
        //     return dispatch(`${STORE}_AJAX`,{
        //         method: 'POST',
        //         url: `admin/wx/user/import`,
        //         model: 'account',
        //         data,
        //     })
        // },
       
        USER_ID_DETA({ state, dispatch, commit },id){
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `admin/wx/user/${id}`,
                model: 'account',
            })
        },
        // 用户列表 - 批量导出
        EXPORTS_ACCOUNT({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `admin/wx/user/h5/export/${data.ids}/${data.userId}`,
                model: 'account',
                responseType: 'arraybuffer',
            })
        },

         // 打卡记录 - 批量导出
         EXPORTS_PUNCH({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/punch/exportPunch/${data.ids}/${data.userId}`,
                model: 'account',
                responseType: 'arraybuffer',
                data
            })
        },
        // EXPORTS_IMAGE({ state, dispatch, commit },data){
        //     return dispatch(`${STORE}_AJAX`,{
        //         method: 'GET',
        //         url: `admin/wx/user/downloadPunchImg`,
        //         model: 'institution_record',
        //         responseType: 'arraybuffer',
        //         data
        //     })
        // },
        // 机构服务 - 批量导出
        EXPORTS_RECORD({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'GET',
                url: `admin/h5_punch/export/${data.ids}`,
                model: 'institution_record',
                responseType: 'arraybuffer',
            })
        },
        // 机构服务 - 批量导出
        EXPORTS_SERVICE({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/h5_punch/pdf/exportService`,
                model: 'institution_record',
                responseType: 'arraybuffer',
                data
            })
        },
        // 导出康复记录
        EXPORTS_ORGAN_SERVICE({ state, dispatch, commit },data){
            return dispatch(`${STORE}_AJAX`,{
                method: 'POST',
                url: `admin/h5_punch/pdf/exportOrganService`,
                model: 'institution_record',
                responseType: 'arraybuffer',
                data
            })
        },
    },
    mutations: {

    },
}, ajax)
