const express = require('express')
const DBServer = require('./db/DBServer')
const start = require('./start')

const APP_PORT = 3000
const app = express()
const db = new DBServer()

db.init().then(() => {
    start(app, db, APP_PORT)
}).catch(e => {
    console.error('Cant initialize DataBase')
})
