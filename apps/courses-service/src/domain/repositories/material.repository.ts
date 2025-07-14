import { Material } from '../entities/material.model';

export interface CreateMaterialData {
  moduleId: string;
  title: string;
  description?: string;
  type: 'video' | 'pdf' | 'document' | 'link';
  url: string;
  duration?: number;
  fileSize?: number;
  order: number;
}

export interface UpdateMaterialData {
  id: string;
  title?: string;
  description?: string;
  url?: string;
  duration?: number;
  fileSize?: number;
  order?: number;
  isActive?: boolean;
}

export interface MaterialRepository {
  create(data: CreateMaterialData): Promise<Material>;
  findById(id: string): Promise<Material | null>;
  findByModule(moduleId: string): Promise<Material[]>;
  update(data: UpdateMaterialData): Promise<Material>;
  delete(id: string): Promise<void>;
}

export const MATERIAL_REPOSITORY_TOKEN = Symbol('MATERIAL_REPOSITORY');