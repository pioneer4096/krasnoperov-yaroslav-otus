const MARKER = 'marker'

const template01 = `<!DOCTYPE html> <body></body>`

const template02 = `<!DOCTYPE html> <body id="${MARKER}"></body>`

const template03 = `<!DOCTYPE html>
    <body>
        <p id="${MARKER}">Two</p>
    </body>`


const template04 = `<!DOCTYPE html>
    <body>
        <p>One</p>
        <p id="${MARKER}">Two</p>
    </body>`

const template05 = `<!DOCTYPE html>
    <body>
        <div>
            <p id="${MARKER}">Two</p>
        </div>
    </body>`

const template06 = `<!DOCTYPE html>
    <body>
        <div>
            <p id="${MARKER}">Two</p>
        </div>
        <div>
            <p>One</p>
        </div>
    </body>`

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

module.exports = {
    MARKER,
    template01,
    template02,
    template03,
    template04,
    template05,
    template06,
    template07
}