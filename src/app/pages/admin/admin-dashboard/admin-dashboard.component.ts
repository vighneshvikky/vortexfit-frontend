import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{
  users: any[] = [];
 constructor(private adminService: AdminService){}

 ngOnInit() {
  this.adminService.getUsers().subscribe({
    next: (users) => {
      this.users = users;
      console.log(this.users);
    },
    error: (err) => {
      console.error('Error:', err);
    }
  });
}



toggleBlock(user: any) {
  const newStatus = !user.isBlocked;
  this.adminService.updateUserStatus(user._id, newStatus).subscribe({
    next: (updatedUser) => {
      
      user.isBlocked = newStatus;
    },
    error: (err) => {
      console.error('Error updating user status:', err);
    
    }
  });
}





}
