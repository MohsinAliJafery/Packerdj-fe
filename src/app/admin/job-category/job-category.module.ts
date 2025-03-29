import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { UpdateCategoriesComponent } from './update-categories/update-categories.component';
import { Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { JobCategoryRoutingModule } from './job-category-routing.module';



@NgModule({
  declarations: [
    CategoriesComponent,
    UpdateCategoriesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JobCategoryRoutingModule
  ]
})
export class JobCategoryModule {
  static routes: Routes | undefined;

}
