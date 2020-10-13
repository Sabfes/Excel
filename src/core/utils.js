export function capitalize(str) {
    if (typeof str !== 'string') {
        return ''
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function camelToDashCase(str) {
    return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export function debounce(fn, wait) {
    let timeout
    return function (...args) {
        const later = () => {
            clearTimeout(timeout)
            fn.apply(this, args)
            fn(...args)
        }
        clearTimeout(timeout)
        timeout == setTimeout(later, wait)
    }
}
export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
        .map( key=> `${camelToDashCase(key)}: ${styles[key]}`)
        .join(';')
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function range(start, end) {
    if (start > end) {
        [end , start] = [start, end]
    }
    return new Array(end-start + 1)
        .fill('')
        .map( (_, index) => start + index)
}

export function storage(key, data) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}

export function matrix($target, $current) {
    const target = $target.id(true)
    const current = $current.id(true)
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)

    return  cols.reduce( (acc, col)=> {
        rows.forEach( row => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export function nextSelector(key, {col, row}) {
    const MIN_VALUE = 0

    switch (key) {
        case 'Enter':
            row++
            break
        case 'ArrowDown':
            row++
            break
        case 'Tab':
            break
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            col = col -1 < MIN_VALUE ? MIN_VALUE : col - 1
            break
        case 'ArrowUp':
            row = row -1 < MIN_VALUE ? MIN_VALUE : row - 1
            break
    }

    return `[data-id="${row}:${col}"]`
}