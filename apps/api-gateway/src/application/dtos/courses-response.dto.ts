import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MaterialResponseDto {
  @ApiProperty({ example: 'uuid-do-material' })
  id: string;

  @ApiProperty({ example: 'uuid-do-modulo' })
  moduleId: string;

  @ApiProperty({ example: 'Instalação do Node.js' })
  title: string;

  @ApiPropertyOptional({ example: 'Como instalar o Node.js' })
  description?: string;

  @ApiProperty({ example: 'video', enum: ['video', 'pdf', 'document', 'link'] })
  type: 'video' | 'pdf' | 'document' | 'link';

  @ApiProperty({ example: 'https://example.com/video.mp4' })
  url: string;

  @ApiPropertyOptional({ example: 300 })
  duration?: number;

  @ApiPropertyOptional({ example: 5242880 })
  fileSize?: number;

  @ApiProperty({ example: 1 })
  order: number;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  updatedAt: Date;
}

export class ModuleResponseDto {
  @ApiProperty({ example: 'uuid-do-modulo' })
  id: string;

  @ApiProperty({ example: 'uuid-do-curso' })
  courseId: string;

  @ApiProperty({ example: 'Introdução ao Node.js' })
  title: string;

  @ApiProperty({ example: 'Conceitos básicos do Node.js' })
  description: string;

  @ApiProperty({ example: 1 })
  order: number;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  updatedAt: Date;

  @ApiPropertyOptional({ type: [MaterialResponseDto] })
  materials?: MaterialResponseDto[];
}

export class CourseResponseDto {
  @ApiProperty({ example: 'uuid-do-curso' })
  id: string;

  @ApiProperty({ example: 'Curso de Node.js Avançado' })
  title: string;

  @ApiProperty({ example: 'Aprenda Node.js do básico ao avançado' })
  description: string;

  @ApiProperty({ example: 'uuid-do-instrutor' })
  instructorId: string;

  @ApiProperty({ example: 'published', enum: ['draft', 'published', 'archived'] })
  status: 'draft' | 'published' | 'archived';

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  updatedAt: Date;

  @ApiPropertyOptional({ type: [ModuleResponseDto] })
  modules?: ModuleResponseDto[];
}

export class CourseListResponseDto {
  @ApiProperty({ type: [CourseResponseDto] })
  courses: CourseResponseDto[];

  @ApiProperty({ example: 50 })
  total: number;
}
