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
  tenantSession: { passkey: string; address?: string; email?: string } | null = null;

  constructor(private auth: Auth, private firestore: Firestore) {}

  async loginManager(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginTenant(passkey: string): Promise<boolean> {
    const docRef = doc(this.firestore, 'Passkeys', passkey);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      this.tenantSession = {
        passkey,
        address: data['address'],
      };
      return true;
    }

    return false;
  }

  async logout(): Promise<void> {
    this.tenantSession = null;
    await signOut(this.auth);
  }

  get manager() {
    return this.auth.currentUser;
  }

  get tenant() {
    return this.tenantSession;
  }

  get isLoggedIn() {
    return !!this.manager || !!this.tenant;
  }
}
