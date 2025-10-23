import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { WorkOrderService } from '../services/workorder.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-manager-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
    <div>
      <h1>Work Orders</h1>

      <form (ngSubmit)="addWorkOrder()">
        <h2>File WorkOrder</h2>
        <input type="text" placeholder="ApplianceID" [(ngModel)]="newWorkOrder.applianceID" name="applianceID" required />
        <input type="text" placeholder="Notes" [(ngModel)]="newWorkOrder.notes" name="model" required />
        <button type="submit">File WorkOrder</button>
      </form>


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
    <div class="table-cell">{{ w.id }}</div>
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

    newWorkOrder = {
    applianceID: '',
    created: '',
    notes: '',
    status:'',
    updated:'',
    
  };

    constructor(
        public auth: AuthService,
        private router: Router,
        private workOrderService: WorkOrderService,
        private cdr: ChangeDetectorRef
    ) { }

    async ngOnInit() {
        this.workorders = await this.workOrderService.getAllWorkOrders();
        this.cdr.detectChanges();
    }

    async addWorkOrder() {
    try {
      const id = await this.workOrderService.createWorkOrder(this.newWorkOrder);
      console.log('Appliance added with ID:', id);

      // Refresh all workorders (manager view)
      this.workorders = await this.workOrderService.getAllWorkOrders();
      

      // Clear form after adding
      this.newWorkOrder = {
        applianceID: '',
        created: '',
        notes: '',
        status:'',
        updated:'',
      };

      this.cdr.detectChanges(); // Trigger UI update
    } catch (error) {
      console.error('Failed to add appliance:', error);
    }
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