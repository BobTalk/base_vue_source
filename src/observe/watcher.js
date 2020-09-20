import { pushTarget, popTarget } from './dep.js';
import { queueWatcher} from './schedular.js';
let id = 0
export default class Watcher{ 
    constructor(vm, exprOrFn, cb, options) { 
        this.vm = vm
        this.getter =  exprOrFn
        this.cb = cb
        this.id = id++
        this.depsId = new Set()
        this.deps = []
        this.options = options
        this.get() // 渲染函数执行
    }
    get() { 
        pushTarget(this) // 收集watcher
        this.getter()
        popTarget() // 删除watcher
    }
    update() {
        queueWatcher(this) // 主要用于多次出发收集完毕后一次执行
        // this.getter()
    }
    run() { 
        this.get()
    }
    addDep(dep) { 
        // 不能存放重复的dep/watcher
        let id = dep.id
        if (this.depsId.has(id)) { 
            this.depsId.add(id)
            this.deps.push(dep)
            dep.addSub(this) // this => watcher 函数在dep.js中
        }
    }
}