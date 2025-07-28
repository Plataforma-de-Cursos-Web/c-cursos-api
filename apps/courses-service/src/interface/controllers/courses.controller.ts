import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCourseUseCase } from '../../application/usecases/create-course.usecase';
import { UpdateCourseUseCase } from '../../application/usecases/update-course.usecase';
import { DeleteCourseUseCase } from '../../application/usecases/delete-course.usecase';
import { GetCourseUseCase } from '../../application/usecases/get-course.usecase';
import { ListCoursesUseCase } from '../../application/usecases/list-courses.usecase';
import { AddModuleUseCase } from '../../application/usecases/add-module.usecase';
import { AddMaterialUseCase } from '../../application/usecases/add-material.usecase';
import { CreateCourseDto } from '../../application/dto/create-course.dto';
import { UpdateCourseDto } from '../../application/dto/update-course.dto';
import { CreateModuleDto } from '../../application/dto/create-module.dto';
import { CreateMaterialDto } from '../../application/dto/create-material.dto';
import { DeleteModuleUseCase } from '../../application/usecases/delete-module.usecase';
import { DeleteModuleDto } from '../../application/dto/delete-module.dto';

@Controller()
export class CoursesController {
  constructor(
    private readonly createCourseUseCase: CreateCourseUseCase,
    private readonly updateCourseUseCase: UpdateCourseUseCase,
    private readonly deleteCourseUseCase: DeleteCourseUseCase,
    private readonly getCourseUseCase: GetCourseUseCase,
    private readonly listCoursesUseCase: ListCoursesUseCase,
    private readonly addModuleUseCase: AddModuleUseCase,
    private readonly addMaterialUseCase: AddMaterialUseCase,
    private readonly deleteModuleUseCase: DeleteModuleUseCase,
  ) {}

  @MessagePattern({ cmd: 'courses.create' })
  async createCourse(@Payload() data: CreateCourseDto & { instructorId: string }) {
    try {
      const course = await this.createCourseUseCase.execute(data, data.instructorId);
      return { success: true, data: course };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @MessagePattern({ cmd: 'courses.update' })
  async updateCourse(@Payload() data: UpdateCourseDto & { instructorId: string }) {
    try {
      const course = await this.updateCourseUseCase.execute(data);
      return { success: true, data: course };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @MessagePattern({ cmd: 'courses.delete' })
  async deleteCourse(@Payload() data: { id: string; instructorId: string }) {
    try {
      await this.deleteCourseUseCase.execute(data.id);
      return { success: true, message: 'Course deleted successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @MessagePattern({ cmd: 'courses.get' })
  async getCourse(@Payload() data: { id: string }) {
    try {
      const course = await this.getCourseUseCase.execute(data.id);
      return { success: true, data: course };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @MessagePattern({ cmd: 'courses.list' })
  async listCourses(@Payload() data: { page?: number; limit?: number }) {
    try {
      const result = await this.listCoursesUseCase.execute(data.page, data.limit);
      return { 
        success: true, 
        data: {
          courses: result.courses,
          total: result.total
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @MessagePattern({ cmd: 'courses.list-by-instructor' })
  async listCoursesByInstructor(@Payload() data: { instructorId: string }) {
    try {
      const courses = await this.listCoursesUseCase.executeByInstructor(data.instructorId);
      return { success: true, data: courses };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @MessagePattern({ cmd: 'courses.add-module' })
  async addModule(@Payload() data: CreateModuleDto & { instructorId: string }) {
    try {
      const module = await this.addModuleUseCase.execute(data, data.instructorId);
      return { success: true, data: module };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @MessagePattern({ cmd: 'courses.delete-module' })
  async deleteModule(@Payload() data: DeleteModuleDto) {
    try {
      const module = await this.deleteModuleUseCase.execute(data.moduleId, data.courseId);
      return { success: true, message: module };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @MessagePattern({ cmd: 'courses.add-material' })
  async addMaterial(@Payload() data: CreateMaterialDto & { instructorId: string }) {
    try {
      const material = await this.addMaterialUseCase.execute(data, data.instructorId);
      return { success: true, data: material };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}