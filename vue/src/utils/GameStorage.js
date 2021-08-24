import { initialState } from '@/reference/initial.state'
import { Storage } from './Storage'

export class GameStorage extends Storage {
    constructor() {
        super()
    }

    setUserKey(userKey) {
        this.key = `${userKey}:settings`
    }

    get() {
        const savedState = this.storage.getItem(this.key)
            ? JSON.parse(this.storage.getItem(this.key))
            : {}

        return {
            ...initialState
        }
    }
}
