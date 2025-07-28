import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CoursesController } from '../../../interface/controllers/courses.controller';
import { CourseService } from '../../../application/services/course.service';
import { CreateCourseUseCase } from '../../../application/usecases/create-course.usecase';
import { UpdateCourseUseCase } from '../../../application/usecases/update-course.usecase';
import { DeleteCourseUseCase } from '../../../application/usecases/delete-course.usecase';
import { GetCourseUseCase } from '../../../application/usecases/get-course.usecase';
import { ListCoursesUseCase } from '../../../application/usecases/list-courses.usecase';
import { AddModuleUseCase } from '../../../application/usecases/add-module.usecase';
import { AddMaterialUseCase } from '../../../application/usecases/add-material.usecase';
import { COURSE_REPOSITORY_TOKEN } from '../../../domain/repositories/course.repository';
import { MODULE_REPOSITORY_TOKEN } from '../../../domain/repositories/module.repository';
import { MATERIAL_REPOSITORY_TOKEN } from '../../../domain/repositories/material.repository';
import { CourseRepositoryImpl } from '../../../domain/repositories/course.repository.impl';
import { ModuleRepositoryImpl } from '../../../domain/repositories/module.repository.impl';
import { MaterialRepositoryImpl } from '../../../domain/repositories/material.repository.impl';
import { Course } from '../../../domain/entities/course.model';
import { Module as ModuleEntity } from '../../../domain/entities/module.model';
import { Material } from '../../../domain/entities/material.model';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { UpdateModuleUseCase } from 'apps/courses-service/src/application/usecases/update-module.usecase';

@Module({
  imports: [
    SequelizeModule.forFeature([Course, ModuleEntity, Material]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret-jwt-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [CoursesController],
  providers: [
    CourseService,
    JwtStrategy,
    CreateCourseUseCase,
    UpdateCourseUseCase,
    DeleteCourseUseCase,
    GetCourseUseCase,
    ListCoursesUseCase,
    AddModuleUseCase,
    AddMaterialUseCase,
    UpdateModuleUseCase,
    {
      provide: COURSE_REPOSITORY_TOKEN,
      useClass: CourseRepositoryImpl,
    },
    {
      provide: MODULE_REPOSITORY_TOKEN,
      useClass: ModuleRepositoryImpl,
    },
    {
      provide: MATERIAL_REPOSITORY_TOKEN,
      useClass: MaterialRepositoryImpl,
    },
  ],
  exports: [CourseService],
})
export class CoursesModule {}