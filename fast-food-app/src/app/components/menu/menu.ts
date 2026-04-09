import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
})
export class MenuComponent implements OnInit {
  private svc = inject(ProductoService);
  private router = inject(Router);

  productos: Producto[] = [];
  categoriaActiva = 'Todas';

  get categorias(): string[] {
    const cats = this.productos.map((p) => p.categoria);
    return ['Todas', ...new Set(cats)];
  }

  get productosFiltrados(): Producto[] {
    if (this.categoriaActiva === 'Todas') return this.productos;
    return this.productos.filter((p) => p.categoria === this.categoriaActiva);
  }

  get totalDisponibles(): number {
    return this.productos.length;
  }

  ngOnInit() {
    this.svc.getDisponibles().subscribe((data) => (this.productos = data));
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

  getEmojiCategoria(categoria: string): string {
    const emojis: { [key: string]: string } = {
      hamburguesa: '🍔',
      hamburguesas: '🍔',
      pizza: '🍕',
      ensalada: '🥗',
      ensaladas: '🥗',
      bebida: '🥤',
      bebidas: '🥤',
      postre: '🍰',
      postres: '🍰',
      bowl: '🥙',
      bowls: '🥙',
      snack: '🍟',
      snacks: '🍟',
    };
    return emojis[categoria?.toLowerCase()] ?? '🍽️';
  }

  getColorCategoria(categoria: string): string {
    const colores: { [key: string]: string } = {
      hamburguesa: '#fff3e0',
      hamburguesas: '#fff3e0',
      pizza: '#fce4ec',
      ensalada: '#e8f5e9',
      ensaladas: '#e8f5e9',
      bebida: '#e3f2fd',
      bebidas: '#e3f2fd',
      postre: '#f3e5f5',
      postres: '#f3e5f5',
      bowl: '#e1f5ee',
      bowls: '#e1f5ee',
      snack: '#fff3e0',
      snacks: '#fff3e0',
    };
    return colores[categoria?.toLowerCase()] ?? '#f0f7f0';
  }
}
