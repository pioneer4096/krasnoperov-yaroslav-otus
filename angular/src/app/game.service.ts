import { Injectable } from '@angular/core';
import {DictionaryStorageService} from "./dictionary-storage.service";
import {StatService} from "./stat.service";
import {TimerService} from "./timer.service";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  tasksCount: Number;
  duration: Number;

  constructor(
      private dictionaryStorage: DictionaryStorageService,
      private stat: StatService,
      private timer: TimerService,
      private toastr: ToastrService,
  ) {}

  init(count, duration) {
      this.tasksCount = count;
      this.duration = duration;
  }

  start() {

  }

  checkAnswer(answer) {
      return true;
  }
}
