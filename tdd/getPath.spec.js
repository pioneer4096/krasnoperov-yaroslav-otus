const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const getPath = require("./getPath")
const MARKER = 'marker'

function pathHelper(_template) {
    const template = _template
    const dom = new JSDOM(template)
    const el = dom.window.document.getElementById(MARKER)
    const path = getPath(el)

    const querySelectorAll = dom.window.document.querySelectorAll(path)
    const querySelectorAllCount = querySelectorAll.length
    const foundElement = querySelectorAll[0]

    return {
        template,
        dom,
        el,
        path,
        querySelectorAll,
        querySelectorAllCount,
        foundElement
    }
}

describe('TDD01: testing template without any marker', () => {
    const template = `
    <!DOCTYPE html> 
    <body></body>`


    it('should throw an exception', () => {
        expect(() => {
            pathHelper(template)
        }).toThrowError()
    })
})


describe('TDD02: testing template with marker on body', () => {
    const template = `
    <!DOCTYPE html> 
    <body id="${MARKER}"></body>`

    const helper = pathHelper(template)

    it('should return path to body', () => {
        expect(helper.path).toBe('body')
    })

    it('querySelectorAll length === 1', () => {
        expect(helper.querySelectorAllCount).toBe(1)
    })

    it('querySelectorAll finds the same element', () => {
        expect(helper.foundElement.id).toBe(helper.el.id)
    })
})


describe('TDD03: testing template with only one p - tag', () => {
    const template = `
    <!DOCTYPE html>
    <body>
        <p id="${MARKER}">Two</p>
    </body>`

    const helper = pathHelper(template)

    it('should return path "body p"', () => {
        expect(helper.path).toBe('body p')
    })

    it('querySelectorAll length === 1', () => {
        expect(helper.querySelectorAllCount).toBe(1)
    })

    it('querySelectorAll finds the same element', () => {
        expect(helper.foundElement.id).toBe(helper.el.id)
    })
})


describe('TDD04: testing template with few p - tags', () => {
    const template = `
    <!DOCTYPE html>
    <body>
        <p>One</p>
        <p id="${MARKER}">Two</p>
    </body>`

    const helper = pathHelper(template)

    it('should return path "body p:nth-child(2)"', () => {
        expect(helper.path).toBe('body p:nth-child(2)')
    })

    it('querySelectorAll length === 1', () => {
        expect(helper.querySelectorAllCount).toBe(1)
    })

    it('querySelectorAll finds the same element', () => {
        expect(helper.foundElement.id).toBe(helper.el.id)
    })
})


describe('TDD05: testing template with one div contains one p - tag', () => {
    const template = `
    <!DOCTYPE html>
    <body>
        <div>
            <p id="${MARKER}">Two</p>
        </div>
    </body>`

    const helper = pathHelper(template)

    it('should return path "body div p"', () => {
        expect(helper.path).toBe('body div p')
    })

    it('querySelectorAll length === 1', () => {
        expect(helper.querySelectorAllCount).toBe(1)
    })

    it('querySelectorAll finds the same element', () => {
        expect(helper.foundElement.id).toBe(helper.el.id)
    })
})


describe('TDD06: testing template with two div contains one and one p - tags', () => {
    const template = `
    <!DOCTYPE html>
    <body>
        <div>
            <p id="${MARKER}">Two</p>
        </div>
        <div>
            <p>One</p>
        </div>
    </body>`

    const helper = pathHelper(template)

    it('should return path "body div:nth-child(1) p"', () => {
        expect(helper.path).toBe('body div:nth-child(1) p')
    })

    it('querySelectorAll length === 1', () => {
        expect(helper.querySelectorAllCount).toBe(1)
    })

    it('querySelectorAll finds the same element', () => {
        expect(helper.foundElement.id).toBe(helper.el.id)
    })
})


describe('TDD07: testing template with two div contains few p - tags each', () => {
    const template = `
    <!DOCTYPE html>
    <body>
        <div>
            <p>A</p>
            <p>B</p>
            <p>C</p>
            <p>D</p>
        </div>
        <div>
            <p>One</p>
            <p id="${MARKER}">Two</p>
            <p>Three</p>
            <p>Four</p>
        </div>
    </body>`

    const helper = pathHelper(template)

    it('should return path "body div:nth-child(2) p:nth-child(2)"', () => {
        expect(helper.path).toBe('body div:nth-child(2) p:nth-child(2)')
    })

    it('querySelectorAll length === 1', () => {
        expect(helper.querySelectorAllCount).toBe(1)
    })

    it('querySelectorAll finds the same element', () => {
        expect(helper.foundElement.id).toBe(helper.el.id)
    })
})
