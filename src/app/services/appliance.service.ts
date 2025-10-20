/**
 * Handles reading appliances tied to an address
 * Tenants can only see appliances with address = tenant's address
 */
import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, deleteDoc, getDocs, collection, query, where } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ApplianceService {
  constructor(private firestore: Firestore) {}

  async getAppliancesByAddress(address: string) {
    const q = query(collection(this.firestore, 'appliances'), where('address', '==', address));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}