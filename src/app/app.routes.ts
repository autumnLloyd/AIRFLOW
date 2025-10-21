import { Routes } from '@angular/router';
import { ManagerLoginComponent } from './login/manager-login-component';
import { TenantLoginComponent } from './login/tenant-login-component';
import { LaunchLoginComponent } from './login/launch-login-component';
import { ManagerDashboardComponent } from './dashboard/manager-dashboard.component';
import { TenantDashboardComponent } from './dashboard/tenant-dashboard-component';
import { managerGuard, tenantGuard } from './auth.guard';
import { PasskeyManagerComponent } from './manager/passkey.manager.component';

// Creates guarded routes between pages; This is the "route" object all the components reference
export const routes: Routes = [
    {path: '', redirectTo: 'login/launch', pathMatch: 'full'},

    // public login pages
    {path: 'login/manager', component: ManagerLoginComponent},
    {path: 'login/tenant', component: TenantLoginComponent},
    {path: 'login/launch', component: LaunchLoginComponent},

    // private dashboards
    {
    path: 'manager',
    canActivate: [managerGuard],
    children: [
      { path: 'dashboard', component: ManagerDashboardComponent },
      { path: 'passkeys', component: PasskeyManagerComponent },
      // (Future) { path: 'workorders', component: WorkOrderListComponent },
    ]
  },
    {
        path: 'tenant/dashboard',
        component: TenantDashboardComponent,
        canActivate: [tenantGuard],
    },

    // catchall redirect
    { path: "*", redirectTo: 'login/launch'}
];