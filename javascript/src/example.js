import {maxItemAssociation} from './maxItemAssociation'

const edges = [
    ['a', 'b'],
    ['b', 'c'],
    ['d', 'f']
]

console.log('Program started. Edges on input: ', edges.map(p => p.join('-')).join(','))

const maxFragment = maxItemAssociation(edges)

console.warn('Program finished. MAX_FRAGMENT found: ', maxFragment)