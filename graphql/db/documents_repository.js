class DocumentsRepository {
    constructor(dao) {
        this.dao = dao
    }

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

    create(title, link, original, rssId) {
        return this.dao.run(
            `INSERT INTO documents (title, link, original, rssId)
        VALUES (?, ?, ?, ?)`,
            [title, link, original, rssId])
    }

    getAll() {
        return this.dao.all(`SELECT * FROM documents`)
    }

    getDocuments(rssId) {
        return this.dao.all(
            `SELECT * FROM documents WHERE rssId = ?`,
            [rssId])
    }

}

module.exports = DocumentsRepository;
