import { Injectable } from '@angular/core';
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  progress: Number

  constructor() {
      this.progress = 0;
  }

  start(duration) { // duration in sec
      this.progress = 0;

      const result = interval(1000).pipe(
          takeUntil(timer(duration * 1000))
      );

      return result;
  }
}
