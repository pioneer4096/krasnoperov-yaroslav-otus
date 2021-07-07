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
        path.push(calculatePartPath(element, parent))
        if(isBody(parent)) {
            return flushPath(path)
        }
        else {
            element = parent
            parent = getParent(element)
            path.push(calculatePartPath(element, parent))
            if(isBody(parent)) {
                return flushPath(path)
            }
            else {
                element = parent
                parent = getParent(element)
                path.push(calculatePartPath(element, parent))
                if(isBody(parent)) {
                    return flushPath(path)
                }
                else {
                    element = parent
                    parent = getParent(element)
                    path.push(calculatePartPath(element, parent))
                    if(isBody(parent)) {
                        return flushPath(path)
                    }
                    else {
                        return '' // unhandled for now
                    }
                }
            }
        }
    }
}

const calculatePartPath = function (element, parent) {
    const elementTagName = getTagName(element)
    const childCount = parent.children.length

    if(childCount > 1) {
        const elIndex = [...parent.children].indexOf(element)
        return `${elementTagName}:nth-child(${elIndex})`
    }
    else {
        return `${elementTagName}`
    }
}

const flushPath = function (path) {
    const stringPath = getStringPath(path)
    return `${TAG_BODY} ${stringPath}`
}

const getParent = function (el) {
    return el && el.parentNode || null

}

const isBody = function (el) {
    return getTagName(el) === TAG_BODY
}

const getTagName = function(el) {
    return el.tagName.toLowerCase()
}

const getStringPath = function(path = []) {
    return path.map(p => p).reverse().join(' ')
}

module.exports = getPath