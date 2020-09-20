let callbacks = []
let waiting = true
export function nextTick(cb) { 
    callbacks.push(cb)
    if (waiting) { 
        setTimeout(() => { 
            callbacks.forEach(fn => fn())
            waiting = true
            callbacks = []
        }, 0)
        waiting = false
    }
   
}