const TAG_BODY = 'body'

const getPath = function(el) {
    if(!el) {
        throw new Error('некорректный элемент в аргументе функции')
    }

    if(getTagName(el) === TAG_BODY) {
        return TAG_BODY
    }
    else {
        const path = []

        let element = el
        let parent = getParent(element)
        path.push(calculateElementPath(element, parent))

        while(!isBody(parent)) {
            element = parent
            parent = getParent(element)
            path.push(calculateElementPath(element, parent))
        }

        return flushPath(path)
    }
}



const calculateElementPath = function(element, parent) {
    const elementTagName = getTagName(element)
    const childCount = parent.children.length

    if(childCount > 1) {
        const elIndex = [...parent.children].indexOf(element)
        return `${elementTagName}:nth-child(${elIndex + 1})`
    }
    else {
        return `${elementTagName}`
    }
}

const getParent = function(el) {
    return el && el.parentNode || null

}

const isBody = function(el) {
    return getTagName(el) === TAG_BODY
}

const getTagName = function(el) {
    return el.tagName.toLowerCase()
}

const getStringPath = function(path = []) {
    return path.map(p => p).reverse().join(' ')
}

const flushPath = function(path) {
    const stringPath = getStringPath(path)
    return `${TAG_BODY} ${stringPath}`
}

module.exports = getPath
