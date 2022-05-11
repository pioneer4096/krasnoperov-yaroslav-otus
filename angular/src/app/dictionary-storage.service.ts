import { Injectable } from '@angular/core';
import {of} from "rxjs";
import {getRandomArrayElement} from "./utils";
import {LocalStorageService} from "./local-storage.service";

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
  private storageKey = 'dictionary_storage';

  constructor(private localStorage: LocalStorageService) {
      const saved = this.localStorage.getItem(this.storageKey);
      this.storage = saved || [];
  }

  add({word, wordLang, translation, translationLang}) {
      this.storage.unshift({
          word,
          wordLang,
          date: Date.now(),
          translation,
          translationLang
      })
      localStorage.setItem(this.storageKey, JSON.stringify(this.storage))

  }

  getRecent(count = 10) {
      return of(this.storage.slice(0, count))
  }

  getAll() {
      return of(this.storage)
  }

  getRandom(): Word {
      return getRandomArrayElement(this.storage)
  }
}
