import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from "@angular/router";
import { SkillAssessmentRoutingModule } from './skill-assessment-routing.module';
import { CreateSkillComponent } from './create-skill/create-skill.component';
import { CreateListComponent } from './create-list/create-list.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    CreateSkillComponent,
    CreateListComponent
  ],
  imports: [
    CommonModule,
    SkillAssessmentRoutingModule, ReactiveFormsModule,
    AngularEditorModule
  ]
})
export class SkillAssessmentModule {
  static routes: Routes | undefined;
}
