import { IsString, IsNotEmpty, MinLength, IsOptional, IsIn } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;

  @IsOptional()
  @IsIn(['draft', 'published', 'archived'])
  status?: 'draft' | 'published' | 'archived';
}