import {Component, OnInit} from '@angular/core';

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

    newWord:Word = {text: '', date: 0};

    list:Array<Word> = [
        {text: 'bus', date: 1633904710 * 1000},
        {text: 'stone', date: 1633914710 * 1000},
        {text: 'bar', date: 1633924710 * 1000},
        {text: 'jar', date: 1633934710 * 1000},
        {text: 'star', date: 1633944710 * 1000},
    ].reverse()

    constructor() {
    }

    ngOnInit(): void {
    }

    addWord() {
        if(this.newWord.text.length) {
            this.list.unshift({
                text: this.newWord.text,
                date: Date.now()
            })

            this.newWord.text = ''
        }
    }

    get sublist(): Array<Word> {
        return this.list.slice(0, 10)
    }
}
