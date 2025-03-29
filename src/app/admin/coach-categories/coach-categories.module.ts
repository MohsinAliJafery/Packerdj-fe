import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { Routes } from '@angular/router';
import { CoachCategoriesRoutingModule } from './coach-categories-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListComponent,
    CreateCategoryComponent
  ],
  imports: [
    CommonModule,
    CoachCategoriesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CoachCategoriesModule {
  static routes: Routes | undefined;
}
