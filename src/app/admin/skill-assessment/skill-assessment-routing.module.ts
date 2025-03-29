import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateListComponent } from './create-list/create-list.component';
import { CreateSkillComponent } from './create-skill/create-skill.component';


const routes: Routes = [
  { path: '', redirectTo: 'skillAssessment-list', pathMatch: 'full' },
  { path: 'skillAssessment-list', component: CreateListComponent },
  { path: ':id', component: CreateSkillComponent },
  { path: 'edit/:id', component: CreateSkillComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillAssessmentRoutingModule {

}
