import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Module } from '../entities/module.model';
import { Material } from '../entities/material.model';
import {
  ModuleRepository,
  CreateModuleData,
  UpdateModuleData,
} from './module.repository';

@Injectable()
export class ModuleRepositoryImpl implements ModuleRepository {
  constructor(
    @InjectModel(Module)
    private moduleModel: typeof Module,
  ) {}

  async create(data: CreateModuleData): Promise<Module> {
    return this.moduleModel.create(data as any);
  }

  async findById(id: string): Promise<Module | null> {
    return this.moduleModel.findByPk(id);
  }

  async findByCourse(courseId: string): Promise<Module[]> {
    return this.moduleModel.findAll({
      where: { courseId },
      order: [['order', 'ASC']],
    });
  }

  async findAll(): Promise<Module[]> {
    return this.moduleModel.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async update(module: UpdateModuleData): Promise<void> {
    await this.moduleModel.update(
      { ...(module as any) },
      { where: { id: module.id } },
    );
  }

  async delete(id: string): Promise<void> {
    await this.moduleModel.destroy({ where: { id } });
  }

  async findWithMaterials(id: string): Promise<Module | null> {
    return this.moduleModel.findByPk(id, {
      include: [
        {
          model: Material,
          as: 'materials',
        },
      ],
    });
  }
}