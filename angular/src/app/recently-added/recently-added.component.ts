import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-recently-added',
    templateUrl: './recently-added.component.html',
    styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

    newWord = ''
    list = [
        'train',
        'bus',
        'stone',
        'bar'
    ]

    constructor() {
    }

    ngOnInit(): void {
    }

    addWord() {
        console.log('newWord = ', this.newWord)
        if(this.newWord.length) {
            this.list.push(this.newWord)
            this.newWord = ''
        }
    }
}
