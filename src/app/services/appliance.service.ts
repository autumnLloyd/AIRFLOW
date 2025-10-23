import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  orderBy
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ApplianceService {
  constructor(private firestore: Firestore) {}

  async getAllAppliances() {
  const snapshot = await getDocs(collection(this.firestore, 'Appliances'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

  async getAppliancesByAddress(address: string) {
    console.log('Fetching appliances for address:', address);

    const q = query(
      collection(this.firestore, 'Appliances'),
      where('address', '==', address),
    );

    const snapshot = await getDocs(q);
    console.log('Found', snapshot.size, 'Appliances');

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}
