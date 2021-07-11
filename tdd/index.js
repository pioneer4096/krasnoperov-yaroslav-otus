const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const getPath = require("./getPath")
const MARKER = 'marker'

const dom = new JSDOM(
    `<!DOCTYPE html>
    <body>
        <p id="${MARKER}">Two</p>
    </body>`);

const el = dom.window.document.getElementById(MARKER)
const selector = getPath(el)
console.log('path selector = ', selector);