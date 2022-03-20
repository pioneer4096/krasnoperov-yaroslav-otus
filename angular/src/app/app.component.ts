import {Component} from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Translator';
    links = [
        {
            href: '/',
            text: 'Последние добавленные слова'
        },
        {
            href: '/dictionary',
            text: 'Словарь'
        },
        {
            href: '/go',
            text: 'Упражнения'
        },
        {
            href: '/settings',
            text: 'Настройки'
        }
    ];
}
