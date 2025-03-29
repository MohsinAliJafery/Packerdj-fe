import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { CreateJobsComponent } from './create-jobs/create-jobs.component';
import { JobApplicantsComponent } from './job-applicants/job-applicants.component';
import { ApplicantsDetailComponent } from './applicants-detail/applicants-detail.component';


const routes: Routes = [
  { path: '', redirectTo: 'jobs-list', pathMatch: 'full' },
  { path: 'jobs-list', component: JobsListComponent },
  { path: 'user/:applicants_id', component: ApplicantsDetailComponent },
  { path: 'user', component: ApplicantsDetailComponent },
  { path: 'job-applicants/:job_id', component: JobApplicantsComponent },
  { path: 'job-applicants', component: JobApplicantsComponent },
  { path: ':id', component: CreateJobsComponent },
  { path: 'edit/:id', component: CreateJobsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule {

}
