import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <-- Import ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApplianceService } from '../services/appliance.service';

@Component({
  selector: 'app-tenant-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tenant-dashboard.component.html'
})
export class TenantDashboardComponent implements OnInit {
  appliances: any[] = [];

  constructor(
    public auth: AuthService,
    private router: Router,
    private applianceService: ApplianceService,
    private cdr: ChangeDetectorRef // <-- Inject here
  ) {}

  async ngOnInit() {
    const tenantAddress = this.auth.tenant?.address;
    console.log('Tenant address:', tenantAddress);

    if (!tenantAddress) {
      console.warn('Tenant has no address — cannot load appliances.');
      return;
    }

    // Fetch all appliances where address == tenantAddress
    this.appliances = await this.applianceService.getAppliancesByAddress(tenantAddress);
    console.log('Appliances found:', this.appliances);

    this.cdr.detectChanges(); // <-- Tell Angular to update the view
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login/tenant']);
  }
}
