import minimist from 'minimist';
import {stat} from 'fs/promises';
import {readTree} from './readTree.js';

async function tree() {
    const argv = minimist(process.argv.slice(2), {string: ['p', 'path'], alias: {p: 'path'}});
    const path = argv.path;

    if (!path) {
        throw new Error('path is not set, use "-p" or "--path" keys to set up it');
    }

    if (typeof path === 'string') {
        try {
            const pathStat = await stat(path);
            if (!pathStat.isDirectory()) {
                throw new Error('provide only DIRECTORY path')
            }
            return await readTree(path);
        } catch (e) {
            if (e.code === 'ENOENT') {
                throw new Error('path doesn\'t exists');
            }

            throw e
        }
    } else {
        if (Array.isArray(path)) {
            throw new Error('only one path is allowed');
        } else {
            throw new Error(`unknown path type ${typeof path}, it should be a STRING`);
        }
    }
}

export {tree};
