import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-role-select',
  imports: [],
  templateUrl: './role-select.component.html',
  styleUrl: './role-select.component.scss',
})
export class RoleSelectComponent {
  constructor(private router: Router) {}

  selectRole(role: 'user' | 'trainer') {
    console.log('role', role)
    this.router.navigate(['/signup', role]);
  }
}
