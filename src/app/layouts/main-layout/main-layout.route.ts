import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

export const landingRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./main-layout.component').then((m) => m.MainLayoutComponent),
  },
  {
    path: 'role-select',
    loadComponent: () =>
      import('../../pages/role-select/role-select.component').then(
        (m) => m.RoleSelectComponent
      ),
  },
];
