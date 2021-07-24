const AppDAO = require('./AppDAO')
const RssRepository = require('./RssRepository')
const DocumentsRepository = require('./DocumentsRepository')
const path = require('path')
const defaultPath = path.join(__dirname, 'base', 'database.sqlite3')
const errors = require('../reference/errors')

class DBServer {
    constructor(path = '') {
        const dao = new AppDAO(path || defaultPath)
        this.rssRepo = new RssRepository(dao)
        this.docsRepo = new DocumentsRepository(dao)
    }

    async init() {
        await this.rssRepo.createTable()
        await this.docsRepo.createTable()
        console.log('DataBase successfully initialized')
    }

    // TODO сюда неплохо бы транзакцию прикрутить
    async addRss(json = {}) {
        const {rss, documents} = json
        let response = null
        try {
            response = await this.rssRepo.create(rss.title, rss.link, rss.description)
        }
        catch(e) {
            throw new Error(errors.CANT_INSERT_RSS)
        }

        const rssId = response.id

        if(documents && documents.length) {
           try {
               await this.docsRepo.createParallel(documents, rssId)
           }
           catch(e) {
               throw new Error(errors.CANT_INSERT_DOCS)
           }
        }
    }

    getRss() {
        return this.rssRepo.getAll()
    }

    getDocuments() {
        return this.docsRepo.getAll()
    }

}

module.exports = DBServer
