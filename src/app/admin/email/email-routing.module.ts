import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailListComponent } from './email-list/email-list.component';
import { EditEmailComponent } from './edit-email/edit-email.component';


const routes: Routes = [
  { path: '', redirectTo: 'email-list', pathMatch: 'full' },
  { path: 'email-list', component: EmailListComponent },

  { path: 'edit', component: EditEmailComponent },
  { path: 'edit/:id', component: EditEmailComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailRoutingModule {

}
