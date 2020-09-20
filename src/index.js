import { initMixin } from './init'
import { renderMixin } from './render.js';
import { lifecycleMixin } from './lifecycle';
import { initGlobalAPI} from './initGlobalAPI/index.js';
function Vue(options) {
   this._init(options) // 在原型上
}
initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)
initGlobalAPI(Vue)
export default Vue