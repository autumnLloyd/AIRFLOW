import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-tenant-login',
    standalone: true,
    imports: [CommonModule,FormsModule],
    templateUrl: "./tenant-login-component.html",
})

export class TenantLoginComponent {
    // Tenant passkey input
    passkey = '';
    errorMessage = '';

    constructor(private auth: AuthService, private router:Router) {}

    async login() {
        const success = await this.auth.loginTenant(this.passkey);

        if (success) {
            this.router.navigate(['/tenant/dashboard'])
        } else {
            this.errorMessage = 'Invalid Passkey';
        }
    }
}