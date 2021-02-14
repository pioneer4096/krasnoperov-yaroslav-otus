import {Edge} from './Edge'

export class EdgesProvider {
    constructor(edges = []) {
        this.edges = edges.map((e, index) => new Edge(e, index + 1))
        this.queue = [] // только для неиспользованных связей
    }

    hasUnusedEdges() {
        const edge = this.edges.find(e => !e.isUsed)
        return Boolean(edge)
    }

    toStart() {
        this.queue = this.edges.filter(edge => !edge.isUsed)
    }

    setUsedMark(edgeId) {
        const edge = this.edges.find(e => e.id === edgeId)
        if(edge) {
            edge.setUsed()
        }
        return this
    }

    getEdge() {
        return this.queue.shift()
    }
}