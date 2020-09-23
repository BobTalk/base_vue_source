1. index.js 入口文件
2. initMixin 增加初始化方法
3. renderMixin 增添渲染方法 调用render函数
4. lifecyclesMixin 增添update函数 将虚拟dom渲染成真实dom  
5. 虚拟节点比对

```
import { compileToFunction } from './compiler/index.js';
import { createElm } from './vdom/patch';
let vm = new Vue({
   data: {name:'hello'}
})
let render = compileToFunction('<div>{{name}}</div>')
let vnode = render.call(vm)
let el = createElm(vnode)
document.body.appendChild(el)
```
    5.1 diff算法 平级比对 