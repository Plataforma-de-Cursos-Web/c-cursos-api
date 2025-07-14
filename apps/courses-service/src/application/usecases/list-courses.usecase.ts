import { Injectable, Inject } from '@nestjs/common';
import { CourseRepository, COURSE_REPOSITORY_TOKEN } from '../../domain/repositories/course.repository';
import { Course } from '../../domain/entities/course.model';

@Injectable()
export class ListCoursesUseCase {
  constructor(
    @Inject(COURSE_REPOSITORY_TOKEN)
    private courseRepository: CourseRepository,
  ) {}

  async execute(page: number = 1, limit: number = 10): Promise<{ courses: Course[]; total: number }> {
    const result = await this.courseRepository.findAll(page, limit);
    
    return {
      courses: result.courses,
      total: result.total,
    };
  }

  async executeByInstructor(instructorId: string): Promise<Course[]> {
    const courses = await this.courseRepository.findByInstructor(instructorId);
    return courses;
  }
}