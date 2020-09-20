export function isObject(data) {
    return (typeof data == 'object' && data != null) 
}
export function def(data, key, value) { 
    Object.defineProperty(data, key, {
        enumerable: false, // 不参与循环
        writable: false,
        configurable: false,
        value
    })
}
export function proxy(vm,source, key){
    Object.defineProperty(vm, key, {
        get() { 
            return vm[source][key]
        },
        set(newVal) {
            return vm[source][key] = newVal 
        }
    })
}
const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created', 
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    'serverPrefetch'
]
let stratas = {}
// 合并钩子函数 参数来源与 stratas[key](parent[key], child[key]) 
function mergeHook(parentVal, childVal) {
    console.log('mergeHook')
    if (childVal) { 
        if (parentVal) { 
            return parentVal.concat(childVal)
        } else {
            return [childVal]
         }
    } else { 
        return parentVal
    }
 }
LIFECYCLE_HOOKS.forEach(hook => { 
    console.log('LIFECYCLE_HOOKS')
    stratas[hook] = mergeHook
})
// 合并配置选项
export function mergeOptions(parent, child) { 
    const options = {}
    for (let key in parent) { 
        mergeField(key)
    }
    for (let key in child) { 
        // 如果已合并 就不在合并
        if (!parent.hasOwnProperty(key)) { 
            mergeField(key)
        }
    }
    function mergeField(key) {
        console.log("mergeField")
        // 主要用于生命周期
        if (stratas[key]) { 
            return options[key] = stratas[key](parent[key], child[key])
        }
        if (typeof parent[key] === 'object' && typeof child[key] === 'object') {
            options[key] = {
                ...parent[key],
                ...child[key]
            }
        } else if (child[key] == null) {
            options[key] = parent[key]
        } else { 
            options[key] = child[key]
        }
    }
    return options
}