// This file handles the scripting for the manager-login component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-manager-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-login.component.html'
})

export class ManagerLoginComponent { 
    // State for the form
    email = '';
    password = '';
    errorMessage = '';

    constructor(private auth: AuthService, private router: Router) {}

    async login() {
        try {
            await this.auth.loginManager(this.email,this.password);
            this.router.navigate(['/manager/dashboard'])
        } catch (error: any){
            this.errorMessage = error.message;
        }
    }
}