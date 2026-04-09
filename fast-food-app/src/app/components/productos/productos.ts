import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/auth.service';
import { Producto } from '../../models/producto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
})
export class ProductosComponent implements OnInit {
  private svc = inject(ProductoService);
  private authSvc = inject(AuthService);
  private router = inject(Router);

  productos: Producto[] = [];
  editando: Producto | null = null;
  mostrarFormulario = false;
  form: Producto = this.formVacio();

  get productosDisponibles() {
    return this.productos.filter((p) => p.disponible).length;
  }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.svc.getProductos().subscribe((data) => (this.productos = data));
  }

  formVacio(): Producto {
    return { nombre: '', descripcion: '', precio: 0, categoria: '', disponible: true };
  }

  async guardar() {
    if (this.editando?.id) {
      await this.svc.updateProducto(this.editando.id, this.form);
    } else {
      await this.svc.addProducto({ ...this.form });
    }
    this.cancelar();
    this.mostrarFormulario = false;
    this.cargarProductos();
  }

  editarProducto(p: Producto) {
    this.editando = p;
    this.form = { ...p };
    this.mostrarFormulario = true;
  }

  async eliminar(p: Producto) {
    if (confirm('¿Eliminar producto?')) {
      await this.svc.deleteProducto(p.id!);
      this.cargarProductos();
    }
  }

  cancelar() {
    this.editando = null;
    this.form = this.formVacio();
  }
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) this.cancelar();
  }

  editar(p: Producto) {
    this.editarProducto(p);
  }

  async logout() {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }
}
