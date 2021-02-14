export class Fragment {
    constructor() {
        this.verticies = []
    }

    addVerticies({from, to}) {
        this.addVertex(from)
        this.addVertex(to)
    }

    addVertex(vertex) {
        if(!this.verticies.includes(vertex)) {
            this.verticies.push(vertex)
        }
    }

    canAccept(edge) {
        const includesFrom = this.verticies.includes(edge.from)
        const includesTo = this.verticies.includes(edge.to)

        return Boolean(!this.verticies.length || includesFrom || includesTo)
    }

    accept(edge) {
        if(this.canAccept(edge)) {
            this.addVerticies(edge)
            return true
        }
        else {
            return false
        }
    }

    export() {
        return this.verticies.map(v => v).sort()    // возвращаем массив вершин в лексикографическом порядке
    }
}