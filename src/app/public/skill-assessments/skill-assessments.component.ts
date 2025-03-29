import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SKILLTYPE } from 'src/app/config/constant';
import { skillAssessment } from 'src/app/services/skillAssessment.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-skill-assessments',
  templateUrl: './skill-assessments.component.html',
  styleUrls: ['./skill-assessments.component.scss']
})
export class SkillAssessmentsComponent implements OnInit {

  searchCards!: Array<any>;
  isCardclick: boolean = false;
  componentInView = new Subject();
  skillsList: any = [];
  showLessSkills: any = [];
  hideAllBtn: boolean = false;
  SkillType = SKILLTYPE
  myGroup!: FormGroup;
  totalReq: any;

  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  startIndex: any = 0;
  endIndex: any;


  constructor(private skill_Service: skillAssessment) {
  }

  ngOnInit(): void {
    this.myGroup = new FormGroup({
      searchValue: new FormControl('')
    });
    this.getSkills();
  }


  getSkills(params?: any): void {
    this.skill_Service.getSkills(this.startIndex, this.itemsPerPage, params).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      this.skillsList = response.skills;
      this.hideAllBtn = this.skillsList.length > 3 ? false : true;
      this.totalReq = response.totalReq;
      this.showLessSkills = this.skillsList.slice(0, 3);
      this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    },
      error => {
        console.log(error);
      }
    );
  }

  onClick() {
    const params = this.myGroup.value;
    if (params.searchValue) {
      this.getSkills(params);
    }

  }
  onCardclick(data: any, isClicked: boolean, index: any) {
    if (isClicked === false) {
      for (let i = 0; i < this.skillsList.length; i++) {
        if (i === index) {
          this.skillsList[index].isCardclick = true;
        } else {
          this.skillsList[i].isCardclick = false;
        }
      }
    } else {
      for (let i = 0; i < this.skillsList.length; i++) {
        this.skillsList[index].isCardclick = false;
      }
    }
    window.open(data.link, "_blank");


  }

  showAll() {
    this.hideAllBtn = true;
    this.showLessSkills = this.skillsList;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
      this.getSkills();
    }
  }

  gotoTest() {
    let container = document.getElementById('Skills');
    container?.scrollIntoView({ behavior: 'smooth' });
  }

}
