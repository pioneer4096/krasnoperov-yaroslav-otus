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
        /*.then(() => projectRepo.getById(projectId))
        .then((project) => {
            console.log(`\nRetreived project from database`)
            console.log(`project id = ${project.id}`)
            console.log(`project name = ${project.name}`)
            return projectRepo.getTasks(project.id)
        })
        .then((tasks) => {
            console.log('\nRetrieved project tasks from database')
            return new Promise((resolve, reject) => {
                tasks.forEach((task) => {
                    console.log(`task id = ${task.id}`)
                    console.log(`task name = ${task.name}`)
                    console.log(`task description = ${task.description}`)
                    console.log(`task isComplete = ${task.isComplete}`)
                    console.log(`task projectId = ${task.projectId}`)
                })
            })
            resolve('success')
        })*/
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        })
}

function putDocument() {
    const dao = new AppDAO('./database.sqlite3')
    const docsRepo = new DocumentsRepository(dao)

    const doc = documents[0]
    docsRepo
        .create(doc.title, doc.link, JSON.stringify(doc), 1)
        .then((data) => {
            console.log('added doc doc0')
        })
        .catch((err) => {
            console.log('err = ', err)
        })

}

main()
