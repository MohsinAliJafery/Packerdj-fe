import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-candidate-creat-list',
  templateUrl: './candidate-creat-list.component.html',
  styleUrls: ['./candidate-creat-list.component.scss']
})
export class CandidateCreatListComponent implements OnInit {
  id: any | string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

  }

  ngOnInit(): void {

  }


}
