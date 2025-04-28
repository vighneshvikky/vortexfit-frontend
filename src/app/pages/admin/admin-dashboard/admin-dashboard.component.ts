import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../admin.service';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
  profileImage?: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  allUsers: User[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  get activeUsers(): User[] {
    return this.allUsers.filter(user => !user.isBlocked);
  }

  get blockedUsers(): User[] {
    return this.allUsers.filter(user => user.isBlocked);
  }

  get trainers(): User[] {
    return this.allUsers.filter(user => user.role === 'trainer');
  }

  loadUsers(): void {
    this.isLoading = true;
    this.error = null;
    this.adminService.getUsers().subscribe({
      next: (response) => {
        this.allUsers = [
          ...(response.users || []).map(user => this.mapUserToInterface(user)),
          ...(response.trainers || []).map(user => this.mapUserToInterface(user))
        ];
        console.log('Loaded users:', this.allUsers);
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.error = 'Failed to load users. Please try again later.';
        this.isLoading = false;
        console.error('Error loading users:', err);
      }
    });
  }

  mapUserToInterface(user: any): User {
    console.log('Mapping user:', user);
    
    return {
      id: user._id || user.id || '',
      name: user.name || '',
      email: user.email || '',
      role: user.role || '',
      isBlocked: user.isBlocked || false,
      profileImage: user.profileImage
    };
  }

  toggleBlock(user: User): void {
    console.log('Toggling block for user:', user);
    
    if (!user.id) {
      this.error = 'Cannot update user: User ID is missing';
      console.error('User ID is missing:', user);
      return;
    }
    
    this.adminService.updateUserStatus(user.id, !user.isBlocked, user.role).subscribe({
      next: () => {
        const index = this.allUsers.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.allUsers[index] = { ...user, isBlocked: !user.isBlocked };
        }
      },
      error: (err: Error) => {
        this.error = 'Failed to update user status. Please try again later.';
        console.error('Error updating user status:', err);
      }
    });
  }
}
