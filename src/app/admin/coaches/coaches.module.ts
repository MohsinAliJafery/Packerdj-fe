import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from "@angular/router";
import { CoachesRoutingModule } from './coaches-routing.module';
import { CreateCoachesComponent } from './create-coaches/create-coaches.component';
import { CoachesListComponent } from './coaches-list/coaches-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { UpdateCoachesComponent } from './update-coaches/update-coaches.component';
import { DetailCoachComponent } from './detail-coach/detail-coach.component';
import { BookingListComponent } from './booking-list/booking-list.component';



@NgModule({
  declarations: [
    CreateCoachesComponent,
    CoachesListComponent,
    UpdateCoachesComponent,
    DetailCoachComponent,
    BookingListComponent
  ],
  imports: [
    CommonModule,
    CoachesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    
  ]
})
export class CoachesModule {
  static routes: Routes | undefined;


}
