import initMixin from './mixin.js';
import initAssetRegisters from './assets.js';
import { ASSETS_TYPE } from './const.js'; //VUE中常见关键字（component filter directive......）
import initExtend from './extend.js'; // 继承
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