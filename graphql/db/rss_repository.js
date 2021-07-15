class RssRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS rss (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      link TEXT,
      description TEXT)`

        return this.dao.run(sql)
    }

    create(title, link, description) {
        return this.dao.run(
            'INSERT INTO rss (title, link, description) VALUES (?, ?, ?)',
            [title, link, description])
    }

    getById(id) {
        return this.dao.get(`SELECT * FROM rss where id = ?`, [id])
    }

    getAll() {
        return this.dao.all(`SELECT * FROM rss`)
    }
}

module.exports = RssRepository;
