import {ASSETS_TYPE } from './const.js';
export default function initAssetRegisters(Vue) { 
    ASSETS_TYPE.forEach(type => { 
        Vue[type] = function (id, definition) { 
            console.log(id)
            console.log(definition)
            console.log(type)
            if (type == 'component') {
                definition = this.options._base.extend(definition)
             }
            if (type == 'filter') { }
            if (type == 'directive') { }
            this.options[type+'s'][id] = definition
        }
    })
}