import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplianceService } from '../services/appliance.service';
import { AuthService } from '../auth.service';
import { PasskeyService } from '../services/passkey.service';

@Component({
    selector: 'app-appliance-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div style="max-width: 600px; margin: 40px auto;">
      <h2>Appliances for {{ address }}</h2>
      <ul>
        <li *ngFor="let a of appliances">
          <strong>{{ a.name }}</strong> — {{ a.model }}
        </li>
      </ul>
    </div> 
    `
})

export class ApplianceListComponent implements OnInit {
    appliances: any[] = [];
    address = '';

    constructor(private applianceService: ApplianceService, private auth: AuthService, private passkeyService: PasskeyService) {}
    async ngOnInit() {
        const passkey = this.auth.tenant?.passkey
        if (!passkey) return;
        const address = await this.passkeyService.getAddressFromPasskey(passkey)
        if (!address) return; // This shouldn't ever happen

        this.address = address;
        this.appliances = await this.applianceService.getAppliancesByAddress(this.address);
    }
}