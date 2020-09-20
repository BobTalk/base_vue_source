import { initState } from './state';
import { compileToFunction } from './compiler/index.js';
import { mountComponent, callHook } from './lifecycle.js';
import { mergeOptions } from './utils/index';
import {nextTick} from './utils/next-tick.js';
// 在原型上挂载方法
export function initMixin(Vue) { 
    Vue.prototype._init = function (options) {
        const vm = this
        // 用户传入的 与全局合并 option 千万别写错了
        vm.$options = mergeOptions(vm.constructor.option, options)
        callHook(vm, 'beforeCreate')
        // 初始化状态
        initState(vm)
        callHook(vm,'created')
        // render渲染
        if (vm.$options.el) { 
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount = function (el) { 
        const vm = this;
        const options = vm.$options
        el = document.querySelector(el)
        // 先查找render template 最后用el
        if (!options.render) { 
            let template = options.template
            if (!template && el) { 
                template = el.outerHTML
            }
            options.render = compileToFunction(template)
        }
        mountComponent(vm, el)
    }
    Vue.prototype.$nextTick = nextTick
}
