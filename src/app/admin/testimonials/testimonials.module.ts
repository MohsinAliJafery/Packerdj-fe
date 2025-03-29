import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsRoutingModule } from './testimonials-routing.module';
import { Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TestimonialsListComponent } from './testimonials-list/testimonials-list.component';
import { CreateTestimonialComponent } from './create-testimonial/create-testimonial.component';



@NgModule({
  declarations: [
    TestimonialsListComponent,
    CreateTestimonialComponent
  ],
  imports: [
    CommonModule,
    TestimonialsRoutingModule,
    ReactiveFormsModule
  ]
})
export class TestimonialsModule {
  static routes: Routes | undefined;

}
