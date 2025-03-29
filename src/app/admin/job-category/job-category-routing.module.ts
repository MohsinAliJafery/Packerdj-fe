import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { UpdateCategoriesComponent } from './update-categories/update-categories.component';



const routes: Routes = [
  { path: '', redirectTo: 'category-list', pathMatch: 'full' },
  { path: 'category-list', component: CategoriesComponent },
  { path: ':id', component: UpdateCategoriesComponent },
  { path: 'edit/:id', component: UpdateCategoriesComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobCategoryRoutingModule {

}
