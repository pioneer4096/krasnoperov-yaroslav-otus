import {Component, OnInit} from '@angular/core';
import {DictionaryStorageService, Word} from "../dictionary-storage.service";
import {StatService} from "../stat.service";
import {ISettings, SettingsStorageService} from "../settings-storage.service";

@Component({
    selector: 'app-go',
    templateUrl: './go.component.html',
    styleUrls: ['./go.component.css']
})
export class GoComponent implements OnInit {
    settings: ISettings;
    word: Word = null;
    isPlaying = false;
    timerDuration = 15;

    translation = '';

    constructor(private dictionaryStorage: DictionaryStorageService, private stat: StatService, private settingsStorage: SettingsStorageService) {
        stat.reset()
    }

    ngOnInit(): void {
        this.settings = this.settingsStorage.load();
        this.generate()
    }

    // TODO запоминать использованные слова в течении игры и исключать их из рандомайзинга
    generate() {
        this.word = this.dictionaryStorage.getRandom()
    }

    checkTranslation() {
        if (this.translation) {
            if (this.word) {
                if (this.word.translations.includes(this.translation)) {
                    alert('correct')
                    this.stat.updateCorrect()
                } else {
                    alert('INcorrect')
                    this.stat.updateIncorrect()
                }
                this.translation = ''
                this.generate()
            }
        } else {
            alert('Заполните поле "перевод"')
        }

    }

    timerCompleted() {
        alert('Timer completed')
    }

    startGame() {
        this.isPlaying = true
        // SET GAME SETTINGS
        // SET
    }

    stopGame() {
        this.isPlaying = false
    }

}
