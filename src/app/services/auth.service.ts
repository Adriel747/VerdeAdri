import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getApps, initializeApp, getApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

const app = getApps().length === 0 ? initializeApp(environment.firebaseConfig) : getApp();
const auth = getAuth(app);

@Injectable({ providedIn: 'root' })
export class AuthService {

  private usuarioActual = new BehaviorSubject<User | null>(null);
  usuario$ = this.usuarioActual.asObservable();

  constructor() {
    onAuthStateChanged(auth, user => {
      this.usuarioActual.next(user);
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  logout() {
    return signOut(auth);
  }

  get usuarioLogueado(): User | null {
    return this.usuarioActual.value;
  }
}