import { parseHTML } from './parser-html.js';
import { generate} from './generate.js';

export function compileToFunction(template) { 
    // 1. 解析html字符串 将html字符串 ==》ast语法树
    let root = parseHTML(template)
    //  2. 需要将ast语法树生成最终的render函数（字符串拼接）
    let code = generate(root)
    // 将ast树再次转化成js语法 _c('div', {id:'', style:{}},_c('p',undefined,_v('hello')))
    // 使用new Function 结合with实现所有的模版
    let renderFn = new Function(`with(this){return ${code}}`)
    // 返回虚拟dom (对象)
    return renderFn
}


