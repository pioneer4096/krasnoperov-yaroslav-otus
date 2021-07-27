const DBServer = require('./db/DBServer')
const makeApp = require('./app.provider')
const supertest = require('supertest')

const db = new DBServer()
const app = makeApp(db)
const request = supertest(app)


describe('testing app endpoints', () => {
    it.todo('')
})
