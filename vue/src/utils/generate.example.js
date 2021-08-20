import {operation} from '../reference/operations'
import {randomElement, randomInt} from './random.numbers'

const MAX = 10 // будет зависеть от сложности
const OPERANDS_COUNT = 2    // число операндов, число зависит от сложности

export function generate() {
    // const op = randomElement(Object.keys(operation))
    const op = operation.sum

    switch(op) {
        case operation.sum:
            const operands = new Array(OPERANDS_COUNT).fill(0).map(_ => randomInt(MAX))
            const result = operands.reduce((total, x) => total + x, 0)

            return {
                x: operands[operands.length - 1],
                operands: operands.slice(0, -1),
                result,
                operation: op
            }

        case operation.sub:
            break;

        case operation.mul:
            break;

        case operation.div:
            break;

        case operation.degree:
            break;
    }
}
