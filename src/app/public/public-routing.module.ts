import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachingComponent } from './coaching/coaching.component';
import { CoachingDetailsComponent } from './coaching-details/coaching-details.component';
import { HomeComponent } from './home/home.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { MenuComponent } from './menu/menu.component';
import { RemoteJobsComponent } from './remote-jobs/remote-jobs.component';
import { SkillAssessmentsComponent } from './skill-assessments/skill-assessments.component';
import { PublicDashboardComponent } from "./public-dashboard/public-dashboard.component";
import { CoachingResultsComponent } from './coaching-results/coaching-results.component';
import { UpdateProfileComponent } from "./update-profile/update-profile.component";
import { MyResumeComponent } from "./my-resume/my-resume.component";
import { SearchResultsComponent } from './search-results/search-results.component';
import { ListCandidateComponent } from './list-candidate/list-candidate.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { EmployerComponent } from './employer/employer.component';
import { ResourcesComponent } from './resources/resources.component';
import { UserProfileEmployerComponent } from './user-profile-employer/user-profile-employer.component';
import { PricingPageComponent } from './pricing-page/pricing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserGuard } from '../guards/user.guard';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';


const routes: Routes = [
  { path: '', redirectTo: 'public-dashboard', pathMatch: 'full' },

  {
    path: 'public-dashboard', component: PublicDashboardComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'coaching', component: CoachingComponent },
      { path: 'coaching-details', component: CoachingDetailsComponent },
      { path: 'coaching-results', component: CoachingResultsComponent },
      { path: 'home', component: HomeComponent },
      { path: 'job-detail', component: JobDetailComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'remote-jobs', component: RemoteJobsComponent },
      { path: 'skill-assesments', component: SkillAssessmentsComponent },
      { path: 'update-profile', component: UpdateProfileComponent, canActivate: [UserGuard] },
      { path: 'my-resume', component: MyResumeComponent, canActivate: [UserGuard] },
      { path: 'search-results', component: SearchResultsComponent },
      { path: 'list-candidate', component: ListCandidateComponent },
      { path: 'candidate-detail', component: CandidateDetailComponent },
      { path: 'employer', component: EmployerComponent },
      { path: 'resources', component: ResourcesComponent },
      { path: 'user-profile', component: UserProfileEmployerComponent, canActivate: [UserGuard] },
      { path: 'pricing-page', component: PricingPageComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'terms-of-use', component: TermsOfUseComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },

    ]
  },
  {
    path: '**', component: PageNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
