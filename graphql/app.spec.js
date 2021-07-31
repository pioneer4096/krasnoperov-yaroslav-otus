const axios = require('axios')
const DBServer = require('./db/DBServer')
const makeApp = require('./app.provider')
const supertest = require('supertest')
const db = new DBServer(':memory:')
const {DB_FIXTURE, AJAX_FIXTURE, AJAX_FIXTURE_XML} = require('./data/fixtures')

const app = makeApp(db)
const request = supertest(app)

const routes = require('./reference/routes')

jest.mock('axios');

describe('testing app endpoints', () => {
    beforeAll(async () => {
        await db.init()
    })

    beforeEach(async () => {
        await db.clearAll()
        await db.addRss(DB_FIXTURE)    // add data
    })

    it('root endpoint should return page with RSS parser project string', async () => {
        const response = await request.get(routes.root)
        expect(response.status).toBe(200)
        expect(response.text).toContain('RSS parser project')
    })


    it('getRss endpoint should return rss fixture row', async () => {
        const response = await request.get(`${routes.getRss}?json=true`)
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0].title).toBe(DB_FIXTURE.rss.title)
    })

    it('getDocs endpoint should return documents fixture rows', async () => {
        const response = await request.get(`${routes.getDocs}?json=true`)
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(DB_FIXTURE.documents.length)
        expect(response.body[0].title).toBe(DB_FIXTURE.documents[0].title)
    })

    it('createDocs endpoint should handle request correctly', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({data: AJAX_FIXTURE_XML}));
        const response = await request.get(`${routes.create}?url=https://www.thesun.co.uk/news/worldnews/feed`)
        expect(response.status).toBe(200)
        expect(response.text).toContain('ok current date')

        const rss = await db.getRss()
        const documents = await db.getDocuments()
        expect(rss.length).toBe(2)  // DB_FIXTURE_RSS && AJAX_FIXTURE_RSS
        expect(documents.length).toBe(DB_FIXTURE.documents.length + AJAX_FIXTURE.documents.length)
    })
})
