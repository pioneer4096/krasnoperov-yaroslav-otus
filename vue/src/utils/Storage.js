export class Storage {
    constructor() {
        this.key = 'vue-calc-game'
        this.storage = window.localStorage
    }

    clear() {
        this.storage.removeItem(this.key)
    }

    update(newState) {
        this.storage.setItem(this.key, JSON.stringify(newState))
    }
}
