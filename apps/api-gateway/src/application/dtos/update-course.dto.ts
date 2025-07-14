import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCourseDto {
  @ApiProperty({ example: 'uuid-do-curso' })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ example: 'Curso de Node.js Avançado - Atualizado' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Descrição atualizada do curso' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ 
    example: 'published', 
    enum: ['draft', 'published', 'archived'],
    description: 'Status do curso'
  })
  @IsOptional()
  @IsEnum(['draft', 'published', 'archived'])
  status?: 'draft' | 'published' | 'archived';
}