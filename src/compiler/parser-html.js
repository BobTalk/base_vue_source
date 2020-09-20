/**
 *  ?: 匹配不捕获
 *  @summary 模版编译
 */
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // abc-dfc
const qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
const startTagOpen = new RegExp(("^<" + qnameCapture));
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
export function parseHTML(html) {
    let root = null;
    let currentParent; // 标识但前父级
    let stack = []
    let ELEMENT_TYPE = 1;
    let TEXT_TYPE = 3
    function createASTElement(tagName, attrs) {
        return {
            tag: tagName,
            type: ELEMENT_TYPE,
            children: [],
            attrs,
            parent: null
        }
    }

    function start(tagName, attrs) {
        let element = createASTElement(tagName, attrs)
        if (!root) { 
            root = element
        }
        currentParent = element
        stack.push(element)
    }
    function chars(text) { 
        console.log('文本', text)
        text = text.replace(/\s/g, '')
        if (text) { 
            currentParent.children.push({
                text,
                type: TEXT_TYPE
            })
        }
    }
    function end(tagName) {
        console.log('结束标签', tagName)
        let element = stack.pop()
        currentParent =  stack[stack.length -1]
        if (currentParent) { 
            element.parent = currentParent
            currentParent.children.push(element)
        }
    }
    while (html) { 
        let textEnd = html.indexOf('<')
        if (textEnd == 0) { 
            let startTagMatch = parseStartTag()
            if (startTagMatch) { 
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue;
            }
            let endTagMatch = html.match(endTag)
            if (endTagMatch) { 
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
                continue;
            }
        }
        let text;
        if (textEnd >= 0) { 
            text = html.substring(0, textEnd)
        }
        if (text) { 
            advance(text.length)
            chars(text)
        }
    }
    function advance(n) {
        html = html.substring(n)
     }
    function parseStartTag() { 
        let start = html.match(startTagOpen)
        
        if (start) { 
            const match = {
                tagName: start[1],
                attrs:[]
            }
            advance(start[0].length)
            let end, attr;
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                advance(attr[0].length)
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                })
            }
            console.log(match)
            console.log(html)
            if (end) { 
                advance(end[0].length);
                return match
            }
        }
    }
    return root
 }