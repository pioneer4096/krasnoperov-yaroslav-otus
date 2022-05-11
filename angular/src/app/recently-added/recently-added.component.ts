import {Component, OnInit} from '@angular/core';
import {DictionaryStorageService} from "../dictionary-storage.service";
import {TranslatorService} from "../translator.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-recently-added',
    templateUrl: './recently-added.component.html',
    styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

    newWord = '';
    lang = 'en'
    list = [];

    constructor(public dictionary: DictionaryStorageService, public translator: TranslatorService, private toastr: ToastrService) {}

    ngOnInit(): void {
        this.getRecent()
    }

    getRecent() {
        this.dictionary.getRecent()
            .subscribe(list => {
                this.list = list
                console.log('list was set = ', JSON.stringify(list))
            });
    }

    addWord() {
        if(!this.newWord) {
            this.toastr.error("Заполните слово", "ОШИБКА")
            return
        }
        const params = {word: this.newWord, lang: this.lang};

        try {
            this.translator
                .translate(params.word, params.lang)
                .subscribe((response:any) => {
                    let translation = response?.responseData?.translatedText || ''

                    if(translation) {
                        if(Array.isArray(translation)) {    // TODO remove cheat in future
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
                            this.toastr.success("Слово добавлено", "УСПЕХ")
                        }
                        catch (e) {
                            throw new Error('Не удалось сохранить перевод в словарь: ' + e.message)
                        }
                    }
                    else {

                    }
                });
        }
        catch(e) {
            this.toastr.error("Не удалось добавить слово", "ОШИБКА")
        }


        /*this.dictionary.add(this.newWord, 'en', this.translation.split(','), 'ru')
            this.newWord = ''
            this.translation = ''
            this.getRecent()
            alert('добавлено')*/
    }

    changeLang() {
        this.lang = (this.lang === 'ru') ? 'en' : 'ru'
    }

    getPair() {}
}
