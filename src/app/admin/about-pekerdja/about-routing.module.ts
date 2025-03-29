import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutListComponent } from './about-list/about-list.component';
import { EditAboutComponent } from './edit-about/edit-about.component';



const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: AboutListComponent },
  { path: 'edit', component: EditAboutComponent },
  { path: 'edit/:id', component: EditAboutComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {

}
