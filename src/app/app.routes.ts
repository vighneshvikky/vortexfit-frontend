import { Routes } from '@angular/router';
import { landingRoutes } from './layouts/main-layout/main-layout.route';
import { authRoutes } from './pages/auth/auth.routing.module';

export const routes: Routes = [
    ...landingRoutes,
    ...authRoutes,
    {
        path: '**',
        redirectTo: '', // or a 404 component
      }
      
];
