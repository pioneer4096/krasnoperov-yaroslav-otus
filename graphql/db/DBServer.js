const Promise = require('bluebird')
const AppDAO = require('./dao')
const RssRepository = require('./rss_repository')
const DocumentsRepository = require('./documents_repository')
const path = require('path')
const defaultPath = path.join(__dirname, 'database.sqlite3')

class DBServer {
    constructor(path = '') {
        const dao = new AppDAO(path || defaultPath)
        this.rssRepo = new RssRepository(dao)
        this.docsRepo = new DocumentsRepository(dao)
    }

    addRss(json) {

    }

    getRss() {
        return this.rssRepo.getAll()
    }

    getDocuments() {
        return this.docsRepo.getAll()
    }

}

module.exports = DBServer
