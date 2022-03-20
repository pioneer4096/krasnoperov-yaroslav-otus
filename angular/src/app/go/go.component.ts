import {Component, OnInit} from '@angular/core';
import {DictionaryStorageService, Word} from "../dictionary-storage.service";
import {StatService} from "../stat.service";

@Component({
    selector: 'app-go',
    templateUrl: './go.component.html',
    styleUrls: ['./go.component.css']
})
export class GoComponent implements OnInit {

    word: Word = null
    isPlaying = false

    translation = ''

    constructor(private dictionaryStorage: DictionaryStorageService, private stat: StatService) {
        stat.reset()
    }

    ngOnInit(): void {
        this.generate()
    }

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
    }

    stopGame() {
        this.isPlaying = false
    }

}
