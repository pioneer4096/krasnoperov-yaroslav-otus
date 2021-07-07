const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const getPath = require("./getPath")
const MARKER = 'marker'

const template01 = `<!DOCTYPE html> <body></body>`

describe('TDD01: testing template01 without any marker', () => {
    it('should throw an exception', () => {
        const dom = new JSDOM(template01);
        const el = dom.window.document.getElementById(MARKER)
        expect(() => {
            getPath(el)
        }).toThrowError()
    })
})


const template02 = `<!DOCTYPE html> <body id="${MARKER}"></body>`

describe('TDD02: testing template02 with marker on body', () => {
    it('should return path to body', () => {
        const dom = new JSDOM(template02);
        const el = dom.window.document.getElementById(MARKER)
        const path = getPath(el)
        expect(path).toBe('body')
    })
})

const template03 = `<!DOCTYPE html>
    <body>
        <p id="${MARKER}">Two</p>
    </body>`

describe('TDD03: testing template03 with only one p - tag', () => {
    it('should return path "body p"', () => {
        const dom = new JSDOM(template03);
        const el = dom.window.document.getElementById(MARKER)
        const path = getPath(el)
        expect(path).toBe('body p')
    })
})

const template04 = `<!DOCTYPE html>
    <body>
        <p>One</p>
        <p id="${MARKER}">Two</p>
    </body>`

describe('TDD04: testing template04 with few p - tags', () => {
    it('should return path "body p:nth-child(1)"', () => {
        const dom = new JSDOM(template04);
        const el = dom.window.document.getElementById(MARKER)
        const path = getPath(el)
        expect(path).toBe('body p:nth-child(1)')
    })
})

const template05 = `<!DOCTYPE html>
    <body>
        <div>
            <p id="${MARKER}">Two</p>
        </div>
    </body>`

describe('TDD05: testing template05 with one div contains one p - tag', () => {
    it('should return path "body div p"', () => {
        const dom = new JSDOM(template05);
        const el = dom.window.document.getElementById(MARKER)
        const path = getPath(el)
        expect(path).toBe('body div p')
    })
})


const template06 = `<!DOCTYPE html>
    <body>
        <div>
            <p id="${MARKER}">Two</p>
        </div>
        <div>
            <p>One</p>
        </div>
    </body>`

describe('TDD06: testing template06 with two div contains one and one p - tags', () => {
    it('should return path "body div:nth-child(0) p"', () => {
        const dom = new JSDOM(template06);
        const el = dom.window.document.getElementById(MARKER)
        const path = getPath(el)
        expect(path).toBe('body div:nth-child(0) p')
    })
})

const template07 = `<!DOCTYPE html>
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

describe('TDD07: testing template07 with two div contains few p - tags each', () => {
    it('should return path "body div:nth-child(1) p:nth-child(1)"', () => {
        const dom = new JSDOM(template07);
        const el = dom.window.document.getElementById(MARKER)
        const path = getPath(el)
        expect(path).toBe('body div:nth-child(1) p:nth-child(1)')
    })
})