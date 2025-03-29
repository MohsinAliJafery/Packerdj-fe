import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateListComponentComponent } from './candidate-list-component/candidate-list-component.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/Material.module';


@NgModule({
  declarations: [CandidateListComponentComponent, UserDetailComponent],
  imports: [CommonModule, CandidateRoutingModule, FormsModule, ReactiveFormsModule, AngularMaterialModule],
})
export class CandidateModule {
  static routes: Routes | undefined;
}
