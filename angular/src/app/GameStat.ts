export interface IGameStat {
    correct: number
    incorrect: number
    total: number
}

export class GameStat {
    stat: IGameStat;

    constructor() {
        this.stat =  {
            correct: 0,
            incorrect: 0,
            total: 0
        }
    }

    updateCorrect() {
        this.stat.correct++;
        this.stat.total++;
    }

    updateIncorrect() {
        this.stat.incorrect++;
        this.stat.total++;
    }
}