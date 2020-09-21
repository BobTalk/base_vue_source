import { mergeOptions } from '../utils/index.js';
export function initMixin(Vue) { 
    Vue.mixin = function (mixin) {
        // this => Vue
        // 如何实现两个对象的合并
        console.log(this)
        this.options =  mergeOptions(this.options, mixin)
     }
}