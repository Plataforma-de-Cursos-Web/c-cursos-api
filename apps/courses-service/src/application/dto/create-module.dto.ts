import { IsString, IsNotEmpty, MinLength, IsNumber, Min } from 'class-validator';

export class CreateModuleDto {
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;

  @IsNumber()
  @Min(1)
  order: number;
}