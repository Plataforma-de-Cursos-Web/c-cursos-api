import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteModuleDto {
  @ApiProperty({
    description: 'ID do módulo a ser deletado',
    example: '1',
  })
  
  @IsUUID()
  readonly moduleId: string;
}