import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from './entities/feature.entity';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly repo: Repository<Feature>,
  ) {}

  create(dto: { name: string }) {
    const f = this.repo.create({ name: dto.name });
    return this.repo.save(f);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const f = await this.repo.findOne({ where: { id } });
    if (!f) throw new NotFoundException('Feature not found');
    return f;
  }

  async update(id: string, dto: { name?: string }) {
    await this.repo.update({ id }, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.repo.delete({ id });
    return { deleted: true };
  }
}
