import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  sidebarOpen: boolean = true;
  activeMenuItem: string = 'dashboard';
  adminName: string = 'Admin User';
  adminEmail: string = 'admin@vortexfit.com';
  adminImage: string = 'https://randomuser.me/api/portraits/men/92.jpg';
  pendingVerifications: number = 3;
  unreadNotifications: number = 5;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // You can load admin data here
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onMenuItemSelected(menuItem: string): void {
    this.activeMenuItem = menuItem;
    // You can add navigation logic here if needed
  }

  onLogout(): void {
    try {
      this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error: unknown) {
      console.error('Logout error:', error);
    }
  }
} 