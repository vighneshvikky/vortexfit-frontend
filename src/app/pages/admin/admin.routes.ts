import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

export const adminRoutes: Routes = [
  { path: 'adminLogin', component: AdminLoginComponent },
  { 
    path: '', 
    component: AdminLayoutComponent,
    children: [
      { path: 'adminDashboard', component: AdminDashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // Add other admin routes here
    ]
  },
];
