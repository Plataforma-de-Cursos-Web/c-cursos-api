import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteModuleRequestDto {
  @ApiProperty({
    name: 'courseId',
    example: 'uuid-do-curso',
    description: 'ID do curso que contém o módulo',
  })
  @IsUUID()
  courseId: string;

  @ApiProperty({
    name: 'moduleId',
    example: 'uuid-do-modulo',
    description: 'ID do módulo a ser deletado',
  })
  @IsUUID()
  moduleId: string;
}
