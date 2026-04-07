import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateProductoDto, UpdateProductoDto } from './dto/producto.dto';

@Injectable()
export class ProductosService {
  private collection = 'productos';

  constructor(private firebase: FirebaseService) {}

  async getAll() {
    const snap = await this.firebase.getFirestore()
      .collection(this.collection).get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  async getOne(id: string) {
    const doc = await this.firebase.getFirestore()
      .collection(this.collection).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  async create(dto: CreateProductoDto) {
    const ref = await this.firebase.getFirestore()
      .collection(this.collection).add({
        ...dto,
        creadoEn: new Date().toISOString()
      });
    await this.addLog('CREAR', ref.id, dto.nombre, dto);
    return { id: ref.id, ...dto };
  }

  async update(id: string, dto: UpdateProductoDto, original: any) {
    await this.firebase.getFirestore()
      .collection(this.collection).doc(id).update({ ...dto });

    const cambios: any = {};
    const anteriores: any = {};
    for (const key of Object.keys(dto)) {
      if (dto[key] !== original[key]) {
        cambios[key] = dto[key];
        anteriores[key] = original[key];
      }
    }
    await this.addLog('EDITAR', id, dto.nombre ?? id, { cambios, anteriores });
    return { id, ...dto };
  }

  async delete(id: string, nombre: string) {
    const doc = await this.getOne(id);
    await this.firebase.getFirestore()
      .collection(this.collection).doc(id).delete();
    await this.addLog('ELIMINAR', id, nombre, doc);
    return { eliminado: true, id };
  }

  private async addLog(accion: string, id: string, nombre: string, snapshot: any) {
    await this.firebase.getFirestore().collection('logs').add({
      accion,
      id_producto: id,
      nombre_producto: nombre,
      snapshot,
      fecha: new Date().toISOString(),
    });
  }
}
