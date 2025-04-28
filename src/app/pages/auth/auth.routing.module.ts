import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { OtpComponent } from './otp/otp.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from '../user/user-dashboard/user-dashboard.component';
import { TrainerDetailsComponent } from '../trainer/trainer-details/trainer-details.component';

export const authRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'verifyOtp', component: OtpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'trainer-details/:id', component: TrainerDetailsComponent },
];
