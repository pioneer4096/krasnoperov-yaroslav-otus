export class InputValidator {
    static isValidInput(edges) {
        const isFilledArray = Array.isArray(edges) && edges.length

        if(isFilledArray) {
            let isEdgeCorrect = true

            for(let i = 0; i < edges.length && isEdgeCorrect; i++) {
                const edge = edges[i]
                isEdgeCorrect = Array.isArray(edge) && (edge.length === 2) && (typeof edge[0] === 'string') && (typeof edge[1] === 'string')
            }

            return isEdgeCorrect
        }
        else {
            return false
        }
    }
}
