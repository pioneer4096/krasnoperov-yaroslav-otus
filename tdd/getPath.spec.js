const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const getPath = require("./getPath")
const {MARKER, template01} = require("./templates")

describe('TDD01: testing template01 without any marker', () => {
    it('should throw an exception', () => {
        const dom = new JSDOM(template01);
        const el = dom.window.document.getElementById(MARKER)
        expect(() => {
            getPath(el)
        }).toThrowError()
    })
})


