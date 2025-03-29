import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-candidate',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.scss'],
})
export class ListCandidateComponent implements OnInit {
  listCandidate: Array<any>;
  applyjob!: any;


  constructor(private router: Router, private modalService: NgbModal,) {
    this.listCandidate = [
      {
        dp: 'assets/images/Frame 39590.png',
        name: 'James Wang',
        profession: 'Frontend Developer',
        linkedin: 'assets/images/Frame 39592.png',
        world: 'assets/images/Frame 39593.png',
        experience: 'Experience',
        duration: '3 years 1 month',
        openTo: 'Open to',
        time: 'Full time roles',
        skills: 'Skills',
        skill1: 'Html',
        skill2: '+2',
        archive: 'assets/images/archive-add.png',
        save: 'assets/images/Vector (2).png',

      },
      {
        dp: 'assets/images/Frame 39590 (1).png',
        name: 'Diana Laurence',
        profession: 'Product Designer',
        linkedin: 'assets/images/Frame 39592.png',
        world: 'assets/images/Frame 39593.png',
        experience: 'Experience',
        duration: '3 years 1 month',
        openTo: 'Open to',
        time: 'Freelance',
        skills: 'Skills',
        skill1: 'Product Design',
        skill2: '+2',
        archive: 'assets/images/archive-add.png',
        save: 'assets/images/Vector (2).png',

      },
      {
        dp: 'assets/images/Frame 39590 (2).png',
        name: 'Jessica Nindira',
        profession: 'Product Management',
        linkedin: 'assets/images/Frame 39592.png',
        world: 'assets/images/Frame 39593.png',
        experience: 'Experience',
        duration: '3 years 1 month',
        openTo: 'Open to',
        time: 'Full time roles',
        skills: 'Skills',
        skill1: 'Product Design',
        skill2: '+2',
        archive: 'assets/images/archive-add.png',
        save: 'assets/images/Vector (2).png',

      },
      {
        dp: 'assets/images/Frame 39590.png',
        name: 'James Wang',
        profession: 'Frontend Developer',
        linkedin: 'assets/images/Frame 39592.png',
        world: 'assets/images/Frame 39593.png',
        experience: 'Experience',
        duration: '3 years 1 month',
        openTo: 'Open to',
        time: 'Full time roles',
        skills: 'Skills',
        skill1: 'Html',
        skill2: '+2',
        archive: 'assets/images/archive-add.png',
        save: 'assets/images/Vector (2).png',

      },
      {
        dp: 'assets/images/Frame 39590 (1).png',
        name: 'Diana Laurence',
        profession: 'Product Designer',
        linkedin: 'assets/images/Frame 39592.png',
        world: 'assets/images/Frame 39593.png',
        experience: 'Experience',
        duration: '3 years 1 month',
        openTo: 'Open to',
        time: 'Freelance',
        skills: 'Skills',
        skill1: 'Product Design',
        skill2: '+2',
        archive: 'assets/images/archive-add.png',
        save: 'assets/images/Vector (2).png',

      },
      {
        dp: 'assets/images/Frame 39590 (2).png',
        name: 'Jessica Nindira',
        profession: 'Product Management',
        linkedin: 'assets/images/Frame 39592.png',
        world: 'assets/images/Frame 39593.png',
        experience: 'Experience',
        duration: '3 years 1 month',
        openTo: 'Open to',
        time: 'Full time roles',
        skills: 'Skills',
        skill1: 'Product Design',
        skill2: '+2',
        archive: 'assets/images/archive-add.png',
        save: 'assets/images/Vector (2).png',

      },
      {
        dp: 'assets/images/Frame 39590.png',
        name: 'James Wang',
        profession: 'Frontend Developer',
        linkedin: 'assets/images/Frame 39592.png',
        world: 'assets/images/Frame 39593.png',
        experience: 'Experience',
        duration: '3 years 1 month',
        openTo: 'Open to',
        time: 'Full time roles',
        skills: 'Skills',
        skill1: 'Html',
        skill2: '+2',
        archive: 'assets/images/archive-add.png',
        save: 'assets/images/Vector (2).png',

      },
      {
        dp: 'assets/images/Frame 39590 (1).png',
        name: 'Diana Laurence',
        profession: 'Product Designer',
        linkedin: 'assets/images/Frame 39592.png',
        world: 'assets/images/Frame 39593.png',
        experience: 'Experience',
        duration: '3 years 1 month',
        openTo: 'Open to',
        time: 'Freelance',
        skills: 'Skills',
        skill1: 'Product Design',
        skill2: '+2',
        archive: 'assets/images/archive-add.png',
        save: 'assets/images/Vector (2).png',

      },
      {
        dp: 'assets/images/Frame 39590 (2).png',
        name: 'Jessica Nindira',
        profession: 'Product Management',
        linkedin: 'assets/images/Frame 39592.png',
        world: 'assets/images/Frame 39593.png',
        experience: 'Experience',
        duration: '3 years 1 month',
        openTo: 'Open to',
        time: 'Full time roles',
        skills: 'Skills',
        skill1: 'Product Design',
        skill2: '+2',
        archive: 'assets/images/archive-add.png',
        save: 'assets/images/Vector (2).png',

      },

    ];
  }

  ngOnInit(): void { }


  openCandidatedetail() {
    this.router.navigateByUrl('public/public-dashboard/candidate-detail');
  }

}
