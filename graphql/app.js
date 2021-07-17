const express = require('express')
const DBServer = require('./db/DBServer')
const Sender = require('./utils/Sender')
const transformToDBFormat = require('./utils/transform.json.db')
const DocumentsTemplate = require('./utils/DocumentsTemplate')
const RssTemplate = require('./utils/RssTemplate')

const app = express()
const port = 3000

const db = new DBServer()
const sender = new Sender()

const errorResponse = (res) => {
    res.status(500).send('Internal server error. Try to repeat request later.');
}

app.get('/', (req, res) => {
    res.send('RSS parser project')
})

app.post('/rss', async (req, res) => {
    try {
        const json = await sender.get('https://www.thesun.co.uk/news/worldnews/feed')
        const jsonDB = transformToDBFormat(json)
        db.addRss(jsonDB)
        res.status(200)
    }
    catch(e) {
        errorResponse(res)
    }
})

app.get('/rss', async (req, res) => {
    try {
        const rss = await db.getRss()
        const page = RssTemplate.toTemplate(rss)
        res.status(200).send(page)
    }
    catch (e) {
        errorResponse(res)
    }
})

app.get('/docs', async (req, res) => {
    try {
        const docs = await db.getDocuments()
        const page = DocumentsTemplate.toTemplate(docs)
        res.status(200).send(page)
    }
    catch (e) {
        errorResponse(res)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
