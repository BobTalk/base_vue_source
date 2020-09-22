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
function createElm(vnode) { 
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
function updateProps(vnode) {
    let newProps = vnode.data || {}
    let el = vnode.el
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