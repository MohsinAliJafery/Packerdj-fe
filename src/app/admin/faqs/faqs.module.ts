import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FAQSRoutingModule } from './faqs-routing.module';
import { FaqsListComponent } from './faqs-list/faqs-list.component';
import { CreateFaqsComponent } from './create-faqs/create-faqs.component';
import { AngularMaterialModule } from 'src/app/Material.module';



@NgModule({
  declarations: [
    FaqsListComponent,
    CreateFaqsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FAQSRoutingModule,
    AngularMaterialModule
  ]
})
export class FaqsModule {
  static routes: Routes | undefined;

}
