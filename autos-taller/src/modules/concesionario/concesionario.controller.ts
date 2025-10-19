import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConcesionarioService } from './concesionario.service';
import { CreateConcesionarioDto } from './dto/create-concesionario.dto';
import { UpdateConcesionarioDto } from './dto/update-concesionario.dto';

@Controller('concesionario')
export class ConcesionarioController {
  constructor(private readonly concesionarioService: ConcesionarioService) {}

  @Post()
  create(@Body() createConcesionarioDto: CreateConcesionarioDto) {
    return this.concesionarioService.create(createConcesionarioDto);
  }

  @Get()
  findAll() {
    return this.concesionarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concesionarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConcesionarioDto: UpdateConcesionarioDto) {
    return this.concesionarioService.update(+id, updateConcesionarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.concesionarioService.remove(+id);
  }
}
