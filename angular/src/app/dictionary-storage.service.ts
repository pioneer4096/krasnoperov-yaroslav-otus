import { Injectable } from '@angular/core';
import {of} from "rxjs";
import {getRandomArrayElement} from "./utils";

export interface Word {
    text: string,
    textLang: string,
    date: number,
    translations: string[],
    translationsLang: string
}

@Injectable({
  providedIn: 'root'
})
export class DictionaryStorageService {
  storage = []

  constructor() {
    this.storage = [
        {text: 'bus', textLang: 'en', date: 1633904710 * 1000, translations: ['автобус'], translationsLang: 'ru'},
        {text: 'stone', textLang: 'en', date: 1633914710 * 1000, translations: ['камень'], translationsLang: 'ru'},
        {text: 'bar', textLang: 'en', date: 1633924710 * 1000, translations: ['плитка'], translationsLang: 'ru'},
        {text: 'jar', textLang: 'en', date: 1633934710 * 1000, translations: ['банка'], translationsLang: 'ru'},
        {text: 'star', textLang: 'en', date: 1633944710 * 1000, translations: ['звезда'], translationsLang: 'ru'}
    ]
  }

  add(text, textLang = 'en', translations, translationsLang = 'ru') {
      this.storage.unshift({
          text,
          textLang,
          date: Date.now(),
          translations,
          translationsLang
      })
  }

  getRecent(count = 10) {
      return of(this.storage.slice(0, count))
  }

  getRandom(): Word {
      return getRandomArrayElement(this.storage)
  }
}
