import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit {
  index: any = 1;
  id = '';
  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.index = params['id'];
    });

    this.index == 1 ? (this.id = 'AboutUs') : this.index == 2 ? (this.id = 'menu') : this.index == 3 ? (this.id = 'privacy-Container')
      : this.index == 4 ? (this.id = 'termsOfUse')
        : (this.id = 'menu');

    setTimeout(() => {
      let container = document.getElementById(this.id);
      container?.scrollIntoView({ behavior: 'smooth' });
    }, 0)
  }

}
