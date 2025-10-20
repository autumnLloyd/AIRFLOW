import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-manager-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl:"./manager-dashboard.component.html",
})

export class ManagerDashboardComponent {
    constructor(public auth: AuthService, private router: Router) {}

    async logout (){
        await this.auth.logout();
        this.router.navigate(['/login/manager'])
    }
}