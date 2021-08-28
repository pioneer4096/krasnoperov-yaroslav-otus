import {operation} from '../reference/operations'
import {randomElement, randomInt} from './random.numbers'

function calcComplexityParams(complexity = 1, op) {
    let MAX = 10 // будет зависеть от сложности
    let OPERANDS_COUNT = 2    // число операндов, число зависит от сложности

    if(op !== operation.degree) {
        switch(complexity) {
            case 1:
                MAX = 5
                OPERANDS_COUNT = 2
                break;

            case 2:
                MAX = 10
                OPERANDS_COUNT = 2
                break;

            case 3:
                MAX = 20
                OPERANDS_COUNT = 2
                break;

            case 4:
                MAX = 30
                OPERANDS_COUNT = 2
                break;

            case 5:
                MAX = 50
                OPERANDS_COUNT = 2
                break;

            case 6:
                MAX = 5
                OPERANDS_COUNT = 3
                break;

            case 7:
                MAX = 10
                OPERANDS_COUNT = 3
                break;

            case 8:
                MAX = 20
                OPERANDS_COUNT = 3
                break;

            case 9:
                MAX = 30
                OPERANDS_COUNT = 3
                break;

            case 10:
                MAX = 50
                OPERANDS_COUNT = 3
                break;
        }
    }
    else {  // отдельная логика для degree
        switch(complexity) {
            case 1:
                MAX = 5
                break;

            case 2:
                MAX = 6
                break;

            case 3:
                MAX = 7
                break;

            case 4:
                MAX = 8
                break;

            case 5:
                MAX = 9
                break;

            case 6:
                MAX = 10
                break;

            case 7:
                MAX = 11
                break;

            case 8:
                MAX = 12
                break;

            case 9:
                MAX = 13
                break;

            case 10:
                MAX = 14
                break;
        }
    }


    return {
        MAX, OPERANDS_COUNT
    }
}

export function generate(gameSettings) {
    const op = randomElement(gameSettings.options)
    const {MAX, OPERANDS_COUNT} = calcComplexityParams(gameSettings.complexity, op)

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

export function checkExample(example, x) {
    if(example.operation !== operation.degree) {
        return Boolean(x === example.x)
    }
    else {  // degree operation
        const result = Math.pow(example.operands[0], x)  // к одному и тому же результату могут приводить разные комбинации
        return Boolean(result === example.result)
    }
}
