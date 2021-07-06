const getPath = function(el) {
    if(!el) {
        throw new Error('некорректный элемент в аргументе функции')
    }
    /*const path = []
    let element = el
    let parent = null

    do {
        parent = getParent(element)
        console.log('parent = ', parent, ' and tagName = ', parent && parent.tagName)
        if(parent) {
            const children = parent.children
            const tagName = element.tagName
            if(children.length === 1) {
                path.push(tagName)
            }
            else {
                const index = [...children].indexOf(element)
                path.push(`${tagName}:nth-child${index}`)
            }
        }
        else {

        }
    } while(parent)

    return path.map(p => p).reverse().join(' ')*/
}

const getParent = function (el) {
    const parent = el && el.parentNode
    return parent
        ? parent.tagName === 'BODY'
            ? null
            : parent
        : null
}

module.exports = getPath