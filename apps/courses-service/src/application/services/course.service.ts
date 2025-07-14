import { Injectable } from '@nestjs/common';
import { CreateCourseUseCase } from '../usecases/create-course.usecase';
import { UpdateCourseUseCase } from '../usecases/update-course.usecase';
import { DeleteCourseUseCase } from '../usecases/delete-course.usecase';
import { GetCourseUseCase } from '../usecases/get-course.usecase';
import { ListCoursesUseCase } from '../usecases/list-courses.usecase';
import { AddModuleUseCase } from '../usecases/add-module.usecase';
import { AddMaterialUseCase } from '../usecases/add-material.usecase';
import { Course } from '../../domain/entities/course.model';
import { Module } from '../../domain/entities/module.model';
import { Material } from '../../domain/entities/material.model';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CreateModuleDto } from '../dto/create-module.dto';
import { CreateMaterialDto } from '../dto/create-material.dto';

@Injectable()
export class CourseService {
  constructor(
    private readonly createCourseUseCase: CreateCourseUseCase,
    private readonly updateCourseUseCase: UpdateCourseUseCase,
    private readonly deleteCourseUseCase: DeleteCourseUseCase,
    private readonly getCourseUseCase: GetCourseUseCase,
    private readonly listCoursesUseCase: ListCoursesUseCase,
    private readonly addModuleUseCase: AddModuleUseCase,
    private readonly addMaterialUseCase: AddMaterialUseCase,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto, instructorId: string): Promise<Course> {
    return this.createCourseUseCase.execute(createCourseDto, instructorId);
  }

  async updateCourse(updateCourseDto: UpdateCourseDto): Promise<Course> {
    return this.updateCourseUseCase.execute(updateCourseDto);
  }

  async deleteCourse(courseId: string): Promise<void> {
    return this.deleteCourseUseCase.execute(courseId);
  }

  async getCourse(courseId: string): Promise<Course> {
    return this.getCourseUseCase.execute(courseId);
  }

  async listCourses(page: number = 1, limit: number = 10): Promise<{ courses: Course[]; total: number }> {
    return this.listCoursesUseCase.execute(page, limit);
  }

  async listCoursesByInstructor(instructorId: string): Promise<Course[]> {
    return this.listCoursesUseCase.executeByInstructor(instructorId);
  }

  async addModule(createModuleDto: CreateModuleDto, instructorId: string): Promise<Module> {
    return this.addModuleUseCase.execute(createModuleDto, instructorId);
  }

  async addMaterial(createMaterialDto: CreateMaterialDto, instructorId: string): Promise<Material> {
    return this.addMaterialUseCase.execute(createMaterialDto, instructorId);
  }
}
