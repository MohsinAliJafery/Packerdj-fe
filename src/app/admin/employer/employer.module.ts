import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from "@angular/router";
import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerListComponent } from './employer-list/employer-list.component';
import { CreateEmployerComponent } from './create-employer/create-employer.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { JobDetailsComponent } from './job-details/job-details.component';


@NgModule({
  declarations: [
    EmployerListComponent,
    CreateEmployerComponent,
    JobDetailsComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EmployerModule {
  static routes: Routes | undefined;

}
