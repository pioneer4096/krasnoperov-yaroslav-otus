import { Component, OnInit } from '@angular/core';
import {DictionaryStorageService} from "../dictionary-storage.service";

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {

  list = [];

  constructor(public dictionary: DictionaryStorageService) { }

  ngOnInit(): void {
    this.readDictionary();
  }

  readDictionary() {
    this.dictionary.getAll()
        .subscribe(list => {
          this.list = list.map(row => {
            return {
              ...row,
              isEditing: false,
              copy: null
            }
          });
        });
  }

  editRow(word) {
    word.copy = {
      text: word.text,
      translations: word.tranlations ? word.tranlations.slice() : []
    };

    word.isEditing = true
  }

  applyRow(word) {
    word.text = word.copy.text;
    word.translations = word.copy.translations.slice();
    this.cancelRow(word);
  }

  cancelRow(word) {
    word.copy = null;
    word.isEditing = false;
  }

}
