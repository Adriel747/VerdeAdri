import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const API = 'http://localhost:8080/api';

export interface UsuarioSesion {
  email: string;
  rol: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = new HttpClient(null as any);
  private sesion = new BehaviorSubject<UsuarioSesion | null>(this.cargarSesion());

  sesion$ = this.sesion.asObservable();

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  async login(email: string, password: string): Promise<UsuarioSesion> {
    const response = await this.http
      .post<any>(`${API}/auth/login`, { email, password })
      .toPromise();
    const sesion: UsuarioSesion = { email: response.email, rol: response.rol };
    localStorage.setItem('sesion', JSON.stringify(sesion));
    this.sesion.next(sesion);
    return sesion;
  }

  logout() {
    localStorage.removeItem('sesion');
    this.sesion.next(null);
  }

  get usuarioLogueado(): UsuarioSesion | null {
    return this.sesion.value;
  }

  get rol(): string | null {
    return this.sesion.value?.rol ?? null;
  }

  estaLogueado(): boolean {
    return this.sesion.value !== null;
  }

  private cargarSesion(): UsuarioSesion | null {
    try {
      const data = localStorage.getItem('sesion');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
}
