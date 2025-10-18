import { Routes } from '@angular/router';
import { ManagerLoginComponent } from './login/manager-login-component';
import { TenantLoginComponent } from './login/tenant-login-component';
import { ManagerDashboardComponent } from './dashboard/manager-dashboard-component';
import { TenantDashboardComponent } from './dashboard/tenant-dashboard-component';
import { managerGuard, tenantGuard } from './auth.guard';

// Creates guarded routes between pages; This is the "route" object all the components reference
export const routes: Routes = [
    {path: '', redirectTo: 'login/tenant', pathMatch: 'full'},

    // public login pages
    {path: 'login/manager', component: ManagerLoginComponent},
    {path: 'login/tenant', component: TenantLoginComponent},

    // private dashboards
    {
        path: 'manager/dashboard',
        component: ManagerDashboardComponent,
        canActivate: [managerGuard],
    },
    {
        path: 'tenant/dashboard',
        component: TenantDashboardComponent,
        canActivate: [tenantGuard],
    },

    // catchall redirect
    { path: "*", redirectTo: 'login/tenant'}
];