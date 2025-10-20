/**
 * PassKey service handles firestore operations relating to passkeys.
 * In the passkey database, each document ID is the passkey and it has one field for the address
 * Example: /tenants/{passkey} = {address: "123 King Street"}
 */
import { Injectable, NgZone } from '@angular/core';
import { Firestore, doc, setDoc, deleteDoc, getDocs, collection, getDoc } from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})
export class PasskeyService {
    constructor(private firestore: Firestore, private zone: NgZone) {}
    
    // Create or update a passkey
    async setPasskey(passkey: string, address:string): Promise<void> {
        const ref = doc(this.firestore, 'Passkeys', passkey)
        await setDoc(ref,{ address })
    }

    // delete passkey
    async deletePasskey(passkey: string): Promise<void> {
        const ref = doc(this.firestore, 'Passkeys', passkey);
        await deleteDoc(ref);
    }

    // Get all the documents in the database and map it to useable data
    async getAllPasskeys(): Promise<{passkey: string; address: string;}[]> {
        const snapshot = await getDocs(collection(this.firestore, 'Passkeys'));
        const map = snapshot.docs.map(doc => ({
            passkey: doc.id,
            address: doc.data()['address']
        }));
        return this.zone.run(() => map);
    }

    async getAddressFromPasskey(passkey:string): Promise<string | void> {
        const docRef = doc(this.firestore, 'Passkeys', passkey);
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()) return;
        return snapshot.data()['address']
    }
}