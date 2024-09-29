import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminDto {
  @ApiProperty({
    description: 'Email of the administrador',
    example: 'admin@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password of the administrador',
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
