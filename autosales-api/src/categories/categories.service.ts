import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}

  create(dto: { name: string }) {
    const c = this.repo.create({ name: dto.name });
    return this.repo.save(c);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const c = await this.repo.findOne({ where: { id } });
    if (!c) throw new NotFoundException('Category not found');
    return c;
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
