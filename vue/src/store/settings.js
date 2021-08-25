import {initialState} from '../reference/settings.initial.state'
import {GameStorage} from '../utils/GameStorage'
const storage = new GameStorage('settings', initialState)

export default {
    state: {
        ...storage.get()
    },
    mutations: {
        startGame(state, settings) {
            state.duration = settings.duration || 1
            state.complexity = settings.complexity || 1
            state.options = settings.options || []

            storage.update({...state})
        }
    },
    getters: {
        getGameOptions: s => ({...s})
    }
}
