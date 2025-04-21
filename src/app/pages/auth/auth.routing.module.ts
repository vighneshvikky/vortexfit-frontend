import { Routes } from '@angular/router';
import { RoleSelectComponent } from '../role-select/role-select.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'role-select', component: RoleSelectComponent },
  { path: 'signup/:role', component: SignupComponent },
  { path: 'login/:role', component: LoginComponent },
];
