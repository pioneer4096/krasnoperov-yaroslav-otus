class RssRepository {
    constructor(dao) {
        this.dao = dao
    }

    /**
     * Creates rss table if not exists
     * @return {Promise}
     * **/
    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS rss (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      link TEXT,
      description TEXT)`

        return this.dao.run(sql)
    }

    /**
     * Inserts new rss in table
     * @param {string} title
     * @param {string} link
     * @param {string} description
     * @return {Promise}
     * **/
    create(title, link, description) {
        return this.dao.run(
            'INSERT INTO rss (title, link, description) VALUES (?, ?, ?)',
            [title, link, description])
    }

    /**
     * Returns rss-row by ID
     * @param {number} id
     * @return {Promise}
     * **/
    getById(id) {
        return this.dao.get(`SELECT * FROM rss where id = ?`, [id])
    }

    /**
     * Returns all rss rows
     * @return {Promise}
     * **/
    getAll() {
        return this.dao.all(`SELECT * FROM rss`)
    }
}

module.exports = RssRepository;
