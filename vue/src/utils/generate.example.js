import {operation} from '../reference/operations'
import {randomElement, randomInt} from './random.numbers'

const MAX = 10 // будет зависеть от сложности
const OPERANDS_COUNT = 2    // число операндов, число зависит от сложности

export function generate(gameSettings) {
    const op = randomElement(gameSettings.options)

    let operands, result
    switch(op) {
        case operation.sum:
            operands = new Array(OPERANDS_COUNT).fill(0).map(_ => randomInt(MAX))
            result = operands.reduce((total, x) => total + x, 0)

            return {
                x: operands[operands.length - 1],
                operands: operands.slice(0, -1),
                result,
                operation: op
            }

        case operation.sub:
            operands = new Array(OPERANDS_COUNT).fill(0).map(_ => randomInt(MAX))
            result = operands.reduce((total, x) => total - x, 2 * operands[0])

            return {
                x: operands[operands.length - 1],
                operands: operands.slice(0, -1),
                result,
                operation: op
            }

        case operation.mul:
            operands = new Array(OPERANDS_COUNT).fill(0).map(_ => randomInt(MAX))
            result = operands.reduce((total, x) => total * x, 1)

            return {
                x: operands[operands.length - 1],
                operands: operands.slice(0, -1),
                result,
                operation: op
            }

        case operation.div:
            operands = new Array(OPERANDS_COUNT).fill(0).map(_ => randomInt(MAX))
            result = operands.reduce((total, x) => total * x, 1)


            return {
                x: operands[operands.length - 1],
                operands: operands.slice(1, -1).concat(result),
                result: operands[0],
                operation: op
            }

        case operation.degree:
            const base = randomInt(MAX)
            const degree = randomInt(MAX)    // ищем степень числа
            result = Math.pow(base, degree)


            return {
                degree,
                operands: [base],
                result,
                operation: op
            }
    }
}
