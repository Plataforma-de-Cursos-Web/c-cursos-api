import { Injectable, Inject } from '@nestjs/common';
import { MaterialRepository, MATERIAL_REPOSITORY_TOKEN } from '../../domain/repositories/material.repository';
import { ModuleRepository, MODULE_REPOSITORY_TOKEN } from '../../domain/repositories/module.repository';
import { CourseRepository, COURSE_REPOSITORY_TOKEN } from '../../domain/repositories/course.repository';
import { Material } from '../../domain/entities/material.model';
import { CreateMaterialDto } from '../dto/create-material.dto';
import { NotFoundException, ForbiddenException } from '@libs/common';

@Injectable()
export class AddMaterialUseCase {
  constructor(
    @Inject(MATERIAL_REPOSITORY_TOKEN)
    private materialRepository: MaterialRepository,
    @Inject(MODULE_REPOSITORY_TOKEN)
    private moduleRepository: ModuleRepository,
    @Inject(COURSE_REPOSITORY_TOKEN)
    private courseRepository: CourseRepository,
  ) {}

  async execute(createMaterialDto: CreateMaterialDto, instructorId: string): Promise<Material> {
    
    const module = await this.moduleRepository.findById(createMaterialDto.moduleId);
    if (!module) {
      throw new NotFoundException('Module not found');
    }

    const course = await this.courseRepository.findById(module.courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.instructorId !== instructorId) {
      throw new ForbiddenException('You can only add materials to your own course modules');
    }

    const material = await this.materialRepository.create({
      moduleId: createMaterialDto.moduleId,
      title: createMaterialDto.title,
      description: createMaterialDto.description,
      type: createMaterialDto.type,
      url: createMaterialDto.url,
      duration: createMaterialDto.duration,
      fileSize: createMaterialDto.fileSize,
      order: createMaterialDto.order,
    });

    return material;
  }
}