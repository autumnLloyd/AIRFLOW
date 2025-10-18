// src/app/dashboard/tenant-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tenant-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="text-align:center; margin-top:50px;">
      <h2>Tenant Dashboard</h2>

      <!-- Display the tenant passkey as a simple session ID -->
      <p>Access granted with passkey: {{ auth.tenant?.passkey }}</p>

      <!-- Logout button -->
      <button (click)="logout()">Logout</button>
    </div>
  `
})
export class TenantDashboardComponent {
  constructor(public auth: AuthService, private router: Router) {}

  /**
   * Logs out the tenant and clears the local session.
   */
  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login/tenant']);
  }
}
