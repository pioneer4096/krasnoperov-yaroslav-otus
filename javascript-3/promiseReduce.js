async function promiseReduce(asyncFunctions, reduce, initialValue) {
    let sum = initialValue;
    for(let i = 0; i < asyncFunctions.length; i++) {
        const value = await asyncFunctions[i]();
        sum = reduce(sum, value);
    }
    return sum;
}

module.exports = promiseReduce;
