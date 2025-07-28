import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateModuleDto {
  @ApiProperty({
    description: 'Novo nome do módulo',
    example: 'Módulo de Funções Avançadas',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiProperty({
    description: 'Nova descrição do módulo',
    example: 'Aprendendo sobre closures e high-order functions.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}