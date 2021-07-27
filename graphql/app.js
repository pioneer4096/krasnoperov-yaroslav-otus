const DBServer = require('./db/DBServer')
const makeApp = require('./app.provider')

const db = new DBServer()

db.init().then(() => {
    const app = makeApp(db)
    app.listen(3000)
}).catch(e => {
    console.error('Cant initialize DataBase')
})
