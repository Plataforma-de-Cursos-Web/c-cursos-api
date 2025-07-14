import { Injectable, Inject } from '@nestjs/common';
import { CourseRepository, COURSE_REPOSITORY_TOKEN } from '../../domain/repositories/course.repository';
import { NotFoundException } from '@libs/common';

@Injectable()
export class DeleteCourseUseCase {
  constructor(
    @Inject(COURSE_REPOSITORY_TOKEN)
    private courseRepository: CourseRepository,
  ) {}

  async execute(courseId: string): Promise<void> {
    const existingCourse = await this.courseRepository.findById(courseId);
    if (!existingCourse) {
      throw new NotFoundException('Course not found');
    }

    await this.courseRepository.delete(courseId);
  }
}