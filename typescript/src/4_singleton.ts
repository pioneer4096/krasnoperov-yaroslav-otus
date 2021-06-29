export class Database {
  static exists: boolean
  static instance: Database
  data: string

  constructor(data: string) {
    if(Database.exists) {
        return Database.instance
    }
    Database.instance = this
    Database.exists = true
    this.data = data
  }

  getData() {
    return this.data
  }
}

// USE CASE EXAMPLE
// const mongo = new Database('MongoDB')
// console.log(mongo.getData())
// const mysql = new Database('MySQL')
// console.log(mysql.getData())


