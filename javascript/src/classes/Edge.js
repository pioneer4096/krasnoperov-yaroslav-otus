export class Edge {
    constructor(e, id) {
        this.id = id
        this.from = e[0]
        this.to = e[1]
        this.isUsed = false
    }

    setUsed() {
        this.isUsed = true
    }
}