import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeListComponent } from './type-list/type-list.component';
import { CreateTypeComponent } from './create-type/create-type.component';



const routes: Routes = [
  { path: '', redirectTo: 'type-list', pathMatch: 'full' },
  { path: 'type-list', component: TypeListComponent },
  { path: ':id', component: CreateTypeComponent },
  { path: 'edit/:id', component: CreateTypeComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachTypesRoutingModule {

}
