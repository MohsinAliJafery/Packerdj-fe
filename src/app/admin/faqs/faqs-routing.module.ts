import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqsListComponent } from './faqs-list/faqs-list.component';
import { CreateFaqsComponent } from './create-faqs/create-faqs.component';



const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: FaqsListComponent },
  { path: ':id', component: CreateFaqsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FAQSRoutingModule {

}
