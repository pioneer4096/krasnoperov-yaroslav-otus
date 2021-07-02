const express = require('express')
const parser = require('xml2json');
const formatRssList = require('./rssList')
const formatDocs = require('./documents')
const axios = require('axios')
const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/rss', async (req, res) => {
    const ret = await axios.get('https://www.yahoo.com/news/rss')
    const json = parser.toJson(ret.data);
    console.log('json response = ', json)
    res.send(formatRssList())
})

app.get('/docs', (req, res) => {
    res.send(formatDocs())
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})