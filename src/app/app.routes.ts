import { Routes } from '@angular/router';
import { ManagerLoginComponent } from './login/manager-login-component';
import { TenantLoginComponent } from './login/tenant-login-component';
import { FailLoginComponent } from './login/fail-login.component';
import { LaunchLoginComponent } from './login/launch-login-component';
import { ManagerDashboardComponent } from './dashboard/manager-dashboard.component';
import { PropertyDashboardComponent } from './manager/property-dashboard.component';
import { TenantDashboardComponent } from './dashboard/tenant-dashboard-component';
import { managerGuard, tenantGuard } from './auth.guard';
import { PasskeyManagerComponent } from './manager/passkey.manager.component';
import { RegisterPropertyComponent } from './manager/register-property.component';


// Creates guarded routes between pages; This is the "route" object all the components reference
export const routes: Routes = [
    {path: '', redirectTo: 'login/launch', pathMatch: 'full'},

    // public login pages
    {path: 'login/manager', component: ManagerLoginComponent},
    {path: 'login/tenant', component: TenantLoginComponent},
    {path: 'login/launch', component: LaunchLoginComponent},
    {path: 'login/fail', component: FailLoginComponent},

    // private dashboards
    {
    path: 'manager',
    canActivate: [managerGuard],
    children: [
      { path: 'dashboard', component: ManagerDashboardComponent },
      { path: 'passkeys', component: PasskeyManagerComponent },
      { path: 'properties', component: PropertyDashboardComponent },
      { path: 'register property', component: RegisterPropertyComponent },
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