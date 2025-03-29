import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerListComponent } from './employer-list/employer-list.component';
import { CreateEmployerComponent } from './create-employer/create-employer.component';
import { JobDetailsComponent } from './job-details/job-details.component';


const routes: Routes = [

  { path: '', redirectTo: 'employer-list', pathMatch: 'full' },
  { path: 'employer-list', component: EmployerListComponent },
  { path: 'job-detail/:emp_id', component: JobDetailsComponent },
  { path: 'job-detail', component: JobDetailsComponent },
  { path: ':id', component: CreateEmployerComponent },
  { path: 'edit/:id', component: CreateEmployerComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule {

}
