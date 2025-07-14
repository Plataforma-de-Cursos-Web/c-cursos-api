import { Injectable, Inject } from '@nestjs/common';
import { CourseRepository, COURSE_REPOSITORY_TOKEN } from '../../domain/repositories/course.repository';
import { Course } from '../../domain/entities/course.model';
import { CreateCourseDto } from '../dto/create-course.dto';

@Injectable()
export class CreateCourseUseCase {
  constructor(
    @Inject(COURSE_REPOSITORY_TOKEN)
    private courseRepository: CourseRepository,
  ) {}

  async execute(createCourseDto: CreateCourseDto, instructorId: string): Promise<Course> {
    const course = await this.courseRepository.create({
      title: createCourseDto.title,
      description: createCourseDto.description,
      instructorId: instructorId,
      status: createCourseDto.status || 'draft',
    });

    return course;
  }
}