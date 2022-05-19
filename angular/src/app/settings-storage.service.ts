import { Injectable } from '@angular/core';
import {LocalStorageService} from "./local-storage.service";

export interface ISettings {
  wordsCount: number,
  duration: number
}

@Injectable({
  providedIn: 'root'
})
export class SettingsStorageService {

  private _defaultSettings: ISettings = {
    wordsCount: 10,
    duration: 1
  };

  private storageKey = 'translator_settings';

  constructor(private storage: LocalStorageService) {}

  validate(settings: ISettings) {
    return true
  }

  save(settings: ISettings): void {
    const validation = this.validate(settings);

    if(validation) {
      this.storage.setItem(this.storageKey, settings)
    }
    else {
      throw new Error('Некорректные настройки')
    }
  }

  load(): ISettings {
    return this.storage.getItem(this.storageKey) || {...this._defaultSettings}
  }
}
