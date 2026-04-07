import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [FirebaseModule, ProductosModule],
})
export class AppModule {}
