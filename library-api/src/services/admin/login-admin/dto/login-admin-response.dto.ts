import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminResponseDto {
  @ApiProperty({
    description: 'generated JWT token for the admin',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;

  @ApiProperty({
    description: 'token JWT depuration',
    example: '1h',
  })
  expiresIn: string;
}
