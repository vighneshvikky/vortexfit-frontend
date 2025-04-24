import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

export const landingRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./main-layout.component').then((m) => m.MainLayoutComponent),
    pathMatch: 'full',
  },
];
