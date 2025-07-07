import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({ example: 'bearer' })
  tokenType: string;

  @ApiProperty({ example: 3600 })
  expiresIn: number;

  @ApiProperty({
    example: {
      id: 'uuid',
      email: 'john.doe@example.com',
      name: 'John Doe',
      plan: 'basic'
    }
  })
  user: {
    id: string;
    email: string;
    name: string;
    plan: string;
  };
}