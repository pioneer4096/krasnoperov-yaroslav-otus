import { Injectable } from '@angular/core';
import {of} from "rxjs";
import {getRandomArrayElement} from "./utils";

export interface Word {
    text: string,
    date: number,
    translations: string[]
}

@Injectable({
  providedIn: 'root'
})
export class DictionaryStorageService {
  storage = []

  constructor() {
    this.storage = [
        {text: 'bus', date: 1633904710 * 1000, translations: ['автобус']},
        {text: 'stone', date: 1633914710 * 1000, translations: ['камень']},
        {text: 'bar', date: 1633924710 * 1000, translations: ['плитка']},
        {text: 'jar', date: 1633934710 * 1000, translations: ['банка']},
        {text: 'star', date: 1633944710 * 1000, translations: ['звезда']}
    ]
  }

  add(text, translations) {
      this.storage.unshift({
          text,
          date: Date.now(),
          translations
      })
  }

  getRecent(count = 10) {
      return of(this.storage.slice(0, count))
  }

  getRandom(): Word {
      return getRandomArrayElement(this.storage)
  }
}
