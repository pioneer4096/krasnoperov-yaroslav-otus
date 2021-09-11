import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    english = true
    chinese = false
    japanese = false

    wordsCount = 1
    timeLimit = 1

    constructor() {
    }

    ngOnInit(): void {
    }

}
