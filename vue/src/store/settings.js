export default {
    state: {
        duration: 1,
        complexity: 1,
        options: []
    },
    mutations: {
        startGame(state, settings) {
            state.duration = settings.duration || 1
            state.complexity = settings.complexity || 1
            state.options = settings.options || []
        }
    },
    getters: {
        getGameOptions: s => ({...s})
    }
}
