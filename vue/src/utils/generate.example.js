function randomInt(max) {
    return Math.floor(Math.random() * max);
}

const MAX = 1000
export function generate() {
    const t1 = randomInt(MAX)
    const t2 = randomInt(MAX)

    return {
        t1,
        t2,
        sum: t1 + t2
    }
}
