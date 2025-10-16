import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // 👈 necesario para inyectar UserRepository
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
    UsersService,
    TypeOrmModule, // opcional; útil si otro módulo quiere reusar este forFeature
  ],
})
export class UsersModule {}
