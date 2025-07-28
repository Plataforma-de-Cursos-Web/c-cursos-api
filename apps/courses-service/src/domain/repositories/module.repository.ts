import { Module } from '../entities/module.model';

export interface CreateModuleData {
  courseId: string;
  title: string;
  description: string;
  order: number;
}

export interface UpdateModuleData {
  id: string;
  title?: string;
  description?: string;
  order?: number;
  isActive?: boolean;
}

export interface ModuleRepository {
  create(data: CreateModuleData): Promise<Module>;
  findById(id: string): Promise<Module | null>;
  findByCourse(courseId: string): Promise<Module[]>;
  update(module: Module): Promise<void>;
  delete(id: string): Promise<void>;
  findWithMaterials(id: string): Promise<Module | null>;
}

export const MODULE_REPOSITORY_TOKEN = Symbol('MODULE_REPOSITORY');