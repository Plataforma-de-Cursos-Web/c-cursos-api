import { IsString, IsNumber, IsEnum, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMaterialRequestDto {
  @ApiProperty({ 
    example: 'Instalação do Node.js',
    description: 'Título do material'
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({ 
    example: 'Aprenda como instalar o Node.js em diferentes sistemas operacionais',
    description: 'Descrição do material (opcional)'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    example: 'video', 
    enum: ['video', 'pdf', 'document', 'link'],
    description: 'Tipo do material'
  })
  @IsEnum(['video', 'pdf', 'document', 'link'])
  type: 'video' | 'pdf' | 'document' | 'link';

  @ApiProperty({ 
    example: 'https://example.com/video.mp4',
    description: 'URL do material'
  })
  @IsUrl()
  url: string;

  @ApiPropertyOptional({ 
    example: 300, 
    description: 'Duração em segundos (para vídeos)'
  })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiPropertyOptional({ 
    example: 5242880, 
    description: 'Tamanho do arquivo em bytes'
  })
  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @ApiProperty({ 
    example: 1, 
    description: 'Ordem do material no módulo (número inteiro positivo)'
  })
  @IsNumber()
  order: number;
}
