import { Injectable } from '@angular/core';
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  constructor() {}

  start(duration) { // duration in sec
      return interval(1000).pipe(
          takeUntil(timer(duration * 1000))
      );
  }
}
