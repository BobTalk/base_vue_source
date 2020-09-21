import initMixin from './mixin.js';
import initAssetRegisters from './assets.js';
import { ASSETS_TYPE } from './const.js';
import initExtend from './extend.js';
export function initGlobalAPI(Vue) { 
    Vue.options = {}
    initMixin(Vue)
    // 初始化 组件 指令 过滤器
    ASSETS_TYPE.forEach(type => { 
        Vue.options[type + 's'] = {}
    })
    Vue.options._base = Vue
    initExtend(Vue) //注册extend
    initAssetRegisters(Vue)
}