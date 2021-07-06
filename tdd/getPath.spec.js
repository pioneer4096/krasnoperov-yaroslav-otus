const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const getPath = require("./getPath")
const {MARKER, template01, template02} = require("./templates")

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