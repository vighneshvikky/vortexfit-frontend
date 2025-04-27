import { Routes } from '@angular/router';
import { landingRoutes } from './layouts/main-layout/main-layout.route';
import { authRoutes } from './pages/auth/auth.routing.module';
import { adminRoutes } from './pages/admin/admin.routes';

export const routes: Routes = [
    ...landingRoutes,
    ...authRoutes,
    ...adminRoutes,
    {
        path: '**',
        redirectTo: '', 
      }
      
];
