export function patch(oldVnode, vnode) {
    console.log(oldVnode, vnode)
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
 
function createElm(vnode) { 
    let {tag, children, key, data, text } = vnode
    if (typeof tag === 'string') { 
        vnode.el = document.createElement(tag)
        updateProps(vnode)
        children.forEach(child => { 
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