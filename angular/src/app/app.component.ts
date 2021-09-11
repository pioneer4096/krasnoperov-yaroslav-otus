import {Component} from '@angular/core';

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
            href: '/go',
            text: 'Упражнения'
        },
        {
            href: '/settings',
            text: 'Настройки'
        }
    ];
}
