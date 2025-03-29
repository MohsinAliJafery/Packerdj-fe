import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingListComponent } from './setting-list/setting-list.component';
import { EditSettingComponent } from './edit-setting/edit-setting.component';



const routes: Routes = [
  { path: '', redirectTo: 'setting-list', pathMatch: 'full' },
  { path: 'setting-list', component: SettingListComponent },
  { path: 'edit', component: EditSettingComponent },
  { path: 'edit/:id', component: EditSettingComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {

}
