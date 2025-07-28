import { Injectable, Inject } from '@nestjs/common';
import { ModuleRepository, MODULE_REPOSITORY_TOKEN } from '../../domain/repositories/module.repository';
import { NotFoundException } from '@libs/common';

@Injectable()
export class DeleteModuleUseCase {
  constructor(
    @Inject(MODULE_REPOSITORY_TOKEN)
    private moduleRepository: ModuleRepository,
  ) {}

  async execute(moduleId: string, courseId: string): Promise<void> {
    const existingModule = await this.moduleRepository.findById(moduleId);
    if (!existingModule || existingModule.courseId !== courseId) {
      throw new NotFoundException('Module not found or does not belong to the specified course');
    }

    await this.moduleRepository.delete(moduleId);
  }
}
