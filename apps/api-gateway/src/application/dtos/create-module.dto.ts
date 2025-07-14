import { IsString, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto {
  @ApiProperty({ example: 'uuid-do-curso' })
  @IsUUID()
  courseId: string;

  @ApiProperty({ example: 'Introdução ao Node.js' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Neste módulo você aprenderá os conceitos básicos do Node.js' })
  @IsString()
  description: string;

  @ApiProperty({ example: 1, description: 'Ordem do módulo no curso' })
  @IsNumber()
  order: number;
}