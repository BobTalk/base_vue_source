let oldArrayMethods = Array.prototype
// value.__proto__ = arrayMethods
// arrayMethods.__proto__ = oldArrayMethods
export let arrayMethods = Object.create(oldArrayMethods)
const methods = [
    'push',
    'shift',
    'unshift',
    'pop',
    'sort',
    'splice',
    'reverse',
]
methods.forEach(method => { 
    arrayMethods[method] = function (...args) { 
       const result =  oldArrayMethods[method].apply(this, args)
        let inserted;
        let ob = this.__ob__
        switch (method) {
            case "push":
            case "unshift":
                inserted = args
            case 'splice':
                inserted = args.slice(2)
        }
        if (inserted) ob.observeArray(inserted)
        ob.dep.notify()
        return result
    }
})