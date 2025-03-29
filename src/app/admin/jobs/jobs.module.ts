import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from "@angular/router";
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { CreateJobsComponent } from './create-jobs/create-jobs.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JobApplicantsComponent } from './job-applicants/job-applicants.component';
import { ApplicantsDetailComponent } from './applicants-detail/applicants-detail.component';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule({
  declarations: [
    JobsListComponent,
    CreateJobsComponent,
    JobApplicantsComponent,
    ApplicantsDetailComponent,

  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule
  ]
})
export class JobsModule {
  static routes: Routes | undefined;
}
