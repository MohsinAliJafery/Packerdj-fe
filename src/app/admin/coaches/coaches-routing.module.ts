import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachesListComponent } from './coaches-list/coaches-list.component';
import { CreateCoachesComponent } from './create-coaches/create-coaches.component';
import { UpdateCoachesComponent } from './update-coaches/update-coaches.component';
import { DetailCoachComponent } from './detail-coach/detail-coach.component';
import { BookingListComponent } from './booking-list/booking-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'coaches-list', pathMatch: 'full' },

  { path: 'coaches-list', component: CoachesListComponent },

  { path: 'create', component: CreateCoachesComponent },
  { path: ':create/:id', component: CreateCoachesComponent },

  { path: 'detail', component: DetailCoachComponent },
  { path: ':detail/:coach_id', component: DetailCoachComponent },

  { path: 'bookings', component: BookingListComponent },
  { path: ':bookings/:coachid', component: BookingListComponent },

  { path: 'edit', component: UpdateCoachesComponent },
  { path: ':edit/:id', component: UpdateCoachesComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachesRoutingModule {

}
