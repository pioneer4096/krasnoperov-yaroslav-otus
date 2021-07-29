
const DBServer = require('./db/DBServer')
const makeApp = require('./app.provider')
const supertest = require('supertest')
const db = new DBServer(':memory:')

const app = makeApp(db)
const request = supertest(app)

const routes = require('./reference/routes')

const FIXTURE = {
    rss: {
        title: 'vue is cool',
        link: 'https://vuejs.org/',
        description: 'The Progressive JavaScript Framework'
    },
    documents: [
        {title: 'vuex', link: 'https://vuex.vuejs.org/'},
        {title: 'nuxt', link: 'https://ssr.vuejs.org'},
    ]
}


describe('testing app endpoints', () => {
    beforeAll(async () => {
        await db.init()
    })

    beforeEach(async () => {
        await db.clearAll()
        await db.addRss(FIXTURE)    // add data
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
        expect(response.body[0].title).toBe(FIXTURE.rss.title)
    })

    it('getDocs endpoint should return documents fixture rows', async () => {
        const response = await request.get(`${routes.getDocs}?json=true`)
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(FIXTURE.documents.length)
        expect(response.body[0].title).toBe(FIXTURE.documents[0].title)
    })
})
