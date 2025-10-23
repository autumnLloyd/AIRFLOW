import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  DocumentData,
  CollectionReference,
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ApplianceService {
  constructor(private firestore: Firestore) {}

  async deleteAppliance(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'Appliances', id);
    await deleteDoc(docRef);
  }

  async createAppliance(appliance: any) {
    try {
      const colRef = collection(this.firestore, 'Appliances');
      const docRef = await addDoc(colRef, appliance);
      console.log('Appliance created with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding appliance:', error);
      throw error;
    }
  }

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
