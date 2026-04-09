import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

const API = 'http://localhost:8080/api';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private http = inject(HttpClient);

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${API}/productos`);
  }

  getDisponibles(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${API}/productos/disponibles`);
  }

  addProducto(p: Producto): Promise<any> {
    return this.http.post(`${API}/productos`, p).toPromise();
  }

  updateProducto(id: number, p: Partial<Producto>): Promise<any> {
    return this.http.put(`${API}/productos/${id}`, p).toPromise();
  }

  deleteProducto(id: number): Promise<any> {
    return this.http.delete(`${API}/productos/${id}`).toPromise();
  }
}
