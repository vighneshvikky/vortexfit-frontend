import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { OtpComponent } from './otp/otp.component';
import { routes } from '../../app.routes';
import { LoginComponent } from './login/login.component';

export const authRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'verifyOtp', component: OtpComponent },
  { path: 'login', component: LoginComponent },
];
