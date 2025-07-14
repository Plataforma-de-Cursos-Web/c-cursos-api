import { Injectable, Inject } from '@nestjs/common';
import { CourseRepository, COURSE_REPOSITORY_TOKEN } from '../../domain/repositories/course.repository';
import { Course } from '../../domain/entities/course.model';
import { NotFoundException } from '@libs/common';

@Injectable()
export class GetCourseUseCase {
  constructor(
    @Inject(COURSE_REPOSITORY_TOKEN)
    private courseRepository: CourseRepository,
  ) {}

  async execute(courseId: string): Promise<Course> {
    const course = await this.courseRepository.findWithModules(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }
}