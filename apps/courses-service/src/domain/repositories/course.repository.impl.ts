import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from '../entities/course.model';
import { Module } from '../entities/module.model';
import { Material } from '../entities/material.model';
import {
  CourseRepository,
  CreateCourseData,
  UpdateCourseData,
} from './course.repository';

@Injectable()
export class CourseRepositoryImpl implements CourseRepository {
  constructor(
    @InjectModel(Course)
    private courseModel: typeof Course,
  ) {}

  async create(data: CreateCourseData): Promise<Course> {
    return this.courseModel.create(data as any);
  }

  async findById(id: string): Promise<Course | null> {
    return this.courseModel.findByPk(id);
  }

  async findByInstructor(instructorId: string): Promise<Course[]> {
    return this.courseModel.findAll({
      where: { instructorId },
      order: [['createdAt', 'DESC']],
    });
  }

  async findAll(page = 1, limit = 10): Promise<{ courses: Course[]; total: number }> {
    const offset = (page - 1) * limit;
    const { count, rows } = await this.courseModel.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    return {
      courses: rows,
      total: count,
    };
  }

  async update(data: UpdateCourseData): Promise<Course> {
    const { id, ...updateData } = data;
    await this.courseModel.update(updateData, { where: { id } });
    
    const updatedCourse = await this.findById(id);
    if (!updatedCourse) {
      throw new Error(`Course with id ${id} not found`);
    }
    
    return updatedCourse;
  }

  async delete(id: string): Promise<void> {
    await this.courseModel.destroy({ where: { id } });
  }

  async findWithModules(id: string): Promise<Course | null> {
    return this.courseModel.findByPk(id, {
      include: [
        {
          model: Module,
          as: 'modules',
          include: [
            {
              model: Material,
              as: 'materials',
            },
          ],
        },
      ],
    });
  }
}