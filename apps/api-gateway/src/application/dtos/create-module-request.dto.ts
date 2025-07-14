import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleRequestDto {
  @ApiProperty({ 
    example: 'Introdução ao Node.js',
    description: 'Título do módulo'
  })
  @IsString()
  title: string;

  @ApiProperty({ 
    example: 'Neste módulo você aprenderá os conceitos básicos do Node.js',
    description: 'Descrição do módulo'
  })
  @IsString()
  description: string;

  @ApiProperty({ 
    example: 1, 
    description: 'Ordem do módulo no curso (número inteiro positivo)'
  })
  @IsNumber()
  order: number;
}