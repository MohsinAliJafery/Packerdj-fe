import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTypeComponent } from './create-type/create-type.component';
import { TypeListComponent } from './type-list/type-list.component';
import { Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CoachTypesRoutingModule } from './coach-types-routing.module';



@NgModule({
  declarations: [
    CreateTypeComponent,
    TypeListComponent
  ],
  imports: [
    CommonModule,
    CoachTypesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CoachTypesModule {
  static routes: Routes | undefined;
}
