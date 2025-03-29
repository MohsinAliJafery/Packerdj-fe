import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ListComponent } from './list/list.component';



const routes: Routes = [
  { path: '', redirectTo: 'category-list', pathMatch: 'full' },
  { path: 'category-list', component: ListComponent },
  { path: ':id', component: CreateCategoryComponent },
  { path: 'edit/:id', component: CreateCategoryComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachCategoriesRoutingModule {

}
