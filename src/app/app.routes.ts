import { Routes } from '@angular/router';
import { landingRoutes } from './layouts/main-layout/main-layout.route';
import { roleRoutes } from './pages/role-select/role-select.routes';

export const routes: Routes = [
    ...landingRoutes,
    ...roleRoutes,
];
