import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  timer = 6;
  url = this.router.url;

  constructor(private router: Router) {
  }

  ngOnInit() {
    setInterval(() => {
      this.timer--;
    }, 1000);
    setTimeout(() => {
      this.router.navigate(['/']);
    }, this.timer * 1000);
  }
}
