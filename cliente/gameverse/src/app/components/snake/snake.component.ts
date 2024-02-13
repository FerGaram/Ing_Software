import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {

  constructor() {
    this.redirectToSnake();
   }

  ngOnInit(): void {
  }

  redirectToSnake(): void {
    window.location.href = '/assets/Juegos/Snake/index.html';
  }

}
