import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { RemoteJobsComponent } from './remote-jobs/remote-jobs.component';
import { CoachingComponent } from './coaching/coaching.component';
import { CoachingResultsComponent } from './coaching-results/coaching-results.component';
import { CoachingDetailsComponent } from './coaching-details/coaching-details.component';
import { SkillAssessmentsComponent } from './skill-assessments/skill-assessments.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PublicDashboardComponent } from './public-dashboard/public-dashboard.component';
import { PublicRoutingModule } from './public-routing.module';
import { FooterDashComponent } from './footer-dash/footer-dash.component';
import { AngularMaterialModule } from '../Material.module';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { MyResumeComponent } from './my-resume/my-resume.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ListCandidateComponent } from './list-candidate/list-candidate.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { EmployerComponent } from './employer/employer.component';
import { ResourcesComponent } from './resources/resources.component';
import { UserProfileEmployerComponent } from './user-profile-employer/user-profile-employer.component';
import { PricingPageComponent } from './pricing-page/pricing-page.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewestJobsComponent } from './newest-jobs/newest-jobs.component';
import { PaypalComponent } from './paypal/paypal.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
// import { authInterceptorProviders } from '../services/auth-interceptor.service';


@NgModule({
  declarations: [
    HomeComponent,
    JobDetailComponent,
    RemoteJobsComponent,
    CoachingComponent,
    CoachingResultsComponent,
    CoachingDetailsComponent,
    SkillAssessmentsComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    PublicDashboardComponent,
    FooterDashComponent,
    UpdateProfileComponent,
    MyResumeComponent,
    SearchResultsComponent,
    ListCandidateComponent,
    CandidateDetailComponent,
    EmployerComponent,
    ResourcesComponent,
    UserProfileEmployerComponent,
    PricingPageComponent,
    PageNotFoundComponent,
    NewestJobsComponent,
    PaypalComponent,
    ContactUsComponent,
    AboutUsComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule
  ],
  // providers: [authInterceptorProviders]

})
export class PublicModule { }
