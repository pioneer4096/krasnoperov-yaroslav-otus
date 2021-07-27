const express = require('express')
const Sender = require('./utils/Sender')
const DocumentsTemplate = require('./utils/DocumentsTemplate')
const RssTemplate = require('./utils/RssTemplate')
const transformToDBFormat = require('./utils/transform.json.db')
const errorResponse = require('./utils/error.response')
const isValidUrl = require('./utils/url.validation')
const routes = require('./reference/routes')
const errors = require('./reference/errors')
const sender = new Sender()


const makeApp = (db) => {
    const app = express()
    app.get(routes.root, (req, res) => {
        res.send('<h1>RSS parser project</h1>')
    })

    app.get(routes.create, async (req, res) => {
        const url = req.query.url
        if (!isValidUrl(url)) {
            errorResponse(res, 400, errors.URL_NOT_SET)
        }

        try {
            const json = await sender.get(url)
            const jsonDB = transformToDBFormat(json)
            const response = await db.addRss(jsonDB)
            res.status(200).send(`ok ${new Date().toString()}`)
        }
        catch (e) {
            errorResponse(res, 500, e.message)
        }
    })

    app.get(routes.getRss, async (req, res) => {
        const needJSON = Boolean(req.query.json)
        try {
            const rss = await db.getRss()

            if(needJSON) {
                res.status(200).json(rss);
            }
            else {
                const page = RssTemplate.toTemplate(rss)
                res.status(200).send(page)
            }
        }
        catch (e) {
            errorResponse(res)
        }
    })

    app.get(routes.getDocs, async (req, res) => {
        const needJSON = Boolean(req.query.json)
        try {
            const docs = await db.getDocuments()

            if(needJSON) {
                res.status(200).json(docs);
            }
            else {
                const page = DocumentsTemplate.toTemplate(docs)
                res.status(200).send(page)
            }

        }
        catch (e) {
            errorResponse(res)
        }
    })
}


module.exports = makeApp
