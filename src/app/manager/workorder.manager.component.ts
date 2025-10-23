import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { WorkOrderService } from '../services/workorder.service';

@Component({
    selector: 'app-manager-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div>
      <h1>Work Orders</h1>
      </div>
      <div class = 'work-order-side-panel'>
        <h2>All Work Orders </h2>
        <ul *ngIf="workorders.length">
  <li>
    <div class="table-cell"><strong>Appliance</strong></div>
    <div class="table-cell"><strong>Notes</strong></div>
    <div class="table-cell"><strong>Status</strong></div>
    <div class="table-cell"><strong>Actions</strong></div>
  </li>

  <li *ngFor="let w of workorders" style="margin-top:10px;">
    <div class="table-cell">{{ w.applianceId }}</div>
    <div class="table-cell">{{ w.notes }}</div>
    <div class="table-cell">
      {{ getStatusText(w.status) }}
    </div>
    <div class="table-cell">
      <button (click)="delete(w.id)">Delete</button>
    </div>
  </li>
</ul>
</div>

  `
})

export class WorkOrderManagerComponent implements OnInit {
    workorders: any[] = [];

    constructor(
        public auth: AuthService,
        private router: Router,
        private workOrderService: WorkOrderService,
        private cdr: ChangeDetectorRef
    ) { }

    async ngOnInit() {
        this.workorders = await this.workOrderService.getActiveWorkOrders();
        this.cdr.detectChanges();
    }

    async delete(id: string) {
        await this.workOrderService.deleteWorkOrder(id);
        this.workorders = await this.workOrderService.getActiveWorkOrders();
        this.cdr.detectChanges();
    }

    async logout() {
        await this.auth.logout();
        this.router.navigate(['/login/manager']);
    }

    getStatusText(status: number): string {
        switch (status) {
            case 0: return 'New';
            case 1: return 'In Progress';
            case 2: return 'Completed';
            default: return 'Unknown';
        }
    }
}