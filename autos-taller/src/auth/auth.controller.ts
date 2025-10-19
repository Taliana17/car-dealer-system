import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Empleado } from '../modules/empleado/entities/empleado.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const { email, password, id_concesionario, salario, ...rest } = body;

   
    const payloadEmpleado: Partial<Empleado> = {
      ...rest,
      concesionario: { id: +id_concesionario } as any,
      salario: salario ? String(salario) : undefined, 
    };

    return this.authService.register(email, password, payloadEmpleado);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}
