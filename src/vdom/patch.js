export function patch(oldVnode, vnode) {
    console.log(oldVnode, vnode)
    if (!oldVnode) { 
        // 组件模块 创建虚拟节点
        return createElm(vnode)
    }
   
    // 判断是更新还是渲染
    const isRealElement = oldVnode.nodeType
    if (isRealElement) {
        const oldEle = oldVnode
        const parentEle = oldEle.parentNode
        let el = createElm(vnode)
        parentEle.insertBefore(el, oldEle.nextSibling)
        parentEle.removeChild(oldEle)
        return el; //供mount函数使用
    } else { 
        // diff 标签不一致 直接替换
        if (oldVnode.tag != vnode.tag) { 
            // createElm() 方法把虚拟节点跟真实节点关联起来
            oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el)
        }
        if (!oldVnode.tag) { 
            // 文本的情况
            if (oldVnode.text != vnode.text) { 
                oldVnode.el.textContent = vnode.text
            }
        }
        // 标签一致而且不是文本 属性不一致
        let el = vnode.el = oldVnode.el
        updateProps(vnode, oldVnode.data)
        // 子元素比对
        let oldChild = oldVnode.children || []
        let newChild = vnode.children || []
        if (oldChild.length > 0 && newChild.length > 0) { // 新旧都存在子集
            updateChildren(el,oldChild, newChild)
        } else if (newChild.length) {  // 只有新节点
            for (let i = 0; i < newChild.length; i++) {
                let child = newChild[i]
                el.appendChild(createElm(child))
            }
        } else if(oldChild.length){ // 只有旧节点 
            el.innerHTML=''
        }
    }
}
// 标签相同 并且 key也相同
function isSomeVnode(oldVnode, newVnode) {
    return (oldVnode.tag == newVnode.tag) && (oldVnode.key == newVnode.key)
 }
// 子节点比对
function updateChildren(el, oldChild, newChild) { 
    // 采用双指针方式
    let oldStartIndex = 0
    let oldStartVnode = oldChild[0]
    let oldENdIndex = oldChild.length - 1
    let oldEndVnode = oldChild[oldENdIndex]
    let newStartIndex = 0
    let newStartVnode = newChild[0]
    let newENdIndex = newChild.length - 1
    let newEndVnode = newChild[newENdIndex]
    const makeIndexByKey = (children) => { 
        let map = {}
        children.forEach((item, index) => { 
            if(!item.key) return
            map[item.key] = index // 根据key与index关联
        })
        return map
    }
    let map = makeIndexByKey(oldChild)
    // 在比较过程中 只要有一方结束 则比对结束 
    while (oldStartIndex <= oldENdIndex && newStartIndex <= newENdIndex) { 
        if (!oldStartVnode) {
            oldStartVnode = oldChild[++oldStartIndex] // 指针往后走一步
        } else if (!oldEndVnode) { 
            oldEndVnode = oldChild[--oldENdIndex] // 指针往前走一步
        }
        if (isSomeVnode(oldStartVnode, newStartVnode)) {  // 从头开始比较
            // 如果节点tag一致 则比对属性
            patch(oldStartVnode, newStartVnode)
            oldStartVnode = oldChild[++oldStartIndex]
            newStartVnode = newChild[++newStartIndex]
        } else if (isSomeVnode(oldEndVnode, newEndVnode)) {  // 从后开始比较
            patch(oldEndVnode, newEndVnode)
            oldEndVnode = oldChild[--oldENdIndex]
            newEndVnode = newChild[++newENdIndex]
        } else if (isSomeVnode(oldStartVnode, newEndVnode)) {
            // 头移尾
            patch(oldStartVnode, newEndVnode)
            parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling)
            oldStartVnode = oldChild(++oldStartIndex)
            newEndVnode = newChild[--newENdIndex]
        } else if (isSomeVnode(oldEndVnode, newStartVnode)) {
            // 尾移头
            patch(oldEndVnode, newStartVnode)
            parent.insertBefore(oldEndVnode.el, oldStartVnode.el)
            oldEndVnode = oldChild[--oldENdIndex]
            newStartVnode = newChild[++newStartIndex]
        } else { 
            // 乱序 根据节点key做一个映射表
           let moveIndex= map[newStartVnode.key]
            if (!moveIndex) {
                parent.insertBefore(createElm(newStartVnode), oldStartVnode.el)
            } else { //如果在映射表中查找到 直接移走并只为undefined
                let moveVnode = oldChild[moveIndex] // 需要移动的元素
                oldChild[moveIndex] = undefined
                parent.insertBefore(moveVnode.el, oldStartVnode.el)
                patch(moveVnode, newStartVnode)
            }
            newStartVnode = newChild[++newStartIndex]
        }
    }
    if (newStartIndex <= newENdIndex) { 
        for (let i = newStartIndex; i <= newENdIndex; i++) { 
            // parent.appendChild(createElm(newChild[i]))
            let flag = newChild[newENdIndex + 1] == null ? null : newChild[newENdIndex+1].el
            // if (!flag) {
            //     parent.insertBefore(newChild[i], null) // null 等价 appendChild
            // } else { 
            //     parent.insertBefore(newChild[i], flag)
            // }
            parent.insertBefore(newChild[i], flag)
        }
    }
    if (oldStartIndex <= oldENdIndex) { 
        for (let i = oldStartIndex; i <= oldENdIndex; i++) { 
            let child = oldChild[i]
            if (child != undefined) { 
                parent.removeChild(child.el)
            }
        }
    }
}
function createComponent(vnode) {
    console.log(vnode)
    let i = vnode.data
    if ((i = i.hook) && (i = i.init)) { 
        i(vnode)
    }
    // 存在 组件
    if (vnode.componentInstance) { 
        return true
    }
}
//  虚拟节点跟真实节点关联起来
export function createElm(vnode) { 
    let {tag, children, key, data, text } = vnode
    if (typeof tag === 'string') { 
        // tag 有可能是组件 普通元素
        // 实例化组件
        if (createComponent(vnode)) { 
            //   返回真实DOM
            return vnode.componentInstance.$el
        }
        vnode.el = document.createElement(tag)
        updateProps(vnode)
        children && children.forEach(child => { 
            // 递归创建儿子节点 将儿子节点插入到父节点上
            return vnode.el.appendChild(createElm(child))
        })
    } else { 
        vnode.el =  document.createTextNode(text)
    }
    return vnode.el
}
function updateProps(vnode, oldProps = {}) {
    let newProps = vnode.data || {}
    let el = vnode.el
    let newStyle = newProps.style || {}
    let oldStyle = oldProps.style || {}
    // 样式对比
    for (let key in oldStyle) { 
        if (!newStyle[key]) { 
            el.style[key]='' // 删除多余样式
        }
    }
    // diff 老的属性中新的没有 则删除
    for (let key in oldProps) { 
        if (!newProps[key]) { 
            el.removeAttribute(key)
        }
    }

    for (let key in newProps) { 
        if (key == 'style') {
            for (let styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName]
            }
        } else if (key == 'class') {
            el.className = newProps.class
        } else { 
            el.setAttribute(key, newProps[key])
        }
    }
 }