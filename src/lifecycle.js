import Watcher from './observe/watcher.js';
import {patch } from './vdom/patch.js';
export function mountComponent(vm, el) {
    const options = vm.$options
    vm.$el = el
    callHook(vm, 'beforeMount')
    let updateComponent = () => { 
        // 通过虚拟dom 创建真实dom
        vm._update(vm._render())
    }
    new Watcher(vm, updateComponent, () => { }, true)
    callHook(vm, 'mounted')
}
export function lifecycleMixin(Vue) { 
    Vue.prototype._update = function (vNode) { 
        console.log(vNode)
        const vm = this
        const prevVnode = vNode._vnode //  保存第一次渲染的虚拟节点
        vNode._vnode = vNode
        if (!prevVnode) { // 第一次渲染
             vm.$el = patch(vm.$el, vNode) //使用虚拟节点渲染真实dom
        } else {
            vm.$el = patch(prevVnode, vNode)
        }
       
    }
}
export function callHook(vm, hook) { 
    const handlers = vm.$options[hook]
    if (handlers) { 
        for (let i = 0; i < handlers.length; i++) { 
            handlers[i].call(vm)
        }
    }
}