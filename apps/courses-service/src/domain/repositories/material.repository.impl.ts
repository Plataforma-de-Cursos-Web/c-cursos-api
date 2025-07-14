import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Material } from '../entities/material.model';
import {
  MaterialRepository,
  CreateMaterialData,
  UpdateMaterialData,
} from './material.repository';

@Injectable()
export class MaterialRepositoryImpl implements MaterialRepository {
  constructor(
    @InjectModel(Material)
    private materialModel: typeof Material,
  ) {}

  async create(data: CreateMaterialData): Promise<Material> {
    return this.materialModel.create(data as any);
  }

  async findById(id: string): Promise<Material | null> {
    return this.materialModel.findByPk(id);
  }

  async findByModule(moduleId: string): Promise<Material[]> {
    return this.materialModel.findAll({
      where: { moduleId },
      order: [['order', 'ASC']],
    });
  }

  async findAll(): Promise<Material[]> {
    return this.materialModel.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async update(data: UpdateMaterialData): Promise<Material> {
    const { id, ...updateData } = data;
    await this.materialModel.update(updateData, { where: { id } });
    
    const updatedMaterial = await this.findById(id);
    if (!updatedMaterial) {
      throw new Error(`Material with id ${id} not found`);
    }
    
    return updatedMaterial;
  }

  async delete(id: string): Promise<void> {
    await this.materialModel.destroy({ where: { id } });
  }
}