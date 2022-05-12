import { Injectable } from '@angular/core';
import {of} from "rxjs";
import {getRandomArrayElement} from "./utils";
import {LocalStorageService} from "./local-storage.service";

const demoData = [
    {"word":"слон","wordLang":"ru","date":1652302932895,"translation":"Elephant","translationLang":"en"},
    {"word":"собака","wordLang":"ru","date":1652302932895,"translation":"dog","translationLang":"en"},
    {"word":"сосна","wordLang":"ru","date":1652302932895,"translation":"pine","translationLang":"en"},
    {"word":"волк","wordLang":"ru","date":1652302932895,"translation":"wolf","translationLang":"en"},
    {"word":"цель","wordLang":"ru","date":1652302932895,"translation":"goal","translationLang":"en"},
    {"word":"cat","wordLang":"en","date":1652302795780,"translation":"кот","translationLang":"ru"},
    {"word":"table","wordLang":"en","date":1652302795780,"translation":"стол","translationLang":"ru"},
    {"word":"work","wordLang":"en","date":1652302795780,"translation":"работа","translationLang":"ru"},
    {"word":"paradise","wordLang":"en","date":1652302795780,"translation":"рай","translationLang":"ru"},
    {"word":"hell","wordLang":"en","date":1652302795780,"translation":"ад","translationLang":"ru"},
];

export interface Word {
    word: string,
    wordLang: string,
    date: number,
    translation: string,
    translationLang: string
}

@Injectable({
  providedIn: 'root'
})
export class DictionaryStorageService {
  storage = []
  private storageKey = 'dictionary_storage';

  constructor(private localStorage: LocalStorageService) {


      const saved = this.localStorage.getItem(this.storageKey);
      const savedArray = saved ? saved : []

      this.storage = [...savedArray, ...demoData]
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
