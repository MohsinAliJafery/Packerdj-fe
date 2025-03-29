import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { SKILLTYPE } from 'src/app/config/constant';
import { skillAssessment } from 'src/app/services/skillAssessment.service';

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.scss']
})
export class CreateSkillComponent implements OnInit {


  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Description',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

  };

  skillForm!: FormGroup;
  id: any | string;
  componentInView = new Subject();
  SkillType = SKILLTYPE

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
    private skill_Service: skillAssessment, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.skillForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      link: ['', [Validators.required]],
      _id: [''],
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.route.queryParams.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.getSkillById(id);
      }
    });
  }

  onClick() {
    if (this.skillForm.valid) {
      this.skill_Service.addSkill(this.skillForm.value)
        .pipe(takeUntil(this.componentInView))
        .subscribe(
          (response) => {
            if (response.result == 1) {
              this.skillForm.reset();
              this.toastr.success(response.message);
              this.router.navigate(['/admin/dashboard/skillAssessment']);
            }

          },
          (error) => {
            console.log(error);
          }
        );

    }
    else {
      this.toastr.error("Provide all details!", "Error !!",);
      this.skillForm.markAllAsTouched();
    }
  }

  getSkillById(id: any): void {
    this.skill_Service.getSkillById(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.skillForm.patchValue(response.skill);
      this.skillForm?.get('_id')?.setValue(response.skill._id);
    },

      error => {
        this.toastr.error(error.error.message);
      }

    );
  }

  updateSkill(): void {
    if (this.skillForm.valid) {
      this.skill_Service.updateSkill(this.skillForm.value).subscribe(
        (response: any) => {
          if (response.result == 1) {
            this.toastr.success(response.message);
            this.router.navigate(['/admin/dashboard/skillAssessment']);
          }
        },
      )

    } else {
      this.toastr.error("Provide all details!", "Error !!",);
      this.skillForm.markAllAsTouched();
    }
  }

}
