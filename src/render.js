import { createElement, createTextNode} from './vdom/create-element.js';
export function renderMixin(Vue) { 
    Vue.prototype._c = function () {
        return createElement(this, ...arguments);
    }
    Vue.prototype._v = function (text) { 
        return createTextNode(this, text);
    }
    Vue.prototype._s = function (val) { 
        return val == null ? '' : (typeof val === 'object'? JSON.stringify(val):val)
    }
    Vue.prototype._render = function () { 
        const vm = this
        const { render } = vm.$options
        return render.call(vm)
    }
}