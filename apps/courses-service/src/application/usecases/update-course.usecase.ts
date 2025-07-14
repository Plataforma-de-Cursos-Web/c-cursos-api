import { Injectable, Inject } from '@nestjs/common';
import { CourseRepository, COURSE_REPOSITORY_TOKEN } from '../../domain/repositories/course.repository';
import { Course } from '../../domain/entities/course.model';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { NotFoundException } from '@libs/common';

@Injectable()
export class UpdateCourseUseCase {
  constructor(
    @Inject(COURSE_REPOSITORY_TOKEN)
    private courseRepository: CourseRepository,
  ) {}

  async execute(updateCourseDto: UpdateCourseDto): Promise<Course> {
    const existingCourse = await this.courseRepository.findById(updateCourseDto.id);
    if (!existingCourse) {
      throw new NotFoundException('Course not found');
    }

    const updatedCourse = await this.courseRepository.update({
      id: updateCourseDto.id,
      title: updateCourseDto.title,
      description: updateCourseDto.description,
      status: updateCourseDto.status,
    });

    return updatedCourse;
  }
}