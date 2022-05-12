import {Component, OnInit} from '@angular/core';
import {DictionaryStorageService, Word} from "../dictionary-storage.service";
import {ISettings, SettingsStorageService} from "../settings-storage.service";
import {TimerService} from "../timer.service";
import {MessageService} from "../message.service";
import {Game, IReport} from "../Game";

@Component({
    selector: 'app-go',
    templateUrl: './go.component.html',
    styleUrls: ['./go.component.css']
})
export class GoComponent implements OnInit {
    settings: ISettings;
    isPlaying = false;

    word: Word = null;
    translation = "";
    check = "";
    timerLeft = "0";
    game = null;
    finalStat = null;
    finalReport: IReport[] = [];
    gameProgress = "0/0";
    timerSubscription;

    constructor(
        private dictionaryStorage: DictionaryStorageService,
        private settingsStorage: SettingsStorageService,
        private timer: TimerService,
        private message: MessageService,
    ) {
    }

    ngOnInit(): void {
        this.settings = this.settingsStorage.load();
    }

    nextTask() {
        if (this.game.hasSteps()) {
            this.word = this.dictionaryStorage.getRandom()
        } else {
            this.finishGame(true)
        }
    }

    checkTranslation() {
        if (this.translation) {
            if (this.word) {
                if (this.word.translation === this.translation) {
                    this.message.correctAnswer();
                    this.game.correctAnswer(this.word.word, this.translation);
                } else {
                    this.message.wrongAnswer();
                    this.game.wrongAnswer(this.word.word, this.translation);
                }
                this.game.next();
                this.translation = '';
                this.nextTask();
                this.gameProgress = this.game.getProgress();
            }
        } else {
            this.message.warning(`Заполните поле "перевод"`)
        }

    }

    startGame() {
        this.finalStat = null;
        this.finalReport = [];
        this.game = new Game(this.settings);
        this.isPlaying = true;
        this.gameProgress = this.game.getProgress();
        const GAME_DURATION = this.game.getDuration();
        this.nextTask();

        this.timerSubscription = this.timer
            .start(GAME_DURATION)
            .subscribe(
                (val) => this.updateTimeLeft(GAME_DURATION - val),
                (error) => {
                    this.isPlaying = false
                },
                () => {
                    this.isPlaying = false;
                    this.finishGame(false);
                }
            );
    }

    updateTimeLeft(val) {
        const timeLeft = val > 0 ? val : 0;
        this.timerLeft = timeLeft + "";
    }

    finishGame(force) {
        if(force && typeof this.timerSubscription?.unsubscribe === "function") {
            this.timerSubscription?.unsubscribe();
            console.log("force timer interrupt")
        }
        this.finalStat = this.game.getStat();
        this.finalReport = this.game.getReport();
        this.message.success('ИГРА ОКОНЧЕНА');
        this.isPlaying = false;
    }
}
