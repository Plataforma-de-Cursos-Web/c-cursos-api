import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Curso de Node.js Avançado' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Aprenda Node.js do básico ao avançado com projetos práticos' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ 
    example: 'draft', 
    enum: ['draft', 'published', 'archived'],
    description: 'Status do curso'
  })
  @IsOptional()
  @IsEnum(['draft', 'published', 'archived'])
  status?: 'draft' | 'published' | 'archived';
}
