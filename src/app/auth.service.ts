// This file handles the interfacing between the app and firebase,
// particularly the tenant/manager login stuff
import { Injectable } from '@angular/core';
import {
    Auth,
    signInWithEmailAndPassword,
    signOut,
    UserCredential
} from '@angular/fire/auth';
import {
    Firestore,
    doc,
    getDoc
} from '@angular/fire/firestore';


@Injectable({ providedIn: 'root' })
export class AuthService {
    // Since tenants don't use the built in firestore login, keep their key in memory
    tenantSession: { passkey: string } | null = null;

    constructor(private auth: Auth, private firestore: Firestore) { }

    //Log in manager via Firebase Auth
    async loginManager(email: string, password: string): Promise<UserCredential> {
        return await signInWithEmailAndPassword(this.auth, email, password);
    }

    // Log in tenant by checking if a documment with the provided passkey exists
    async loginTenant(passkey: string): Promise<boolean> {
        // this.firestore here is the database we're checking;
        // we only have a free "Default" one for now
        const docRef = doc(this.firestore, 'Passkeys', passkey);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            this.tenantSession = { passkey }
            return true;
        }
        return false;
    }
    // Log out of both tenant and manager sessions
    // For tenants, we clear the key out of memory
    // For managers, we sign out of firebase 
    async logout(): Promise<void> {
        this.tenantSession = null;
        await signOut(this.auth);
    }

    get manager() {
        return this.auth.currentUser;
    }

    get tenant () {
        return this.tenantSession;
    }
    // Double exclamation marks say to treat it's existance as a boolean
    get isLoggedIn() {
        return !! this.manager || !! this.tenant;
    }
}
