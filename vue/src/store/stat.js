export default {
    state: {
        gameStart: 0,
        correctSolved: 0,
        all: 0,
    },
    mutations: {
        updateStat(state, isCorrect) {
            if(!state.gameStart) {
                state.gameStart = Date.now()
            }
            if(isCorrect) {
                state.correctSolved = state.correctSolved + 1
            }
            state.all = state.all + 1
        }
    },
    getters: {
        playDay: s => {
            return s.gameStart
                ? Math.floor((Date.now() - s.gameStart) / 3600 /24) + 1
                : 1
        },
        accuracy: s => {
            const accuracy =  s.all ? (s.correctSolved * 100 / s.all) : 0
            return accuracy.toFixed(0)
        },
        correctSolved: s => s.correctSolved,
        all: s => s.all
    }
}
