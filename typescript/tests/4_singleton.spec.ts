import {Database} from "../src/4_singleton";

describe('Testing 4_singleton', () => {
    it('should create instance of dbName', () => {
        const dbName = 'mongo'
        const db1 = new Database(dbName)
        expect(db1.getData()).toBe(dbName)
    })


    it('next databases instances should return first instance', () => {
        const dbName1 = 'mongo'
        const dbName2 = 'mysql'
        const db1 = new Database(dbName1)
        const db2 = new Database(dbName2)
        expect(db2.getData()).toBe(dbName1)
    })
})