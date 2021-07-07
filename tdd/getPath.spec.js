const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const getPath = require("./getPath")
const {MARKER, template01, template02, template03, template04, template05, template06, template07} = require("./templates")

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

describe('TDD05: testing template05 with one div contains one p - tag', () => {
    it('should return path "body div p"', () => {
        const dom = new JSDOM(template05);
        const el = dom.window.document.getElementById(MARKER)
        const path = getPath(el)
        expect(path).toBe('body div p')
    })
})

describe('TDD06: testing template06 with two div contains one and one p - tags', () => {
    it('should return path "body div:nth-child(0) p"', () => {
        const dom = new JSDOM(template06);
        const el = dom.window.document.getElementById(MARKER)
        const path = getPath(el)
        expect(path).toBe('body div:nth-child(0) p')
    })
})

describe('TDD07: testing template07 with two div contains few p - tags each', () => {
    it('should return path "body div:nth-child(1) p:nth-child(1)"', () => {
        const dom = new JSDOM(template07);
        const el = dom.window.document.getElementById(MARKER)
        const path = getPath(el)
        expect(path).toBe('body div:nth-child(1) p:nth-child(1)')
    })
})