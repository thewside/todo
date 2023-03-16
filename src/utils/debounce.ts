// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = function(this: any, func: Function, ms = 300): Function {
    let pressed: boolean
    let timeout: ReturnType<typeof setTimeout> | null
    return () => {
        if(pressed) return
        pressed = true
        timeout = setTimeout(() => {
            pressed = false
            timeout = null
            if(timeout) clearTimeout(timeout)
            func()
        }, ms)
    }
}