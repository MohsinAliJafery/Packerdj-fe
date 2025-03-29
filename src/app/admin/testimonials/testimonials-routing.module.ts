import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestimonialsListComponent } from './testimonials-list/testimonials-list.component';
import { CreateTestimonialComponent } from './create-testimonial/create-testimonial.component';



const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TestimonialsListComponent },
  { path: ':id', component: CreateTestimonialComponent },
  { path: 'edit/:id', component: CreateTestimonialComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestimonialsRoutingModule {

}
