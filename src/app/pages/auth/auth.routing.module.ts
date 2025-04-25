import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { OtpComponent } from './otp/otp.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from '../user/user-dashboard/user-dashboard.component';
import { TrainerDashboardComponent } from '../trainer/trainer-dashboard/trainer-dashboard.component';

export const authRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'verifyOtp', component: OtpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'trainer-dashboard', component: TrainerDashboardComponent },
];
