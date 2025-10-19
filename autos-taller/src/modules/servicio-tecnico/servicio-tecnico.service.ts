import { Injectable } from '@nestjs/common';
import { CreateServicioTecnicoDto } from './dto/create-servicio-tecnico.dto';
import { UpdateServicioTecnicoDto } from './dto/update-servicio-tecnico.dto';

@Injectable()
export class ServicioTecnicoService {
  create(createServicioTecnicoDto: CreateServicioTecnicoDto) {
    return 'This action adds a new servicioTecnico';
  }

  findAll() {
    return `This action returns all servicioTecnico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} servicioTecnico`;
  }

  update(id: number, updateServicioTecnicoDto: UpdateServicioTecnicoDto) {
    return `This action updates a #${id} servicioTecnico`;
  }

  remove(id: number) {
    return `This action removes a #${id} servicioTecnico`;
  }
}
