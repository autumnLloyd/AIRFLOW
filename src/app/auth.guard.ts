// This file guards routes and will redirect to the login page if 
// a page is accessed without credentials

import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const managerGuard = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    // Check with auth.service to see if we're authorized as a manager
    if (auth.manager) return true;

    // Get the hell outta here!!
    router.navigate(['/login/manager']);
    return false;
};

export const tenantGuard = () => {
    const auth = inject(AuthService);
    const router = inject(Router)

    // Check with auth to see if we have a tenant session going
    if (auth.tenant) return true;

    router.navigate(['/login/tenant']);
    return false;
}