import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoursesModule } from './courses.module';
import { Course } from '../../../domain/entities/course.model';
import { Module as ModuleEntity } from '../../../domain/entities/module.model';
import { Material } from '../../../domain/entities/material.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST_COURSES || 'postgres-courses',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME_COURSES || 'course_platform_courses',
      models: [Course, ModuleEntity, Material],
      autoLoadModels: true,
      synchronize: true,
    }),
    CoursesModule,
  ],
})
export class AppModule {}