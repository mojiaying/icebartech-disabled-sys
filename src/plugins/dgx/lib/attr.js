import Vue from 'vue'
import { deepCopy, isObject, isArray } from '../helper.js'

export default function(options,model){
    options.state[model] = Object.assign({
        name    : model,
        init    : false,
        loading : false,
        editing : false,
        ajax    : [],
        error   : false,
        filter  : {},
        page  : 1,
        total : null,
        empty : false,
        list  : [],
        id     : null,
        active : null,
        item   : null,
        update : null,
    },options.state[model])
}