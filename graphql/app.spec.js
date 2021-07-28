
const DBServer = require('./db/DBServer')
const makeApp = require('./app.provider')
const supertest = require('supertest')
const db = new DBServer(':memory:')

const app = makeApp(db)
const request = supertest(app)

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

    it('', async () => {
        const response = await request.get('/')
        expect(response.text).toContain('RSS parser project')
    })
})
