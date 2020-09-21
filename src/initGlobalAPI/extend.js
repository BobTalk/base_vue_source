import { mergeOptions } from "../utils/index.js"
let cid = 0
export default function initExtend(Vue) {
    Vue.extend = function(extendOptions) { 
        console.log(extendOptions)
        const Sub = function VueComponent(options) { 
            this._init(options)
        }
        Sub.cid = cid++
        Sub.prototype = Object.create(this.prototype)
        Sub.prototype.constructor = Sub
        Sub.options = mergeOptions(this.options, extendOptions)
        return Sub
    }
 }