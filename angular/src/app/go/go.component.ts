import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css']
})
export class GoComponent implements OnInit {

  list = [
      'bus', 'stone', 'bar', 'jar', 'star'
    ]

  word = this.list[0]

  translation = ''

  constructor() { }

  ngOnInit(): void {
  }

  generate() {
    this.word = this.list[Math.floor(this.list.length * Math.random())]
  }

}
