const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const getPath = require("./getPath")
const {MARKER, template03} = require("./templates")

const dom = new JSDOM(template03);

const el = dom.window.document.getElementById(MARKER)
const selector = getPath(el)
console.log('path selector = ', selector);