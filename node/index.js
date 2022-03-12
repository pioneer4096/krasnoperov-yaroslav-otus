import {tree} from './tree.js'

tree()
    .then(result => {
        console.log(result);
    })
    .catch(e => {
        console.log(`ERROR: ${e.message}`);
    });
