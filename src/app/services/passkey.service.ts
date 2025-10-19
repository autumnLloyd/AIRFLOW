/**
 * PassKey service handles firestore operations relating to passkeys.
 * In the passkey database, each document ID is the passkey and it has one field for the address
 * Example: /tenants/{passkey} = {address: "123 King Street"}
 */
import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, deleteDoc, getDocs, collection } from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})
export class PasskeyService {
    constructor(private firestore: Firestore) {}
    
    // Create or update a passkey
    async setPasskey(passkey: string, address:string): Promise<void> {
        const ref = doc(this.firestore, 'tenants', passkey)
        await setDoc(ref,{ address })
    }

    // delete passkey
    async deletePasskey(passkey: string): Promise<void> {
        const ref = doc(this.firestore, 'tenants', passkey);
        await deleteDoc(ref);
    }

    // Get all the documents in the database and map it to useable data
    async getAllPasskeys(): Promise<{passkey: string; address: string;}[]> {
        const snapshot = await getDocs(collection(this.firestore, 'tenants'));
        return snapshot.docs.map(doc => ({
            passkey: doc.id,
            address: doc.data()['address']
        }));
    }
}