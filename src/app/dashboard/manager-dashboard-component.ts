import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-manager-dashboard',
    standalone: true, // This means alll the HTML is included in here rather than being a separate file
    imports: [CommonModule],
    template: `
    <div style="text-align:center; margin-top:50px;">
      <h2>Manager Dashboard</h2>

      <!-- Show current manager email -->
      <p>Welcome, {{ auth.manager?.email }}</p>

      <!-- Logout button -->
      <button (click)="logout()">Logout</button>
    </div>
    `
})

export class ManagerDashboardComponent {
    constructor(public auth: AuthService, private router: Router) {}

    async logout (){
        await this.auth.logout();
        this.router.navigate(['/login/manager'])
    }
}