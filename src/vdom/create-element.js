import { isObject, isReservedTag } from "../utils/index.js";

// render.js 中调用
export function createElement(vm, tag, data = {}, ...children) { 
    let key = data.key;
    if (key) { 
        delete data.key
    }
    if (isReservedTag(tag)) {
        return vnode(tag, data, key, children, undefined)
    } else { 
        // 组件
        let Ctor = vm.$options.components[tag];
        return createComponent(vm, tag, data, key, children, Ctor)
    }
}
function createComponent(vm, tag, data, key, children, Ctor) { 
    let constructorFn;
    if (isObject(Ctor)) { 
        console.log(vm)
        // 调用extend.js
        constructorFn = vm.$options._base.extend(Ctor)
    }
    let cid  = constructorFn && constructorFn.cid
    console.dir(constructorFn)
    console.log(tag)
    
    return vnode(`vue-component-${cid}-${tag}`, data, key, undefined, {
        constructorFn, children
    })
}
// 文本节点
export function createTextNode(vm,text) { 
    return vnode(undefined,undefined, undefined,undefined, text)
}
function vnode(tag, data, key, children, text, componentOptions) {
    return {tag, data, key, children, text,componentOptions}
 }