import {initialState} from '../reference/stat.initial.state'
import {GameStorage} from '../utils/GameStorage'
const storage = new GameStorage('stat', initialState)

export default {
    state: {
        ...storage.get()
    },
    mutations: {
        updateStat(state, isCorrect) {
            if(!state.gameStart) {
                state.gameStart = Date.now()
            }
            if(isCorrect) {
                state.correctSolved++
                state.lastSolved++
            }
            state.all++
            state.lastCount++

            storage.update({...state})
        },
        newGameStarted(state) {
            state.lastCount = 0
            state.lastSolved = 0

            storage.update({...state})
        }
    },
    getters: {
        playDay: s => {
            return s.gameStart
                ? Math.floor((Date.now() - s.gameStart) / 1000 / 3600 / 24) + 1
                : 1
        },
        accuracy: s => {
            const accuracy =  s.all ? (s.correctSolved * 100 / s.all) : 0
            return accuracy.toFixed(0)
        },
        lastSolved: s => s.lastSolved,
        lastCount: s => s.lastCount
    }
}
