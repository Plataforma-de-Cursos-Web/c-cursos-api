import { Injectable, Inject } from '@nestjs/common';
import { ModuleRepository, MODULE_REPOSITORY_TOKEN } from '../../domain/repositories/module.repository';
import { CourseRepository, COURSE_REPOSITORY_TOKEN } from '../../domain/repositories/course.repository';
import { Module } from '../../domain/entities/module.model';
import { CreateModuleDto } from '../dto/create-module.dto';
import { NotFoundException, ForbiddenException } from '@libs/common';

@Injectable()
export class AddModuleUseCase {
  constructor(
    @Inject(MODULE_REPOSITORY_TOKEN)
    private moduleRepository: ModuleRepository,
    @Inject(COURSE_REPOSITORY_TOKEN)
    private courseRepository: CourseRepository,
  ) {}

  async execute(createModuleDto: CreateModuleDto, instructorId: string): Promise<Module> {
    
    const course = await this.courseRepository.findById(createModuleDto.courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.instructorId !== instructorId) {
      throw new ForbiddenException('You can only add modules to your own courses');
    }

    const module = await this.moduleRepository.create({
      courseId: createModuleDto.courseId,
      title: createModuleDto.title,
      description: createModuleDto.description,
      order: createModuleDto.order,
    });

    return module;
  }
}