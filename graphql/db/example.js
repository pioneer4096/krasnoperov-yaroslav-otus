const Promise = require('bluebird')
const AppDAO = require('./dao')
const RssRepository = require('./rss_repository')
const DocumentsRepository = require('./documents_repository')

const {rss, documents} = require('./demo_data')


function main() {
    const dao = new AppDAO('./database.sqlite3')
    const rssRepo = new RssRepository(dao)
    const docsRepo = new DocumentsRepository(dao)
    let rssId

    rssRepo.createTable()
        .then(() => docsRepo.createTable())
        .then(() => rssRepo.create(rss.title, rss.link, rss.description))
        .then((data) => {
            rssId = data.id

            return Promise.all(documents.map((doc) => {
                const { title, link } = doc
                return docsRepo.create(title, link, JSON.stringify(doc), rssId)
            }))
        })
        .then(data => {
            console.log('Filled data successfully...')
        })
        .then(() => rssRepo.getById(rssId))
        .then((rss) => {
            console.log(`\nRetreived project from database rss = ${rss}`)
            console.log(`project id = ${rss.id}`)
            console.log(`project name = ${rss.title}`)
            return docsRepo.getDocuments(rssId)
        })
        .then((docs) => {
            console.log('\nRetrieved documents from database')
            docs.forEach((task) => {
                console.log(`doc id = ${task.id}`)
                console.log(`doc title = ${task.title}`)
                console.log(`doc link = ${task.link}`)
            })
        })
        .catch((err) => {
            console.log('Error: ', err)
            console.log(JSON.stringify(err))
        })
}

main()
