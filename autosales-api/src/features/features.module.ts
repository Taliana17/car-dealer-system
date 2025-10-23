import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { Feature } from './entities/feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feature])], // 👈 NECESARIO
  controllers: [FeaturesController],
  providers: [FeaturesService],
  exports: [TypeOrmModule, FeaturesService],
})
export class FeaturesModule {}
