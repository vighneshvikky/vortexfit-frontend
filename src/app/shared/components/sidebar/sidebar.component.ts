import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() sidebarOpen: boolean = true;
  @Input() activeMenuItem: string = 'dashboard';
  @Input() adminName: string = 'Admin User';
  @Input() adminEmail: string = 'admin@vortexfit.com';
  @Input() adminImage: string = 'https://randomuser.me/api/portraits/men/92.jpg';
  @Input() pendingVerifications: number = 0;
  @Input() unreadNotifications: number = 0;
  
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  @Output() menuItemSelected = new EventEmitter<string>();
  @Output() logoutEvent = new EventEmitter<void>();

  toggleSidebar(): void {
    this.toggleSidebarEvent.emit();
  }

  setActiveMenuItem(menuItem: string): void {
    this.menuItemSelected.emit(menuItem);
  }

  logout(): void {
    this.logoutEvent.emit();
  }
} 