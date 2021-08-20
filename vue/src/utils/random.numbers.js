export function randomInt(max) {
    return Math.floor(Math.random() * max) + 1; // должно быть больше нуля
}

export function randomElement(arr = []) {
    return arr[Math.floor(Math.random() * arr.length)]
}
