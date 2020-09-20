import { isObject, def } from '../utils/index.js';
import { arrayMethods } from './arrayMethods.js';
import Dep from './dep.js';
class Observe { 
    constructor(value) { 
        this.dep = new Dep();
        def(value, '__ob__', this)
        if (Array.isArray(value)) { 
            value.__proto__ = arrayMethods
            this.observeArray(value)
        } else { 
            this.walk(value) // 对数组进行监控
        }
        
    }
    observeArray(value) {
        for (let i = 0; i < value.length; i++) { 
            observe(value[i])
        }
     }
    walk(data) { 
        let keys = Object.keys(data)
        keys.forEach(key => { 
            defineReactive(data, key, data[key])
        })
    }
}
// 核心 数据拦截
function defineReactive(data, key, value) { 
    let dep = new Dep()
    // observe(value)
    let childOb = observe(value) // 返回结果为observe实例
    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() { 
            console.log('get Val')
            if (Dep.target) {  // 当前watcher
                dep.depend() 
                if (childOb) { 
                    childOb.dep.depend() // 收集数组依赖
                    if (Array.isArray(value)) {  //主要用于数组中的数据又是数组
                        dependArray(value)
                    }
                }
            }
            return value
        },
        set(newVal) { 
            console.log('set Val')
            if (newVal == value) return
            observe(newVal)
            value = newVal
            dep.notify() // 执行warcher
        }
    })
}
function dependArray(value) {
    for (let i = 0; i < value.length; i++) { 
        let current = value[i]
        current.__ob__ && current.__ob__.dep.depend()
        if (Array.isArray(current)) { 
            dependArray(current)
        }
    }
 }
export function observe(data) { 
    let isObj = isObject(data)
    if (!isObj) return // 是否是对象
    return new Observe(data) // 观察数据
}