import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { AboutRoutingModule } from './about-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutListComponent } from './about-list/about-list.component';
import { EditAboutComponent } from './edit-about/edit-about.component';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule({
  declarations: [
    AboutListComponent,
    EditAboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule
  ]
})
export class AboutPekerdjaModule {
  static routes: Routes | undefined;

}
