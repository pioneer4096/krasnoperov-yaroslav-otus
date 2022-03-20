import { Injectable } from '@angular/core';
import {LocalStorageService} from "./local-storage.service";

export interface ISettings {
  wordsCount: number,
  timeLimit: number
}

@Injectable({
  providedIn: 'root'
})
export class SettingsStorageService {

  settings: ISettings;
  storageKey = 'settings'

  constructor(private storage: LocalStorageService) {}


  getLatest(): ISettings {
    return this.settings;
  }

  validate(settings: ISettings) {
    return true
  }

  save(settings: ISettings) {
    const validation = this.validate(settings);

    if(validation) {
      this.storage.setItem(this.storageKey, settings)
    }
  }
}
