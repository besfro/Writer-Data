function string2utf8 (str) {
    if (typeof str !== 'string') return
    const code = str.charCodeAt(0).toString(2)
    const len = code.length
    if (len > 7) {
        let start = code.length
        let end = code.length - 6
        const arr = []
        while (start > 0) {
            const substr = code.slice(end, start)
            const len = substr.length
            if (len < 6) {
                const cover = new Array(arr.length + 1).fill(1).join('')
                const cover0 = new Array(6 - 1 - len).fill(0).join('')
                arr.push(`${cover}${cover0}${substr}`)
            } else {
                arr.push(`${10}${substr}`)
            }
            start = end
            end = end < 6 ? 0 : end - 6
        }
        return arr.reverse().join('')
    } else {
        return `0${code}`
    }
}

string2utf8('汉')