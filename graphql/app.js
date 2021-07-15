const express = require('express')
const DBServer = require('./db/DBServer')
const Sender = require('./utils/Sender')
const transformToDBFormat = require('./utils/transform.json.db')

const app = express()
const port = 3000

const db = new DBServer()
const sender = new Sender()


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/rss', async (req, res) => {

    try {
        const json = await sender.get('https://www.thesun.co.uk/news/worldnews/feed')
        const jsonDB = transformToDBFormat(json)
        db.addRss(jsonDB)
    }
    catch(e) {

    }
})

app.get('/rss', async (req, res) => {
    try {
        const rss = await db.getRss()
    }
    catch (e) {

    }
})

app.get('/docs', async (req, res) => {
    try {
        const rss = await db.getDocuments()
    }
    catch (e) {

    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
