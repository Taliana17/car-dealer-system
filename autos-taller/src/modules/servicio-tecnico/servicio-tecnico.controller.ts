import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicioTecnicoService } from './servicio-tecnico.service';
import { CreateServicioTecnicoDto } from './dto/create-servicio-tecnico.dto';
import { UpdateServicioTecnicoDto } from './dto/update-servicio-tecnico.dto';

@Controller('servicio-tecnico')
export class ServicioTecnicoController {
  constructor(private readonly servicioTecnicoService: ServicioTecnicoService) {}

  @Post()
  create(@Body() createServicioTecnicoDto: CreateServicioTecnicoDto) {
    return this.servicioTecnicoService.create(createServicioTecnicoDto);
  }

  @Get()
  findAll() {
    return this.servicioTecnicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicioTecnicoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicioTecnicoDto: UpdateServicioTecnicoDto) {
    return this.servicioTecnicoService.update(+id, updateServicioTecnicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicioTecnicoService.remove(+id);
  }
}
