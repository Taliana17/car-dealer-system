import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConcesionarioModule } from './modules/concesionario/concesionario.module';
import { AuthModule } from './auth/auth.module';
import { ServicioTecnicoModule } from './modules/servicio-tecnico/servicio-tecnico.module';
import { DetalleVentaModule } from './modules/detalle-venta/detalle-venta.module';
import { VentaModule } from './modules/venta/venta.module';
import { VehiculoModule } from './modules/vehiculo/vehiculo.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { EmpleadoModule } from './modules/empleado/empleado.module';
import { ConcesionarioModule } from './modules/concesionario/concesionario.module';

@Module({
  imports: [ConcesionarioModule, EmpleadoModule, ClienteModule, VehiculoModule, VentaModule, DetalleVentaModule, ServicioTecnicoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
