import {Component, OnInit} from '@angular/core';
import {DictionaryStorageService} from "../dictionary-storage.service";

export interface Word {
    text: string,
    date: number
}

@Component({
    selector: 'app-recently-added',
    templateUrl: './recently-added.component.html',
    styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

    newWord = '';
    translation = '';
    list = [];

    constructor(public dictionary: DictionaryStorageService) {}

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
        if(this.newWord && this.translation) {
            this.dictionary.add(this.newWord, this.translation.split(','))
            this.newWord = ''
            this.translation = ''
            this.getRecent()
            alert('добавлено')
        }
        else {
            let fields = [
                    {text: 'слово', value: this.newWord},
                    {text: 'перевод', value: this.translation}
                ]
                .filter(f => !f.value)
                .map(f => f.text)

            alert(`Заполните поля ${fields.join(', ')}`)
        }
    }
}
