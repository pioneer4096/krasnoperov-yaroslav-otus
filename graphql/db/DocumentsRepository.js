const Promise = require('bluebird')

class DocumentsRepository {
    constructor(dao) {
        this.dao = dao
    }

    /**
     * Creates documents table
     * @return {Promise}
     * **/
    createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT,
        link TEXT,
        original TEXT,
        rssId Integer,
        CONSTRAINT documents_fk_rss FOREIGN KEY (rssId)
          REFERENCES rss(id) ON UPDATE CASCADE ON DELETE CASCADE)`

        return this.dao.run(sql)
    }

    /**
     * Truncate analog for sqlite
     * @return {Promise}
     * **/
    clear() {
        return this.dao.run(`DELETE FROM documents`)
    }

    /**
     * Insert new document into table
     * @param {string} title
     * @param {string} link
     * @param {string} original JSON string
     * @param {number} rssId
     * @return {Promise}
     * **/
    create(title, link, original, rssId) {
        return this.dao.run(
            `INSERT INTO documents (title, link, original, rssId)
        VALUES (?, ?, ?, ?)`,
            [title, link, original, rssId])
    }

    // TODO если появится использовать нормальный batch insert в sqlite
    /**
     * @deprecated
     * **/
    createBatch(docs = [], rssId) {
        if(!docs || !docs.length) {
            throw new Error('пустой массив документов на вход createBatch')
        }

        const sqlValues = docs.map(doc => {
            const title = doc.title || null
            const link = doc.link || null
            const original = JSON.stringify(doc) || null

            return `(${title}, ${link}, ${original}, ${rssId})`
        }).join(',')

        return this.dao.run(
            `INSERT INTO documents (title, link, original, rssId) VALUES ${sqlValues}`, [])
    }

    /**
     * Saves rssID's array of documents in parallel
     * @param {any[]} docs
     * @param {number} rssId
     * @return {Promise}
     * **/
    createParallel(docs = [], rssId) {
        return Promise.all(docs.map((doc) => {
            const { title, link } = doc
            return this.create(title, link, JSON.stringify(doc), rssId)
        }))
    }

    /**
     * Returns all documents
     * @return {Promise}
     * **/
    getAll() {
        return this.dao.all(`SELECT * FROM documents`)
    }

    /**
     * Returns documents of concrete RSS
     * @param {number} rssId
     * @return {Promise}
     * **/
    getDocuments(rssId) {
        return this.dao.all(
            `SELECT * FROM documents WHERE rssId = ?`,
            [rssId])
    }

}

module.exports = DocumentsRepository;
