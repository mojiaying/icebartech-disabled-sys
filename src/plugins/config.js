
import Vue from 'vue'

const { name:project, version, copyright } = require('../../package.json')
const isDev = process.env.NODE_ENV === 'development'

export default {
    project, version, copyright, 

    base: isDev ? "http://192.168.1.192:60527/api/" : "https://dreamlotserver.icebartech.com/api/",
    // base:  "http://penghua.free.idcfengye.com",
    //https://disableddev.javajoy.cn/   提交测试环境域名
    //https://dreamlotserver.icebartech.com/  打包线上环境域名
    // base:"https://21.97.8.128",
    // base:  "https://disableddev.javajoy.cn/",
    base_img: "//bpu.baojia-yjz.com/project/image/",

    image_public  : "//bpu.baojia-yjz.com/project/image/",
    image_private : "//spr.baojia-yjz.com/project/image/",

    icon : {
    	common : "//at.alicdn.com/t/font_1577292_91v8i0ur2y.js",
    },
    
    env: process.env.NODE_ENV,
    isDev,
}