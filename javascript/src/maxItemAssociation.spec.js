import {maxItemAssociation} from "./maxItemAssociation";

const set1 = {
    input: [
        ['a', 'b'],
        ['b', 'c'],
        ['d', 'f']
    ],
    output: ['a', 'b', 'c']
}

const set2 = {
    input: [
        ['a', 'e'],
        ['a', 'b'],
        ['b', 'c'],
        ['b', 'd'],
        ['d', 'c'],
        ['d', 'h'],
        ['f', 'g'],
        ['k', 'l'],
        ['l', 'm']
    ],
    output: ['a', 'b', 'c', 'd', 'e', 'h']
}

describe('maxItemAssociation test', () => {
    it('should throw error without arguments', () => {
        expect(() => {
            maxItemAssociation()
        }).toThrowError()
    })

    it('should throw error with incorrect arguments (include empty array)', () => {
        expect(() => {
            maxItemAssociation([])
        }).toThrowError()
    })

    it('should be correct at set1', () => {
        expect(maxItemAssociation(set1.input)).toEqual(set1.output)
    })

    it('should be correct at set2', () => {
        expect(maxItemAssociation(set2.input)).toEqual(set2.output)
    })
})