const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const getPath = require("./getPath")

const dom = new JSDOM(`<!DOCTYPE html>
    <body>
        <div>
            <div>
                <p>One</p>
                <p id="test">Two</p>
                <p>Three</p>
                <p>Four</p>
            </div>
        </div>
    </body>`);

const el = dom.window.document.getElementById('test')
const selector = getPath(el, true)
console.log(selector);