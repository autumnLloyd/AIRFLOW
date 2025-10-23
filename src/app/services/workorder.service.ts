import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class WorkOrderService {
  private workordersRef: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.workordersRef = collection(this.firestore, 'WorkOrders');
  }

  /** Get all active work orders (optionally ordered by creation date) */
  async getActiveWorkOrders(): Promise<any[]> {
    const q = query(this.workordersRef, orderBy('created', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  /** Delete a work order by its document ID */
  async deleteWorkOrder(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'workorders', id);
    await deleteDoc(docRef);
  }

  /** Example: Get work orders by address (requires address field to be indexed) */
  async getWorkOrdersByAddress(address: string): Promise<any[]> {
    const q = query(this.workordersRef, where('address', '==', address));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}
