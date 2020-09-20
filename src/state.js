import { observe } from './observe/index.js';
import { proxy } from './utils/index.js';
export function initState(vm) {
    console.log(vm)
    // 数据来源 data props ...
    let opts = vm.$options
    if (opts.props) {
        initProps(vm)
    }
    if (opts.methods) {
        initMethods(vm)
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {
        initComputed(vm)
    }
    if (opts.watch) {
        initWatch(vm)
    }
}

function initProps(vm) { }
function initMethods(vm) { }
function initData(vm) {
    let data = vm.$options.data

    data = vm._data = typeof data === 'function' ? data.call(vm) : data // 需要把数据挂到实例上 否者会导致无法修改
    for (let key in data) {
        proxy(vm, '_data', key)
    }
    // 数据劫持函数
    observe(data)
}
function initComputed(vm) { }
function initWatch(vm) { }