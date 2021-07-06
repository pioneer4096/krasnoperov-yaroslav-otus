const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const getPath = require("./getPath")
const {MARKER, template01, template02, template03, template04} = require("./templates")

describe('TDD01: testing template01 without any marker', () => {
    it('should throw an exception', () => {
        const dom = new JSDOM(template01);
        const el = dom.window.document.getElementById(MARKER)
        expect(() => {
            getPath(el)
        }).toThrowError()
    })
})


describe('TDD02: testing template02 with marker on body', () => {
    it('should return path to body', () => {
        const dom = new JSDOM(template02);
        const el = dom.window.document.getElementById(MARKER)
        const path = getPath(el)
        expect(path).toBe('body')
    })
})


describe('TDD03: testing template03 with only one p - tag', () => {
    it('should return path "body p"', () => {
        const dom = new JSDOM(template03);
        const el = dom.window.document.getElementById(MARKER)
        const path = getPath(el)
        expect(path).toBe('body p')
    })
})


describe('TDD04: testing template04 with few p - tags', () => {
    it('should return path "body p:nth-child(1)"', () => {
        const dom = new JSDOM(template04);
        const el = dom.window.document.getElementById(MARKER)
        const path = getPath(el)
        expect(path).toBe('body p:nth-child(1)')
    })
})