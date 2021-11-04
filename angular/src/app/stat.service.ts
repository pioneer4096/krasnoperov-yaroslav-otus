import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface GameStat {
    correct: number
    incorrect: number
    total: number
}

@Injectable({
    providedIn: 'root'
})
export class StatService {
    stat: GameStat;
    subject$: BehaviorSubject<GameStat>;

    constructor() {
        this.init()
    }

    init() {
        this.stat = {
            correct: 0,
            incorrect: 0,
            total: 0
        }
        this.subject$ = new BehaviorSubject(this.stat);
    }

    reset() {
        this.init();
        this.update();
    }

    updateCorrect() {
        this.stat.correct++;
        this.stat.total++;
        this.update();
    }

    updateIncorrect() {
        this.stat.incorrect++;
        this.stat.total++;
        this.update();
    }

    update() {
        this.subject$.next(this.stat);
    }
}
