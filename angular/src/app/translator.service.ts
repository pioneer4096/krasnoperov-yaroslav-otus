import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  constructor(private http: HttpClient) { }

  translate(word, lang) {
      const langPair = (lang === "ru") ? "ru|en" : "en|ru";
      const addr = `https://api.mymemory.translated.net/get?q=${word}&langpair=${langPair}`;
      return this.http.get(addr);
  }
}
