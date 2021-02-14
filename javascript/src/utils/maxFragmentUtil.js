export function fragmentSort(a, b) {
    const alen = a.length
    const blen = b.length

    if(alen === blen) {
        return (a.join('') > b.join('')) ? 1 : -1   // в лексикографическом порядке
    }
    else {
        return (alen > blen) ? -1 : 1   // по убыванию длин
    }
}

export function findMaxFragment(fragments) {
    const clone = fragments
        .map(f => {
            return f.map(letter => letter).sort()   // на всякий сортируем каждый фрагмент в лексикографическом порядке
        })
        .sort(fragmentSort)

    return clone[0]
}