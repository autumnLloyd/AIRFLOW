/**
 * PassKey service where each document ID IS the passkey:
 * /Passkeys/{passkey} = { address: "123 King Street" }
 */
import { Injectable, NgZone } from '@angular/core';
import { 
  Firestore,
  doc,
  deleteDoc,
  getDocs,
  collection,
  getDoc,
  setDoc,
  query,
  where
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class PasskeyService {

  constructor(private firestore: Firestore, private zone: NgZone) {}

  // Create or replace passkey for an address
  async setPasskey(passkey: string, address: string) {

    const colRef = collection(this.firestore, 'Passkeys');

    // 1. Find existing passkey document for the same address
    const q = query(colRef, where('address', '==', address));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // There is an existing passkey for this address → DELETE IT
      const oldDoc = snapshot.docs[0];
      console.log("Replacing old passkey:", oldDoc.id);

      await deleteDoc(doc(this.firestore, 'Passkeys', oldDoc.id));
    }

    // 2. Create new document where ID = passkey
    console.log("Saving new passkey:", passkey);

    const docRef = doc(this.firestore, 'Passkeys', passkey);

    await setDoc(docRef, {
      address
    });

    return passkey;  // doc ID = passkey
  }

  async deletePasskey(passkey: string): Promise<void> {
    const ref = doc(this.firestore, 'Passkeys', passkey);
    await deleteDoc(ref);
  }

  async getAllPasskeys(): Promise<{ passkey: string; address: string }[]> {
    const snapshot = await getDocs(collection(this.firestore, 'Passkeys'));

    const map = snapshot.docs.map(doc => ({
      passkey: doc.id,             // document ID IS the passkey
      address: doc.data()['address']
    }));

    return this.zone.run(() => map);
  }

  async getAddressFromPasskey(passkey: string): Promise<string | void> {
    const docRef = doc(this.firestore, 'Passkeys', passkey);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return;
    return snapshot.data()['address'];
  }
}
