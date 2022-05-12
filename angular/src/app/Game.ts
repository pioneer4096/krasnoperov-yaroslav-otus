import {ISettings} from "./settings-storage.service";
import {GameStat} from "./GameStat";

export interface IReport {
    rightAnswer: string,
    yourAnswer: string,
    isCorrect: boolean
}

export class Game {
    tasksCount: number;
    duration: number;   // in minutes
    steps: number;
    stat: GameStat;
    progress: string;
    report: IReport[];

    constructor(settings: ISettings) {
        this.tasksCount = settings.wordsCount || 0;
        this.duration = settings.duration ? settings.duration * 60 : 0;
        this.steps = this.tasksCount;
        this.stat = new GameStat();
        this.updateProgress();
        this.report = [];
    }

    getDuration() {
        return this.duration;
    }

    hasSteps() {
        return Boolean(this.steps > 0)
    }

    correctAnswer(rightAnswer, yourAnswer) {
        this.stat.updateCorrect()
        this.report.push({
            rightAnswer,
            yourAnswer,
            isCorrect: true
        })
    }

    wrongAnswer(rightAnswer, yourAnswer) {
        this.stat.updateIncorrect()
        this.report.push({
            rightAnswer,
            yourAnswer,
            isCorrect: true
        })
    }

    getStat() {
        return this.stat.stat;
    }

    getReport() {
        return this.report;
    }

    next() {
        this.steps--;
        this.updateProgress();
    }

    updateProgress() {
        this.progress = `${this.steps}/${this.tasksCount}`;
    }


    getProgress() {
        return this.progress;
    }
}