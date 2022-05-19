import { Injectable } from '@angular/core';
import {DictionaryStorageService} from "./dictionary-storage.service";
import {TranslatorService} from "./translator.service";

@Injectable({
  providedIn: 'root'
})
export class TokenizerService {

  constructor(private dictionaryStorage: DictionaryStorageService, private translator: TranslatorService) { }

  add(words) {
      const arr = words.split(' ')
      console.warn('tokenizer add arr = ', arr)
  }
}
