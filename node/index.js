import { readdir } from 'fs/promises';

async function read(path) {
    const finalFiles = []
    const finalDirs = []
    const list = [path]

    while(list.length) {
        const tmpPath = list.shift()
        const newDirs = await checkLevel(tmpPath, finalFiles, finalDirs)
        list.unshift(...newDirs)
    }

    console.log('FILES = ', finalFiles, ' \n')
    console.log('DIRS = ', finalDirs)
}

async function checkLevel(path, finalFiles, finalDirs) {
    const {files, dirs} = await readPath(path)
    finalFiles.push(...files)
    finalDirs.push(...dirs)
    return dirs
}

async function readPath(path) {
    try {
        const entities = await readdir(path, {withFileTypes: true});

        const files = []
        const dirs = []
        for (const entity of entities) {
            const entityPath = makePath(path, entity.name)
            if(entity.isFile()) {
                files.push(entityPath)
            }

            else if(entity.isDirectory()) {
                dirs.push(entityPath)
            }
        }

        return {
            files,
            dirs
        }

    } catch (err) {
        console.error(err);
    }
}

function makePath(path, name) {
    return `${path}/${name}`
}

read("../javascript")
    .then(() => console.log('done'))