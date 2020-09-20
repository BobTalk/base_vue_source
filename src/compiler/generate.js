const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
export function generate(el) { 
    const children = genChildren(el)
    let code = `_c('${el.tag}', ${el.attrs.length ? genProps(el.attrs) : "undefined"}${children ? `,${children}` : ''})`
    return code
}
function genProps(attrs) { 
    let str = ''
    for (let i = 0; i < attrs.length; i++) { 
        let attr = attrs[i]
        if (attr.name == 'style') { 
            let obj = {}
            attr.value.split(';').forEach(item => {
                let [key, value] = item.split(":")
                obj[key] = value
            });
            attr.value = obj
            
        }
        console.log(attr)
        str += `${attr.name}:${JSON.stringify(attr.value)},`
    }
    console.log(str)
    return `{${str.slice(0,-1)}}`
}
function genChildren(el) { 
    let children = el.children
    if (children && children.length > 0) {
        return `${children.map(c => gen(c)).join(',')}`
     } else { 
        return false
    }
}
function gen(node) { 
    if (node.type == 1) {
        // 元素
        return generate(node)
    } else { 
        let text = node.text
        let tokens = []
        // 重置正则指针
       let lastIndex =  defaultTagRE.lastIndex = 0
        let match, index;
        while (match = defaultTagRE.exec(text)) { 
            index = match.index
            if (index > lastIndex) { 
                tokens.push(JSON.stringify(text.slice(lastIndex, index)))
            }
            tokens.push(`_s(${match[1].trim()})`)
            lastIndex = index + match[0].length
        }
        if (lastIndex < text.length) { 
            tokens.push(JSON.stringify(text.slice(lastIndex)))
        }
        return `_v(${tokens.join('+')})`
    }
}