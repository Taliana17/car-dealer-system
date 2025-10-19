import { Injectable } from '@nestjs/common';
import { CreateConcesionarioDto } from './dto/create-concesionario.dto';
import { UpdateConcesionarioDto } from './dto/update-concesionario.dto';

@Injectable()
export class ConcesionarioService {
  create(createConcesionarioDto: CreateConcesionarioDto) {
    return 'This action adds a new concesionario';
  }

  findAll() {
    return `This action returns all concesionario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} concesionario`;
  }

  update(id: number, updateConcesionarioDto: UpdateConcesionarioDto) {
    return `This action updates a #${id} concesionario`;
  }

  remove(id: number) {
    return `This action removes a #${id} concesionario`;
  }
}
