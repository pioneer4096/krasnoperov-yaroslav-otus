import {readdir} from 'fs/promises';
import pathUtil from 'path';

async function readTree(path) {
    const finalFiles = [];
    const finalDirs = [];
    const list = [path];

    while (list.length) {
        const tmpPath = list.shift();
        const newDirs = await readLevelAndFillAccumulators(tmpPath, finalFiles, finalDirs);
        list.unshift(...newDirs);
    }

    return {
        files: finalFiles,
        dirs: finalDirs
    }
}

async function readLevelAndFillAccumulators(path, finalFiles, finalDirs) {
    const {files, dirs} = await readLevel(path);
    finalFiles.push(...files);
    finalDirs.push(...dirs);
    return dirs;
}

async function readLevel(path) {
    const entities = await readdir(path, {withFileTypes: true});

    const files = [];
    const dirs = [];
    for(const entity of entities) {
        const entityPath = pathUtil.join(path, entity.name);
        if(entity.isFile()) {
            files.push(entityPath);
        } else if (entity.isDirectory()) {
            dirs.push(entityPath);
        }
    }

    return {
        files,
        dirs
    }
}

export {readTree};
