import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidateModule } from '../admin/candidate/candidate.module';
import { CoachesModule } from '../admin/coaches/coaches.module';
import { EmployerModule } from '../admin/employer/employer.module';
import { SkillAssessmentModule } from '../admin/skill-assessment/skill-assessment.module';
import { JobsModule } from '../admin/jobs/jobs.module';
import { PageNotFoundComponent } from '../admin/page-not-found/page-not-found.component';
import { TransactionsModule } from './transactions/transactions.module';
import { SettingsModule } from './settings/settings.module';
import { EmailModule } from './email/email.module';
import { JobCategoryModule } from './job-category/job-category.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { FaqsModule } from './faqs/faqs.module';
import { AboutPekerdjaModule } from './about-pekerdja/about-pekerdja.module';
import { CoachCategoriesModule } from './coach-categories/coach-categories.module';
import { CoachTypesModule } from './coach-types/coach-types.module';

const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'candidate', pathMatch: 'full' },
      {
        path: 'candidate',
        loadChildren: () =>
          import('./candidate/candidate.module').then((m) => m.CandidateModule),
        children: CandidateModule.routes,
      },
      {
        path: 'skillAssessment',
        loadChildren: () =>
          import('./skill-assessment/skill-assessment.module').then(
            (m) => m.SkillAssessmentModule
          ),
        children: SkillAssessmentModule.routes,
      },
      {
        path: 'employer',
        loadChildren: () =>
          import('./employer/employer.module').then((m) => m.EmployerModule),
        children: EmployerModule.routes,
      },
      {
        path: 'coaches',
        loadChildren: () =>
          import('./coaches/coaches.module').then((m) => m.CoachesModule),
        children: CoachesModule.routes,
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('./jobs/jobs.module').then((m) => m.JobsModule),
        children: JobsModule.routes,
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./transactions/transactions.module').then((m) => m.TransactionsModule),
        children: TransactionsModule.routes,
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
        children: SettingsModule.routes,
      },
      {
        path: 'email',
        loadChildren: () =>
          import('./email/email.module').then((m) => m.EmailModule),
        children: EmailModule.routes,
      },
      {
        path: 'jobcategory',
        loadChildren: () =>
          import('./job-category/job-category.module').then((m) => m.JobCategoryModule),
        children: JobCategoryModule.routes,
      },
      {
        path: 'testimonials',
        loadChildren: () =>
          import('./testimonials/testimonials.module').then((m) => m.TestimonialsModule),
        children: TestimonialsModule.routes,
      },
      {
        path: 'faqs',
        loadChildren: () =>
          import('./faqs/faqs.module').then((m) => m.FaqsModule),
        children: FaqsModule.routes,
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about-pekerdja/about-pekerdja.module').then((m) => m.AboutPekerdjaModule),
        children: AboutPekerdjaModule.routes,
      },
      {
        path: 'coachcategory',
        loadChildren: () =>
          import('./coach-categories/coach-categories.module').then((m) => m.CoachCategoriesModule),
        children: CoachCategoriesModule.routes,
      },
      {
        path: 'coachtype',
        loadChildren: () =>
          import('./coach-types/coach-types.module').then((m) => m.CoachTypesModule),
        children: CoachTypesModule.routes,
      },

    ],
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
