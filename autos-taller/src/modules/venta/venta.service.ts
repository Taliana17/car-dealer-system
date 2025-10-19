import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from '../detalle-venta/entities/detalle-venta.entity';
import { Vehiculo } from '../vehiculo/entities/vehiculo.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Concesionario } from '../concesionario/entities/concesionario.entity';
import { Empleado } from '../empleado/entities/empleado.entity';
import { VehiculoEstado } from '../../enums/enums'; 
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta) private ventaRepo: Repository<Venta>,
    @InjectRepository(DetalleVenta) private detRepo: Repository<DetalleVenta>,
    @InjectRepository(Vehiculo) private vehRepo: Repository<Vehiculo>,
    @InjectRepository(Cliente) private cliRepo: Repository<Cliente>,
    @InjectRepository(Concesionario) private concRepo: Repository<Concesionario>,
    @InjectRepository(Empleado) private empRepo: Repository<Empleado>,
  ) {}

  async create(dto: CreateVentaDto) {
    const cliente = await this.cliRepo.findOneBy({ id: +dto.id_cliente });
    const concesionario = await this.concRepo.findOneBy({ id: +dto.id_concesionario });
    const empleado = await this.empRepo.findOneBy({ id: +dto.id_empleado });

    if (!cliente || !concesionario || !empleado) {
      throw new NotFoundException('FKs inválidas (cliente/consesionario/empleado)');
    }

    const detalles: DetalleVenta[] = [];
    for (const item of dto.detalles) {
      const veh = await this.vehRepo.findOne({ where: { id: +item.id_vehiculo } });
      if (!veh) throw new NotFoundException(`Vehículo ${item.id_vehiculo} no existe`);
      if (veh.estado !== VehiculoEstado.disponible) {
        throw new BadRequestException(`Vehículo ${item.id_vehiculo} no disponible`);
      }
      veh.estado = VehiculoEstado.vendido;
      await this.vehRepo.save(veh);

      detalles.push(this.detRepo.create({
        vehiculo: veh,
        precio_unitario: item.precio_unitario,
      }));
    }

    const venta = this.ventaRepo.create({
      numero_factura: dto.numero_factura,
      fecha_venta: dto.fecha_venta as unknown as Date,
      metodo_pago: dto.metodo_pago,
      descuento_porcentaje: dto.descuento_porcentaje ?? 0,
      impuestos: dto.impuestos ?? 0,
      notas: dto.notas,
      cliente,
      concesionario,
      empleado,
      detalles,
    });

    return this.ventaRepo.save(venta);
  }

  findAll() {
    return this.ventaRepo.find({
      relations: ['cliente', 'concesionario', 'empleado', 'detalles', 'detalles.vehiculo'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    const venta = await this.ventaRepo.findOne({
      where: { id },
      relations: ['cliente', 'concesionario', 'empleado', 'detalles', 'detalles.vehiculo'],
    });
    if (!venta) throw new NotFoundException(`Venta ${id} no existe`);
    return venta;
  }

  async update(id: number, dto: UpdateVentaDto) {
    const venta = await this.ventaRepo.findOne({ where: { id } });
    if (!venta) throw new NotFoundException(`Venta ${id} no existe`);

    if (dto.numero_factura) venta.numero_factura = dto.numero_factura;
    if (dto.fecha_venta) venta.fecha_venta = dto.fecha_venta as unknown as Date;
    if (dto.metodo_pago) venta.metodo_pago = dto.metodo_pago;
    if (dto.descuento_porcentaje != null) venta.descuento_porcentaje = dto.descuento_porcentaje;
    if (dto.impuestos != null) venta.impuestos = dto.impuestos;
    if (dto.notas != null) venta.notas = dto.notas;

    if (dto.id_cliente) {
      const c = await this.cliRepo.findOneBy({ id: +dto.id_cliente });
      if (!c) throw new BadRequestException('id_cliente inválido');
      venta.cliente = c;
    }
    if (dto.id_concesionario) {
      const cc = await this.concRepo.findOneBy({ id: +dto.id_concesionario });
      if (!cc) throw new BadRequestException('id_concesionario inválido');
      venta.concesionario = cc;
    }
    if (dto.id_empleado) {
      const e = await this.empRepo.findOneBy({ id: +dto.id_empleado });
      if (!e) throw new BadRequestException('id_empleado inválido');
      venta.empleado = e;
    }

    return this.ventaRepo.save(venta);
  }

  async remove(id: number) {
    const venta = await this.ventaRepo.findOne({
      where: { id },
      relations: ['detalles', 'detalles.vehiculo'],
    });
    if (!venta) throw new NotFoundException(`Venta ${id} no existe`);

    for (const det of venta.detalles ?? []) {
      if (det.vehiculo) {
        det.vehiculo.estado = VehiculoEstado.disponible;
        await this.vehRepo.save(det.vehiculo);
      }
    }

    await this.ventaRepo.remove(venta);
    return { message: `Venta ${id} eliminada` };
  }
}
