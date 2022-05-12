import {Component, OnInit} from '@angular/core';
import {DictionaryStorageService, Word} from "../dictionary-storage.service";
import {StatService} from "../stat.service";
import {ISettings, SettingsStorageService} from "../settings-storage.service";
import { ToastrService } from 'ngx-toastr';
import {TimerService} from "../timer.service";

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
    timerSpan = "0";

    constructor(
        private dictionaryStorage: DictionaryStorageService,
        private stat: StatService,
        private settingsStorage: SettingsStorageService,
        private timer: TimerService,
        private toastr: ToastrService,
    ) {
        stat.reset()
    }

    ngOnInit(): void {
        this.settings = this.settingsStorage.load();
    }

    // TODO запоминать использованные слова в течении игры и исключать их из рандомайзинга
    nextTask() {
        this.word = this.dictionaryStorage.getRandom()
    }

    checkTranslation() {
        if (this.translation) {
            if (this.word) {
                if (this.word.translation === this.translation) {
                    alert('correct')
                    this.stat.updateCorrect()
                } else {
                    alert('INcorrect')
                    this.stat.updateIncorrect()
                }
                this.translation = ''
                this.nextTask()
            }
        } else {
            alert('Заполните поле "перевод"')
        }

    }

    startGame() {
        this.isPlaying = true;
        this.resetGame();
        this.timer
            .start(30)
            .subscribe(
                (val) => this.updateTableau(val),
                (error) => {},
                () => {
                    this.isPlaying = false
                    alert('DONE')
                }
            );
    }

    updateTableau(val) {
        this.timerSpan = `${val}/30`;
        console.log(val)
    }

    resetGame() {
        this.stat.reset();
        this.timerSpan = "0";
    }

}
