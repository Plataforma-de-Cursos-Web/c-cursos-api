import { Inject, Injectable } from '@nestjs/common';
import { UpdateModuleDto } from '../dto/update-module.dto';
import { ModuleRepository } from '../../domain/repositories/module.repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateModuleUseCase {
  constructor(
    @Inject('IModuleRepository')
    private readonly moduleRepository: ModuleRepository,
  ) {}

  async execute(moduleId: string, data: UpdateModuleDto): Promise<void> {
    const module = await this.moduleRepository.findById(moduleId);

    if (!module) {
      throw new NotFoundException('Módulo não encontrado.');
    }

    Object.assign(module, data);

    await this.moduleRepository.update(module);
  }
}