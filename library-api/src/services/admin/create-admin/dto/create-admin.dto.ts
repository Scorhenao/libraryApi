import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ description: 'name of the administrador' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email of the administrator',
    example: 'admin@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'password of the administrator', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
