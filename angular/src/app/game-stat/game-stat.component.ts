import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameStat, StatService} from "../stat.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-game-stat',
  templateUrl: './game-stat.component.html',
  styleUrls: ['./game-stat.component.css']
})
export class GameStatComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  statistics: GameStat;

  constructor(private stat:StatService) {
      this.subscription = stat.subject$.subscribe((statistics) => {
          this.statistics = statistics;
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
