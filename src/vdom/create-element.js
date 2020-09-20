export function createElement(tag, data = {}, ...children) { 
    console.log(tag)
    console.log(data)
    console.log(children)
    let key = data.key;
    if (key) { 
        delete data.key
    }
    return vnode(tag, data, key, children, undefined)
}
export function createTextNode(text) { 
    return vnode(undefined,undefined, undefined,undefined, text)
}
function vnode(tag, data, key, children, text) {
    return {tag, data, key, children, text}
 }