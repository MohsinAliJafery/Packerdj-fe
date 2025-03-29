import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { PublicGuard } from './guards/public.guard';



const routes: Routes = [

  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },

  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard],
  },

  {
    path: 'auth',
    loadChildren: () => import('./Jobseeker/auth/auth.module').then(m => m.AuthModule),
    canActivate: [PublicGuard],

  },

  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
