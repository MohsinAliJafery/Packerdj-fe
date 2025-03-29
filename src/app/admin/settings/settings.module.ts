import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingListComponent } from './setting-list/setting-list.component';
import { EditSettingComponent } from './edit-setting/edit-setting.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SettingListComponent,
    EditSettingComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule {
  static routes: Routes | undefined;

}
