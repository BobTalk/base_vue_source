
let id = 0
export default class Dep {
    constructor() { 
        this.id = id
        this.subs = []
    }
    addSub(watcher) { 
        this.subs.push(watcher)
    }
    depend() { 
        Dep.target.addDep(this)
        // this.subs.push(Dep.target) // 观察者模式
    }
    notify() { 
        this.subs.forEach(watcher => watcher.update())
    }
 }
let stack=[]
export function pushTarget(watcher) {
    Dep.target = watcher
    stack.push(watcher)
 }
export function popTarget() {
    stack.pop()
    Dep.target = stack[stack.length -1]
}
 