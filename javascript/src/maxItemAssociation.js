import {FragmentsCollection} from './classes/FragmentsCollection'
import {InputValidator} from './classes/InputValidator'

export function maxItemAssociation(edges) {
    if(InputValidator.isValidInput(edges)) {
        const fragments = new FragmentsCollection()
        fragments.load(edges)
        return fragments.getMaxFragment()
    }
    else {
        throw new Error('Invalid input format. Should be an array of pair-arrays like [["a", "b"], ["b", "c"]]')
    }
}