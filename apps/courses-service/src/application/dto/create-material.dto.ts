import { IsString, IsNotEmpty, MinLength, IsOptional, IsIn, IsUrl, IsNumber, Min } from 'class-validator';

export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  moduleId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsIn(['video', 'pdf', 'document', 'link'])
  type: 'video' | 'pdf' | 'document' | 'link';

  @IsUrl()
  url: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  duration?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  fileSize?: number;

  @IsNumber()
  @Min(1)
  order: number;
}