import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  constructor() { }

  translate(word) {
    return 'перевод'
  }
}
