import {Component, OnInit} from '@angular/core';
import {DictionaryStorageService} from "../dictionary-storage.service";
import {TranslatorService} from "../translator.service";
import {MessageService} from "../message.service";

@Component({
    selector: 'app-recently-added',
    templateUrl: './recently-added.component.html',
    styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

    newWord = '';
    lang = 'en';
    list = [];

    constructor(public dictionary: DictionaryStorageService, public translator: TranslatorService, private message: MessageService) {
    }

    ngOnInit(): void {
        this.getRecent()
    }

    getRecent() {
        this.dictionary.getRecent()
            .subscribe(list => {
                this.list = list
            });
    }

    addWord() {
        if (!this.newWord) {
            this.message.error("Заполните слово");
            return
        }
        const params = {word: this.newWord, lang: this.lang};

        try {
            this.translator
                .translate(params.word, params.lang)
                .subscribe((response: any) => {
                    let translation = response?.responseData?.translatedText || ''

                    if (translation) {
                        if (Array.isArray(translation)) {    // TODO remove cheat in future
                            translation = translation[0]
                        }

                        try {
                            this.dictionary.add({
                                word: params.word,
                                wordLang: params.lang,
                                translation: translation,
                                translationLang: params.lang === "ru" ? "en" : "ru"
                            });
                            this.newWord = ''
                            this.getRecent()
                            this.message.success("Слово добавлено")
                        } catch (e) {
                            throw new Error('Не удалось сохранить перевод в словарь: ' + e.message)
                        }
                    } else {

                    }
                });
        } catch (e) {
            this.message.error("Не удалось добавить слово")
        }
    }

    changeLang() {
        this.lang = (this.lang === 'ru') ? 'en' : 'ru'
    }
}
