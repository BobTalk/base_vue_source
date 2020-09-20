import {initMixin} from './mixin.js';
import initAssetRegisters from './assets.js';
import { ASSETS_TYPE } from './const.js';
import initExtend from './extend.js';
export function initGlobalAPI(Vue) { 
    Vue.options = {}
    initMixin(Vue)
    ASSETS_TYPE.forEach(type => { 
        Vue.options[type + 's'] = {}
    })
    Vue.options._base = Vue
    initAssetRegisters(Vue)
    initExtend(Vue) //注册extend
}