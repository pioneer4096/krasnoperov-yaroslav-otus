import { Component, OnInit } from '@angular/core';
import {DictionaryStorageService, Word} from "../dictionary-storage.service";

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css']
})
export class GoComponent implements OnInit {

  word = null

  translation = ''

  constructor(private dictionaryStorage:DictionaryStorageService) { }

  ngOnInit(): void {
    this.generate()
  }

  generate() {
    const random: Word = this.dictionaryStorage.getRandom()
    this.word = random.text
  }

}
