import { Course } from '../entities/course.model';

export interface CreateCourseData {
  title: string;
  description: string;
  instructorId: string;
  status?: 'draft' | 'published' | 'archived';
}

export interface UpdateCourseData {
  id: string;
  title?: string;
  description?: string;
  status?: 'draft' | 'published' | 'archived';
  isActive?: boolean;
}

export interface CourseRepository {
  create(data: CreateCourseData): Promise<Course>;
  findById(id: string): Promise<Course | null>;
  findByInstructor(instructorId: string): Promise<Course[]>;
  findAll(page?: number, limit?: number): Promise<{ courses: Course[]; total: number }>;
  update(data: UpdateCourseData): Promise<Course>;
  delete(id: string): Promise<void>;
  findWithModules(id: string): Promise<Course | null>;
}

export const COURSE_REPOSITORY_TOKEN = Symbol('COURSE_REPOSITORY');