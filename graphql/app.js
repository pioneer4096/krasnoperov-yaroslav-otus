const express = require('express')
const formatRssList = require('./rssList')
const formatDocs = require('./documents')

const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/rss', (req, res) => {
    res.send(formatRssList())
})

app.get('/docs', (req, res) => {
    res.send(formatDocs())
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})