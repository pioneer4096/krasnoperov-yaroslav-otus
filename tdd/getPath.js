const TAG_BODY = 'body'

const getPath = function(el) {
    if(!el) {
        throw new Error('некорректный элемент в аргументе функции')
    }

    if(getTagName(el) === TAG_BODY) {
        return TAG_BODY
    }
    else {
        const parent = getParent(el)
        const parentTagName = getTagName(parent)
        const childCount = parent.children.length
        const elementTagName = getTagName(el)

        if(parentTagName === TAG_BODY) {
            if(childCount > 1) {
                const elIndex = [...parent.children].indexOf(el)
                return `${parentTagName} ${elementTagName}:nth-child(${elIndex})`
            }
            else {
                return `${parentTagName} ${elementTagName}`
            }
        }
        else {
            return ''
        }
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
        ? parent.tagName === TAG_BODY
            ? null
            : parent
        : null
}

const getTagName = function(el) {
    return el.tagName.toLowerCase()
}

module.exports = getPath