import { Routes } from '@angular/router';

export const roleRoutes: Routes = [
  {
    path: 'role-select',
    loadComponent: (() => import('./role-select.component').then((m) => m.RoleSelectComponent)),
  },
  {
    path: 'signup/:role',
    loadComponent: (() => import('../auth/signup/signup.component').then((m) => m.SignupComponent))
  }
];
