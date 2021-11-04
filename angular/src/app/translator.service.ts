import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  constructor() { }

  async translate(word) {
      const res = await fetch("https://libretranslate.de/translate", {
          method: "POST",
          body: JSON.stringify({
              q: word,
              source: "en",
              target: "ru",
              format: "text"
          }),
          headers: { "Content-Type": "application/json" }
      });

      return await res.json();
  }
}
