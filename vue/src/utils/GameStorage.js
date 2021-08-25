import { Storage } from './Storage'

export class GameStorage extends Storage {
    constructor(userKey, initialState) {
        super()
        this.key = `vue-calc-game:${userKey}`
        this.initialState = initialState
    }

    get() {
        const savedState = this.storage.getItem(this.key)
            ? JSON.parse(this.storage.getItem(this.key))
            : {}

        return {
            ...this.initialState,
            ...savedState
        }
    }
}
