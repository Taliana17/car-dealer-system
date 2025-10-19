import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { ServicioTecnicoModule } from './modules/servicio-tecnico/servicio-tecnico.module';
import { DetalleVentaModule } from './modules/detalle-venta/detalle-venta.module';
import { VentaModule } from './modules/venta/venta.module';
import { VehiculoModule } from './modules/vehiculo/vehiculo.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { EmpleadoModule } from './modules/empleado/empleado.module';
import { ConcesionarioModule } from './modules/concesionario/concesionario.module';

@Module({
  imports: [
    AuthModule,
    VentaModule,
    DetalleVentaModule,
    VehiculoModule,
    ClienteModule,
    EmpleadoModule,
    ConcesionarioModule,
    ServicioTecnicoModule,
    // 1) .env disponible en toda la app
    ConfigModule.forRoot({ isGlobal: true }),

    // 2) Conexión a Postgres (ajusta según tu .env)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port:  5432,
      username: 'postgres',
      password: 'admin',
      database: 'autos_taller',
      autoLoadEntities: true, // carga todas las @Entity automáticamente
      synchronize: true,     // en producción: false (usa migraciones)
      // logging: true,       // opcional para ver queries
    }),

    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
