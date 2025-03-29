import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateListComponentComponent } from './candidate-list-component/candidate-list-component.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


const routes: Routes = [
  { path: '', redirectTo: 'candidate-list', pathMatch: 'full' },
  { path: 'candidate-list', component: CandidateListComponentComponent },
  { path: ':id', component: UserDetailComponent },
  { path: 'userDetail/:id', component: UserDetailComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule {

}
