import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailListComponent } from './email-list/email-list.component';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { EmailRoutingModule } from './email-routing.module';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule({
  declarations: [
    EmailListComponent,
    EditEmailComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule
  ]
})
export class EmailModule {
  static routes: Routes | undefined;

}
