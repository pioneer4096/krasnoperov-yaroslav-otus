const Promise = require('bluebird')
const AppDAO = require('./dao')
const RssRepository = require('./rss_repository')
const DocumentsRepository = require('./documents_repository')

class DBServer {
    constructor(path = '') {
        const dao = new AppDAO(path || './database.sqlite3')
        this.rssRepo = new RssRepository(dao)
        this.docsRepo = new DocumentsRepository(dao)
    }

    addRss(json) {

    }

    getRss() {

    }

    getDocuments() {

    }

}

module.exports = DBServer
