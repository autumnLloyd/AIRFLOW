import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'fail-login-component',
    standalone: true,
    imports: [CommonModule],
    templateUrl:"./fail-login.component.html",
})

/*
disregard below.
*/
export class FailLoginComponent {
    constructor(public auth: AuthService, private router: Router) {}

}